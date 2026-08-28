// Sube este número cada vez que publiques cambios para forzar la actualización
const CACHE = "radio-fusion-stereo-v4";
const SHELL = ["./", "./index.html", "./manifest.json"];

self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Estrategia "network-first": siempre intenta traer la versión más nueva de internet;
// solo usa la copia guardada si no hay conexión. Así la web se actualiza sola.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.includes("radios.voiparkas.com")) return;

  const isSameOrigin = new URL(e.request.url).origin === location.origin;
  if (!isSameOrigin) return;

  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then(r => {
        if (r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match("./index.html")))
  );
});
