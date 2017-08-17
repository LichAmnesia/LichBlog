---
title: Gaussian process, Dirichlet process 以及 kernel 关系
date: 2017-08-17 15:31:52
tags:
    - 机器学习
    - mathematic
---

## Gaussian Proceess
Multivariate Normal distribution 有个很重要的性质，就是 假设 N 个变量服从 Multivariate Normal distribution ， 从里面任意扣 n<N 个变量组成的vector 的联合分布仍然服从 Multivariate Normal distribution。 当处理 高维联合分布的时候， 大家非常喜欢 用 高斯分布。 

这里就需要一个有简单解析形式的，而又在一维上能无限扩展的东西来把有限和无限连接起来。这就是所谓的kernel tricks

<!-- more -->

### 问题 太flexible 
参数太多， overfitting， 
lab 好多人在跑 gaussian process simulation。 大家的经验是 Gaussian process只有参数和kernel 选的非常好的时候fit 才会好， 不然会失之千里。 相比之下 RBF radio basis function fit surface的效果更稳健。 

你不知道函数长什么样。但是你有一些样本，还有这些样本的函数值（带噪声）。高斯过程可以通过kernel距离，给你把这个函数补出来：给一个新的样本，高斯过程可以告诉你函数值是多少。

kernel function刻化相似性

时间序列分析
问有什么模型能够预测之前，先做随机性检验，多个相互延迟的序列相关性。不然很有可能本身就没规律，做feature engineering就没有用了。
![](https://pic1.zhimg.com/8a8392925fee69d77ba8ab5e43af0888_b.png)
![](https://pic4.zhimg.com/f990560d014ade608c88ec796aaf2bab_b.png)

### 参数模型
参数模型的函数形式是已知的，参数的维数是有限的。例如Gaussian模型

非参数模型不依赖特定的概率分布。函数形式与训练样本有关，其参数的维数不是固定的而会随着样本数目变化而变化。


## Kernel
Kernel 是一个二元函数$R^n \times R^m \to R^+$。按照定义应该叫做“covariance function”，描述两个变量的协方差函数。Kernel描述点与点之间距离。参见参考文献[3]。

Kernel是描述点与点之间关系或者距离，一种方法就是使用内积去刻化。$kernel(x,y)=<x,y>$。然后再考虑把$x,y$进行映射到一般希尔伯特空间。定义一个$\psi(x)$表示一个$R^n$到希尔伯特空间$V$的映射，也就是feature mapping，一般是从低维到高维的映射。

kernel trick就是说找到一个好的kernel可以大大降低计算feature复杂度。

kernel在ML这块，最为典型的就是SVM，GP，PCA。以下列举不同的kernel function [Kernel Functions for Machine Learning Applications](http://crsouza.com/2010/03/17/kernel-functions-for-machine-learning-applications/)

# 参考
[1] gaussianprocess：http://www.gaussianprocess.org/
[2] 如何通俗易懂地介绍 Gaussian Process？：https://www.zhihu.com/question/46631426/answer/102897248
[3] 机器学习中各种距离：http://blog.csdn.net/lifeitengup/article/details/8450545

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
