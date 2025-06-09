---
title: "DDDについて（3）"
createdAt: "2021-10-25T0001:54.325Z"
tags: ["DDD", "Kotlin"]
---

## 1. Repository が担う責務と目的

### 1.1 なぜ Repository が必要なのか？

DDD において、Repository（リポジトリ） は、「アグリゲートルート（主に Entity）を永続化層（DB・外部サービスなど）から取得・保存するためのインターフェース」 です。以下のような意図・メリットがあります。

- 永続化の具体的手法を隠蔽する
  - ドメインモデル（アグリゲートやエンティティ）は、永続化のための仕組み（SQL/JPA/MongoDB 等）を一切知らなくても、永続化の手法を Repository に閉じ込めることで隠蔽できる
- テスト容易性の向上
  - ロジックを分離することで、単体テストが容易になる。
  - 先述の通り、永続化手法を閉じ込めているため、永続化ロジックが変わったとしても repository の test のみで検証できるのも good
- 永続化操作を集約ごとに定義できる
  - 「ID で取得する」「すべて取得する」「ページングして取得する」「検索条件で取得する」「保存する」「削除する」などの操作を、1 集約ごとに定義できて見通しが立ちやすい

## 2. リポジトリインターフェースの設計

### 2.1 定義する層

repository の実装はドメイン層の実装に依存するが、ドメイン層はインフラ層に依存してはいけない。この問題を解消すべく、依存性の逆転を行う必要がある。
そのためには、インターフェースのみドメイン層に実装し、実際の操作はインフラ層に記述する、のような書き方をする必要がある。

```pgsql
com.example.myapp.domain
├─ model
│   └─ User.kt
├─ repository
│   └─ UserRepository.kt    ← ここにインターフェースを定義
└─ service
    └─ UserService.kt
```

### 2.2 リポジトリインターフェースに含めるべきメソッド

リポジトリインターフェースは、「アグリゲートルートを操作するために必要最低限のメソッド」 に絞るべきです。たとえば、User エンティティを例にすると以下のようになります。

```kotlin
package com.example.myapp.domain.repository

import com.example.myapp.domain.model.User
import com.example.myapp.domain.model.UserId
import com.example.myapp.domain.specification.Specification

/**
 * User アグリゲートを永続化層から取得・保存するためのリポジトリインターフェース
 */
interface UserRepository {
    /**
     * 指定した ID の User を返す。存在しなければ null を返す
     */
    fun findByIdOrNull(id: UserId): User?

    /**
     * 指定した ID の User を返す。存在しなければ 例外を投げる
     */
    fun findById(id: UserId): User

    /**
     * 条件にマッチする User 一覧を返す。ページング、ソート情報などを渡せる仕様。
     * Specification を使う例では、検索条件を Specification オブジェクトとして渡す。
     */
    fun findAll(spec: Specification<User>, pageRequest: PageRequest): PagedResult<User>

    /**
     * User を保存または更新する。アグリゲートルートの状態をそのまま永続化する。
     */
    fun create(user: User): User

    /**
     * 指定した ID の User を削除する。
     */
    fun deleteById(id: UserId)
}
```

- 永続化、復元は集約単位で行うようにする
  - 集約内の repository で他集約の entity の永続化、復元は行わない
- `findById` か `findByIdOrNull` の使い分けは呼び出し先で判断

### 2.3 実装

interaface の実装先はインフラ層に。

