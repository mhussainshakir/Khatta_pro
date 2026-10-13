const CACHE_NAME = 'hh-book-center-v2';
const urlsToCache = ['/', '/index.html', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(urlsToCache.map((u) => cache.add(u).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Network first, cache fallback (offline). Sirf apni site ki GET requests.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // Firebase / CDN ko na chheden
  if (url.pathname.startsWith('/.netlify/')) return;          // config API cache na karein

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('/index.html') : null) ||
          new Response('Offline - Page not available', { status: 503, headers: { 'Content-Type': 'text/plain' } }))
      )
  );
});
