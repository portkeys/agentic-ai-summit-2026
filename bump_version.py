#!/usr/bin/env python3
"""Stamp a new build id into sw.js and index.html together.

The service-worker cache name and the BUILD shown in the app must match, or
you cannot tell from a phone which build it is actually running. Run this
before every deploy.
"""
import datetime as dt
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent


def main() -> None:
    stamp = sys.argv[1] if len(sys.argv) > 1 else new_stamp()

    sw = ROOT / "sw.js"
    idx = ROOT / "index.html"

    s = sw.read_text(encoding="utf-8")
    s, n1 = re.subn(r"const VERSION = '[^']*';", f"const VERSION = '{stamp}';", s, count=1)

    h = idx.read_text(encoding="utf-8")
    h, n2 = re.subn(r"const BUILD = '[^']*';", f"const BUILD = '{stamp}';", h, count=1)

    if n1 != 1 or n2 != 1:
        sys.exit(f"could not stamp (sw={n1}, index={n2}) — check the constants")

    sw.write_text(s, encoding="utf-8")
    idx.write_text(h, encoding="utf-8")
    print(f"build {stamp}")


def new_stamp() -> str:
    """Date plus a two-digit serial, so several deploys a day stay ordered."""
    today = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d")
    cur = re.search(r"const VERSION = '([^']*)';", (ROOT / "sw.js").read_text())
    if cur and cur.group(1).startswith(today):
        n = int(cur.group(1).rsplit("-", 1)[1]) + 1
    else:
        n = 1
    return f"{today}-{n:02d}"


if __name__ == "__main__":
    main()
