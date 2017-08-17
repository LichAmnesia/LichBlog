---
title: MCMC 和 Gibbs 比较
date: 2017-08-17 15:35:51
tags:
    - 机器学习
    - mathematic
---

## 条件
需要满足细致平稳条件 equilibrium distribution

马尔可夫链有个重要性质就是n次迭代后能够收敛达到稳态。

Gibbs Sampling 是Metropolis Hastings算法特例。

得到的是一个参数估计，能够生成新的样本，符合原本样本的分布情况。

## Kernel Density 
核密度估计是直方图的一个自然拓展。
用来描述样本在某个点的密度值。

# 参考
[1] [LDA-math-MCMC 和 Gibbs Sampling](https://cos.name/2013/01/lda-math-mcmc-and-gibbs-sampling/)    

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
