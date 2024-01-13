---
title: 推荐系统（Recommendation System）笔记
date: 2017-04-24 21:36:36
tags:
  - 机器学习
  - mathematic
  - DeepLearning
---


# 1. 介绍
推荐引擎根据不同的推荐机制可能用到数据源中的一部分，然后根据这些数据，分析出一定的规则或者直接对用户对其他物品的喜好进行预测计算。这样推荐引擎可以在用户进入的时候给他推荐他可能感兴趣的物品。

<!-- more -->

### 1.1 分类
推荐系统可以根据不同指标进行分类。

可以根据数据源进行分类：
- Demographic-based Recommendation。根据系统用户的基本信息发现用户的相关程度，这种被称为基于人口统计学的推荐。简单地根据系统用户基本信息发现用户相关程度，然后将相似用户喜爱的其他物品推荐给当前用户。
- Content-based Recommendation。根据推荐物品或内容的元数据，发现物品或者内容的相关性，这种被称为基于内容的推荐
- Collaborative Filtering-based Recommendation。根据用户对物品或者信息的偏好，发现物品或者内容本身的相关性，或者是发现用户的相关性

根据推荐模型的建立方式进行分类：
- 基于物品和用户本身，这种推荐引擎将每个用户和每个物品都当作独立的实体，预测每个用户对于每个物品的喜好程度，这些信息往往是用一个二维矩阵描述的。由于用户感兴趣的物品远远小于总物品的数目，这样的模型导致大量的数据空置，即我们得到的二维矩阵往往是一个很大的稀疏矩阵。同时为了减小计算量，我们可以对物品和用户进行聚类， 然后记录和计算一类用户对一类物品的喜好程度，但这样的模型又会在推荐的准确性上有损失。
- 基于关联规则的推荐（Rule-based Recommendation）：关联规则的挖掘已经是数据挖掘中的一个经典的问题，主要是挖掘一些数据的依赖关系，典型的场景就是“购物篮问题”，通过关联规则的挖掘，我们可以找到哪些物品经常被同时购买，或者用户购买了一些物品后通常会购买哪些其他的物品，当我们挖掘出这些关联规则之后，我们可以基于这些规则给用户进行推荐。
- 基于模型的推荐（Model-based Recommendation）：这是一个典型的机器学习的问题，可以将已有的用户喜好信息作为训练样本，训练出一个预测用户喜好的模型，这样以后用户在进入系统，可以基于此模型计算推荐。这种方法的问题在于如何将用户实时或者近期的喜好信息反馈给训练好的模型，从而提高推荐的准确度。

下面介绍一下各个推荐机制的工作原理：
# 2. 基于人口统计学的推荐
基于人口统计学的推荐机制（Demographic-based Recommendation）是一种最易于实现的推荐方法。它简单地根据系统用户基本信息发现用户相关程度，然后将相似用户喜爱的其他物品推荐给当前用户。

比如用户基本信息发现A和B年龄性别等等相似，算一个用户相似度。然后称他们为邻居，基于邻居用户群的喜好推荐给当前用户一些物品。

**好处**：
因为不使用当前用户对物品的喜好历史数据，所以对于新用户来讲没有“冷启动（Cold Start）”的问题。
这个方法不依赖于物品本身的数据，所以这个方法在不同物品的领域都可以使用，它是领域独立的（domain-independent）。

**问题**：当然这个分类比较粗糙。根本无法胜任精细问题。

# 3. 基于内容的推荐
### 3.1 介绍
基于内容的推荐是在推荐引擎出现之初应用最为广泛的推荐机制，它的核心思想是根据推荐物品或内容的元数据，发现物品或者内容的相关性，然后基于用户以往的喜好记录，推荐给用户相似的物品。

