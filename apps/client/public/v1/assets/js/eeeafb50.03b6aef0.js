"use strict";
(self.webpackChunkdocumentation = self.webpackChunkdocumentation || []).push([
  [604],
  {
    3853: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => l,
          contentTitle: () => o,
          default: () => u,
          frontMatter: () => n,
          metadata: () => s,
          toc: () => c,
        });
      var i = r(4848),
        a = r(8453);
      const n = { title: "Filecoin Retrieval", sidebar_position: 3 },
        o = "Data Retrieval",
        s = {
          id: "how-to/filecoin-retrieval",
          title: "Filecoin Retrieval",
          description:
            "We're enhancing data retrieval from NFT.Storage through collaboration with our Storage Providers to facilitate access via IPFS, a part of the decentralized IPFS network. This IPFS public gateway is currently under development to support efficient data retrieval. In the meantime, it's accessible for experimental use at IPFS.",
          source: "@site/docs/how-to/filecoin-retrieval.md",
          sourceDirName: "how-to",
          slug: "/how-to/filecoin-retrieval",
          permalink: "/v1/docs/how-to/filecoin-retrieval",
          draft: !1,
          unlisted: !1,
          tags: [],
          version: "current",
          sidebarPosition: 3,
          frontMatter: { title: "Filecoin Retrieval", sidebar_position: 3 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Token Status Check",
            permalink: "/v1/docs/how-to/status-check",
          },
          next: {
            title: "Client libraries",
            permalink: "/v1/docs/category/client-libraries",
          },
        },
        l = {},
        c = [
          {
            value: "1. Less Frequent Retrievals",
            id: "1-less-frequent-retrievals",
            level: 3,
          },
          {
            value: "2. Frequent, Day-to-Day Retrievals",
            id: "2-frequent-day-to-day-retrievals",
            level: 3,
          },
        ];
      function d(e) {
        const t = {
          a: "a",
          h1: "h1",
          h3: "h3",
          p: "p",
          ...(0, a.R)(),
          ...e.components,
        };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(t.h1, {
              id: "data-retrieval",
              children: "Data Retrieval",
            }),
            "\n",
            (0, i.jsxs)(t.p, {
              children: [
                "We're enhancing data retrieval from NFT.Storage through collaboration with our Storage Providers to facilitate access via ",
                (0, i.jsx)(t.a, { href: "https://ipfs.io", children: "IPFS" }),
                ", a part of the decentralized IPFS network. This IPFS public gateway is currently under development to support efficient data retrieval. In the meantime, it's accessible for experimental use at ",
                (0, i.jsx)(t.a, {
                  href: "https://ipfs.io/ipfs/YOUR_CID",
                  children: "IPFS",
                }),
                ".",
              ],
            }),
            "\n",
            (0, i.jsx)(t.h1, {
              id: "retrieval-options",
              children: "Retrieval Options",
            }),
            "\n",
            (0, i.jsx)(t.h3, {
              id: "1-less-frequent-retrievals",
              children: "1. Less Frequent Retrievals",
            }),
            "\n",
            (0, i.jsxs)(t.p, {
              children: [
                "For less frequent retrievals, you can get your content directly from ",
                (0, i.jsx)(t.a, {
                  href: "https://docs.filecoin.io/basics/how-retrieval-works/basic-retrieval",
                  children: "Lassie",
                }),
                " which is a retrieval client for IPFS and Filecoin.",
              ],
            }),
            "\n",
            (0, i.jsx)(t.h3, {
              id: "2-frequent-day-to-day-retrievals",
              children: "2. Frequent, Day-to-Day Retrievals",
            }),
            "\n",
            (0, i.jsxs)(t.p, {
              children: [
                "For more consistent, day-to-day retrieval needs, the IPFS.io gateway may not be suitable due to varying reliability. For a more suitable frequent retrieval use case, we ",
                (0, i.jsx)(t.a, {
                  href: "https://nft.storage/blog/onboard-nft-data-to-ipfs",
                  children: "recommend considering one of these options",
                }),
              ],
            }),
          ],
        });
      }
      function u(e = {}) {
        const { wrapper: t } = { ...(0, a.R)(), ...e.components };
        return t
          ? (0, i.jsx)(t, { ...e, children: (0, i.jsx)(d, { ...e }) })
          : d(e);
      }
    },
    8453: (e, t, r) => {
      r.d(t, { R: () => o, x: () => s });
      var i = r(6540);
      const a = {},
        n = i.createContext(a);
      function o(e) {
        const t = i.useContext(n);
        return i.useMemo(
          function () {
            return "function" == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e],
        );
      }
      function s(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? "function" == typeof e.components
              ? e.components(a)
              : e.components || a
            : o(e.components)),
          i.createElement(n.Provider, { value: t }, e.children)
        );
      }
    },
  },
]);
