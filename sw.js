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
    "url": "/movie-app/app.4af73.bundle.js",
    "revision": "656978330e16cdf7a18d40472da3362d"
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
    "url": "/movie-app/icon_1024x1024.85d27851778e476d73282e8b13dbc57f.png",
    "revision": "85d27851778e476d73282e8b13dbc57f"
  },
  {
    "url": "/movie-app/icon_128x128.c621169ce721192c44169dd190c89346.png",
    "revision": "c621169ce721192c44169dd190c89346"
  },
  {
    "url": "/movie-app/icon_192x192.e19be56f59cee3fa623a06334978b332.png",
    "revision": "e19be56f59cee3fa623a06334978b332"
  },
  {
    "url": "/movie-app/icon_256x256.915b2ea2e8c1ca9d912afffbe118e841.png",
    "revision": "915b2ea2e8c1ca9d912afffbe118e841"
  },
  {
    "url": "/movie-app/icon_384x384.5f1139635eddd374e50e5bd1da7d3b3b.png",
    "revision": "5f1139635eddd374e50e5bd1da7d3b3b"
  },
  {
    "url": "/movie-app/icon_512x512.68fc669a904882b64d63250dcb6eb93d.png",
    "revision": "68fc669a904882b64d63250dcb6eb93d"
  },
  {
    "url": "/movie-app/icon_96x96.9c1d958a0fc4c74214c22e590d611b7b.png",
    "revision": "9c1d958a0fc4c74214c22e590d611b7b"
  },
  {
    "url": "/movie-app/index.html",
    "revision": "8c1ff0e75e15db181ee0921ed7065371"
  },
  {
    "url": "/movie-app/vendor.4af73.bundle.js",
    "revision": "c8b2738c1a3f23ac6fc21d33cff14d72"
  },
  {
    "url": "/movie-app/workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);