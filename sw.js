const CACHE_NAME = 'alvorada-v1';
const urlsToCache = [
  '/alvorada/',
  '/alvorada/index.html',
  '/alvorada/chamada.html',
  '/alvorada/diretoria.html',
  '/alvorada/solicitacoes.html',
  '/alvorada/login.html',
  '/alvorada/formulario.html',
  '/alvorada/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

