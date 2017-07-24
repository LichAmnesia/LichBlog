---
title: Pandas使用教程
date: 2017-02-05 17:49:04
tags:
  - Python
---

本文介绍`Pandas`基本使用。

<!--more-->

# 1. Install
```python
import pandas as pd
```
# 2. IO 操作
```python
> df = pd.read_csv('file.csv', header=None, nrows=5, sep='\t')
> pd.to_csv('myDataFrame.csv')
```
# 3. Selection
loc 可以选择第几行
```python
len(df) # 返回有多少行数据
df.loc[line_num]
df[1:] # 选择1到n行数据
df.loc([1], ['Country']) # 根据行数以及列名确认具体元素
df.at([1], ['Country'])
df['Country'] # 选择列名的数据
```



# 参考
[1] Pandas Cheat Sheat： https://s3.amazonaws.com/assets.datacamp.com/blog_assets/PandasPythonForDataScience+(1).pdf
[2] Pandas Cheat Sheet: Data Science and Data Wrangling in Python：http://www.kdnuggets.com/2017/01/pandas-cheat-sheet.html
[3] Pandas Loading Tuturial：http://chrisalbon.com/python/pandas_dataframe_importing_csv.html

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
