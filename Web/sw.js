const cacheName = "Chat_Bot";
var filesToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/ChatBot.html',
    '/css/bootstrap.min.css',
    '/css/ChatBot.css',
    '/css/Login_Page.css',
    '/css/Login_Page_Layout.css',
    '/js/api_client.js',
    '/js/ChatBot.js',
    '/js/jquery.min.js',
    '/js/Login.js',
    '/js/webchat.js',
    '/Images/cropped-favicon_saggezza-32x32.png',
    '/Images/logo_saggezza.png',
    '/Images/saggezza_background.png',
    '/Images/icons/icon-72x72.png',
    '/Images/icons/icon-96x96.png',
    '/Images/icons/icon-128x128.png',
    '/Images/icons/icon-144x144.png',
    '/Images/icons/icon-152x152.png',
    '/Images/icons/icon-192x192.png',
    '/Images/icons/icon-512x512.png'

];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});