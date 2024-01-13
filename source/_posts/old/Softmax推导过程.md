---
title: Softmax推导过程
date: 2017-03-26 21:15:01
tags:
  - 机器学习
  - DeepLearning
  - mathematic
---

# 1. 介绍
Softmax其实就是logstic回归的多类版本。

<!-- more -->

# 2. 推导过程

D 是x数据维度，也是$w\_j$的维度。N是train example个数。k是分类数目
$$
\hat p(y\_i = j \vert x\_i ; W) = \frac{e^{w\_j^Tx\_i}}{\sum\_{l=1}^k e^{w\_l^Tx\_i}}
$$
$$
\begin{aligned}
J(W) = \mathcal{L}(W) &= \frac{1}{N} \sum\_{i = 1}^{N} \log \hat p(y\_i = j \vert x\_i ; W) - \lambda \Vert W \Vert^2 \\\\
&= \frac{1}{N} \left[ \sum\_{i = 1}^{N}  \sum\_{j = 1}^{k} \textbf{1}\\{y\_i = j\\} \log  \frac{e^{w\_j^Tx\_i}}{\sum\_{l=1}^k e^{w\_l^Tx\_i}} \right] - \lambda \sum\_{i=1}^{k}w\_i^T w\_i \\\\
\end{aligned}
$$

求梯度以及更新过程：

$$
\begin{aligned}
\frac{\partial J}{\partial w\_j} &= \frac{1}{N} \sum\_{i=1}^N \left[x\_i \textbf{1}\\{y\_i = j\\}\left( 1 -  \hat p(y\_i = j \vert x\_i ; W)  \right)  \right]  -2\lambda w\_j
\end{aligned}
$$

下面是中间计算过程
$$
\begin{aligned}
f(w\_j) &= \textbf{1}\\{y\_i = j\\} \log \frac{e^{w\_j^Tx\_i}}{\sum\_{l=1}^k e^{w\_l^Tx\_i}} \\\\ 
&= \textbf{1}\\{y\_i = j\\} \left[ w\_j^T x\_i - \log\sum\_{l=1}^k e^{w\_l^Tx\_i} \right]
\end{aligned}
$$
$$
\begin{aligned}
\frac{\partial f}{\partial w\_j} &= \textbf{1}\\{y\_i = j\\} \left[x\_i - x\_i\frac{e^{w\_j^Tx\_i}}{\sum\_{l=1}^k e^{w\_l^Tx\_i}} \right] \\\\
&= x\_i \textbf{1}\\{y\_i = j\\} \left[1 -  \hat p(y\_i = j \vert x\_i ; W)  \right] \\\\
&= x\_i  \left[\textbf{1}\\{y\_i = j\\} -  \hat p(y\_i = j \vert x\_i ; W)  \right]
\end{aligned}
$$
这里$\textbf{1}\\{y\_i = j\\} -  \hat p(y\_i = j \vert x\_i ; W)$是scalar然后$x\_i$是一个向量。


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info