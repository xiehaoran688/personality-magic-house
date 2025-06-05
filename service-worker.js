const CACHE_NAME = 'magic-house-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/assets/space-loop.mp4',
  '/assets/magic-logo.png',
  '/assets/magic-swirl.gif',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/fire.html',
  '/ice.html',
  '/wind.html',
  '/earth.html',
  '/assets/fire_card.png',
  '/assets/ice_card.png',
  '/assets/wind_card.png',
  '/assets/earth_card.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});