---
title: LDA解析
date: 2017-02-05 17:51:15
tags:
  - mathematic
  - 机器学习
  - Bayesian
---


# 1. 介绍
Latent Dirichlet Allocation(LDA)。是在文本建模中很著名的模型，可以用于浅层语义分析，在文本语义分析中是一个很有用的模型。这个模型涉及数学知识包括Gamma函数，Dirichlet分布，Dirichlet-Multinomial共轭，Gibbs Sampling，Variantional Inference（变分推理）

<!-- more -->

# 2. Gamma 函数
$$
\Gamma(x) = \int_0^{\infty} t^{x-1}e^{-t}dt
$$
具有递归性质：
$$
\Gamma(x + 1) = x \Gamma(x)
$$
并且可以当做阶乘在实数集上的延伸：
$$
\Gamma(n) = (n - 1)!
$$
Gamma函数是Convex Function，并且$\log \Gamma(x)$也是Convex Function。
### 2.1 Beta 函数
$$
B(m, n) = \int_0^1 x^{m - 1}(1-x)^{n-1}dx= \frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}
$$
### 2.2 Digamma 函数
$$
\Psi (x) = \frac{d\log \Gamma(x)}{dx}
$$
具有性质：
$$
\Psi (x + 1) = \Psi (x)  + \frac{1}{x}
$$

### 2.3 二项分布到 Gamma 分布
Gamma 函数变换得到 Gamma 分布。
$$
\begin{aligned}
\int_0^{\infty} \frac{x^{\alpha - 1}e^{-x}}{\Gamma(\alpha)} dx = 1
\end{aligned}
$$
取积分中的函数作为概率密度函数。
$$
Gamma(x \vert \alpha) = \frac{x^{\alpha - 1}e^{-x}}{\Gamma(\alpha)}
$$
并且再做变换$x = \beta t$，就得到分布的更一般形式。注意替换的时候$dx$这边会多个$t$。
$$
Gamma(x \vert \alpha, \beta) = \frac{\beta^\alpha t^{\alpha - 1}e^{-\beta t}}{\Gamma(\alpha)}
$$
$\alpha$称为shape parameter，决定分布曲线的形状；而$\beta$称为rate parameter，决定曲线有多陡。

指数分布和$\chi^2$都是特殊的 Gamma 分布。并且再贝叶斯统计分析中广泛使用作为其他分布的先验分布。

泊松分布是由二项式分布求极限所得，Gamma分布是泊松分布在正实数集上的连续化版本。
$$
Poisson(X = k \vert \lambda) = \frac{\lambda ^k e^{-\lambda}}{k!}
$$
取 Gamma 分布，$\alpha = k + 1$
$$
Gamma(x \vert \alpha = k+1) = \frac{x^{k}e^{-x}}{k!}
$$
形式一致，但是 Poisson 离散，Gamma 分布连续。

# 3. Beta/Dirichlet 分布
### 3.1 Beta 分布
Beta函数可由Gamma函数推理得到的。
$$
f(x) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)} x^{\alpha - 1}(1-x)^{\beta - 1}
$$
### 3.2 Beta-Binomial 共轭（conjugate）
贝叶斯参数估计基本过程就是：**先验分布 +数据知识＝后验分布**
$$
Beta(p \vert \alpha, \beta) + BinomCount(m_1,m_2) = Beta(p \vert \alpha + m_1, \beta + m_2).
$$
此处共轭的意思就是，数据符合二项分布的时候，参数的先验分布和后验分布都能保持 Beta 分布的形式。

