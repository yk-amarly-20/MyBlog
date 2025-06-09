(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [531],
  {
    8083: (e, t, s) => {
      "use strict";
      s.d(t, { b: () => r });
      var n = s(37876),
        i = s(71271),
        a = s.n(i);
      let r = e =>
        (0, n.jsxs)("div", {
          className: a().root,
          children: [
            (0, n.jsx)("div", { className: a().icon, children: e.icon }),
            (0, n.jsx)("div", { className: a().children, children: e.children }),
          ],
        });
    },
    32200: (e, t, s) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/articles/[slug]",
        function () {
          return s(49154);
        },
      ]);
    },
    38599: e => {
      e.exports = {
        layout: "ContentsLayout_layout__SN3HZ",
        contents: "ContentsLayout_contents__9eBSO",
        sidemenuContainer: "ContentsLayout_sidemenuContainer__uHw0a",
        sidemenu: "ContentsLayout_sidemenu__jckjS",
        aboutme: "ContentsLayout_aboutme__LDJfw",
        otherMenu: "ContentsLayout_otherMenu__ZtAIx",
        sidemenuOpenButton: "ContentsLayout_sidemenuOpenButton__TYei4",
        menuIcon: "ContentsLayout_menuIcon__WgoMS",
        sidemenuOpen: "ContentsLayout_sidemenuOpen__oEAXR",
        showSidemenuOpenButton: "ContentsLayout_showSidemenuOpenButton__kFhup",
      };
    },
    41524: (e, t, s) => {
      "use strict";
      s.d(t, { n: () => r });
      var n = s(37876),
        i = s(44493),
        a = s(36602);
      let r = e => {
        let t = (0, i.A)(e.timestamp);
        return (0, n.jsx)("time", {
          dateTime: e.timestamp,
          className: e.className,
          children: (0, a.A)(t, "yyyy/MM/dd HH:mm"),
        });
      };
    },
    41735: e => {
      e.exports = {
        root: "TagsWithIcon_root__OKGsm",
        icon: "TagsWithIcon_icon__Czn2P",
        tags: "TagsWithIcon_tags__6LSfV",
        tag: "TagsWithIcon_tag__mBuq5",
      };
    },
    44753: e => {
      e.exports = { markdownBody: "MarkdownRenderer_markdownBody__8mQRT" };
    },
    49154: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { __N_SSG: () => q, default: () => Y });
      var n = s(37876),
        i = s(14232),
        a = s(84914),
        r = s(93487),
        c = s.n(r),
        l = s(78631),
        o = s.n(l),
        d = s(47631),
        m = s(5e4);
      let _ = e => (0, n.jsx)(d.g, { className: e.className, icon: m.ITF });
      var u = s(8083);
      let h = e =>
          (0, n.jsxs)("div", {
            children: [
              (0, n.jsx)("div", {
                className: o().title,
                children: (0, n.jsx)(u.b, {
                  icon: (0, n.jsx)(_, { className: o().icon }),
                  children: "Table of Contents",
                }),
              }),
              (0, n.jsx)("div", {
                className: o().toc,
                children: (0, n.jsx)(c(), {
                  renderers: { list: j, listItem: p, link: x },
                  children: e.tocMdText,
                }),
              }),
            ],
          }),
        x = e => (0, n.jsx)("a", { ...e, className: o().link }),
        j = e => (0, n.jsx)("ul", { className: o().list, children: e.children }),
        p = e => (0, n.jsx)("li", { className: o().listItem, children: e.children });
      var N = s(49991),
        g = s.n(N),
        v = s(62426),
        y = s.n(v),
        b = s(69085),
        w = s(80825),
        k = s(44753),
        T = s.n(k),
        f = s(50553);
      let I = e => {
          let { children: t } = e;
          return (0, n.jsx)("div", {
            className: T().markdownBody,
            children: (0, n.jsx)(c(), {
              allowDangerousHtml: !0,
              plugins: [g(), y()],
              renderers: { link: A, heading: M, code: L },
              children: t,
            }),
          });
        },
        A = e => {
          let { children: t, href: s } = e;
          return s
            ? s.startsWith("#") || s.startsWith("/") || s.includes("stin.ink")
              ? (0, n.jsx)("a", { href: s, children: t })
              : (0, n.jsx)(f.G, { href: s, children: t })
            : (0, n.jsxs)("span", { children: ["(href 忘れてるかも)", t] });
        },
        M = e => i.createElement("h".concat(e.level), { id: e.node.data.id }, e.children),
        C = b.A,
        L = e => {
          var t;
          return (0, n.jsx)(C, {
            language: null != (t = e.language) ? t : void 0,
            style: w.VI,
            children: e.value,
          });
        };
      var O = s(76827),
        S = s(68258),
        E = s(93200),
        H = s(50134),
        B = s.n(H);
      let D = e => {
        let { article: t } = e;
        return (0, n.jsxs)("div", {
          className: B().root,
          children: [
            (0, n.jsx)("h1", { className: B().title, children: t.matter.title }),
            (0, n.jsx)(E.t, { tags: t.matter.tags }),
            (0, n.jsx)(O.e, { timestamp: t.matter.createdAt }),
            t.matter.updatedAt && (0, n.jsx)(S.D, { timestamp: t.matter.updatedAt }),
          ],
        });
      };
      var F = s(51283),
        G = s.n(F),
        W = s(89851);
      let P = e => (0, n.jsx)(d.g, { className: e.className, icon: W.Vz1 }),
        R = e => {
          let { article: t } = e;
          return (0, n.jsxs)(a.h, {
            sidemenu: (0, n.jsx)(h, { tocMdText: t.tocMdText }),
            children: [
              (0, n.jsx)(D, { article: t.header }),
              (0, n.jsx)("article", {
                className: G().article,
                children: (0, n.jsx)(I, { children: t.bodyMdText }),
              }),
              (0, n.jsx)("div", {
                className: G().articleFooter,
                children: (0, n.jsxs)(f.G, {
                  className: G().githubLink,
                  href: "https://github.com/yk-amarly-20",
                  children: [
                    (0, n.jsx)(P, { className: G().githubIcon }),
                    " 質問、修正リクエストはGitHubまで",
                  ],
                }),
              }),
            ],
          });
        };
      var X = s(93037),
        q = !0;
      function Y(e) {
        let { article: t } = e;
        return (0, n.jsxs)(n.Fragment, {
          children: [
            (0, n.jsx)(X.k, {
              title: t.header.matter.title,
              description: t.header.excerpt,
            }),
            (0, n.jsx)(R, { article: t }),
          ],
        });
      }
    },
    50134: e => {
      e.exports = {
        root: "ArticleHeader_root__mjwJx",
        title: "ArticleHeader_title__Yh6Ag",
      };
    },
    51283: e => {
      e.exports = {
        line: "Article_line__MGLPk",
        article: "Article_article__2v2gr",
        articleFooter: "Article_articleFooter__IDKpe",
        githubLink: "Article_githubLink__Iwmhn",
        githubIcon: "Article_githubIcon__E8D4X",
      };
    },
    59171: (e, t, s) => {
      "use strict";
      s.d(t, { F: () => r });
      var n = s(37876),
        i = s(47631),
        a = s(5e4);
      let r = e => (0, n.jsx)(i.g, { className: e.className, icon: a.CYF });
    },
    61962: e => {
      e.exports = {
        icon: "AboutMe_icon__plH03",
        wrapper: "AboutMe_wrapper__OTjD3",
        aboutme: "AboutMe_aboutme__tpvWO",
        avatar: "AboutMe_avatar___ys0V",
        biography: "AboutMe_biography__EUP2X",
        linkIcon: "AboutMe_linkIcon__fQ78R",
      };
    },
    68258: (e, t, s) => {
      "use strict";
      s.d(t, { D: () => d });
      var n = s(37876),
        i = s(41524),
        a = s(47631),
        r = s(5e4);
      let c = e => (0, n.jsx)(a.g, { className: e.className, icon: r.Int });
      var l = s(70823),
        o = s.n(l);
      let d = e =>
        (0, n.jsxs)("div", {
          className: o().root,
          children: [
            (0, n.jsx)(c, { className: o().icon }),
            (0, n.jsx)(i.n, { timestamp: e.timestamp, className: o().datetime }),
          ],
        });
    },
    70823: e => {
      e.exports = {
        root: "Date_root__IZtIX",
        icon: "Date_icon__P__n1",
        datetime: "Date_datetime__4voxM",
      };
    },
    71271: e => {
      e.exports = {
        root: "SideMenuTitle_root__lGDHp",
        icon: "SideMenuTitle_icon__9JKgj",
        children: "SideMenuTitle_children__gpH_2",
      };
    },
    76827: (e, t, s) => {
      "use strict";
      s.d(t, { e: () => d });
      var n = s(37876),
        i = s(41524),
        a = s(70823),
        r = s.n(a),
        c = s(47631),
        l = s(19637);
      let o = e => (0, n.jsx)(c.g, { className: e.className, icon: l.a$ }),
        d = e =>
          (0, n.jsxs)("div", {
            className: r().root,
            children: [
              (0, n.jsx)(o, { className: r().icon }),
              (0, n.jsx)(i.n, { timestamp: e.timestamp, className: r().datetime }),
            ],
          });
    },
    78631: e => {
      e.exports = {
        title: "Toc_title__CKNc4",
        icon: "Toc_icon__uFqMe",
        toc: "Toc_toc__mgO90",
        list: "Toc_list__N0nA7",
        link: "Toc_link__mcopT",
      };
    },
    84914: (e, t, s) => {
      "use strict";
      s.d(t, { h: () => g });
      var n = s(37876),
        i = s(14232),
        a = s(15039),
        r = s.n(a),
        c = s(61962),
        l = s.n(c),
        o = s(50553),
        d = s(70698),
        m = s(47631),
        _ = s(5e4);
      let u = e => (0, n.jsx)(m.g, { className: e.className, icon: _.YHM });
      var h = s(8083);
      let x = () =>
          (0, n.jsxs)("div", {
            children: [
              (0, n.jsx)(h.b, {
                icon: (0, n.jsx)(u, { className: l().icon }),
                children: "About Me",
              }),
              (0, n.jsx)("div", {
                className: l().wrapper,
                children: (0, n.jsxs)("div", {
                  className: l().aboutme,
                  children: [
                    (0, n.jsx)("img", {
                      src: "/Images/Yuto.jpg",
                      className: l().avatar,
                      alt: "avatar",
                    }),
                    (0, n.jsxs)("div", {
                      className: l().biography,
                      children: [
                        (0, n.jsx)("p", { children: "コジコジ" }),
                        (0, n.jsx)("p", { children: "ソフトウェアエンジニア" }),
                        (0, n.jsx)("p", {
                          children: (0, n.jsxs)(o.G, {
                            href: "https://github.com/yk-amarly-20",
                            children: [
                              "Github ",
                              (0, n.jsx)(d.q, { className: l().linkIcon }),
                            ],
                          }),
                        }),
                        (0, n.jsx)("p", {
                          children: (0, n.jsxs)(o.G, {
                            href: "https://twitter.com/yk_Amarly_20",
                            children: [
                              "Twitter ",
                              (0, n.jsx)(d.q, { className: l().linkIcon }),
                            ],
                          }),
                        }),
                        (0, n.jsx)("p", {
                          children: (0, n.jsxs)(o.G, {
                            href: "https://yk-amarly-20.github.io/portfolio/",
                            children: [
                              "Portfolio ",
                              (0, n.jsx)(d.q, { className: l().linkIcon }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        j = e => (0, n.jsx)(m.g, { className: e.className, icon: _.ckx });
      var p = s(38599),
        N = s.n(p);
      let g = e => {
        let [t, s] = i.useState(!1),
          a = i.useRef(null),
          c = (function (e) {
            let [t, s] = i.useState(!1);
            return (
              i.useEffect(() => {
                let n = e.current;
                if (null === n) return;
                let i = () => {
                  (function (e) {
                    let t = e.getBoundingClientRect(),
                      s = window.innerHeight || document.documentElement.clientHeight,
                      n = window.innerWidth || document.documentElement.clientWidth;
                    t.top < s && t.left < n && t.bottom > 0 && t.right;
                  })(n),
                    s(t);
                };
                return (
                  window.addEventListener("scroll", i),
                  i(),
                  () => window.removeEventListener("scroll", i)
                );
              }, []),
              t
            );
          })(a);
        return (0, n.jsxs)("div", {
          ref: a,
          className: N().layout,
          children: [
            (0, n.jsx)("div", { className: N().contents, children: e.children }),
            (0, n.jsx)("div", {
              className: r()(N().sidemenuContainer, t && N().sidemenuOpen),
              children: (0, n.jsxs)("div", {
                className: N().sidemenu,
                children: [
                  (0, n.jsx)("div", {
                    className: N().aboutme,
                    children: (0, n.jsx)(x, {}),
                  }),
                  (0, n.jsx)("div", { className: N().otherMenu, children: e.sidemenu }),
                ],
              }),
            }),
            (0, n.jsx)("button", {
              className: r()(N().sidemenuOpenButton, c && N().showSidemenuOpenButton),
              onClick: () => s(e => !e),
              children: (0, n.jsx)(j, { className: N().menuIcon }),
            }),
          ],
        });
      };
    },
    93037: (e, t, s) => {
      "use strict";
      s.d(t, { k: () => c });
      var n = s(37876),
        i = s(77328),
        a = s.n(i);
      let r = { siteTitle: "kojikoji's blog", social: { twitter: "@yk_amarly_20" } },
        c = e => {
          let { title: t, description: s } = e,
            i = r.siteTitle;
          return (0, n.jsxs)(a(), {
            children: [
              (0, n.jsx)("title", { children: "".concat(t, " | ").concat(i) }),
              (0, n.jsx)("meta", { name: "description", content: s }),
              (0, n.jsx)("meta", { property: "og:type", content: "website" }),
              (0, n.jsx)("meta", { property: "og:title", content: t }),
              s && (0, n.jsx)("meta", { property: "og:description", content: s }),
              (0, n.jsx)("meta", { property: "og:site_name", content: i }),
              (0, n.jsx)("meta", { property: "twitter:card", content: "summary" }),
              (0, n.jsx)("meta", {
                property: "twitter:creator",
                content: r.social.twitter,
              }),
              (0, n.jsx)("meta", { property: "twitter:title", content: t }),
              s && (0, n.jsx)("meta", { property: "twitter:description", content: s }),
            ],
          });
        };
    },
    93200: (e, t, s) => {
      "use strict";
      s.d(t, { t: () => d });
      var n = s(37876),
        i = s(14232),
        a = s(48230),
        r = s.n(a),
        c = s(59171),
        l = s(41735),
        o = s.n(l);
      let d = e => {
        let { tags: t } = e;
        return (0, n.jsxs)("div", {
          className: o().root,
          children: [
            (0, n.jsx)(c.F, { className: o().icon }),
            (0, n.jsx)("p", {
              className: o().tags,
              children: t.map((e, s) =>
                (0, n.jsxs)(
                  i.Fragment,
                  {
                    children: [
                      (0, n.jsx)(r(), {
                        href: "/tags/".concat(e),
                        children: (0, n.jsx)("a", { className: o().tag, children: e }),
                      }),
                      s !== t.length - 1 && (0, n.jsx)("span", { children: ", " }),
                    ],
                  },
                  s,
                ),
              ),
            }),
          ],
        });
      };
    },
  },
  e => {
    var t = t => e((e.s = t));
    e.O(0, [811, 150, 394, 636, 593, 792], () => t(32200)), (_N_E = e.O());
  },
]);
