#!/usr/bin/env python3
"""Generate data.js from the RDI agenda page.

The page renders seven tab panels, `#agenda-track-0` .. `#agenda-track-6`.
Their order is NOT day-major — it is the order of the tab buttons, which
interleaves the two days per stage. Transcribing that by hand got the
stage/day wrong on five of seven panels, so the mapping is now read from
the page and the file is generated.

    python3 scrape_agenda.py [--offline agenda.html]
"""
from __future__ import annotations

import argparse
import html
import json
import pathlib
import re
import sys
import urllib.request
from html.parser import HTMLParser

URL = "https://rdi.berkeley.edu/events/agentic-ai-summit-2026"

# Tab index -> (stage, day). Verified against the tab labels in the page:
# showAgendaTab(0)="Plenary - Saturday" .. showAgendaTab(6)="Compass - Sunday".
TRACKS = [
    ("plenary", 1), ("plenary", 2),
    ("atlas", 1),   ("atlas", 2),
    ("nexus", 1),
    ("compass", 1), ("compass", 2),
]

# Labels that name a slot's format rather than its subject. An event
# carrying one of these belongs to the session above it; anything else
# (Panel:, Workshop:, Fireside Chat, ...) stands on its own.
GENERIC = {
    "keynote": "keynote",
    "keynotes": "keynote",
    "opening keynote": "opening keynote",
    "featured talk": "",
    "featured talks": "",
}


