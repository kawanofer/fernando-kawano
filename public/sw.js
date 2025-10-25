// Service Worker for caching static assets and improving performance
const CACHE_NAME = 'fernando-kawano-v1';
const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/Projects',
  '/_next/static/css/',
  '/_next/static/js/',
  '/manifest.json',
  '/favicon.ico',
  '/kawano-kanji.svg',
  '/kawa-head-icon.svg',
];

// API routes to cache with different strategies
const API_ROUTES = [
  '/api/contact',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting(); // Force activation
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim(); // Take control of all clients
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except for specific domains)
  if (url.origin !== self.location.origin) {
    if (!url.hostname.includes('fonts.googleapis.com') && 
        !url.hostname.includes('fonts.gstatic.com') &&
        !url.hostname.includes('cdnjs.cloudflare.com')) {
      return;
    }
  }

  // Strategy 1: Cache First for static assets
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  }
  // Strategy 2: Network First for API calls
  else if (isAPICall(request.url)) {
    event.respondWith(networkFirst(request));
  }
  // Strategy 3: Stale While Revalidate for pages
  else if (isPageRequest(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  }
  // Strategy 4: Cache First for fonts and external assets
  else if (isFontOrExternalAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache First failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Fetch in background regardless of cache status
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error('[SW] Network fetch failed:', error);
      return null;
    });

  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // Otherwise wait for network
  return fetchPromise || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Helper functions to determine caching strategy
function isStaticAsset(url) {
  return url.includes('/_next/static/') ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.ico') ||
         url.includes('.svg') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.webp') ||
         url.includes('.avif');
}

function isAPICall(url) {
  return url.includes('/api/');
}

function isPageRequest(url) {
  const urlObj = new URL(url);
  return urlObj.origin === self.location.origin &&
         !isStaticAsset(url) &&
         !isAPICall(url) &&
         !isFontOrExternalAsset(url);
}

function isFontOrExternalAsset(url) {
  return url.includes('fonts.googleapis.com') ||
         url.includes('fonts.gstatic.com') ||
         url.includes('cdnjs.cloudflare.com');
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get stored form data from IndexedDB or localStorage
    const formData = await getStoredFormData();
    if (formData) {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear stored data on successful sync
        await clearStoredFormData();
        console.log('[SW] Form data synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Form sync failed:', error);
  }
}

// Placeholder functions for form data storage
async function getStoredFormData() {
  // Implementation would use IndexedDB or localStorage
  return null;
}

async function clearStoredFormData() {
  // Implementation would clear IndexedDB or localStorage
}

// Message event for client communication
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker registered successfully');