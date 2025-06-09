---
title: "React19の変更点"
createdAt: "2025-03-10T0002:53.325Z"
tags: ["React", "typescript"]
---

## はじめに

今回は React19 の update における変更点を書いていこうかと思います。
今回のアップデートはメジャーアップデートであり、非同期処理の簡易化やパフォーマンス向上に関する変更が多く含まれています。が、いくつか注意点もあるため残しておこうかと。

## 1. 主な新機能

### 1.1. Actions API による非同期フォーム処理・状態管理の簡易化

従来の React では、フォーム送信や非同期データ更新時にサーバーエラー・エラーハンドリング・ローディング状態・Optimistic UI などを手動で useState や useReducer を使って管理する必要がありました。React 19 では useTransition と組み合わせつつ、関数を直接 async にして「トランジション」内で実行するだけで、ペンディング・エラー・フォーム再描画・楽観的更新を自動で処理できる Actions API が導入されました。

以下は、ユーザー名更新フォームを Actions API で実装する例です。

```tsx
"use client";
import React, { FormEvent, useTransition } from "react";

// サーバーサイドで実際にユーザー名を更新するAction
export async function actionUpdateUserName(formData: FormData) {
  const name = formData.get("name") as string;
  // 実際にはFetchでAPIを呼び出して更新を行う
  const response = await fetch("/api/user/update-name", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("サーバーエラー：名前の更新に失敗しました。");
  }
  return await response.json();
}

export function UpdateNameForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        setError(null);
        // actionUpdateUserName はサーバーに送信して更新するAction
        await actionUpdateUserName(formData);
        // 更新後のロジック（例：ページリフレッシュやUIの更新）
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        新しい名前:
        <input name="name" defaultValue="" />
      </label>
      <button type="submit" disabled={isPending}>
        {isPending ? "更新中…" : "更新"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
```

上記では、startTransition 内で async な Action（actionUpdateUserName）を呼び出すだけで、isPending の状態制御やエラーキャッチ、再レンダリングなどが内部的に適切に処理されます。従来のようにローディングフラグやエラー状態を細かく手動制御する必要がなくなり、UI の一貫性が担保されます。

※ 注意点

- startTransition 内でエラーを catch しなかった場合、全体の UI が「エラーバウンダリ」にフォールバックしてしまう恐れがあります。必ず適切に try/catch し、ユーザーへフィードバックを返すことが推奨されます

### 1.2. サーバーコンポーネントの強化

React 18 で導入された Server Components は、クライアントに不要なバンドルを送らずにサーバー側でレンダリングを完結させ、必要な部分のみをクライアントに配信できる仕組みです。React 19 では、この Server Components がさらに安定化し、完全な構文・API サポートが整備されました。

```tsx
// components/UserProfile.server.tsx
import React from "react";
import { fetchUserById } from "~/lib/user";

type UserProfileProps = { userId: string };

// Server Component: サーバー上でのみ実行される
export default async function UserProfile({ userId }: UserProfileProps) {
  const user = await fetchUserById(userId);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>メールアドレス: {user.email}</p>
    </div>
  );
}
```

```tsx
// app/page.tsx (React 19ではappディレクトリを利用したルーティングが標準化)
import React from "react";
import UserProfile from "../components/UserProfile.server";

export default function Page() {
  // ここではサーバーコンポーネントをネスト可能
  return (
    <html lang="ja">
      <head>
        <title>ユーザープロファイル</title>
      </head>
      <body>
        {/* userIdは必要に応じてサーバー側で取得 */}
        <UserProfile userId="12345" />
      </body>
    </html>
  );
}
```

上記サンプルでは、UserProfile.server.tsx がサーバーコンポーネントとして認識され、ビルド時にクライアント向けバンドルには含まれません。これによりクライアントのバンドルサイズ削減と、データ取得の直観的な実装が可能になります。

※ 注意点

- ファイル名の末尾に .server.tsx を付与すると自動的にサーバーコンポーネントと見なされますが、明示的にファイル冒頭で 'use server' / 'use client' を指定することも可能です。どちらか一方で統一しておかないと、バンドルサイズの増加や意図しないクライアントバンドル混入が発生する場合があります

### 1.3. 新規フック群の追加と詳細

#### 1.3.1. `useActionState`

