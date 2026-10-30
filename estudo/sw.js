/* Cache para uso offline (rede primeiro, para nunca ficar preso a uma versão antiga). Troque a versão ao alterar arquivos. */
var CACHE = 'rota-concurso-v26';
var ARQUIVOS = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json', 'icon.svg',
  'data/admin-config.js', 'data/core.js', 'data/portugues.js', 'data/logica.js', 'data/legislacao.js', 'data/especificos.js', 'data/gerais.js', 'data/superior.js', 'data/coment-portugues.js', 'data/coment-logica.js', 'data/coment-legislacao.js', 'data/coment-especificos.js', 'data/coment-gerais.js', 'data/extra.js', 'data/extra2.js', 'data/edital-legislacao.js', 'data/pf.js', 'data/pf-questoes.js', 'data/prf.js', 'data/prf-questoes.js'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
/* Rede primeiro (sempre a versão mais nova); se estiver offline, usa a cópia guardada. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r;
  }).catch(function () { return caches.match(e.request); }));
});
