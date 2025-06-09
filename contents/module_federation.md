---
title: "マイクロフロントエンド（Module Federation）とReact"
createdAt: "2024-06-23T0004:54.325Z"
tags: ["React", "typescript"]
---

## 1. はじめに

今回はフロントエンド関連で新たに知った知見をば。
大規模なフロントエンドを複数チームで開発・デプロイしたい場合、マイクロフロントエンド（Micro-Frontends）が有効です。バックエンドのマイクロサービスと同様に、フロント側も機能ごとに独立したアプリケーションとして分割し、それらを統合するアーキテクチャです。
最近は Webpack 5 に標準搭載された Module Federation を利用することで、ランタイムで別アプリのビルド成果物を動的にロードできるようになり、マイクロフロントエンド実装が飛躍的に簡単になりました。本稿では、React を例にホスト（Shell）／リモート（Remote）構成を一から構築する手順を解説します

## 2. Module Federation の概要

Module Federation は、以下を可能にする機能です。

- Remote アプリケーションがエクスポートしたモジュールを、
- Host アプリケーションから動的にインポート
- しかもビルドバンドルには含めずに、ランタイムでフェッチ

これにより、各チームが独立リリースしたアプリをホスト側がシームレスに組み込めます。

```scss
┌─────────┐      ┌──────────┐
│ RemoteA │      │ Remote B │
│ (federated)    │ (federated)
└─────┬───┘      └───┬──────┘
      │                │
      │ expose         │ expose
      ▼                ▼
┌────────────────────────────────┐
│            Host App           │
│  import("remoteA/Button")     │
│  import("remoteB/Header")     │
└────────────────────────────────┘
```

## 3. プロジェクト構成例

```css
/mf-shell/      ← ホストアプリ (Host)
/mf-remote-header/ ← リモートアプリ A (Header)
/mf-remote-button/ ← リモートアプリ B (Button)

```

各フォルダで npm init → 必要パッケージをインストールする。

## 4. Remote(A)：Header アプリのセットアップ

### 4.1 webpack.config.ts

```ts
// mf-remote-header/webpack.config.ts
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, container } from "webpack";
const { ModuleFederationPlugin } = container;

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { publicPath: "auto" }, // npm run start 時に http://localhost:3001/ が使われます
  devServer: { port: 3001 },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react", "@babel/preset-typescript"] },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "headerApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/components/Header.tsx",
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, eager: false, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};

export default config;
```

### src/components/Header.tsx

```tsx
import React, { FC } from "react";

export const Header: FC = () => (
  <header style={{ background: "#282c34", padding: "1rem", color: "#fff" }}>
    <h1>マイクロフロントエンド Header</h1>
  </header>
);
```

### 4.3 src/index.tsx

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Header />);
}
```

## 5. Remote(B)：Button アプリのセットアップ

### 5.1 webpack.config.ts

```tsx
// mf-remote-button/webpack.config.ts
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, container } from "webpack";
const { ModuleFederationPlugin } = container;

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { publicPath: "auto" },
  devServer: { port: 3002 },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react", "@babel/preset-typescript"] },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "buttonApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};

export default config;
```

### 5.2 src/components/Button.tsx

```tsx
import React, { FC, ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button style={{ padding: "0.5rem 1rem", fontSize: "1rem" }} onClick={onClick}>
    {children}
  </button>
);
```

### 5.3 src/index.tsx

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";

const App: React.FC = () => {
  const handleClick = () => console.log("clicked");
  return <Button onClick={handleClick}>Remote Button</Button>;
};

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<App />);
}
```

## 6. Host：Shell アプリのセットアップ

### 6.1 webpack.config.ts

```tsx
// mf-shell/webpack.config.ts
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, container } from "webpack";
const { ModuleFederationPlugin } = container;

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: { publicPath: "auto" },
  devServer: { port: 3000 },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react", "@babel/preset-typescript"] },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shellApp",
      remotes: {
        headerApp: "headerApp@http://localhost:3001/remoteEntry.js",
        buttonApp: "buttonApp@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};

export default config;
```

### 6.2 src/App.tsx

```tsx
import React, { Suspense, useState, FC } from "react";

// リモートコンポーネントを動的インポート
const Header = React.lazy(() => import("headerApp/Header"));
const Button = React.lazy(() => import("buttonApp/Button"));

export const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>

      <main style={{ padding: "1rem" }}>
        <p>クリック数：{count}</p>
        <Suspense fallback={<div>Loading Button...</div>}>
          <Button onClick={() => setCount(c => c + 1)}>Increment</Button>
        </Suspense>
      </main>
    </>
  );
};
```

### 6.3 src/index.tsx

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<App />);
}
```

## 7. 図解：リモート読み込みの流れ

```text
[ Shell (3000) ]
    │
    │ import('headerApp/Header')
    │──────────►
    │           fetch ─────────────▶ http://localhost:3001/remoteEntry.js
    │           evaluate RemoteA   ▶ URL埋め込み
    │◀────────── resolve Module
    ▼
  Header コンポーネントをレンダリング
```

## 8. 共有依存性（Shared Modules）の管理

- singleton 設定で React の複数バージョン共存を防止
- 必要に応じて eager: true や requiredVersion を追加し、確実に同一バージョンをロード

```js
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
}
```

## 9. ビルド＆起動

各フォルダで以下を実行

```bash
# 各リモートを起動
cd mf-remote-header && npm run start
cd mf-remote-button && npm run start

# Host を起動
cd mf-shell && npm run start
```

ブラウザで http://localhost:3000 を開くと、リモートコンポーネントが統合された UI が見える。

## 10. CI/CD・デプロイ戦略

1. 各リモートを独立ビルド → S3／CDN へ remoteEntry.js をアップ

2. ホストアプリは環境変数 でリモート URL を切り替え

3. バージョンタグとキャッシュバスティング（例：remoteEntry.[hash].js）を併用

## 11. まとめ

- Module Federation でマイクロフロントエンドが容易に実現

- リモート単位で独立デプロイ → チームのスループット向上

- shared 設定で依存性コンフリクトを回避

- CI/CD を工夫して運用コストを最小化
