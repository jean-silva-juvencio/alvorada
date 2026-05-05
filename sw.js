const CACHE_NAME = 'alvorada-v2'; // ← MUDE O NÚMERO DA VERSÃO

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

// Instalação
self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo SW a ativar imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação - limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Toma controle das páginas abertas
});

// Busca - tenta rede primeiro, depois cache (estratégia mais atualizada)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Atualiza o cache com a nova resposta
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
