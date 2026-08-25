/* Fortune Kids - Service Worker (fase 12) */
const VERSION = 'fk-v33';
const PRECACHE = [
    './',
    './index.html',
    './404.html',
    './offline.html',
    './manifest.webmanifest',
    './assets/icons/favicon.png',
    './css/variables.css',
    './css/base.css',
    './css/layout.css',
    './css/components.css',
    './js/main.js',
    './js/kids-data.js',
    './js/gallery-data.js',
    './js/data.js',
    './js/catalogo.js'
    './assets/images/logo-fortune-kids.webp',
    './assets/images/hero.webp',
    './assets/icons/social/instagram.png',
    './assets/icons/social/facebook.png',
    './assets/icons/social/whatsapp.png',
    './assets/icons/social/tiktok.png',
    './assets/icons/social/gofundme.png',
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(VERSION).then(function (cache) { return cache.addAll(PRECACHE); })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

// Activacion inmediata solo cuando el usuario acepta actualizar
self.addEventListener('message', function (e) {
    if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
    const req = e.request;
    if (req.method !== 'GET') return;

    const esNavegacion = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1;

    if (esNavegacion || req.url.indexOf('-data.js') !== -1) {
        // Network-first con reserva en cache y pagina offline
        e.respondWith(
            fetch(req).then(function (res) {
                const copia = res.clone();
                caches.open(VERSION).then(function (c) { c.put(req, copia); });
                return res;
            }).catch(function () {
                return caches.match(req).then(function (hit) {
                    return hit || caches.match('./offline.html');
                });
            })
        );
        return;
    }

    // Cache-first para el resto (CSS/JS/imagenes/fuentes)
    e.respondWith(
        caches.match(req).then(function (hit) {
            if (hit) return hit;
            return fetch(req).then(function (res) {
                if (res.ok || res.type === 'opaque') {
                    const copia = res.clone();
                    caches.open(VERSION).then(function (c) { c.put(req, copia); });
                }
                return res;
            });
        })
    );
});
