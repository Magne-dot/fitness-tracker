const CACHE = 'fitness-tracker-v1';
const ASSETS = [
  '/fitness-tracker/',
  '/fitness-tracker/index.html',
  '/fitness-tracker/manifest.json',
  '/fitness-tracker/icon-192.png',
  '/fitness-tracker/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).catch(() => caches.match('/fitness-tracker/index.html'))
    )
  );
});
