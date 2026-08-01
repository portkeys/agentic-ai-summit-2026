/* Service worker.
 *
 * The schedule is the thing most likely to be corrected between now and the
 * event, so the shell and the data are network-first: with signal you always
 * get the current build, and the cache is the offline fallback rather than
 * the default source. An earlier cache-first version left installed PWAs
 * pinned to a stale schedule with no way to notice.
 *
 * Bytes that never change (map, icons) stay cache-first.
 */
const VERSION = '2026-08-01-05';
const CACHE = 'aisummit-' + VERSION;

const SHELL = ['./', './index.html', './data.js', './manifest.json'];
const STATIC = ['./map.jpg', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.concat(STATIC)))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Let the page ask the worker what it is running, and to step aside. */
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data === 'version' && e.source) e.source.postMessage({ version: VERSION });
  if (e.data === 'skipWaiting') self.skipWaiting();
});

const isStatic = path => /\.(?:jpg|png|svg|ico|woff2?)$/i.test(path);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isStatic(url.pathname)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }

  /* Shell and data: revalidate against the server, fall back to cache.
     `no-cache` defeats the CDN max-age so a fix is never a stale 600s away. */
  e.respondWith(
    fetch(url.pathname + url.search, { cache: 'no-cache' })
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit =>
        hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});
