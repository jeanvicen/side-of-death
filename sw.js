const CACHE_NAME = 'side-of-death-v8';
const APP_SHELL = [
  './',
  './index.html',
  './chapters.js',
  './manifest.webmanifest',
  './assets/background.png',
  './assets/reaper.png',
  './assets/metalmania.mp3',
  './assets/intro-ost-90s.wav',
  './assets/cemetery-ambience.wav',
  './assets/voice-cine-01.wav',
  './assets/voice-cine-02.wav',
  './assets/voice-cine-03.wav',
  './assets/voice-cine-04.wav',
  './assets/voice-cine-05.wav',
  './assets/voice-cine-06.wav',
  './assets/voice-cine-07.wav',
  './assets/voice-cine-08.wav',
  './assets/cinematic_ref.png',
  './assets/cine-01-cemetery.png',
  './assets/cine-02-fugitive-souls.png',
  './assets/cine-03-portal.png',
  './assets/cine-04-reaper-gate.png',
  './assets/cine-05-souls-gate.png',
  './assets/world-01-stage.png',
  './assets/world-01-foreground.png',
  './assets/world-02-city-under-veil.png',
  './assets/card-01-chapter.png',
  './assets/player-01-reaper-sheet.png',
  './assets/enemy-01-soul-sheet.png',
  './assets/enemy-02-shade-sheet.png',
  './assets/enemy-03-harbinger-sheet.png',
  './assets/boss-01-witch-sheet.png',
  './assets/world-03-witch-arena.png',
  './assets/fx-01-combat-effects.png',
  './fonts/press-start-2p.css',
  './fonts/files/press-start-2p-latin-400-normal.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const freshFirst = event.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/chapters.js') || url.pathname.endsWith('/manifest.webmanifest') || url.pathname.endsWith('/sw.js');
  event.respondWith(
    (freshFirst ? fetch(event.request).then((response) => {
      if (response && response.status === 200 && response.type !== 'opaque') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request)) : caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }))
  );
});
