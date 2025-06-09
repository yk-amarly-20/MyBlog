(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [332],
  {
    16760: (e, s, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return t(90417);
        },
      ]);
    },
    90417: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { __N_SSG: () => u, default: () => c });
      var r = t(37876);
      t(14232);
      var _ = t(84914),
        n = t(3642),
        a = t(63062);
      let i = e => {
        let { articles: s, tags: t } = e;
        return (0, r.jsx)(_.h, {
          sidemenu: (0, r.jsx)(n.c, { tags: t }),
          children: (0, r.jsx)(a.R, { articles: s }),
        });
      };
      var l = t(93037),
        u = !0;
      let c = e => {
        let { articles: s, tags: t } = e;
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.k, { title: "TOP", description: "コジコジ ブログ" }),
            (0, r.jsx)(i, { articles: s, tags: t }),
          ],
        });
      };
    },
  },
  e => {
    var s = s => e((e.s = s));
    e.O(0, [150, 778, 636, 593, 792], () => s(16760)), (_N_E = e.O());
  },
]);
