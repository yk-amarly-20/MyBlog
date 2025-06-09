// next.config.js
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const repoName = "MyBlog";
const isProd = process.env.NODE_ENV === "production";

module.exports = withMDX({
  output: "export",
  // 本番ビルド時のみプレフィックスを付与
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : "",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // next/image を使っているなら
  images: {
    unoptimized: true,
    loader: "akamai",
    path: isProd ? `/${repoName}/_next/image` : "/_next/image",
  },
});
