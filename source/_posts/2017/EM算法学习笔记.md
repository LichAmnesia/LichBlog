---
title: EM算法学习笔记
date: 2017-03-26 21:18:00
tags:
  - mathematic
  - 机器学习
---

# 1. 介绍
EM算法推导出来只是一个似然概率，以及一个求解步骤。要有实际意义还需要联系实际模型才有意义。

<!-- more -->

# 2. Jesen 不等式
如果$f$是凸函数，$X$是随机变量，那么有：
$$
E[f(X)] \ge f(EX)
$$
$\log$是凹函数，不等号反号。

# 3. EM 算法
给定的训练样本$\\{x^{(1)}, \cdots, x^{(m)}\\}$, 样例间独立，我们需要找到每个样例的隐含类别z，使得$p(x,z)$最大。$p(x,z)$最大似然估计如下：
$$
\mathcal{L}(\theta) = \sum\_{i=1}^{m} \log p(x;\theta) = \sum\_{i=1}^{m} \log \sum\_{z} p(x, z;\theta)
$$
第二个是每个样例可能的类别z求联合概率分布和，但是直接求$\theta$比较困难，因为隐含变量的原因。但是确定z之后就可以求解了，因为x是属于z个不同的概率分布的。

EM就相当于一种解决存在隐含变量优化问题的有效方法。既然不能直接最大化$\mathcal{L}$，那可以不断建立$\mathcal{L}$的$\inf$（E-step），然后优化下界$\inf$(M-step)。E-step固定$\theta$优化$Q$，M-step固定$Q$优化$\theta$。

对于每个样例i，让$Q\_i$表示该样例隐含变量的z某种分布。满足$\sum\_z Q\_i(z) = 1, Q\_i(z) \ge 0$。如果z连续那就换成积分。
$$ \begin{aligned}
\sum\_{i=1}^{m} \log p(x;\theta) &= \sum\_{i=1}^{m} \log \sum\_{z} p(x, z;\theta) \\\\
&= \sum\_{i=1}^{m} \log \sum\_{z} Q\_i(z^{(i)}) \frac{p(x, z;\theta)}{Q\_i(z^{(i)})} \\\\
&\ge  \sum\_{i=1}^{m} \sum\_{z} Q\_i(z^{(i)}) \log   \frac{p(x, z;\theta)}{Q\_i(z^{(i)})}
\end{aligned}
$$
这里相当于对$\mathcal{L}$求下界了。其实$\mathcal{L}$只是取决于$Q\_i(z^{(i)})$和$p(x^{(i)},z^{(i)})$。根据Jensen不等式，等号成立需要随机变量变成常数也就是:
$$
\frac{p(x, z;\theta)}{Q\_i(z^{(i)})} = c
$$
其实就是$\sum\_z p(x^{(i)}, z^{(i)};\theta) = c$。所以
$$
Q\_i(z^{(i)}) = \frac{p(x^{(i)}, z^{(i)};\theta)}{\sum\_z p(x^{(i)}, z;\theta)} = p(z^{(i)} \vert x^{(i)};\theta)
$$
假如固定$\theta$，$Q\_i(z^{(i)})$就是后验概率。然后我们就可以在E-step算出$Q$。到M-step，就是在给定$Q\_i(z^{(i)})$后，调整$\theta$去最大化$\mathcal{L}$。

**E-step**：
$$
Q\_i(z^{(i)}) = p(z^{(i)} \vert x^{(i)};\theta)
$$

**M-step**：
$$
\theta = \arg \max\_{\theta} \sum\_{i=1}^{m} \sum\_{z} Q\_i(z^{(i)}) \log   \frac{p(x, z;\theta)}{Q\_i(z^{(i)})}
$$
# 4. 总结
样本是观察值，潜在类别也可以作为latent变量，聚类问题也是参数估计问题。比较明确的例子就是混合高斯模型。

# 参考
[1]（EM算法）The EM Algorithm：http://www.cnblogs.com/jerrylead/archive/2011/04/06/2006936.html
[2] 混合高斯模型（Mixtures of Gaussians）和EM算法：http://www.cnblogs.com/jerrylead/archive/2011/04/06/2006924.html
[3] Using EM To Estimate A Probablity Density
With A Mixture Of Gaussians：http://www-clmc.usc.edu/~adsouza/notes/mix_gauss.pdf
[4] Gaussian mixture models and the EM algorithm：https://people.csail.mit.edu/rameshvs/content/gmm-em.pdf

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info