```kotlin
package com.example.myapp.infrastructure.repository.jdbc

import com.example.myapp.domain.model.User
import com.example.myapp.domain.model.UserId
import com.example.myapp.domain.model.UserStatus
import com.example.myapp.domain.model.UserStatusType
import com.example.myapp.domain.repository.UserRepository
import com.example.myapp.domain.specification.Specification
import com.example.myapp.domain.repository.PageRequest
import com.example.myapp.domain.repository.PagedResult
import java.sql.Connection
import javax.sql.DataSource
import java.time.LocalDateTime

class UserRepositoryImpl(private val dataSource: DataSource) : UserRepository {

    override fun findByIdOrNull(id: UserId): User? {
        dataSource.connection.use { conn ->
            val sql = "SELECT user_id, name, email, status_type, status_updated_at, created_at, created_by, updated_at, updated_by, version " +
                      "FROM users WHERE user_id = ?"
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, id.value)
                stmt.executeQuery().use { rs ->
                    return if (rs.next()) mapRowToUser(rs) else null
                }
            }
        }
    }

    override fun findAll(spec: Specification<User>, pageRequest: PageRequest): PagedResult<User> {
        dataSource.connection.use { conn ->
            // まず総件数を取得
            val countSql = "SELECT COUNT(*) FROM users WHERE ${spec.toSqlCondition()}"
            val total = conn.prepareStatement(countSql).use { stmt ->
                // spec に応じたパラメータ設定
                spec.setParameters(stmt, 1)
                stmt.executeQuery().let { if (it.next()) it.getInt(1) else 0 }
            }

            // ページングデータ取得
            val offset = pageRequest.page * pageRequest.size
            val selectSql = """
                SELECT user_id, name, email, status_type, status_updated_at, created_at, created_by, updated_at, updated_by, version
                FROM users
                WHERE ${spec.toSqlCondition()}
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?
            """.trimIndent()

            val users = conn.prepareStatement(selectSql).use { stmt ->
                var idx = 1
                // Specification によるパラメータ設定
                spec.setParameters(stmt, idx).also { idx += it }
                stmt.setInt(idx++, pageRequest.size)
                stmt.setInt(idx, offset)
                stmt.executeQuery().use { rs ->
                    val list = mutableListOf<User>()
                    while (rs.next()) {
                        list += mapRowToUser(rs)
                    }
                    list
                }
            }

            val totalPages = if (total == 0) 0 else (total + pageRequest.size - 1) / pageRequest.size
            return PagedResult(users, total, totalPages, pageRequest.page)
        }
    }

    override fun create(user: User): User {
        dataSource.connection.use { conn ->
            conn.autoCommit = false
            try {
                // すでに存在するかチェック
                val existing = findById(user.id)
                if (existing == null) {
                    // INSERT
                    val insertSql = """
                        INSERT INTO users (
                            user_id, name, email, status_type, status_updated_at,
                            created_at, created_by, updated_at, updated_by, version
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """.trimIndent()
                    conn.prepareStatement(insertSql).use { stmt ->
                        stmt.setString(1, user.id.value)
                        stmt.setString(2, user.name)
                        stmt.setString(3, user.email.value)
                        stmt.setString(4, user.status.type.name)
                        stmt.setObject(5, user.status.updatedAt)
                        stmt.setObject(6, user.createdAt)
                        stmt.setString(7, user.createdBy)
                        stmt.setObject(8, user.updatedAt)
                        stmt.setString(9, user.updatedBy)
                        stmt.setLong(10, user.version)
                        stmt.executeUpdate()
                    }
                } else {
                    // UPDATE（楽観的ロックチェック）
                    val updateSql = """
                        UPDATE users SET
                          name = ?, email = ?, status_type = ?, status_updated_at = ?,
                          updated_at = ?, updated_by = ?, version = version + 1
                        WHERE user_id = ? AND version = ?
                    """.trimIndent()
                    conn.prepareStatement(updateSql).use { stmt ->
                        var idx = 1
                        stmt.setString(idx++, user.name)
                        stmt.setString(idx++, user.email.value)
                        stmt.setString(idx++, user.status.type.name)
                        stmt.setObject(idx++, user.status.updatedAt)
                        stmt.setObject(idx++, user.updatedAt)
                        stmt.setString(idx++, user.updatedBy)
                        stmt.setString(idx++, user.id.value)
                        stmt.setLong(idx, user.version)
                        val updatedCount = stmt.executeUpdate()
                        if (updatedCount == 0) throw OptimisticLockException("バージョン不整合: ${user.id.value}")
                    }
                }
                conn.commit()
                return user
            } catch (ex: Exception) {
                conn.rollback()
                throw ex
            }
        }
    }

    override fun deleteById(id: UserId) {
        dataSource.connection.use { conn ->
            conn.prepareStatement("DELETE FROM users WHERE user_id = ?").use { stmt ->
                stmt.setString(1, id.value)
                stmt.executeUpdate()
            }
        }
    }

    /**
     * ResultSet を User ドメインモデルにマッピングするヘルパーメソッド
     */
    private fun mapRowToUser(rs: java.sql.ResultSet): User {
        val id = UserId(rs.getString("user_id"))
        val name = rs.getString("name")
        val email = EmailAddress(rs.getString("email"))
        val statusType = UserStatusType.valueOf(rs.getString("status_type"))
        val statusUpdatedAt = rs.getObject("status_updated_at", LocalDateTime::class.java)
        val status = UserStatus(statusType, statusUpdatedAt)
        val createdAt = rs.getObject("created_at", LocalDateTime::class.java)
        val createdBy = rs.getString("created_by")
        val updatedAt = rs.getObject("updated_at", LocalDateTime::class.java)
        val updatedBy = rs.getString("updated_by")
        val version = rs.getLong("version")

        return User(
            id = id,
            name = name,
            email = email,
            status = status,
            createdAt = createdAt,
            createdBy = createdBy,
            updatedAt = updatedAt,
            updatedBy = updatedBy,
            version = version
        )
    }
}
```

- DB 周りの共通操作（ `dataSource.connection.use` など）については共通実装として別で実装して、repository からは呼び出すだけにしとくほうがいい
  - 今回は簡単のためベタ書きしてる
- ORM を使った書き方もあるが、弊チームでは使っていない
  - 単純に実装が追いついていないだけで今後導入する可能性あり
  - （この先はお気持ち）
    - ORM の欠点として、「複雑なクエリは実装できない」というものがある
    - が、ORM で実装できないような複雑なクエリが存在する状況というのは、そもそもの設計が良くない可能性がある
      - 例: 集約が大きすぎる or 細かすぎるなど
    - なので、ORM を導入するということが「良い設計」の一つの指標になる可能性もある
    - とはいえ検索クエリなどどうしてもある程度複雑なクエリになってしまうパターンもあるため、導入の際は現状の実装を吟味する必要はあり。

## 3. リポジトリのアンチパターンと注意点

### 3.1 リポジトリにドメインロジックを置く

- リポジトリは「永続化操作」の責務に特化するべきで、「パラメータの妥当性チェック」などはドメイン層やユースケース層で扱うほうが明確。
- リポジトリにロジックが混在すると、永続化手法を切り替えたときにロジックを移植し忘れたり、重複実装が発生するリスクがある。

### 3.2 トランザクションを跨ぐ誤用

- Repository 内で別の repository を呼んでしまうなど、一つの操作が複数のトランザクションにまたがってしまうなどは避けるべき

## 終わりに

今回は repository について書きました。次回はドメインサービスとかかな。
