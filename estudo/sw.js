/* Cache para uso offline. Troque a versão ao alterar arquivos. */
var CACHE = 'rota-concurso-v1';
var ARQUIVOS = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json', 'icon.svg',
  'data/core.js', 'data/portugues.js', 'data/logica.js', 'data/legislacao.js', 'data/especificos.js', 'data/gerais.js'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r; });
  }));
});
