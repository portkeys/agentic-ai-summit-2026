# Agentic AI Summit 2026 — schedule picker

A small offline-capable PWA for picking sessions at the
[Agentic AI Summit 2026](https://rdi.berkeley.edu/events/agentic-ai-summit-2026)
(UC Berkeley, Aug 1–2 2026).

**Live: <https://portkeys.github.io/agentic-ai-summit-2026/>**

Add it to your phone's home screen (Safari: Share → Add to Home Screen) and it
installs as a standalone app with a service worker, so it works with no signal.

Also published as a Claude artifact (needs a claude.ai login, no service worker):
<https://claude.ai/code/artifact/b4349ba2-f337-4899-b01a-dbbc905b8610>

## What it does

- Browse all 67 sessions by day and stage; search by speaker, company or topic.
- Star sessions into **My Schedule**, stored in `localStorage` on the device.
- Flags **overlaps** between starred sessions, and **cross-building walks**
  (Zellerbach ↔ MLK means crossing Lower Sproul).
- Exports the starred set as an `.ics` file.
- Venue map with the stage → building key.

Stage colours are taken from the venue-map pin colours, so a pill in the app
matches the pin on the printed map:

| Stage   | Location             |
| ------- | -------------------- |
| Plenary | Zellerbach Auditorium |
| Nexus   | Zellerbach Playhouse  |
| Atlas   | MLK 3/F — Pauley West |
| Compass | MLK 3/F — Pauley East |

Note that **Sunday has no Nexus track** — Sunday runs Plenary, Atlas and Compass.

## Files

| File                | Purpose |
| ------------------- | ------- |
| `index.html`        | The whole app — markup, styles, logic |
| `data.js`           | Schedule data, transcribed from the RDI agenda page |
| `map.jpg`           | Venue map |
| `manifest.json`, `sw.js`, `icon-*.png` | PWA install + offline cache |
| `build_artifact.py` | Folds everything into one self-contained file |

## Running it

```bash
python3 -m http.server 8731
```

Then open <http://localhost:8731>. A service worker caches the app on first
load, so it works with no signal.

Note: `sw.js` is cache-first. When editing, unregister the worker and clear
caches, or you will keep getting the previous build.

## Building the single-file version

```bash
python3 build_artifact.py
```

Writes `dist/summit.html` (everything inlined, no `<head>`/`<body>` wrapper —
that is supplied by the artifact host) and `dist/_preview.html`, the same file
wrapped in a skeleton so it can be tested locally the way it will be served.
The build parses every inline script with `node --check` and fails loudly if a
block is broken — a bad build otherwise renders a blank page with nothing in
the console.

## Times

All times are Berkeley local. Session end times are derived from the next block
on the same stage; the last block of each track is assumed to run 60 minutes,
or 90 for a reception. The `.ics` export hardcodes PDT (UTC−7), which is correct
for August.
