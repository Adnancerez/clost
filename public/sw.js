/**
 * CLOST — High-Performance Brutalist Service Worker
 * Version: v1.0.0
 * Architecture: App Shell Precache + SWR Image Cache + Network-First Page Cache + Offline Fallback
 */

const CACHE_VERSION = "clost-v2-clean";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;

const MAX_IMAGE_ENTRIES = 60;

const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/collections",
  "/lookbook",
  "/favicon.ico",
  "/manifest.webmanifest",
];

// 1. INSTALL: Pre-cache core application shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn("[CLOST SW] Precache warning:", err);
      })
  );
});

// 2. ACTIVATE: Cleanup stale caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith("clost-") && !name.startsWith(CACHE_VERSION))
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper: Trim image cache to keep memory low
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    trimCache(cacheName, maxItems);
  }
}

// 3. FETCH: Strategy Routing
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests or chrome-extension/internal schemes
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // A. Navigation / Page Requests (HTML): Network-First -> Cache -> Offline Fallback
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          const offlineFallback = await caches.match("/offline");
          return offlineFallback || caches.match("/");
        })
    );
    return;
  }

  // B. Images (Remote CDN + Local): Stale-While-Revalidate
  if (
    request.destination === "image" ||
    url.hostname.includes("googleusercontent.com") ||
    url.hostname.includes("shopify.com") ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|avif|gif)$/i)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
              trimCache(IMAGE_CACHE, MAX_IMAGE_ENTRIES);
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // C. Static Next.js Bundles, Scripts, Styles & Fonts: Cache-First
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// 4. MESSAGE: Client communication (e.g. skipWaiting)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