Actions API で実行される非同期アクションの状態（ペンディング・エラーなど）を取得するためのフックです。useTransition だけではひとまとめに「トランジション中」か否かしか分かりませんが、useActionState を使うと、どの Action が現在実行中か、エラーだったかといった詳細を得られます。

```tsx
"use client";
import React from "react";
import { useActionState, useTransition } from "react";
import { actionSubmitForm } from "../actions/formActions";

export function FormComponent() {
  const [isPending, startTransition] = useTransition();
  const actionState = useActionState(actionSubmitForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    startTransition(() => actionSubmitForm(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="field1" />
      <button type="submit" disabled={isPending}>
        送信
      </button>
      {actionState.isPending && <p>送信中です…</p>}
      {actionState.error && <p style={{ color: "red" }}>{actionState.error.message}</p>}
    </form>
  );
}
```

#### 1.3.1 useFormStatus

フォームを送信した結果、サーバーサイドでのバリデーションエラーなどをクライアント側で受け取り、フォームに反映するためのフックです。例えば、一括で返却されるバリデーションエラーメッセージを特定のフォームフィールドに紐づけて表示するといった場合に有用です。

```tsx
"use client";
import React from "react";
import { useFormStatus } from "react";
import { actionRegisterUser } from "../actions/registerActions";

export function RegisterForm() {
  const formStatus = useFormStatus(actionRegisterUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await actionRegisterUser(formData);
    } catch {
      // 例：サーバー側で { email: '既に使用されています', password: '8文字以上必要です' } が返ってくる
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Eメール:
        <input name="email" />
        {formStatus.errors?.email && <p>{formStatus.errors.email}</p>}
      </label>
      <label>
        パスワード:
        <input type="password" name="password" />
        {formStatus.errors?.password && <p>{formStatus.errors.password}</p>}
      </label>
      <button type="submit">登録</button>
    </form>
  );
}
```

### 1.4. React Compiler

React 19 では、React Compiler と呼ばれる新しいビルド時最適化ツールが導入されました。これにより、以下のような効果が得られます：

- 再レンダリングの不要な発生を抑制（自動的に useMemo や useCallback 相当の最適化を適用）
- フラグメントのマージ、コンポーネント切り出しなどの軽量化
- ビルド出力の圧縮やデッドコード削除の強化
  これらの最適化は、開発者が明示的に手を加えることなく、React の構文木を解析して自動的に適用されるため、コードの可読性を保ちつつパフォーマンスを向上できます

※ 注意点もあります

- `互換性`：一部の Babel プラグインやカスタムトランスフォーマーと競合する可能性があります。React Compiler を導入する場合は、既存のビルド設定を見直し、テストを十分に行う必要があります。

- `手動での最適化が不要になるわけではない`：React Compiler は多くの最適化を自動化しますが、すべてのケースで最適なパフォーマンスを保証するわけではありません。依然として、重い計算処理やカスタムフックでの最適化は開発者の責任範囲です

## 2. パフォーマンスと最適化に関する改善

### 2.1. Concurrent Rendering のさらなる強化

React 19 では、並行レンダリング（Concurrent Rendering）の仕組みがアップデートされ、より一貫性のあるプリエンプティブレンダリングが可能になりました。これにより、以下のように改善されます。

`UIスレッドのブロッキング低減`：重い計算を挟んでもユーザー操作やアニメーションを優先的に処理し、インタラクティブ性を維持する

- `優先度付き更新`：ユーザー入力やアンカー遷移など高優先度の更新を即時に反映し、低優先度タスク（データ読み込みなど）を背景で進める
  - 特に、useDeferredValue や useTransition と組み合わせることで、遷移時のジャンクを大幅に削減できます

## 2.2. 自動バッチ処理（Automatic Batching）の標準化

React 18 で導入された自動バッチ処理は、イベントハンドラや非同期コールバック内での setState を 1 つの再レンダリングにまとめる機能です。React 19 ではこれがさらに強化され、Promise 内部や setTimeout 内での状態更新もバッチ対象になります。したがって、以下のようなケースでも無駄な再レンダリングを防ぎます

```tsx
"use client";
import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // React 19ではこれら3回のsetCountが1回の再レンダリングにまとめられる
    setCount(c => c + 1);
    setCount(c => c + 1);
    setTimeout(() => setCount(c => c + 1), 0);
  };

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button onClick={handleClick}>増加</button>
    </div>
  );
}
```
