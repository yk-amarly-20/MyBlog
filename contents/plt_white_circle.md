---
title: "matplotlibで白抜き丸をプロットする"
createdAt: "2021-06-26T1634:54.325Z"
tags: ["python", "matplotlib"]
---

## plt.scatter で白抜き丸をプロットしたい...

python の plt.scatter で、散布図を描くことが出来ます。

```python
from numpy.random import *
import matplotlib.pyplot as plt

x = randn(20)
y = randn(20)
plt.scatter(x, y, color="black")
plt.show()
```

上を実行すると、次の画像が生成されます。
![black_scatter](/Images/plt_white_scatter/black_scatter.png)

これはこれでいいのですが、この丸を白抜きの丸にしてプロットしたいと考えた時があったので、備忘録として。  
結論として、白抜き丸をプロットするには plt.scatter の引数に`facecolor = "None"`を指定すれば良いです。

```python
from numpy.random import *
import matplotlib.pyplot as plt

x = randn(20)
y = randn(20)
plt.scatter(x, y, color="black", facecolor="None")
plt.show()
```

実行すると次の画像が生成。
![black_white_scatter](/Images/plt_white_scatter/black_white_scatter.png)
って感じです。
