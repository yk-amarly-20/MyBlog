// next.config.js
const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });
const repoName = "MyBlog";
const isProd = process.env.NODE_ENV === "production";

module.exports = withMDX({
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
    loader: "akamai",
    path: isProd ? `/${repoName}/_next/image` : "/_next/image",
  },
});