基本包括三个步骤：
1. Item Representation：为每个item抽取出一些特征表示。
2. Profile Learning：利用用户过去喜欢（不喜欢）的特征数据，学习用户喜欢的特征表示。
3. Recommendation Generation：通过比较上一步得到的用户profile特征和候选item的特征，进行推荐。计算的是item和profile的相关度，然后进行推荐。当然这个取决于学习算法的结果，也可以是直接返回最可能的item给用户。

比如，建立一个电影推荐的模型。算一个电影之间的相似度。假设电影A和C相似，电影B不同，那么用户看过A那么他更可能看C而不是B。A和C的Vector表示相似。然后用户的Vector表示和C更相似所以推荐C。

### 3.2 优点与问题
**好处**：可以更精细的推荐，用户都是独立的，解释性，新item和旧item是等同可能性被推荐
**问题**：
1. 需要物品进行建模，但是item的建模不一定有很好区分度，目前对于文本我们的表示精度不错，但是如果item是人或者是电影，就无法区分了。
2. ~~只考虑了物品相互特征，没有考虑人的态度~~
3. 因为需要用户喜好历史，新用户就有“冷启动”问题。
4. 无法得到用户潜在兴趣。

下面介绍三个步骤的详细过程：
### 3.3 Item Represetation
真实Item会有一些属性，包括结构化和非结构化的。结构化就是有意义的信息比如价格、产地这样的。但是也有非结构化的，比如item的评论。

