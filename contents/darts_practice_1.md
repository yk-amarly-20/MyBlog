---
title: "時系列解析(1)"
createdAt: "2020-12-14T1634:53.325Z"
tags: ["python", "time_series_analysis", "machine_learinig"]
---

## はじめに

大学では数学系として確率論を専攻する中で時系列解析について勉強したりするんですが、$a$
それ関連でついこの間 python の時系列解析ライブラリである[darts](https://github.com/unit8co/darts)というものを
発見したので、触ってみました。
依存ライブラリのバージョン(pandas のバージョンが 1.1.0 だったり...)とかちょこちょこ問題はありますが、結構使いやすかったので
チュートリアルをなぞりながら、時系列解析の知識はその都度軽く紹介しつつ記事に残せたらと思います。
チュートリアルが 10 個ほどのセクションに分かれているので順にまとめていきます。

## 時系列解析とは

まず時系列解析について軽く触れておきます。  
「一年間のサラダチキンの売れ行き」、「ここ数年の USJ の来客数」など、季節や時間で変動するデータを、単位時間ごとに集計したものを
時系列データと呼びます。平たく言えば、このようなデータを利用して未来のデータを予測するのが時系列解析と呼ばれる分野です(クッっっっそ雑な説明なのであしからず)。  
未来のデータを予測する手法としては様々なものがありますが、チュートリアルの前半では既存のモデルにデータを当てはめて予測を実行します。  
この先も必要に応じて時系列解析の基礎知識は補っていきます。 では早速チュートリアルをみていきましょう。

## チュートリアル 1 (darts_intro)

ここにコード全部書いてたらしんどいのでチュートリアルの notebook の[URL](https://github.com/unit8co/darts/blob/master/examples/01-darts-intro.ipynb)おいときます。  
datrs の install は pip で行えます。(さっき言ったバージョン関係で error と warnings が出ますがとりあえず無視です)

```shell
pip install 'u8darts[all]'
```

めぼしい物はこの辺ですね。

```python
from darts import TimeSeries
from darts.models import (
    NaiveSeasonal,
    NaiveDrift,
    Prophet,
    ExponentialSmoothing,
    ARIMA,
    AutoARIMA,
    StandardRegressionModel,
    Theta,
    FFT
)
from darts.metrics import mape, mase
from darts.utils.statistics import check_seasonality, plot_acf, plot_residuals_analysis
```

darts では、pandas.DataFrame から TimeSeries という時系列データをインスタンス化し、それを用いて解析を実行します。

```python
df = pd.read_csv('AirPassengers.csv', delimiter=",")
series = TimeSeries.from_dataframe(df, 'Month', ['#Passengers'])

series.plot()
```

結果はこんな感じ。
![series_plot](/Images/darts_practice_1/series_plot.svg)

次にモデルを適用していくのですが、その前に series を training、validation データに分割していきます。

```python
train, val = series.split_before(pd.Timestamp('19580101'))
```

では train データを用いてモデルを fitting していきます。  
いろいろモデルは実装されていますが、まずはナイーブなモデルを用います。  
は？ナイーブってなんやねんって思うかもしれませんが、ここでいうナイーブとは簡単なモデルみたいな意味合いです。今から用いる NaiveSeasonal モデルの実装をみてみると

```python
class NaiveSeasonal(ForecastingModel):
~~~~~~中略~~~~~~~

    def fit(self, series: TimeSeries):
        super().fit(series)
        raise_if_not(len(series) >= self.K, 'The time series requires at least K={} points'.format(self.K), logger)
        self.last_k_vals = series.univariate_values()[-self.K:]

    def predict(self, n: int):
        super().predict(n)
        forecast = np.array([self.last_k_vals[i % self.K] for i in range(n)])
        return self._build_forecast_series(forecast)
```

引数で渡す K を用いて、K 個前と同じ値を返す、という実装になっています。つまりデータに周期性があると、その周期の値として K を渡せばそこそこ予測できる、ということが予想できますね。  
では実際に fitting、予測を行っていきます。

```python
seasonal_model = NaiveSeasonal(K=12)
seasonal_model.fit(train)
seasonal_forecast = seasonal_model.predict(36)

series.plot(label='actual')
seasonal_forecast.plot(label='naive forecast (K=12)')
plt.legend()
```

結果は以下の通りです。
![naive_seasonal](/Images/darts_practice_1/naive_seasonal.svg)

ところで、先ほどのコードでは K=12 としていましたが、この周期の値は autocorrelation function(ACF)と呼ばれる関数を用いて求めることができます(日本語では自己相関係数です)。
j 次の自己相関係数の定義は以下の様になっています。

![mape_math](/Images/darts_practice_1/acf.png)

平たくいうと、この値が大きいと時系列データの周期が j である、と言えそう、ってことです(曖昧ですが、ACF が高いこととデータに周期性があることは同値ではありません。)。  
darts にはこの ACF を plot する関数が実装されています。

```python
plot_acf(train, m = 12, alpha = .05)
```

![acf](/Images/darts_practice_1/acf.svg)
これをみると、j=12 の ACF が高いのがわかります。(j=0 が 1 を取るのは、自分自身との相関をとっているからです。)
つまりこのデータの周期は 12 である可能性が高いということですね。

では、先ほどの NaiveSeasonal の plot 結果に戻りましょう。
周期が 12 と分かれば、予測の際には 12 個前のデータをとってくればよく、NaiveSeasonal(K=12)をモデルに選ぶのは妥当な様に思われます。
ですが、plot 結果をみると明らかにズレが生じているのがわかります。これは時系列データでは重要なファクターである、「トレンド」を見逃していることによるズレです。  
一番最初にあげた、「一年間のサラダチキンの売れ行き」を例にとって考えます。
![chicken](/Images/darts_practice_1/chicken.png)

これは 2015~2020 のサラダチキンの売り上げデータです。実はこのデータには一年間を通じてある程度の周期性があることがわかっています。  
冷たいサラダチキンは夏によく売れますし、冬になると売高は大きく下がります。これは直感的にも予想できる事実でしょう。  
ところが、極端ですが「2015 年の 8 月」と「2019 年の 12 月」を比べたとき、明らかに後者の方が売り上げが大きいのがわかります。  
これは、サラダチキンの売り上げにそもそもの増加傾向があるからです。この様に、周期性などを無視して、全体の増減を表す指標のことをトレンドと呼びます。

トレンドによる変動が大きい場合、周期性のみからの予測では大した結果は生まれません。そこで、darts にはトレンドを解析して予測する関数も実装されています。
トレンドと周期性による予測を足し合わせたものを plot してみましょう。

```python
drift_model = NaiveDrift()  # トレンドを学習するモデル
drift_model.fit(train)
drift_forecast = drift_model.predict(36)

combined_forecast = drift_forecast + seasonal_forecast - train.last_value()

series.plot()
combined_forecast.plot(label='combined')
drift_forecast.plot(label='drift')
plt.legend()
```

![drift](/Images/darts_practice_1/drift.svg)

これで初めて、パッと見そこそこいい感じの予測ができてそうですね。
ですが、「ぱっと見」では実際の問題に応用するのはできないですよね。そこで、モデルの適用具合を知る指標として、ここでは mean absolute percentage error(平均絶対パーセント誤差、以下 mape)というものを使います。
mape の定義は以下です。

![mape_math](/Images/darts_practice_1/mape.png)

mape が大きいほど誤差が大きく、小さいほど適応度が高いということになります。
mape は便利ですが、いくつか欠点もあります。

・実測値で割っているため、実測値に 0 が存在する場合は ZeroDivisionError 返ってくる。  
・実測値がクッソでかいとき、100%超える。

の様な感じです。それぞれ対応策はあるのですが、ここでは述べずにとりあえず今回のモデルに使ってみましょう。

```python
print("Mean absolute percentage error for the combined naive drift + seasonal: {:.2f}%.".format(
      mape(series, combined_forecast)))
```

```
Mean absolute percentage error for the combined naive drift + seasonal: 5.66%.
```

こんな感じです。
他にもいろいろモデルや評価指標があったりしますが、それについては追々追記していこうと思います。

## References

1. github (https://github.com/unit8co/darts)
2. 【データサイエンスを知るコラム】Vol.5 　市場への真の影響を時系列分析で測る(https://www.intage.co.jp/gallery/datascience-column5/)
