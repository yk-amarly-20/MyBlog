// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });

// module.exports = withMDX({
//   pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
// });

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const repoName = "YOUR_REPO_NAME"; // ← GitHub リポジトリ名に置き換え

module.exports = withMDX({
  // 完全静的エクスポートモード
  output: "export",

  // ページ URL とアセット読み込みのプレフィックス
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,

  // out/<page>/index.html 形式で出力
  trailingSlash: true,

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
