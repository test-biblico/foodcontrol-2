const CACHE = 'foodcontrol-v3';
const BASE = 'https://test-biblico.github.io/foodcontrol/';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).then(r => {
    const c = r.clone();
    caches.open(CACHE).then(cache => cache.put(e.request, c));
    return r;
  }).catch(() => caches.match(e.request)));
});
