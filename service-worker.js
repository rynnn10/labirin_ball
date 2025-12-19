const CACHE_NAME = "labirin-3d-v6";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./maze.js",
  "./Three.js",
  "./Box2dWeb.min.js",
  "./jquery.js",
  "./keyboard.js",
  "./manifest.json",
  // Gambar
  "./assets/ball.png",
  "./assets/concrete.png",
  "./assets/brick.png",
  "./assets/leftBtn.png",
  "./assets/rightBtn.png",
  "./assets/upBtn.png",
  "./assets/downBtn.png",
  "./assets/icon1.png",
  "./assets/icon2.png",
  // Audio Baru
  "./assets/bgsc.mp3",
  "./assets/click.mp3",
  "./assets/nxtlvl.mp3",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Menyimpan aset ke cache...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate & Hapus Cache Lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Menghapus cache lama", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Aset
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
