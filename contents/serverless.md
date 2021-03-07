---
title: "Serverless Framework入門"
createdAt: "2021-03-01T16:09:43.525Z"
tags: ["AWS", "Node.js"]
imageUrl: /Images/serverless/serverless.png
---

## サーバーレスとは

サーバー"レス"っていうくらいですから、サーバーがなくてもアプリケーションを実行できる魔法の様な環境だと思いがちですが、
そんな物はありません。サーバーレスというのは、アプリケーション開発、運用側でサーバーの構築を行わなくても構築、保守は
提供元企業が全て行ってくれる、という仕組みです。運用側は一切サーバ構築、保守を行わなくてもよい、ということからサーバーレスと
呼ばれています。サーバーレスでは、AWS Lambda がかなり有名ですね。多くの企業がこういったサーバーレスを利用して自社アプリケーションの運用、開発などを行っていますが、
社内でのプロダクト、従業員が増えると用いる Lambda も増え、その管理が難しくなってきます。そういった際に便利なのがタイトルにもある"Serverless Framework"です。

## Serverless Framework

Serverless Framework(以下 Serverless)とは、サーバーレスなアプリケーションの開発を楽に開発するためのツールであり、node でインストールできます。
クラウドによらず利用することができ、言語もいくつか選択肢があります。
Serverless の、僕が思う最も大きな利点は「インフラをコードにまとめておけること」です。  
Serverless では Lambda をデプロイする際、yml ファイルに設定を書くのですが、この設定ファイルを利用することで、インフラの再利用性が上がります。AWS CLI の様に何度もデプロイ用の
スクリプトを書く必要性が減り、設定ファイルの記述量も少ないです。

では、Serverless の[チュートリアル](https://www.serverless.com/framework/docs/providers/aws/examples/hello-world/node/)をなぞって実装してみましょう。  
今回は Node.js を用いたチュートリアルを進めます。

### 準備(install, AWS 周り)

上でも述べた通り、Serverless は node 製のツールなので、node からインストールできます。

```shell
node install -g serverless
```

今回はクラウドサービスとして AWS Lambda を用いるので、AWS の IAM ユーザーを作成しておきましょう。  
管理ポリシーは「プログラムによるアクセス」及び"AdministratorAccess"を選んでください。

作成したら、アクセスキー、シークレットアクセスキーを取得して、serverless の config に設定します。

```shell
sls config credentials --provider aws --key アクセスキー --secret シークレットアクセスキー
```

これで大まかな準備は終わりです。

### Lambda の作成、デプロイ

ではいよいよ Lambda を作成して AWS Lambda にデプロイします。以下のコマンドを実行すると、Lambda Function の定義ファイルが作成されます。

```shell
sls create --template aws-nodejs --name myService --path myService
```

すると、作業ディレクトリが作成され、中に"handler.js"、"serverless.yml"が作成されたかと思います。  
handler.js が Lambda Function の実装、serverless.yml が Serverless の設定ファイルです。 ではこれをデプロイしてみます。

```shell
sls deploy
```

コンソールを見ると、Lambda が作成されていると思います。
この様にデプロイが非常に簡単なのも Serverless の利点です。

## References

1. チュートリアル https://www.serverless.com/framework/docs/providers/aws/examples/hello-world/node/
