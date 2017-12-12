// TODO: Replace Xs.
importScripts('workbox-sw.prod.v2.1.2.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

workbox.router.registerRoute(
  new RegExp('^https://api.themoviedb.org/3'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute(
  /^https?:\/\/image\.tmdb\.org/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache'
  })
);

workbox.router.registerRoute(
  /^https?:\/\/httpbin\.org\/headers/,
  workbox.strategies.cacheFirst()
);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox For Webpack';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


workbox.precache([]);