class Agenda(HTMLParser):
    """Collect (track, node) tuples. Nodes are ('session', time, title) or
    ('event', classes, time, title, speakers, extras)."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, str]] = []      # (tag, class)
        self.track: int | None = None
        self.depth = 0                              # depth inside the track div
        self.nodes: list[tuple[int, tuple]] = []
        self.cur: dict | None = None
        self.speaker: dict | None = None
        self.speaker_depth = -1
        self.buf: list[str] = []
        self.grab: str | None = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "")
        if tag == "div":
            m = re.fullmatch(r"resource-container(?: active)?", cls)
            if m and (a.get("id") or "").startswith("agenda-track-"):
                self.track = int(a["id"].rsplit("-", 1)[1])
                self.depth = 0
            if self.track is not None:
                self.depth += 1
        self.stack.append((tag, cls))
        if self.track is None:
            return

        c = set(cls.split())
        if "session-header" in c:
            self.flush()
            self.cur = {"kind": "session", "time": "", "title": ""}
        elif "event" in c:
            self.flush()
            self.cur = {"kind": "event", "cls": c, "time": "", "title": "",
                        "speakers": [], "extras": []}
        elif "speaker" in c and self.cur is not None:
            # Close on the div's own end tag — a speaker with no talk title
            # would otherwise be overwritten by the next one.
            self.speaker = {"name": "", "affil": "", "talk": ""}
            self.speaker_depth = self.depth
        elif cls in ("session-time", "session-title", "event-time", "event-title",
                     "event-title-2", "speaker-name", "speaker-title", "moderator"):
            self.grab = cls
            self.buf = []

    def handle_data(self, data):
        if self.grab:
            self.buf.append(data)

    def handle_endtag(self, tag):
        if self.grab and self.stack and self.stack[-1][0] == tag:
            text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            self.store(self.grab, text)
            self.grab = None
        if self.stack:
            self.stack.pop()
        if tag == "div" and self.track is not None:
            if self.speaker is not None and self.depth == self.speaker_depth:
                self.cur["speakers"].append(self.speaker)
                self.speaker = None
                self.speaker_depth = -1
            self.depth -= 1
            if self.depth == 0:
                self.flush()
                self.track = None

    def store(self, field: str, text: str) -> None:
        if self.cur is None:
            return
        if field in ("session-time", "event-time"):
            self.cur["time"] = text
        elif field in ("session-title", "event-title"):
            self.cur["title"] = text
        elif field == "speaker-name" and self.speaker is not None:
            self.speaker["name"] = text
        elif field == "speaker-title" and self.speaker is not None:
            self.speaker["affil"] = text
        elif field == "event-title-2" and self.speaker is not None:
            self.speaker["talk"] = text
        elif field == "moderator":
            self.cur["extras"].append(text)

    def flush(self) -> None:
        if self.speaker is not None and self.cur is not None:
            self.cur["speakers"].append(self.speaker)
            self.speaker = None
        if self.cur is None:
            return
        n = self.cur
        if n["kind"] == "session":
            self.nodes.append((self.track, ("session", n["time"], n["title"])))
        else:
            self.nodes.append((self.track, ("event", n["cls"], n["time"],
                                            n["title"], n["speakers"], n["extras"])))
        self.cur = None


def hhmm(t: str) -> str:
    m = re.match(r"(\d{1,2}):(\d{2})\s*([AP]M)", t.strip(), re.I)
    if not m:
        raise ValueError(f"bad time {t!r}")
    h, mi, ap = int(m.group(1)), m.group(2), m.group(3).upper()
    if ap == "PM" and h != 12:
        h += 12
    if ap == "AM" and h == 12:
        h = 0
    return f"{h:02d}:{mi}"


def kind_of(title: str, is_break: bool) -> str:
    t = title.lower()
    if is_break:
        return "break"
    if t.startswith("panel:"):
        return "panel"
    if "workshop" in t:
        return "workshop"
    if t.startswith("fireside"):
        return "fireside"
    if t.startswith("opening remarks"):
        return "opening"
    if "startup spotlight" in t:
        return "spotlight"
    return "session"


def build(nodes: list[tuple[int, tuple]]) -> list[dict]:
    out: list[dict] = []
    for idx, (stage, day) in enumerate(TRACKS):
        session = None          # (time, title) currently open
        card = None             # card accumulating GENERIC events
        for tr, node in nodes:
            if tr != idx:
                continue
            if node[0] == "session":
                session = (node[1], node[2])
                card = None
                continue

            _, cls, time, title, speakers, extras = node
            is_break = "break" in cls
            label = title.strip()
            key = label.lower()

            if not is_break and (key in GENERIC or not label) and session:
                role = GENERIC.get(key, "")
                if card is None:
                    card = {"day": day, "stage": stage, "start": hhmm(session[0]),
                            "kind": kind_of(session[1], False), "title": session[1],
                            "talks": [], "note": ""}
                    out.append(card)
                for sp in speakers:
                    card["talks"].append([sp["name"], sp["affil"], sp["talk"], role])
                for x in extras:
                    add_extra(card, x)
                continue

            # Distinctive slot: its own card.
            card = None
            use = label or (session[1] if session else "Session")
            c = {"day": day, "stage": stage, "start": hhmm(time),
                 "kind": kind_of(use, is_break), "title": use, "talks": [], "note": ""}
            role = "workshop" if c["kind"] == "workshop" else ""
            for sp in speakers:
                c["talks"].append([sp["name"], sp["affil"], sp["talk"], role])
            for x in extras:
                add_extra(c, x)
            out.append(c)
    return out


def add_extra(card: dict, text: str) -> None:
    """`.moderator` divs carry panelist lists, the moderator, or a note."""
    if text.lower().startswith("panelists:"):
        for name in split_names(text.split(":", 1)[1]):
            nm, af = name_affil(name)
            card["talks"].append([nm, af, "", "panelist"])
    elif text.lower().startswith("moderator:"):
        nm, af = name_affil(text.split(":", 1)[1].strip())
        card["talks"].append([nm, af, "", "moderator"])
    else:
        card["note"] = (card["note"] + " " + text).strip()


def split_names(s: str) -> list[str]:
    """Split on commas that are not inside parentheses."""
    parts, buf, depth = [], "", 0
    for ch in s:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(buf.strip())
            buf = ""
        else:
            buf += ch
    if buf.strip():
        parts.append(buf.strip())
    return [p for p in parts if p]


def name_affil(s: str) -> tuple[str, str]:
    m = re.match(r"^(.*?)\s*\((.*)\)\s*$", s.strip())
    return (m.group(1).strip(), m.group(2).strip()) if m else (s.strip(), "")


HEADER = '''/* Agentic AI Summit 2026 — schedule data
   GENERATED by scrape_agenda.py from
   https://rdi.berkeley.edu/events/agentic-ai-summit-2026
   Do not edit by hand; re-run the scraper instead.

   Talk tuple: [name, affiliation, talkTitle, role] */

const EVENT = {
  name: 'Agentic AI Summit 2026',
  venue: 'UC Berkeley Campus',
  days: [
    { n: 1, label: 'Sat', date: 'Saturday, August 1', iso: '2026-08-01' },
    { n: 2, label: 'Sun', date: 'Sunday, August 2', iso: '2026-08-02' },
  ],
};

/* Stage -> building comes from the venue map pin colours. */
const STAGES = {
  plenary: { name: 'Plenary', venue: 'Zellerbach Auditorium', building: 'Zellerbach', short: 'Zellerbach Aud.' },
  atlas:   { name: 'Atlas',   venue: 'MLK 3/F — Pauley West', building: 'MLK',        short: 'Pauley West' },
  nexus:   { name: 'Nexus',   venue: 'Zellerbach Playhouse',  building: 'Zellerbach', short: 'Playhouse' },
  compass: { name: 'Compass', venue: 'MLK 3/F — Pauley East', building: 'MLK',        short: 'Pauley East' },
};

const VENUE_NOTES = [
  ['Check-in', 'General admission, Atlas/Compass speakers, silver/bronze/VC sponsors — MLK 3/F, near Stephens Lounge'],
  ['Check-in', 'Plenary/Nexus speakers, platinum/gold sponsors — Lower Sproul Plaza'],
  ['Posters', 'MLK 3/F'],
  ['Catering', 'MLK 1/F · MLK 3/F Stephens Lounge · Lower Sproul Plaza'],
  ['Sponsor exhibits', 'Zellerbach Auditorium Lobby · ZA Mezzanine · MLK 2/F · MLK 3/F Kerr Lobby'],
];

const SESSIONS = [
'''


def emit(cards: list[dict]) -> str:
    j = json.dumps
    lines = [HEADER]
    last = None
    for c in cards:
        if (c["stage"], c["day"]) != last:
            last = (c["stage"], c["day"])
            day = "Saturday" if c["day"] == 1 else "Sunday"
            lines.append(f"\n/* ── {c['stage'].upper()} · {day.upper()} ─────────────────────── */")
        head = (f"{{ day:{c['day']}, stage:{j(c['stage'])}, start:{j(c['start'])}, "
                f"kind:{j(c['kind'])}, title:{j(c['title'])},")
        if c["note"]:
            head += f"\n  note:{j(c['note'])},"
        if not c["talks"]:
            lines.append(head + " talks:[]},")
            continue
        lines.append(head + " talks:[")
        for t in c["talks"]:
            lines.append("  [" + ", ".join(j(x) for x in t) + "],")
        lines.append("]},")
    lines.append("\n];\n")
    return "\n".join(lines)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--offline", help="use a saved copy of the page")
    ap.add_argument("-o", default=str(pathlib.Path(__file__).parent / "data.js"))
    args = ap.parse_args()

    if args.offline:
        raw = pathlib.Path(args.offline).read_text(errors="replace")
    else:
        req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
        raw = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")

    p = Agenda()
    p.feed(raw)

    seen = sorted({t for t, _ in p.nodes})
    if seen != list(range(7)):
        sys.exit(f"expected tracks 0..6, found {seen}")

    # The tab labels must still match TRACKS, or the mapping has moved.
    labels = re.findall(r'showAgendaTab\((\d)\)">([^<]+)</div>', raw)
    for i, label in labels:
        stage, day = TRACKS[int(i)]
        want = f"{stage} - {'Saturday' if day == 1 else 'Sunday'}".lower()
        if html.unescape(label).strip().lower() != want:
            sys.exit(f"tab {i} is {label!r}, expected {want!r} — update TRACKS")

    cards = build(p.nodes)

    # Every .speaker block in the page must survive into the output. A
    # speaker with no talk title was silently dropped once already.
    sec = raw.find('class="agenda-section"')
    end = raw.find("Featured Speakers", sec)
    want = len(re.findall(r'class="speaker-name"', raw[sec:end]))
    got = sum(1 for c in cards for t in c["talks"] if t[3] not in ("panelist", "moderator"))
    if want != got:
        sys.exit(f"speaker count mismatch: page has {want}, output has {got}")

    pathlib.Path(args.o).write_text(emit(cards), encoding="utf-8")
    print(f"speakers: {got}/{want} carried through")

    print(f"{args.o}: {len(cards)} cards")
    for idx, (stage, day) in enumerate(TRACKS):
        n = [c for c in cards if c["stage"] == stage and c["day"] == day]
        print(f"  track {idx}  {stage:8s} d{day}  {len(n):2d} cards  "
              f"first: {n[0]['start']} {n[0]['title'][:52]}")


if __name__ == "__main__":
    main()
