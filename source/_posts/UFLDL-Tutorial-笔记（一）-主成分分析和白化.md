---
title: UFLDL Tutorial 笔记（一） 主成分分析和白化
date: 2016-03-20 15:19:44
tags:
    - 机器学习
    - mathematic
---


# 1. PCA
　　主成分分析（PCA）是一种能够极大提升无监督特征学习速度的数据降维算法。更重要的是，理解PCA算法，对实现**白化**算法有很大的帮助，很多算法都先用白化算法作预处理步骤。
　　假设你使用图像来训练算法，因为图像中相邻的像素高度相关，输入数据是有一定冗余的。具体来说，假如我们正在训练的16x16灰度值图像，记为一个256维向量 $ x \in \Re^{256} $，其中特征值 $ x\_i $ 对应每个像素的亮度值。由于相邻像素间的相关性，PCA算法可以将输入向量转换为一个维数低很多的近似向量，而且误差非常小。

<!-- more -->

### 1.1 数学解释
　　假设输入数据集是$\{x^{(1)},x^{(2)},...,x^{(m)}\}$，数据的维度是2，也就是$ x \in \Re^{2}$。 我们想把数据维度降到1维。实际中有可能把256维降到50维。
　　PCA算法将寻找一个低维空间来投影我们的数据。
$$
\begin{align}
\Sigma = \frac{1}{m} \sum\_{i=1}^m (x^{(i)})(x^{(i)})^T.
\end{align}
$$
　　假设x的均值为零，那么$ \Sigma $就是x的协方差矩阵。

　　我们先计算出协方差矩阵$ \Sigma$的特征向量，按列排放，而组成矩阵$ U$：
$$
\begin{align}
U =
\begin{bmatrix}
| & | & & |  \\\\
u\_1 & u\_2 & \cdots & u\_n  \\\\
| & | & & |
\end{bmatrix} 		
\end{align}
$$

　　此处， $ u\_1 $是主特征向量（对应最大的特征值）， $ u\_2 $是次特征向量。以此类推，另记$ \lambda\_1, \lambda\_2, \ldots, \lambda\_n $为相应的特征值。

### 1.2 数据降维
　　数据的主方向就是旋转数据的第一维 $ x\_{\text{rot},1} $ 。因此，若想把这数据降到一维，可令：
$$
\begin{align}
\tilde{x}^{(i)} = x\_{\text{rot},1}^{(i)} = u\_1^Tx^{(i)} \in \Re.
\end{align}
$$
　　更一般的，假如想把数据 $ x \in \Re^n $降到  k 维表示,只需选取 $ x\_{\text{rot}} $的前 k 个成分，分别对应前 k 个数据变化的主方向。


### 1.3 还原近似数据
　　现在，我们得到了原始数据 $ x \in \Re^n $ 的低维“压缩”表征量 $ \tilde{x} \in \Re^k $， 反过来，如果给定 $ \tilde{x} $ ，我们应如何还原原始数据 x 呢？查看以往章节以往章节可知，要转换回来，只需 $ x = U x\_{\text{rot}} $ 即可。进一步，我们把 $ \tilde{x} $ 看作将 $ x\_{\text{rot}} $的最后 n-k 个元素被置0所得的近似表示，因此如果给定 $ \tilde{x} \in \Re^k $，可以通过在其末尾添加 n-k 个0来得到对 $ x\_{\text{rot}} \in \Re^n $的近似，最后，左乘 U 便可近似还原出原数据 x 。具体来说，计算如下：
$$
\begin{align}
\hat{x}  = U
\begin{bmatrix}
\tilde{x}\_1 \\\\
\vdots \\\\
\tilde{x}\_k \\\\
0 \\\\
\vdots \\\\
0
\end{bmatrix}  
= \sum\_{i=1}^k u\_i \tilde{x}\_i.
\end{align}
$$


### 1.4 选择主成分个数
　　一般而言，设 $ \lambda\_1, \lambda\_2, \ldots, \lambda\_n $ 表示 $ \Sigma $ 的特征值（按由大到小顺序排列），使得 $ \lambda\_j $ 为对应于特征向量 $ u\_j $的特征值。那么如果我们保留前 k 个成分，则保留的方差百分比可计算为：
$$
\begin{align}
\frac{\sum\_{j=1}^k \lambda\_j}{\sum\_{j=1}^n \lambda\_j}.
\end{align}
$$
# 2. 白化
### 2.1 PCA 白化
　　$ x\_{\text{rot}} $协方差矩阵对角元素的值为 $ \lambda\_1 $和 $ \lambda\_2 $绝非偶然。并且非对角元素值为0; 因此, $ x\_{\text{rot},1} $ 和 $ x\_{\text{rot},2} $ 是不相关的, 满足我们对白化结果的第一个要求 (特征间相关性降低)。
　　为了使每个输入特征具有单位方差，我们可以直接使用 $ 1 / \sqrt{\lambda\_i} $作为缩放因子来缩放每个特征 $ x\_{\text{rot},i} $。具体地，我们定义白化后的数据 $ x\_{\text{PCAwhite}} \in \Re^n $ 如下：
$$
\begin{align}
x\_{\text{PCAwhite},i} = \frac{x\_{\text{rot},i} }{\sqrt{\lambda\_i}}.   
\end{align}
$$
　　$ x\_{\text{PCAwhite}}$ 是数据经过PCA白化后的版本: $ x\_{\text{PCAwhite}} $ 中不同的特征之间不相关并且具有单位方差。
　　白化与降维相结合。 如果你想要得到经过白化后的数据，并且比初始输入维数更低,可以仅保留 $ x\_{\text{ PCAwhite}} $中前 k 个成分。当我们把PCA白化和正则化结合起来时(在稍后讨论)，$ x\_{\text{PCAwhite}} $ 中最后的少量成分将总是接近于0，因而舍弃这些成分不会带来很大的问题。


### 2.2 ZCA 白化
　　如果 R 是任意正交矩阵，即满足 $ RR^T = R^TR = I $ (说它正交不太严格，R 可以是旋转或反射矩阵), 那么 $ R  \,x\_{\text{PCAwhite}} $ 仍然具有单位协方差。在ZCA白化中，令 $ R = U$ 。我们定义ZCA白化的结果为：
$$
\begin{align}
x\_{\text{ZCAwhite}} = U x\_{\text{PCAwhite}}
\end{align}
$$



# 参考文献
http://deeplearning.stanford.edu/wiki/index.php/PCA
[如何实现主成分分析和白化](http://ufldl.stanford.edu/wiki/index.php/实现主成分分析和白化)


----
　

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
