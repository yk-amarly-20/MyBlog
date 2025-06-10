(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [207],
  {
    29521: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { __N_SSG: () => u, default: () => x });
      var a = t(37876),
        n = t(77328),
        r = t.n(n);
      t(14232);
      var i = t(63062),
        c = t(3642),
        l = t(84914),
        _ = t(56093),
        h = t.n(_);
      let d = e => {
        let { tagName: s, articles: t, tags: n } = e;
        return (0, a.jsxs)(l.h, {
          sidemenu: (0, a.jsx)(c.c, { tags: n }),
          children: [
            (0, a.jsxs)("h1", { className: h().heading, children: ["タグ指定: ", s] }),
            (0, a.jsx)(i.R, { articles: t }),
          ],
        });
      };
      var g = t(93037),
        u = !0;
      let x = e => {
        let { articles: s, tagName: t, tags: n } = e;
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(r(), {
              children: (0, a.jsxs)("title", { children: ["tag: ", t] }),
            }),
            (0, a.jsx)(g.k, {
              title: "tag: ".concat(t),
              description: '"'.concat(t, '" でタグ付けされた記事一覧'),
            }),
            (0, a.jsx)(d, { tagName: t, tags: n, articles: s }),
          ],
        });
      };
    },
    46306: (e, s, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/tags/[tagName]",
        function () {
          return t(29521);
        },
      ]);
    },
    56093: e => {
      e.exports = { heading: "ArticlesWithTags_heading__A26LI" };
    },
  },
  e => {
    var s = s => e((e.s = s));
    e.O(0, [150, 778, 636, 593, 792], () => s(46306)), (_N_E = e.O());
  },
]);
