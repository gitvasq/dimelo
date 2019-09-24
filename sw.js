var cacheName = 'match-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/js/match.js',
  '/js/dimelo.js',
  '/sounds/beep1.mp3',
  '/sounds/ganador.mp3',
  '/sounds/soundR1.mp3',
  '/sounds/soundR2.mp3',
  '/sounds/soundR3.mp3',
  '/sounds/soundR4.mp3',
  '/sounds/soundR5.mp3',
  '/sounds/soundR6.mp3',
  '/sounds/soundR7.mp3',
  '/sounds/soundR8.mp3',
  '/sounds/soundR9.mp3',
  '/sounds/soundR10.mp3',
  '/sounds/soundR11.mp3',
  '/sounds/soundR12.mp3',
  '/sounds/soundR13.mp3',
  '/sounds/soundR14.mp3',
  '/sounds/soundR15.mp3',
  '/sounds/soundR16.mp3',
  '/sounds/soundR17.mp3',
  '/sounds/soundR18.mp3',
  '/sounds/soundR19.mp3',
  '/sounds/soundR20.mp3',
  '/css/img/bg.jpg',
  '/images/arrowleft.png',
  '/images/imgR0.png',
  '/images/imgR1.png',
  '/images/imgR2.png',
  '/images/imgR3.png',
  '/images/imgR4.png',
  '/images/imgR5.png',
  '/images/imgR6.png',
  '/images/imgR7.png',
  '/images/imgR8.png',
  '/images/imgR9.png',
  '/images/imgR10.png',
  '/images/imgR11.png',
  '/images/imgR12.png',
  '/images/imgR13.png',
  '/images/imgR14.png',
  '/images/imgR15.png',
  '/images/imgR16.png',
  '/images/imgR17.png',
  '/images/imgR18.png',
  '/images/imgR19.png',
  '/images/imgR20.png',
  '/images/grupoR.png',
  '/images/grupoG.png',
  '/images/grupoV.png',
  '/images/grupoJ.png',
  '/images/grupoH.png',
  '/images/alegre2.gif',
  '/images/audio1.png',
  '/images/audio2.png',
  '/images/cat1.png',
  '/images/cat2.png',
  '/jqtouch/jqtouch.css',
  '/jqtouch/jqtouch.js',
  '/jqtouch/jquery-1.7.1.min.js',
  '/jqtouch/jquery-ui-1.10.4.js',
  '/css/dimelo.css'
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