文本的表示一般称之为**向量空间模型（Vector Space Model, VSM）**。当然最简单的就是使用[Tf-idf](https://zh.wikipedia.org/wiki/TF-IDF)表示文档。这里不进行详细阐述了。目前还有paragraph to vector这样的方法进行向量化表示文档。这些都在`Gensim`上有实现可以方便调用。

### 3.4 Profile Learning
理论上机器学习的分类算法都可以使用到这里，因为已知用户对一些item的喜欢（不喜欢），为他产生一个模型，这样对于一个新的item，我们判定喜欢还是不喜欢。典型的supervised分类问题。可以使用Logistic Regression，SVM，Decision Tree这样的基于每一个用户训练一个模型，特征是item Representation的，然后category是用户喜欢不喜欢。并且我们可以很方便地把推荐结果来排序。

**KNN**：
对于一个新的item，找到用户评价过的最相似的k个item，然后根据这个k个的用户评价得到新item的喜好程度。此文献[^f1]建议结构化使用欧几里得算相似度，使用VSM表示item则用cosine相似度。

**Rocchio算法**：
这是相关反馈的算法。比如你在搜索引擎里搜“苹果”，当你最开始搜这个词时，搜索引擎不知道你到底是要能吃的水果，还是要不能吃的苹果，所以它往往会尽量呈现给你各种结果。当你看到这些结果后，你会点一些你觉得相关的结果（这就是所谓的相关反馈了）。然后如果你翻页查看第二页的结果时，搜索引擎可以通过你刚才给的相关反馈，修改你的查询向量取值，重新计算网页得分，把跟你刚才点击的结果相似的结果排前面。可以使用Rocchio得到用户的profile表示为$q_u$
$$
q\_u =  \alpha q\_0 +  \beta \frac{1}{\vert I\_r \vert} \sum\_{w\_j \in I\_r} w\_j - \gamma \frac{1}{\vert I\_{nr} \vert} \sum\_{w\_j \in I\_{nr}} w\_j
$$
$I\_r$是用户喜欢集合，$I\_{nr}$是用户不喜欢集合。$w\_j$是物品表示，$\beta,\gamma$作为正负反馈权重，所以我们可以使用$q\_u$和$w\_j$的相似度来算用户u对j的喜好。

参考[wiki](https://en.wikipedia.org/wiki/Rocchio_algorithm)原公式是考虑的原本$q\_0$也就是用户原先的表示的，然后$\alpha$是权重。但是参考文献3直接设置为$\alpha=0$，不知道为什么不考虑，这样才是一个实时更新的过程。留个问号在这里。

**决策树算法**
当属性是结构化数据，决策树是个好选择。

**线性分类**
目的是找一个超平面，把$I\_r$和$I\_{nr}$两个集合分开。这和普通线性分类问题没有区别，所以也就不展开了。可以使用logistics和SVM。

**朴素贝叶斯**
用来做文本分类。

**一点想法**
如果这个问题归为文本分类的问题，那么最好的方法应该还是Gated Recurrent Neural Network然后再加上Hierachical Attention的方法。

### 3.5 Recommendation Generation
如果上一步Profile Learning中使用的是分类模型（如DT、LC和NB），那么我们只要把模型预测的用户最可能感兴趣的 n 个item作为推荐返回给用户即可。而如果Profile Learning中使用的直接学习用户属性的方法（如Rocchio算法），那么我们只要把与用户属性最相关的 n 个item作为推荐返回给用户即可。其中的用户属性与item属性的相关性可以使用如cosine等相似度度量获得。

# 4 协同过滤推荐
它的原理很简单，就是根据用户对物品或者信息的偏好，发现物品或者内容本身的相关性，或者是发现用户的相关性，然后再基于这些关联性进行推荐。基于协同过滤的推荐可以分为三个子类：基于用户的推荐（User-based Recommendation），基于项目的推荐（Item-based Recommendation）和基于模型的推荐（Model-based Recommendation）。下面我们一个一个详细的介绍着三种协同过滤的推荐机制。

**基于用户的协同过滤推荐：**
基于用户的协同过滤推荐的基本原理是，根据所有用户对物品或者信息的偏好，发现与当前用户口味和偏好相似的“邻居”用户群，在一般的应用中是采用计算“K- 邻居”的算法；然后，基于这 K 个邻居的历史偏好信息，为当前用户进行推荐。

假设用户1喜欢物品A和C，用户2喜欢ABC，那么可以得到1和2相似，接下来推荐物品B给用户1。

基于用户的协同过滤推荐机制和基于人口统计学的推荐机制都是计算用户的相似度，并基于“邻居”用户群计算推荐，但它们所不同的是如何计算用户的相似度，基于人口统计学的机制只考虑用户本身的特征，而基于用户的协同过滤机制可是在用户的历史偏好的数据上计算用户的相似度，它的基本假设是，喜欢类似物品的用户可能有相同或者相似的口味和偏好。

**基于项目的协同过滤推荐**：
基于项目的协同过滤推荐的基本原理也是类似的，只是说它使用所有用户对物品或者信息的偏好，发现物品和物品之间的相似度，然后根据用户的历史偏好信息，将类似的物品推荐给用户。

比如：假设用户1喜欢物品A和C，用户2喜欢ABC，那么可以得到物品A和C比较类似。对于一个新的用户3假如喜欢A那么他很有可能也喜欢C。

基于项目的协同过滤推荐和基于内容的推荐其实都是基于物品相似度预测推荐，只是相似度计算的方法不一样，前者是从用户历史的偏好推断，而后者是基于物品本身的属性特征信息。

**总结**：上面两个适用不同情况，比如Amazon用户可能喜好会变，但是物品特征很难改变。而且用户数目大于物品，所以算物品相似度之类的比较快。

**基于模型的协同过滤推荐**：
基于模型的协同过滤推荐就是基于样本的用户喜好信息，训练一个推荐模型，然后根据实时的用户喜好的信息进行预测，计算推荐。

好处就是不需要对物品和用户进行严格建模，是领域无关的。这种方法计算出来的推荐是开放的，可以共用他人的经验，很好的支持用户发现潜在的兴趣偏好

# 5. Collaborative Topic Regression
CTR是将概率矩阵分解（PMF）和LDA结合到同一个概率框架下，也就是将基于内容的推荐和协同过滤结合，可以很好地解决冷启动问题。

# 6. Matrix Factorization
learns user and item latent factors (U an V) by minimizing reconstruction error on observed ratings. Formally, in an optimization framework it is given as
$$
\min\_{U,V}\sum\_{u,i}(r\_{ui}−U\_uV\_i^T)^2+\lambda(\Vert U\Vert ^2\_2+\Vert V\Vert ^2\_2
)
$$
First of all, when there is an optimization technique involved, it's definitely a ML thing.
Let's make this more clear by converting it to our own favorite Linear regression problem. So if you fix any one of the latent factor, say U, then it becomes linear regression on V. This way of optimization is well known in literature as ALS(alternating Least Squares). Again, ML guy who knows linear regression is very happy :).

U是$R^{U\times K}$,V是$R^{V\times K}$，k是隐变量大小。

最终模型参数$P=(p\_1, \cdots, p\_U)^T$和$Q = (q\_1, \cdots, q\_M)^T$。那么用户$u$对电影$m$的预测评分就是：
$$
\hat r\_{u,m} = p\_u^T q\_m = \sum\_{k=1}^{K} p\_{uk} \cdot q\_{mk}
$$

### 6.1 MF算法
选择潜在因子数K，惩罚参数$\lambda$和学习率$\eta$。初始化模型参数$P$和$Q$。
1. 每个用户-电影$(u,m) \in P$。
2. 计算评分残差$e\_{u,m} = r\_{u,m} - \hat r\_{u,m} $。更新用户$u$和电影$m$的因子向量：
$$
\begin{aligned}
p\_{uk} += \eta \cdot (e\_{u,m} q\_{mk} - \lambda p\_{uk})\\\\
q\_{mk} += \eta \cdot (e\_{u,m} p\_{uk} - \lambda q\_{mk})
\end{aligned}
$$
3. 计算新的`Probe RMSE`，如果更小，则继续更新，否则终止。一般学习率$\eta = 0.001$，惩罚参数$\lambda=0.005$

### 6.2 Biased MF
为了改进基础MF算法，引入一个评分偏差，防止过拟合。原始公式就变成了：
$$
\hat r\_{u,m} = b\_u + b\_m + p\_u^T q\_m = \sum\_{k=1}^{K} p\_{uk} \cdot q\_{mk} + b\_u + b\_m
$$
则最小化目标函数变成：
$$
\min\_{P,Q}\sum\_{u,m}(r\_{u,m}− b\_u - b\_m  -p\_u^T q\_m)^2+\lambda\_1(\Vert P\Vert ^2\_2+\Vert Q\Vert ^2\_2
) + \sum\_{u,m}\lambda\_2 (b\_u + b\_m - \overline{r}
)^2
$$
其中$\overline{r}$是全局评分均值，$\lambda$为两个惩罚参数。当然仍然可以使用梯度下降法或者交替最小二乘法最小化。

**梯度下降迭代算法**如下：
选择潜在因子数K，惩罚参数$\lambda\_1$,$\lambda\_2$和学习率$\eta$。初始化模型参数$P$和$Q$，$b\_*$。
1. 每个用户-电影$(u,m) \in P$。
2. 计算评分残差$e\_{u,m} = r\_{u,m} - \hat r\_{u,m} $。更新用户$u$和电影$m$的因子向量：
$$
\begin{aligned}
p\_{uk} += \eta \cdot (e\_{u,m} q\_{mk} - \lambda\_1 p\_{uk})\\\\
q\_{mk} += \eta \cdot (e\_{u,m} p\_{uk} - \lambda\_1 q\_{mk})
\end{aligned}
$$
同时更新用户$u$和电影$m$的偏差：
$$
\begin{aligned}
b\_u += \eta \cdot \left(e\_{u,m} - \lambda\_2 \cdot(b\_u + b\_m - \overline{r})\right)\\\\
b\_m += \eta \cdot \left(e\_{u,m} - \lambda\_2 \cdot(b\_u + b\_m - \overline{r})\right)
\end{aligned}
$$
3. 计算新的`Probe RMSE`，如果更小，则继续更新，否则终止。一般学习率$\eta = 0.001$，惩罚参数$\lambda=0.005$

### 6.3 Probabilistic MF(PMF)
使用图模型推导MF。

### 6.4 二项矩阵分解（Binomial MF）模型
上面的PMF模型假设给定用户和电影的潜在因子后，对应的评分随机变量满足正态分布。但对于很多实际的CF问题，允许的评分往往只包括若干个整数值。这样正态分布就不合理了。所以可以使用多项分布来替代正态分布。但是由于多项分布可能会多峰（multimodal）但是实际上分布应该是单峰的（unimodal）。所以，多项分布的多峰性并不适合，所以还是选择二项分布比较好。

这里$B(k\vert n,p)$表示具有参数$n$和$p$的二项分布函数，$S$为界定允许评分范围的定值(假设评分是1,2,3,4,5那么$S=5$)。而$\beta\_{um}$为用户$u$和电影$m$的潜在因子随机向量点积的某函数值，这里采用sigmod函数。
$$
P(R\_{u,m} \vert P\_u, Q\_m) = B(R\_{u,m} - 1 \vert S-1, \beta\_{um})
$$
$$
\beta\_{um} = \frac{1}{1+e^{-P\_u^TQ\_m}}
$$
这样BMF中用户u给电影m评分r的概率为：
$$
P(R\_{u,m} =r \vert P\_{u}=p\_u, Q\_m=q\_m) = \binom{S-1}{r-1} \beta\_{um}^{r-1} (1-\beta\_{um})^{S-r}
$$
取个log-后验分布：
$$
\log P(P,Q\vert R,\Theta) = \sum\_{u,m} \left\\{ \log \right\\}
$$
等同于最小化目标函数：
$$
G(P,Q) = \frac{1}{2} \sum\_{u,m} \left\\{ (S-1) \log(1+e^{-p\_u^Tq\_m}) +(S-r\_{u,m})p\_u^Tq\_m\right\\} +\frac{\lambda}{2} \left\\{ \sum\_{u} \Vert p\_u \Vert \_2^2 + \sum\_{m} \Vert q\_m \Vert \_2^2 \right\\}
$$
然后类似MF求解方法。
$$
\hat r\_{u,m} = 1 +\frac{S-1}{1+e^{-p\_u^Tq\_m}}
$$
整个算法和MF一致：
选择潜在因子数K，惩罚参数$\lambda$和学习率$\eta$。初始化模型参数$P$和$Q$，可以从均匀或者正态分布抽取这些值。
1. 每个用户-电影$(u,m) \in P$。
2. 计算评分残差$e\_{u,m} = r\_{u,m} - \hat r\_{u,m} $。更新用户$u$和电影$m$的因子向量：
$$
\begin{aligned}
p\_{uk} += \eta \cdot (e\_{u,m} q\_{mk} - \lambda p\_{uk})\\\\
q\_{mk} += \eta \cdot (e\_{u,m} p\_{uk} - \lambda q\_{mk})
\end{aligned}
$$
3. 计算新的`Probe RMSE`，如果更小，则继续更新，否则终止。

# 参考
整体参考文献1，第三节主要参考文献3加上一些自己的补充。
[1] 探索推荐引擎内部的秘密，第 1 部分: 推荐引擎初探：http://www.ibm.com/developerworks/cn/web/1103_zhaoct_recommstudy1/index.html#icomments
[2] 推荐系统有哪些比较好的论文-知乎：https://www.zhihu.com/question/25566638
[3] 基于内容的推荐：http://breezedeus.github.io/2012/04/10/breezedeus-content-based-rec.html
[4] How exactly is machine learning used in recommendation engines?- Quora：https://www.quora.com/How-exactly-is-machine-learning-used-in-recommendation-engines
[^f1]: Michael J. Pazzani and Daniel Billsus. Content-Based Recommendation Systems, 2007.


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