假设一个不均匀硬币，抛出正面概率为p,抛出m次后出现正面反面次数分别为$m_1,m_2$。从贝叶斯学派而言，首先假设$p \sim Uniform(0, 1)$。按照贝叶斯公式计算后验概率：
$$
\begin{aligned}
P(p \vert m_1, m_2) &= \frac{P(p) \cdot P(m_1,m_2 \vert p) }{P(m_1,m_2)} \\\\
&= \frac{1 \cdot P(m_1,m_2 \vert p)}{\int_0^1 P(m_1,m_2\vert t)dt} \\\\
&= \frac{	\tbinom{m}{m_1}p^{m_1} (1-p)^{m_2}}{\int_0^1 \tbinom{m}{m_1}t^{m_1} (1-t)^{m_2}dt} \\\\
&= \frac{	p^{m_1} (1-p)^{m_2}}{\int_0^1 t^{m_1} (1-t)^{m_2}dt}
\end{aligned}
$$
正好是$Beta(p \vert m_1 + 1, m_2 + 1)$。

### 3.3 Dirichlet 分布
Dirichlet 分布是 Beta 分布在高维度的推广。
$$
Dir(x_1,x_2,x_3 \vert \alpha\_1,\alpha\_2,\alpha\_3) = f(x_1,x_2,x_3) = \frac{\Gamma(\alpha\_1+ \alpha\_2+\alpha\_3)}{\Gamma(\alpha\_1)\Gamma(\alpha\_2)\Gamma(\alpha\_3)} x_1^{\alpha\_1-1}x_2^{\alpha\_2-1}x_3^{\alpha\_3-1}
$$
也可以采用贝叶斯过程：
$$
Dir(\vec{p}\vert \vec{k}) + MultCount(\vec m) = Dir(\vec p \vert \vec k + \vec m)
$$
以上就是**Dirichlet-Multinomial**共轭。

一般形式的 Dirichlet 分布：
$$
Dir(\vec{p}\vert \vec{\alpha}) = \frac{\Gamma(\sum_{k=1}^{K}\alpha\_k)}{\prod_{i=1}^{K}\Gamma(\alpha\_k)}\prod_{k=1}^{K}p_k^{\alpha\_k- 1} = \frac{1}{(
\triangle\vec \alpha)} \prod_{k=1}^{K}p_k^{\alpha\_k- 1}
$$

其中$\triangle\vec \alpha$ 称之为 Dirichlet 分布的归一化系数，并且根据 Dirichlet 分布积分为1，可以得到。
$$
\int \prod\_{k=1}^{K} p\_k^{\alpha\_k - 1} d\vec p = \triangle \vec \alpha
$$
对于给定的$\vec p$和N,多项分布为：
$$
Mult(\vec{n}\vert \vec{p},N) = \dbinom{N}{\vec{n}}\prod\_{k=1}^{K}p\_k^{n\_k}
$$
这两个分布是共轭关系。Dirichlet-Multinomial共轭，即数据符合多项式分布时，参数的先验分布和后验分布都能保持狄利克雷分布的形式。
### 3.4 一点性质
如果$p \sim Beta(t \vert \alpha, \beta)$
$$
E(p) = \frac{\alpha}{\alpha + \beta}
$$
说明对于 Beta 分布的随机变量，均值可以使用$\frac{\alpha}{\alpha + \beta}$来估计。
同样对于Dirichlet 分布。
$$
E(\vec p) = (\frac{\alpha\_1}{\sum {\alpha\_i}}, \frac{\alpha\_2}{\sum {\alpha\_i}}, \cdots, \frac{\alpha\_K}{\sum {\alpha\_i}})
$$

# 4. MCMC 和 Gibbs Sampling
常见的概率分布，无论是连续还是离散分布，都可以基于$Uniform(0, 1)$样本得到。

当然在如下情况我们无法生成样本：

- $p(x) = \frac{\tilde{p}(x)}{\int \tilde{p}(x) dx }$。我们无法计算底下积分形式。
- $p(x,y)$是个二维分布函数，本身很难计算，但是条件分布相对简单。

### 4.1 马尔科夫链
定义很简单，状态转移指依赖前一个状态。
$$
P(Y\_1,\cdots, Y\_N) = P(Y\_1) \prod\_{i=2}^{N}P(Y\_i \vert Y\_{i-1})
$$

