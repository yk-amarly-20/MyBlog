---
title: "DDDについて（3）"
createdAt: "2021-10-20T0001:54.325Z"
tags: ["DDD", "Kotlin"]
---

## 1. Entity について

### 1.1 基本的な定義

Entity は、ドメインにおいて「識別可能（Identity） なオブジェクト」です。
重要なのは「ID を持ち、同じ ID であれば属性が変わっても同じ存在だとみなす」点です。
さらに、エンティティは ドメインの振る舞いを持つ リッチモデルとして実装されることが望ましく、単にデータを保持するだけでなく、ビジネスルールをメソッドとして内包します。

### 1.2 VO との違い

- VO（Value Object）

  - 識別子を持たず、属性のすべてが同一なら同一性を判断する。

  - 不変（Immutable）であることが基本。

- Entity（エンティティ）

  - 一意の識別子（ID）を持つ。

  - 属性値が変わっても同一性は ID で判断。

## 2. 識別子（ID）の扱い

### 2.1 識別子を VO として扱う

data class を使うと、equals / hashCode / toString が自動生成されるため、ID 同士を簡単に比較できます。

```kotlin
// 普通のデータクラスで ID を表現する例
data class OrderId(val value: String) {
    init {
        require(value.isNotBlank()) { "OrderId は空にできません。" }
    }
}

data class CustomerId(val value: String) {
    init {
        // ここでは「UUID として 36 文字」を期待する例
        require(value.length == 36) { "CustomerId は UUID (36文字) を期待します。" }
    }
}
```

### 2.2 識別子生成のパターン

ID の生成方法はいくつか種類があり、以下に簡単にまとめます。

#### i. UUID をアプリケーション側で生成

```kotlin
import java.util.UUID

class OrderIdGenerator {
    fun nextId(): OrderId = OrderId(UUID.randomUUID().toString())
}
```

弊チームでは ID は UUID を採用していて、アプリ側で生成するようにしています。このとき、UUID のラッパーとなる VO を作成してその中で生成するのがおすすめです。

#### ii. DB 側で発行

DB 側で ID を自動生成する方法もあります。

#### iii. ナチュラルキー（事業的に一意な値）を ID とする

アプリ上意味のある値を ID にするという方法もあります。（当然一意性は担保される必要はあります）
ですが、アプリの仕様変更などで動かなくなる可能性もあるため注意です。

## 3. equals() / hashCode() の設計

#### 3.1 比較の際は、ID のみで比較する

エンティティでは「ID が同じ」なら同一のオブジェクトとみなします。
たとえその他の属性（名前やメールアドレスなど）が変わっても、同じ ID であれば同一のエンティティを指します。

ただ厄介なのが、kotlin の data class ではデフォルトだとプロパティすべてで比較してしまうため、equals を自前で実装する必要があります。

```kotlin
// NGな例
data class User(
    val id: CustomerId,
    var name: String,
    var email: EmailAddress
)
```

```kotlin
// 正しい実装
//   equals,hashCodeを自前実装
class User(
    val id: CustomerId,
    var name: String,
    var email: EmailAddress
) {
    // ID のみで同一性を判断
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false
        return this.id == other.id
    }

    override fun hashCode(): Int {
        // IDのハッシュコードを返すようにする
        return id.hashCode()
    }

    // ドメインロジック例: email を更新する
    fun changeEmail(newEmail: EmailAddress) {
        require(newEmail != email) { "新しいメールアドレスが現在と同じです。" }
        email = newEmail
    }
}
```

## 4. 可変性（Mutable）と不変性（Immutable）

### 4.1 Entity は状態を変えられることが原則

Entity は VO とは異なり、値を変えられることが原則です。ただし、以下の注意点があります。

- Entity の状態を変更するメソッド（ドメインロジック）を公開し、直接プロパティを変えてはならない
  - メソッドを介して変更すれば、不正な値がセットされるのを防げる。
