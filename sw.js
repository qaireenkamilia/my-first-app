const CACHE_NAME = 'my-app-cache-v1';
const FILES_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// Force the phone to save these files immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// If the user loses internet, load the saved files instead of crashing
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
