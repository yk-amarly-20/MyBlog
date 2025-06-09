// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });

// module.exports = withMDX({
//   pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
// });

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const repoName = "YOUR_REPO_NAME"; // ← 実際のリポジトリ名に置き換えてください

module.exports = withMDX({
  // Next.js を静的エクスポートモードに
  output: "export",

  // GitHub Pages は /<repo>/ 以下にホストされるので、
  // HTML のリンク先やアセット読み込みにプレフィックスをつける
  assetPrefix: `/${repoName}/`,
  basePath: `/${repoName}`,

  // URL の末尾にスラッシュを付けて出力（GitHub Pages との相性が良い）
  trailingSlash: true,

  // もともとの拡張子設定はそのまま
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
