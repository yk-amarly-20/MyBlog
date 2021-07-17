---
title: "pythonでAtCoderの入出力チートシート"
createdAt: "2021-07-17T2334:54.325Z"
tags: ["python"]
---

## python で atcoder の入出力をするやつ

AtCoder という文字列を久しぶりに打ってタイポしたくらいには最近 AtCoder に触れてない自分ですが、最近バイト先の後輩が Python と AtCoder 始めて
応援してます。そういうわけで、入出力操作をここに残しておこうかと。  
~~Pyhton 書くのも久しぶりだなぁ...。~~

#### ① 文字列を一つ受け取る時

まず最も単純なのがこのパターンです。最近の A 問題だと[この辺り](https://atcoder.jp/contests/abc189/tasks/abc189_a)がありますね。

Python では、標準入力の受け取りは input()関数で行います。input()は、標準入力を"1 行""文字列として"受け取る関数です。今回だと以下。

```python
c = input()
```

ついでに解いてみましょう。

```python
c = input()

flag = (len(set([c[0], c[1], c[2]])) == 1)
ans = "Won" if flag else "Lost"

print(ans)
```

これで AC です。

#### ② 数値を一つ受け取るパターン

お次は数値です。例題は[こちら](https://atcoder.jp/contests/abc200/tasks/abc200_a)で。  
上と同じように input()関数を使うのですが、先ほど書いたように、input()関数で受け取った値は全て文字列となっています。そこで、input()で受け取った文字列に int()を作用させます。

```python
n = int(input())
```

これで数値を受け取ることができます。せっかくなのでこちらも回答を。

```python
n = int(input())

ans = (n - 1) // 100 + 1
print(ans)
```

#### ③ 文字列を複数個受け取るパターン

AtCoder では、一行に複数個入力が投げられることがしばしばあります。例えば[これ](https://atcoder.jp/contests/abc148/tasks/abc148_b)の二行目とか。  
こういう時は、input()関数で受け取った文字列に対して、split()関数を作用させます。split()は、引数として指定した文字列区切りのリストを返します。

例えば、

```python
url = "kojiblog/my-contents/about/atcoder"
splited_url = url.split("/")

# splited_url は["kojiblog", "my-contents", "about", "atcoder"] というリスト
```

って感じです。この引数の部分に何も指定しない場合、デフォルトで"空白文字区切り"となります。これを利用すると、複数文字列がその数だけ受け取れます。例&回答は以下。

```python
n = int(input())
s, t = input().split()

ans = ""
for i in range(n):
    ans += (s[i] + t[i])

print(ans)
```

#### ④ 複数の数値を受け取るパターン

複数の数値を受け取るパターンはなかなかめんどくさいです。例は[こちら](https://atcoder.jp/contests/abc152/tasks/abc152_b)。  
この場合は、input().split()で一旦文字列として入力を受け取り、そのリスト全体に対して int()を作用させます。この時に使うのが map()関数です。  
map 関数は"高階関数"と呼ばれるものの一種で、第一引数に関数を、第二引数にリスト like なオブジェクトを受け取ります(難しい場合はリストと考えてもらって大丈夫です)。  
この時、map(f, list)は list の要素全部に f を作用させたリストを返します。なので、この問題の場合は以下のようになります。

```python
a, b = map(int, input().split())

l = [str(a) * b, str(b) * a]
l.sort()

print(l[0])
```

#### ⑤ 入力が複数行あるパターン

これで最後です。AtCoder の頻出パターンとして、"最初に整数 n を受け取ったあと、n 行の入力を受け取る"というものがあります。例えば[これ](https://atcoder.jp/contests/abc134/tasks/abc134_c)。  
複雑そうですが、実は案外単純で、最初に受け取った n 分だけ for 文で input()を回せばいいです。受け取った物はリストにでも入れておきましょう。解答は以下。

```python
n = int(input())
l = []

# for文でAiの値を受け取る。
for i in range(n):
    x = int(input())
    l.append(x)

pre = [] * (n + 1)
suff = [] * (n + 1)

for i in range(1, n + 1):
    pre[i] = max(pre[i - 1], l[i - 1])
for i in range(n - 1, -1, -1):
    suff[i] = max(suff[i + 1], l[i])
for i in range(1, n + 1):
    print(max(pre[i - 1], suff[i]))
```

実はもっとスマートな"リスト内包表記"という物があるのですが、それはまた別の機会に。

## 終わりに

まあざっとこんな感じです。割と適当に書いたのであまり解答ではないと思いますが、今回はそこは本質ではないので悪しからず...。
