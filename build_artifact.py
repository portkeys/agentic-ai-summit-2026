#!/usr/bin/env python3
"""Fold index.html + data.js + map.jpg into one self-contained page.

The hosted Artifact supplies its own <!doctype>/<head>/<body> skeleton, so
this strips ours and inlines every asset — the published page has to work
with no same-origin files to fetch.
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "dist"


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    data = (ROOT / "data.js").read_text(encoding="utf-8")
    img = base64.b64encode((ROOT / "map.jpg").read_bytes()).decode("ascii")

    title = re.search(r"<title>(.*?)</title>", html, re.S).group(1)
    style = re.search(r"<style>.*?</style>", html, re.S).group(0)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)

    # Inline the schedule and the map.
    body = body.replace(
        '<script src="data.js"></script>',
        "<script>\n" + data + "\n</script>",
    )
    body = body.replace(
        'var MAP_SRC = "map.jpg"; /* build_artifact.py swaps in a data URI */',
        'var MAP_SRC = "data:image/jpeg;base64,' + img + '";',
    )

    # No same-origin sw.js on the artifact host; drop the registration so
    # the console stays clean. Markers, not a regex over the code itself —
    # matching braces here silently produced unparseable JS.
    body, n = re.subn(r"/\* sw:start.*?/\* sw:end \*/", "", body, flags=re.S)
    if n != 1:
        raise SystemExit(f"expected 1 sw block, stripped {n} — check the markers")

    # The artifact wrapper owns <head>, so the iOS home-screen hints have
    # to be added at runtime. Safari reads them when the user taps Add to
    # Home Screen, which is after this runs.
    ios = """
<script>
(function(){
  var metas = {
    'apple-mobile-web-app-capable':'yes',
    'mobile-web-app-capable':'yes',
    'apple-mobile-web-app-status-bar-style':'black-translucent',
    'apple-mobile-web-app-title':'Summit',
    'theme-color':'#0B1220'
  };
  Object.keys(metas).forEach(function(n){
    if (document.querySelector('meta[name="'+n+'"]')) return;
    var m = document.createElement('meta');
    m.name = n; m.content = metas[n];
    document.head.appendChild(m);
  });
})();
</script>
"""

    page = "<title>" + title + "</title>\n" + style + "\n" + body.strip() + "\n" + ios.strip() + "\n"

    OUT.mkdir(exist_ok=True)
    dest = OUT / "summit.html"
    dest.write_text(page, encoding="utf-8")

    # The artifact host wraps the page in its own skeleton. Mirror that
    # locally so the built file can be tested the way it will be served.
    (OUT / "_preview.html").write_text(
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
        "</head><body>" + page + "</body></html>",
        encoding="utf-8",
    )

    check(page)
    print(f"{dest}  {len(page)/1024:.0f} KB")
    print(f"{OUT / '_preview.html'}  (local test wrapper)")


def check(page: str) -> None:
    """Parse every inline script. A broken build renders a blank page with
    nothing in the console, so it has to fail loudly here instead."""
    import shutil
    import subprocess
    import tempfile

    node = shutil.which("node")
    if not node:
        print("note: node not found, skipped the syntax check")
        return
    for i, src in enumerate(re.findall(r"<script>(.*?)</script>", page, re.S)):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(src)
            path = f.name
        r = subprocess.run([node, "--check", path], capture_output=True, text=True)
        if r.returncode:
            raise SystemExit(f"script block {i} does not parse:\n{r.stderr}")


if __name__ == "__main__":
    main()
