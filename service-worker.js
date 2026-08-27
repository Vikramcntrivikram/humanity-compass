// Service Worker for Humanity Compass
// Provides offline caching and background sync capabilities

const CACHE_NAME = 'humanity-compass-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/perspective.js',
  '/js/journal.js',
  '/js/action-finder.js',
  '/js/issues.js',
  '/js/utils.js',
  '/manifest.json',
  '/offline.html',
  // Add any other static assets here
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests (like to analytics services)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, try network request
        return fetch(event.request)
          .then(networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.add(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // If both cache and network fail, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Optional: Background sync for sending data when back online
self.addEventListener('sync', event => {
  if (event.tag === 'save-journal-entry') {
    event.waitUntil(saveJournalEntry());
  }
});

// Optional: Push notifications (would require server integration)
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png'
  };

  event.waitUntil(
    self.registration.showNotification('Humanity Compass', options)
  );
});