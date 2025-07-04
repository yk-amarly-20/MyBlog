(self.__BUILD_MANIFEST = (function (s, e, a, t, c) {
  return {
    __rewrites: { afterFiles: [], beforeFiles: [], fallback: [] },
    __routerFilterStatic: {
      numItems: 0,
      errorRate: 1e-4,
      numBits: 0,
      numHashes: t,
      bitArray: [],
    },
    __routerFilterDynamic: {
      numItems: s,
      errorRate: 1e-4,
      numBits: s,
      numHashes: t,
      bitArray: [],
    },
    "/": [
      e,
      c,
      "static/css/98a9e24ac1cac23f.css",
      "static/chunks/pages/index-bcfa04472ca1aa7c.js",
    ],
    "/404": ["static/chunks/pages/404-cbdb2e9b2424ced3.js"],
    "/_error": ["static/chunks/pages/_error-869b60de143d223e.js"],
    "/articles/[slug]": [
      "static/chunks/5db7a30b-cc577b4ecf42a1d4.js",
      e,
      "static/chunks/394-769f9ec58698b5fe.js",
      "static/css/f6a33fefd9847fc5.css",
      "static/chunks/pages/articles/[slug]-ede425f4c0caac0b.js",
    ],
    "/tags/[tagName]": [
      e,
      c,
      "static/css/6c00f5b3697f3782.css",
      "static/chunks/pages/tags/[tagName]-ba237b7283f9e975.js",
    ],
    sortedPages: ["/", "/404", "/_app", "/_error", "/articles/[slug]", "/tags/[tagName]"],
  };
})(
  0,
  "static/chunks/150-a06d12d528e0a215.js",
  1e-4,
  NaN,
  "static/chunks/778-19980cd5e39a89ff.js",
)),
  self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
