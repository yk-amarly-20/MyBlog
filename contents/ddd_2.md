---
title: "DDDについて（2）"
createdAt: "2021-10-12T0001:54.325Z"
tags: ["DDD", "Kotlin"]
---

## 1. ValueObject について

### 1.1 基本的な定義

- 識別子を持たない

  - 例えば「住所(Address)」や「金額(Money)」といったドメイン概念の場合、同じ属性の組み合わせであれば同一の値オブジェクトとみなせます。

  - そのため、id: String のような一意な識別子フィールドは基本的に不要です。

- 不変性（Immutability）

  - 一度生成したら内部状態が変化しない。

  - データ破壊的なメソッド（setter や var での再代入）は原則として避け、必要とあれば「新しいインスタンスを返す」メソッドを用意する。

- 同値性（Equals / HashCode）

  - 属性（フィールド）の値がすべて同じ場合、equals() も hashCode() も等しくなるよう実装する。(kotlin の場合)

  - Kotlin の data class を使えば、自動的に属性すべてを比較してくれるため、VO には最適。

- ドメインルール・バリデーションを持つ

  - EmailAddress や PhoneNumber のように「文字列としての形式チェック」「範囲チェック」など、値に関するドメイン固有の制約を constructor（または factory）で実施する。

  - エラー時は IllegalArgumentException などを投げて、「不正な値オブジェクトはそもそも生成できない」ようにする。

## 2. Kotlin を活かした VO の基本パターン

### 2.1 Kotlin の data class を使う

もっともシンプルに実装できるのが、data class による定義です。以下は「住所(Address)」を VO 化した例です。

```kotlin
data class Address(
    val street: String,
    val city: String,
    val postalCode: String,
    val country: String
) {
    init {
        require(street.isNotBlank()) { "Street は空にできません。" }
        require(city.isNotBlank()) { "City は空にできません。" }
        require(postalCode.matches(Regex("\\d{3}-\\d{4}"))) { "PostalCode は XXX-XXXX の形式である必要があります。" }
        require(country.isNotBlank()) { "Country は空にできません。" }
    }
}
```

以上のコードでは、 `Address` という VO を作成したものになります。
`Address` は `street`, `city`, `postalCode`, `country` という住所に関する情報を持っていて、それぞれに関する入力ルールも保持しています。
この定義でも問題ないのですが、弊チームでのコーディングルールでは生の型は基本的に使わず、上の例の `street` などもすべて VO にするということにしています。

```kotlin
data class Address(
    val street: Street,
    val city: City,
    val postalCode: PostalCode,
    val country: Country
) {
    ...
}

data class Street(
    val value: String
) {
    init {
        require(value.isNotBlank()){ "Street は空にできません。" }
    }
}

// その他のVOも同様
```

このようにするメリットは、他の VO や Entity で `Street` を使い回す際にルールを再度定義する必要がないという点です。何度も同じルールを複数箇所で書くと、ルールの書き間違いなどが起こりやすく脆弱な状態です。それを阻止するために VO を作り、そこにルールを持たせるようにするというのは明確な利点です。
デメリットは書くのがめんどい（我慢せい）。

## 3. 発展的な VO パターンとベストプラクティス

### 3.1 再利用可能なバリデーションロジックの共有

複数の VO で同じバリデーションロジック（電話番号の正規表現やメールアドレスの形式チェックなど）を使いたい場合、共通クラス・ユーティリティにまとめることで重複を避けられます。

```kotlin
object ValidationUtils {
    private val EMAIL_REGEX = Regex("^[\\w\\.\\-]+@[\\w\\.\\-]+\\.[a-zA-Z]{2,}\$")
    private val PHONE_REGEX = Regex("\\+\\d{1,3}-\\d{7,15}")
    private val POSTAL_CODE_REGEX = Regex("\\d{3}-\\d{4}")

    fun validateEmail(value: String) {
        require(value.matches(EMAIL_REGEX)) { "メールアドレスの形式が不正です: $value" }
    }

    fun validatePhone(value: String) {
        require(value.matches(PHONE_REGEX)) { "電話番号の形式が不正です: $value (例: +81-9012345678)" }
    }

    fun validatePostalCode(value: String) {
        require(value.matches(POSTAL_CODE_REGEX)) { "郵便番号の形式が不正です: $value (例: 123-4567)" }
    }
}
```

ただこれはこれでこの object が肥大化しますし、個人的には各 VO に持たせるのが良さそうに思います。
どうしても共通化したい場合は、util クラスを validation ごとに作成し、各 VO ではそのクラスを継承させるのが良さそうです。

