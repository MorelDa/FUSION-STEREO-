const CACHE_NAME = "fusion-stereo-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  /*
   * MUY IMPORTANTE:
   * Nunca cachear el MP3 en vivo ni peticiones externas.
   * El proyecto original cacheaba todas las peticiones GET y eso podía
   * provocar que el stream quedara congelado o que se sirviera un fragmento viejo.
   */
  if(url.origin !== self.location.origin) return;
  if(url.pathname.endsWith(".mp3") || url.pathname.includes("/listen/")) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if(response && response.ok){
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
  );
});
