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


workbox.precache([
  {
    "url": "/movie-app/app.67fd3.bundle.js",
    "revision": "44a773b079d9244276a31a0c8ca92807"
  },
  {
    "url": "/movie-app/assets/fontawesome-webfont.eot",
    "revision": "674f50d287a8c48dc19ba404d20fe713"
  },
  {
    "url": "/movie-app/assets/fontawesome-webfont.svg",
    "revision": "912ec66d7572ff821749319396470bde"
  },
  {
    "url": "/movie-app/assets/fontawesome-webfont.ttf",
    "revision": "b06871f281fee6b241d60582ae9369b9"
  },
  {
    "url": "/movie-app/assets/fontawesome-webfont.woff",
    "revision": "fee66e712a8a08eef5805a46892932ad"
  },
  {
    "url": "/movie-app/assets/fontawesome-webfont.woff2",
    "revision": "af7ae505a9eed503f8b8e6982036873e"
  },
  {
    "url": "/movie-app/assets/ionicons.eot",
    "revision": "19e65b89cee273a249fba4c09b951b74"
  },
  {
    "url": "/movie-app/assets/ionicons.svg",
    "revision": "aff28a207631f39ee0272d5cdde43ee7"
  },
  {
    "url": "/movie-app/assets/ionicons.ttf",
    "revision": "dd4781d1acc57ba4c4808d1b44301201"
  },
  {
    "url": "/movie-app/assets/ionicons.woff",
    "revision": "2c159d0d05473040b53ec79df8797d32"
  },
  {
    "url": "/movie-app/assets/Material-Design-Iconic-Font.ttf",
    "revision": "b351bd62abcd96e924d9f44a3da169a7"
  },
  {
    "url": "/movie-app/assets/Material-Design-Iconic-Font.woff",
    "revision": "d2a55d331bdd1a7ea97a8a1fbb3c569c"
  },
  {
    "url": "/movie-app/assets/Material-Design-Iconic-Font.woff2",
    "revision": "a4d31128b633bc0b1cc1f18a34fb3851"
  },
  {
    "url": "/movie-app/icon_1024x1024.af1892deb5e3c617c3b6b9acf03a5013.png",
    "revision": "af1892deb5e3c617c3b6b9acf03a5013"
  },
  {
    "url": "/movie-app/icon_128x128.e5693b6a16eac3bc695f3f69d74d364b.png",
    "revision": "e5693b6a16eac3bc695f3f69d74d364b"
  },
  {
    "url": "/movie-app/icon_192x192.5ebd548c21b28279ed985162c25bd757.png",
    "revision": "5ebd548c21b28279ed985162c25bd757"
  },
  {
    "url": "/movie-app/icon_256x256.c5501bd27aebacbcbecf5a14ce04aad5.png",
    "revision": "c5501bd27aebacbcbecf5a14ce04aad5"
  },
  {
    "url": "/movie-app/icon_384x384.4e0578167b09ec7162a227b4bcef8069.png",
    "revision": "4e0578167b09ec7162a227b4bcef8069"
  },
  {
    "url": "/movie-app/icon_512x512.2c2f24f2d3506892e495262784ce51ac.png",
    "revision": "2c2f24f2d3506892e495262784ce51ac"
  },
  {
    "url": "/movie-app/icon_96x96.b4688a0a2ebbac3362bcae2a820070fc.png",
    "revision": "b4688a0a2ebbac3362bcae2a820070fc"
  },
  {
    "url": "/movie-app/index.html",
    "revision": "ce605d65a75167922b70815deb279313"
  },
  {
    "url": "/movie-app/vendor.67fd3.bundle.js",
    "revision": "c1bf3fa8fa2eee5f26f096e727d9eb1a"
  },
  {
    "url": "/movie-app/workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);