```kotlin
data class Email(
    value: String
) {
    init {
        validateEmail(value)
    }
    fun validateEmail(value: String) {
        require(value.matches(EMAIL_REGEX)) { "メールアドレスの形式が不正です: $value" }
    }
}

// 各Emailを実装する際にこのクラスを継承させる
data class UserEmail(value: String): Email(value)
```

### 3.2 Factory パターンで複雑な VO を生成する

VO がディレクトリ形式の String や複数の入力を受け取りつつ、生成ロジックが複雑になる場合は、専用の Factory オブジェクト を用意すると責務が明確になります。

```kotlin
object AddressFactory {
    /**
     * 日本向け住所を生成（都道府県・市区町村・番地・建物名 の入力を受け取る例）
     */
    fun createJapaneseAddress(
        prefecture: String,
        city: String,
        block: String,
        building: String? = null
    ): Address {
        val street = "$prefecture $city $block"
        val fullStreet = if (building.isNullOrBlank()) street else "$street $building"
        return Address(
            street = fullStreet,
            city = city,
            postalCode = "${prefecture.take(2)}-${city.take(3)}-0000", // 仮の郵便番号ロジック
            country = "Japan"
        )
    }

    /**
     * US 向け住所を生成（番地・通り名・州・郵便番号 の入力を受け取る例）
     */
    fun createUSAddress(
        streetNumber: String,
        streetName: String,
        state: String,
        zipCode: String
    ): Address {
        val street = "$streetNumber $streetName"
        return Address(
            street = street,
            city = state,
            postalCode = zipCode,
            country = "USA"
        )
    }
}

// 使用例
fun main() {
    val tokyoAddress = AddressFactory.createJapaneseAddress(
        prefecture = "Tokyo-to",
        city = "Chiyoda-ku",
        block = "1-1-1",
        building = "皇居"
    )
    println(tokyoAddress)  // Address(street=Tokyo-to Chiyoda-ku 1-1-1 皇居, city=Chiyoda-ku, postalCode=To-Ch-0000, country=Japan)

    val nyAddress = AddressFactory.createUSAddress(
        streetNumber = "1600",
        streetName = "Pennsylvania Ave NW",
        state = "Washington DC",
        zipCode = "20500"
    )
    println(nyAddress)  // Address(street=1600 Pennsylvania Ave NW, city=Washington DC, postalCode=20500, country=USA)
}
```

### 3.3 配列・リスト・マップをフィールドに持つ VO

VO 内に List や Set、Map などのコレクションをフィールドとして持つ場合、mutable なコレクション参照を外部にさらすと不変性が崩れる可能性があります。以下のように対策します。

```kotlin
data class Tag(
    val name: String
)

data class TagList(
    private val _tags: List<Tag>  // private にして外部参照を隠蔽
) {
    val tags: List<Tag>
        get() = _tags.toList()    // 毎回コピーを返して不変性を確保

    init {
        require(_tags.isNotEmpty()) { "タグは 1 つ以上必要です。" }
        require(_tags.map { it.name }.distinct().size == _tags.size) {
            "同じタグ名は含められません。"
        }
    }

    // タグを追加した新しい TagList を返す
    fun addTag(newTag: Tag): TagList {
        require(_tags.none { it.name == newTag.name }) { "同じタグは既に存在します。" }
        return TagList(_tags + newTag)
    }
}

```

## 4 アンチパターンと注意点

### 4.1 大きすぎる Value Object (バケツ VO) の警戒

すべてのフィールドを単一の大きな VO にまとめると、

- テストが難しくなる
- バリデーションエラー時の責務が曖昧になる
- 読みやすさ・可読性が低下する
- エンティティに埋め込んだときのパフォーマンスに影響が出る

という問題が起こり得ます。
「責務が一つの VO が小さく、シンプルである」 という原則を守り、必要に応じて複数の VO に分割しましょう。

### 4.2 可変コレクションを公開しない

VO 内で var tags: MutableList<String> のように mutable なコレクションを公開してしまうと、不変性が崩れてしまいます。

必ず private なコレクションを使い、外部には不変コレクション（List, Set）を返す か、防御的コピーを行いましょう（前述の TagList 参照）。

### 4.3 equals/hashCode の整合性を保つ

equals() と hashCode() は、常に「属性すべて」の値を比較するように実装 しなければ、VO の同一性判断が崩れます。

data class を使う場合は自動生成されますが、明示的に equals/hashCode をカスタマイズしたい場合は、細心の注意を持って実装してください。

### 終わりに

今回は VO についてあれこれ書きました。
次回は Entity について書いていこうかと思います。
