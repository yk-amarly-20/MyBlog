---
title: "Ktorでテスト書く"
createdAt: "2021-07-19T0001:54.325Z"
tags: ["Kotlin", "Ktor"]
---

## Ktor とは

最近業務で Ktor 使ってて、割とハマってる民です。Ktor は Kotlin 向けの Web サーバーサイドフレームワークで、サーバーサイド Kotlin のフレームワークとしては他に Spring boot が有名ですね。  
Ktor は Spring boot に比べて軽量で、カスタマイズがしやすいのが特徴です。Spring はアノテーションでいろいろよしなにやってくれるのがいいんですけど、僕は個人的にはプラモデル作ってる感覚になってあんま好きじゃないです(Ktor はレゴブロックみたいな感じ、~~伝われ~~)。  
ただ Ktor はドキュメントが結構貧弱なのが弱点で、ググってもあんまり欲しい情報が出てこない時しばしばあります。今回は、そんな Ktor のテストの書き方について備忘録的に残しとこうと思います。

## とりあえずみてみる

エンドポイントはこんな感じで。

```kotlin

package com.example.app

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing

fun Application.sample() {
    routing {
        get("/") {
            call.respondText("Hello!!")
        }
    }
}
```

まあかなり簡単な api ですが、get で Hello という文字列を返すようなエンドポイントです。
このテストケースは例えばこう書きます。

```kotlin
package test

import io.ktor.application.Application
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.withTestApplication
import org.junit.Test
import kotlin.test.assertEquals

class SampleTestCase {
    @Test
    fun testRoot() = withTestApplication(Application::sample) {
        handleRequest(HttpMethod.Get, "/").run {
            assertEquals("Hello", response.content)
        }
    }
}
```

こんな感じ。まあみたら大体わかると思います(雑)。今後 post のテストケースや細かい説明を追加していこうと思います。
