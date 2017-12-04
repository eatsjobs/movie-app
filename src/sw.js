// TODO: Replace Xs.
importScripts('/importScripts/workbox-sw.prod.v2.1.2.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});


workbox.router.registerRoute(
  new RegExp('^https://hacker-news.firebaseio.com'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute(
    '/\.css$/', 
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