马氏链具有状态转移矩阵P，保证它的任何两个状态是联通的，那一定会**收敛**。**这是MCMC方法理论基础**。
$$
\lim\_{n \to \infty} P\_{ij}^{n} = \pi(j)
$$
$$
\sum\_{i=  0}^{\infty}\pi\_i = 1
$$
#### 4.2 Markov Chain Monte Carlo
这个算法就是常用的 Metropolis-Hastings 算法。Metropolis-Hastings算法利用马尔可夫链的细致平衡条件，取得联合分布的采样，有了联合分布的采样就可以得到边缘分布，进而可以推断出贝叶斯中的后验分布。

细致平稳条件：非周期马氏链转移矩阵P和分布$\pi(x)$满足，$\pi(x)$是马氏链的平稳分布。
$$
\pi(i)P\_{ij} = \pi(j)P\_{ji}, \forall i,j
$$
因为通常情况下会导致等号两边不等，所以引入接受率$\alpha(i,j)$
$$
p(i)q(i,j)\alpha(i,j) = p(j)q(j,i)\alpha(j,i).
$$
其中Q为马氏链转移矩阵，p(x)为当前分布。
![](http://7xrh75.com1.z0.glb.clouddn.com/MCMC.PNG)

### 4.3 Gibbs Sampling
Gibbs Sampling是针对Metropolis-Hastings算法在高维空间效率不高的情况（接受率$\alpha$通常小于1），将其在二维空间的应用。即在Gibbs采样中马氏链的转移只是轮换的沿着坐标轴x轴和y轴做转移，最终可以得到P(x,y)的样本。也可以把Gibbs采样扩展到n维。

一般就是轮换坐标轴，然后按照条件概率做转移。马氏链也是一样可以收敛的。

以下是n维Gibbs Sampling算法：
![](http://7xrh75.com1.z0.glb.clouddn.com/LDA%E8%A7%A3%E6%9E%90/n_Gibbs.PNG)

# 5. 文本建模
### 5.1 Unigram Model
假设文档是由从一个装有无穷多骰子的坛子里，取出来，每个骰子有V个面，V表示各个词。每次从坛子里去一个骰子，然后用这个骰子不断的抛，最后产生语料中所有词。一般是把整个文档都看到一起来算的。

语料W的产生概率$p(W)$，以及骰子各个面概率$\vec p = (p\_1, p\_2, \cdots, p\_V)$。因为我们不知道具体选了哪个骰子，所以需要进行积分求解：
$$
p(W) = \int p(W \vert \vec p)p(\vec p) d\vec p
$$
此处先验分布$p(\vec p)$就有很多选择了。
$$
p(\vec n) = Mult(\vec n \vert \vec p, N) = \dbinom{N}{\vec n} \prod\_{k=1}^{V} p\_k^{n\_k}
$$
此时，语料的概率是：
$$
p(W \vert \vec p) = \prod\_{k=1}^{V} p\_k^{n\_k}
$$
实际上是一个多项分布的概率，可以改成 Dirchlet 分布。这样就可以得到后验分布的 Dirichlet 分布。
$$
Dir(\vec{p}\vert \vec{\alpha}) = \frac{1}{(
\triangle\vec \alpha)} \prod\_{k=1}^{V}p\_k^{\alpha\_k- 1}
$$
$$
Dir(\vec p \vert \vec \alpha) + MultCount(\vec n) = Dir(\vec p \vert \vec \alpha + \vec n)
$$
推出后验分布：
$$
p(\vec p \vert W, \vec \alpha) = Dir(\vec p \vert \vec \alpha + \vec n) = \frac{1}{\triangle(\vec n + \vec \alpha)} \prod\_{k=1}^{V}p\_k^{n\_k + \alpha\_k- 1} d\vec p
$$
使用上一节的$E(\vec p)$可以得到
$$
\hat p\_i = \frac{n\_i + \alpha\_i}{\sum_{i=1}^{V}(n_i + \alpha\_i)}
$$
至此，计算文本语料的产生概率
$$
\begin{aligned}
p(W \vert  \vec \alpha) &= \int p(W \vert \vec p) p(\vec p \vert \vec \alpha) d\vec p \\\\
&= \int\prod\_{k=1}^{V}p\_k^{n\_k } Dir(\vec p \vert \vec \alpha) d\vec p \\\\
&= \int\prod\_{k=1}^{V}p\_k^{n\_k } \frac{1}{
\triangle\vec \alpha} \prod\_{k=1}^{V}p\_k^{\alpha\_k- 1} d\vec p \\\\
&= \frac{\triangle(\vec n + \vec \alpha)}{\triangle \vec \alpha}
\end{aligned}
$$
### 6. LDA 文本建模
现在多了两个变量，一个是 Topic，一个是原本的词模型。这里语料库的文档是相互独立的。
![](http://7xrh75.com1.z0.glb.clouddn.com/LDA%E8%A7%A3%E6%9E%90/LDA_1.PNG)
![](http://7xrh75.com1.z0.glb.clouddn.com/LDA%E8%A7%A3%E6%9E%90/LDA_2.PNG)
假设语料库有 M 篇文档，所有的 word 和对应 topic 如下：
$$
\vec w = (\vec w\_1, \cdots, \vec w\_M) \\\\
\vec z = (\vec z\_1, \cdots, \vec z\_M)
$$
其中$\vec w\_m$表示对应第 m 篇文章的词，$\vec z\_m$表示对应的 topic 编号。

这样可得到M个因为文档而项目独立的 Dirichlet-Multinomial 共轭结构。

原本是先抛一个doc-topic的骰子得到topic，然后抛topic-word骰子得到word。因为所有动作都是独立的，可以交换顺序，先抛N次把所有词的topic确定，然后再抛生成所有词。

这样重新安排顺序，让所有在一个topic的词在一起，这样把第二个过程变成K个相互独立 Dirichlet-Multinomial 共轭结构。最终得到：

$$
\begin{aligned}
p(\vec w, \vec z \vert \vec \alpha, \beta) &= p(\vec w \vert \vec z, \vec \beta) p(\vec z \vert \vec \alpha) \\\\
&= \prod\_{k=1}^{K} \frac{\triangle (\vec n\_k + \vec \beta)}{\triangle \vec \beta} \cdot \prod\_{m=1}^{M} \frac{\triangle (\vec n\_m + \vec \alpha)}{\triangle \vec \alpha}
\end{aligned}
$$
### 6.1 Gibbs Sampling in LDA
有了联合概率分布$p(\vec w, \vec z)$，就可以使用 MCMC 算法了。所以使用Gibbs 对分布进行采样。因为$\vec w$是观测数据，只有$\vec z$是隐含变量，所以我们需要采样分布$p(\vec z \vert \vec w)$。

# 参考
[1] lda学习一丢丢：http://www.jianshu.com/p/f4140f987fab
[2] LDA 数学八卦：http://www.52nlp.cn/lda-math-%E6%B1%87%E6%80%BB-lda%E6%95%B0%E5%AD%A6%E5%85%AB%E5%8D%A6
[3] 通俗理解LDA主题模型：http://blog.csdn.net/v_july_v/article/details/41209515
[4] [python] LDA处理文档主题分布代码入门笔记：http://blog.csdn.net/eastmount/article/details/50824215
[5] Latent Dirichlet Allocation (LDA) with Python：https://rstudio-pubs-static.s3.amazonaws.com/79360_850b2a69980c4488b1db95987a24867a.html
[6] Gensim and LDA: a quick tour：http://nbviewer.jupyter.org/gist/boskaiolo/cc3e1341f59bfbd02726
[7] VARIATIONAL INFERENCE: FOUNDATIONS AND INNOVATIONS：http://www.cs.columbia.edu/~blei/talks/Blei_VI_tutorial.pdf
[8] Probabilistic Topic Models and User Behavior：http://www.cs.columbia.edu/~blei/talks/Blei_User_Behavior.pdf

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
