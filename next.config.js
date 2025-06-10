// next.config.js
const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });
const repoName = "MyBlog";
const isProd = process.env.NODE_ENV === "production";

module.exports = withMDX({
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // 本番ビルド（= docs にコピーする out の生成）時だけ
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : "",

  // next/image を使っているなら…
  images: {
    unoptimized: true,
    loader: "akamai",
    path: isProd ? `/${repoName}/_next/image` : "/_next/image",
  },
});
