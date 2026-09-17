/* =====================================================
   Mini Soccer 88 Alpha Sport Pusdikif Cimahi
   Service Worker — Intelligent Caching & PWA Engine
   ===================================================== */

const CACHE_VERSION = 'ms88-v4.1';
const CACHE_STATIC  = `ms88-static-${CACHE_VERSION}`;
const CACHE_PAGES   = `ms88-pages-${CACHE_VERSION}`;
const CACHE_IMAGES  = `ms88-images-${CACHE_VERSION}`;

// Core assets to pre-cache immediately on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './assets/img/venue/lapangan-hero.jpg',
  './login.html',
  './user/index.html',
  './sewa-lapangan.html',
  './kompetisi.html',
  './kontak.html',
  './partner.html',
  './main-bareng.html',
  './blog.html',
  './venue-management.html',
  './offline.html',
  './manifest.json',
  './css/theme-88.css',
  './css/pwa-install.css',
  './js/pwa.js',
  './js/geo.js',
  './js/assets-sync.js',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/logo/ms88-alpha-sport-logo.png',
  './assets/logo/ms88-logo-transparent.png',
  './assets/logo/favicon.png'
];

// Max images to keep in runtime image cache
const MAX_IMAGE_CACHE_ENTRIES = 80;

// Helper: Trim cache entries
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      await cache.delete(keys[0]);
      trimCache(cacheName, maxItems);
    }
  } catch (_) {}
}

/* =====================================================
   1. Install Event: Pre-cache App Shell
   ===================================================== */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC).then(async (cache) => {
      // Precache assets gracefully (ignoring individual 404s so install always succeeds)
      for (const url of PRECACHE_ASSETS) {
        try {
          const response = await fetch(url, { cache: 'reload' });
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (err) {
          console.warn('[SW] Could not precache:', url, err);
        }
      }
    })
  );
});

/* =====================================================
   2. Activate Event: Clean up outdated caches
   ===================================================== */
self.addEventListener('activate', (event) => {
  const allowedCaches = [CACHE_STATIC, CACHE_PAGES, CACHE_IMAGES];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!allowedCaches.includes(name)) {
            console.log('[SW] Deleting obsolete cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* =====================================================
   3. Fetch Event: Multi-tier Intelligent Caching
   ===================================================== */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Never cache browser extensions or non-http protocols
  if (!url.protocol.startsWith('http')) return;

  // Never cache payment & superadmin dynamic API endpoints
  if (url.pathname.startsWith('/api/') || 
      url.hostname.includes('midtrans') || 
      url.hostname.includes('google-analytics') ||
      url.hostname.includes('googletagmanager')) {
    return;
  }

  // Strategy A: HTML Navigation (Network-First with Cache Fallback + Offline fallback)
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_PAGES).then((cache) => cache.put(req, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Check cached version of the requested page
          const cachedResponse = await caches.match(req);
          if (cachedResponse) return cachedResponse;

          // Try matching index.html if root
          if (url.pathname === '/' || url.pathname.endsWith('/')) {
            const cachedIndex = await caches.match('./index.html') || await caches.match('/index.html');
            if (cachedIndex) return cachedIndex;
          }

          // Fallback to offline page
          const offlineFallback = await caches.match('./offline.html') || await caches.match('/offline.html');
          return offlineFallback || new Response('Offline - Mini Soccer 88 Pusdikif Cimahi', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // Strategy B: Images & Media (Cache-First with Network Fallback)
  if (req.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i)) {
    event.respondWith(
      caches.match(req).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(req).then((networkResponse) => {
          if (networkResponse.ok && networkResponse.type !== 'opaque') {
            const copy = networkResponse.clone();
            caches.open(CACHE_IMAGES).then((cache) => {
              cache.put(req, copy);
              trimCache(CACHE_IMAGES, MAX_IMAGE_CACHE_ENTRIES);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Return fallback placeholder icon if available
          return caches.match('./assets/icons/icon-192x192.png');
        });
      })
    );
    return;
  }

  // Strategy C: CSS, JS & Fonts (Network-first with Cache Fallback)
  if (req.destination === 'style' || req.destination === 'script' || req.destination === 'font' ||
      url.pathname.match(/\.(css|js|woff2|woff|ttf)(\?.*)?$/i)) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_STATIC).then((cache) => cache.put(req, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return new Response('', { status: 404 });
        })
    );
    return;
  }

  // Default: Cache with network fallback
  event.respondWith(
    caches.match(req).then((response) => response || fetch(req))
  );
});

/* =====================================================
   4. Message Event: Communication from client
   ===================================================== */
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.action === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((k) => caches.delete(k)));
      }).then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
    );
  }
});
