/* ============================================================
   SERVICE WORKER -- makes the site installable and lets pages
   you've already visited keep working with no internet connection.
   ============================================================
   You shouldn't need to edit this file for normal content updates
   (new articles, new Tactical Lab pieces) -- those are fetched
   fresh from the network automatically every time a visitor is
   online, per the "HTML pages" rule below.

   The one time you MIGHT want to touch this file: if you ever make
   a big visual change (new CSS, renamed images) and want to force
   every returning visitor's cached copy to clear out immediately
   instead of updating gradually, bump the number in CACHE_VERSION
   below (e.g. "sd-journalism-v1" -> "sd-journalism-v2") and upload
   this file to GitHub. The old cache deletes itself automatically.
   ============================================================ */

const CACHE_VERSION = "sd-journalism-v1";

// The core set of files needed for the site shell to work offline.
// Individual articles/Tactical Lab pages and images get added to
// the cache automatically the first time a visitor opens them (see
// the fetch handler below) -- they don't need to be listed here.
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./articles.html",
  "./tactical-lab.html",
  "./about.html",
  "./contact.html",
  "./faq.html",
  "./saved.html",
  "./field-notes.html",
  "./offline.html",
  "./css/style.css",
  "./js/contact-info.js",
  "./js/articles-data.js",
  "./js/tactical-lab-data.js",
  "./js/field-notes-data.js",
  "./js/site.js",
  "./js/theme.js",
  "./manifest.json",
  "./images/favicon-32.png",
  "./images/favicon-180.png",
  "./images/logo-badge.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // HTML pages (someone navigating to a page, not a background
  // request for an image/script): always try the network first, so
  // anyone online gets your latest content, never a stale cached
  // version. Only fall back to the cache -- and finally the offline
  // page -- if the network request fails.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match("./offline.html"))
        )
    );
    return;
  }

  // Everything else (CSS, JS, data files, images): serve the cached
  // copy immediately if there is one (fast, and works offline), and
  // quietly refresh the cache in the background for next time.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