- プロパティには var を使うような方法もあるが、kotlin において var は実はアンチパターンとする見方もあるため、極力 val を使った方がいい

```kotlin
class User private constructor(
    val id: CustomerId,
    private var _name: String,
    private var _email: EmailAddress
) {
    // 不変であれば val、可変なら var だが、外部直接変更を避けるため private にする
    var name: String
        private set     // 外部からは get しかできず、変更はメソッド経由のみ
        get() = _name

    var email: EmailAddress
        private set
        get() = _email

    // 名前変更のドメインロジック
    fun changeName(newName: String) {
        require(newName.isNotBlank()) { "名前は空にできません。" }
        require(newName != _name) { "新しい名前が現在の名前と同じです。" }
        _name = newName
    }

    // メールアドレス変更のドメインロジック
    fun changeEmail(newEmail: EmailAddress) {
        require(newEmail != _email) { "新しいメールアドレスが現在のものと同じです。" }
        _email = newEmail
    }

    companion object {
        fun new(...): User {
            ...
        }

        fun restore(...): User {
            ...
        }
    }

    // equals / hashCode は省略（前節参照）
    override fun equals(other: Any?): Boolean { /* ... */ }
    override fun hashCode(): Int { /* ... */ }
}
```

余談ですが、弊チームでは entity は `private constructor` として作成するのをルールとしています。
実装方法によっては通常の constructor で entity を作成、復元するとルールをすり抜けてしまうことがあるからです。
そのため、生成時のロジックは `new(生成)`、 `restore(復元)` に閉じ込めて通常の constructor は呼び出さないという決まりにしています。

## 5. ライフサイクル管理と状態遷移

エンティティにはしばしば「ステータス (Status)」や「フラグ」などの状態を持たせ、業務ごとに許可される操作や遷移を制御します。これを正しく設計しないと、ビジネスルールが緩くなりバグを生みやすくなります。
その際の entity の生成は、先ほども書いた`companion object`のファクトリメソッドを使って生成するのがおすすめです。

```kotlin
import java.time.LocalDateTime

enum class UserStatusType { ACTIVE, DEACTIVATED }

data class UserStatus(
    val type: UserStatusType,
    val updatedAt: LocalDateTime
) {
    fun isActive() = type == UserStatusType.ACTIVE
    fun deactivate(): UserStatus {
        return UserStatus(UserStatusType.DEACTIVATED, LocalDateTime.now())
    }
}

class User private constructor(
    val id: CustomerId,
    private var _name: String,
    private var _email: EmailAddress,
    private var _status: UserStatus,
    val createdAt: LocalDateTime
) {
    var name: String
        private set
        get() = _name

    var email: EmailAddress
        private set
        get() = _email

    val status: UserStatus
        get() = _status

    companion object {
        // 新規ユーザー作成のファクトリメソッド
        fun createNewUser(id: CustomerId, name: String, email: EmailAddress): User {
            require(name.isNotBlank()) { "名前は空にできません。" }
            val now = LocalDateTime.now()
            // デフォルトはactive
            val initialStatus = UserStatus(UserStatusType.ACTIVE, now)
            return User(id, name, email, initialStatus, createdAt = now)
        }
    }

    // ドメインロジック：退会
    fun deactivate() {
        require(_status.isActive()) { "すでに退会済みのユーザーです。" }
        _status = _status.deactivate()
    }

    // メールアドレス変更
    fun changeEmail(newEmail: EmailAddress) {
        require(newEmail != _email) { "新しいメールアドレスが現在と同じです。" }
        _email = newEmail
    }

    override fun equals(other: Any?): Boolean { /* ID 比較 */ }
    override fun hashCode(): Int { /* ID のハッシュ */ }
}
```

### 終わりに

今回は entity について書きました。正直他にもドメインイベントのこととか色々書いておきたいんですが、時間かかりそうなので一旦ここまでで。
次回は永続化層かな、、、repository あたり、、、？
