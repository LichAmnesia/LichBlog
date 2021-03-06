---
title: UFLDL Tutorial 笔记（五） 卷积特征计算 池化
date: 2016-03-23 19:56:34
tags:
    - 机器学习
    - mathematic
---


# 1. 卷积特征
### 1.1 全联通网络
　　全联通网络就是指输入层和隐含层进行全链接的设计。实际计算角度来讲，会出现很大的图像比如（96x96）大小的。那么计算上就会非常消耗时间，因为有$10^4$的计算输入单元，并且如果需要训练出100个特征，那么就会有$10^6$次方个参数需要学习。
　　
### 1.2 部分联通网络
　　上面的简单的解决策略就是设计对隐含单元和输入单元间连接的限制。每个隐含单元只能是输入单元的一部分。
　　
### 1.3 卷积　　
　　卷积是自然图像的固有属性，意思就是从一个大尺寸的图像中随机选取一块，比如8x8的作为样本，并且从这个小样本中学习到了一些特征。把这些特征作为探测器来应用到大图像的任意地方去。可以使用8x8的样本学习到的特征跟原本的大尺寸图像做卷积，从而对这个大尺寸图像的任意位置获得一个不同特征的激活值。
　　![卷积操作](http://storage.googleapis.com/lichamnesia.appspot.com/images/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C_Convolution_schematic.gif)
　　假设给定了$ r \times c $ 的大尺寸图像，将其定义为 $x\_{large}$。首先通过从大尺寸图像中抽取的 $a \times b $的小尺寸图像样本 $x\_{small}$ 训练稀疏自编码，计算$ f = σ(W^{(1)}\_{xsmall} + b(1))$（σ 是一个 sigmoid 型函数）得到了 k 个特征， 其中$ W^{(1)} $和$ b^{(1)} $是可视层单元和隐含单元之间的权重和偏差值。对于每一个$ a \times b $大小的小图像 $x\_s$，计算出对应的值$ f\_s = σ(W^{(1)}x\_s + b^{(1)})$，对这些 $f\_{convolved}$ 值做卷积，就可以得到$ k \times (r - a + 1) \times (c - b + 1) $个卷积后的特征的矩阵。

<!-- more -->

# 2. 池化
### 2.1 池化介绍
　　在通过卷积获得了特征 (features) 之后，下一步我们希望利用这些特征去做分类。理论上可以使用所有提取得到的特征去训练分类器。但是会导致计算量巨大。
　　举例来说。如果对于一个96x96的图像，我们已经学习得到了400个定义在8x8的输入上的特征，每一个特征和图像卷积都会得到一个 $ (96 − 8 + 1) \times (96 − 8 + 1) = 7921 $ 维的卷积特征，由于有 400 个特征，所以每个样例 (example) 都会得到一个$ 892 \times 400 = 3,168,400$维的卷积特征向量。学习一个拥有超过 3 百万特征输入的分类器十分不便，并且容易出现过拟合 (over-fitting)。
　　为了解决这个问题，是因为使用卷积。我们使用卷积是因为图像具有静态性的树形，也就意味着在一个图像区域有用的特征很有可能在另外一个区域使用。所以描述大的图像，一个很简单的方法就是对图像中一块区域进行聚合统计。这种聚合操作就叫做池化 (pooling)，有时也称为平均池化或者最大池化 (取决于计算池化的方法)。
　　![池化操作](http://storage.googleapis.com/lichamnesia.appspot.com/images/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C_Pooling_schematic.gif)
　　
### 2.2 池化不变性
　　如果人们选择图像中的连续范围作为池化区域，并且只是池化相同(重复)的隐藏单元产生的特征，那么，这些池化单元就具有平移不变性 (translation invariant)。这就意味着即使图像经历了一个小的平移之后，依然会产生相同的 (池化的) 特征。在很多任务中 (例如物体检测、声音识别)，我们都更希望得到具有平移不变性的特征，因为即使图像经过了平移，样例(图像)的标记仍然保持不变。
　　
### 2.3 池化总结
　　形式上，在获取到我们前面讨论过的卷积特征后，我们要确定池化区域的大小(假定为$m \times n$)，来池化我们的卷积特征。那么，我们把卷积特征划分到数个大小为 $m \times n$的不相交区域上，然后用这些区域的平均(或最大)特征来获取池化后的卷积特征。这些池化后的特征便可以用来做分类。

## 参考文献
http://ufldl.stanford.edu/wiki/index.php/UFLDL_Tutorial

----
　

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
