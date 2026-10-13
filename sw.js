const CACHE_NAME = 'hh-book-center-v1';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation & data (Firebase/Cloudinary/Drive always live),
// cache-first fallback only for the app shell files themselves.
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isAppShell = APP_SHELL.some((f) => url.includes(f.replace('./', '')));

  if (isAppShell) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkRes) => {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkRes.clone()));
            return networkRes;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
  // Everything else (Firestore, Cloudinary, Drive API calls) goes straight to network.
});
