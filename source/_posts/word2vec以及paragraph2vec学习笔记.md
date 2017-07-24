---
title: word2vec 以及 paragraph2vec 学习笔记
date: 2017-03-26 21:10:06
tags:
  - 机器学习
  - DeepLearning
  - Python
---


# 1. 介绍
有这么一句话，长文本用`CBOW`，短文本用`lstm`。`CBOW`就是Word2Vec的一种训练方法。
doc2vec和topic model是一个层次的东西。

首先在word2vec之前，做NLP的都是使用BOW或者n-gram。用BOW会损失上下文信息，用n-gram导致数据维度太高和稀疏问题。而doc2vec和word2vec是无监督学习，完全可以当做pre-train。

<!-- more -->

# 2. word2vec
### 2.1 背景知识
**统计语言模型**(Statistical Language Model)是用来计算一个句子的概率的概率模型。最基本的就包括n-gram和神经网络两个模型。对于统计语言模型可以使用最大似然把目标函数设置为：
$$
\prod\_{w\in C} p(w \vert Context(w)).
$$
C表示语料库，Context表示w的上下文。

**神经概率语言模型**，使用到了**词向量**，那就是对词典D中任意词w，指定一个固定长度的向量$v\in \mathbb{R}^{m}$。这个神经网络包括输入，投影，隐藏层和输出层。其中W，U分别是投影层和隐藏层以及隐藏层和输出层的权值矩阵。p,q为隐藏层和输出层的偏置向量。

投影层$x\_w$规模是$(n-1)m$因为$Context(w)$含有$n-1$个单词的词向量，每个词向量长度为$m$,每个词向量首尾相拼。输出层为$\vert D\vert = N$，也就是语料库大小。

$$
\left\\{\begin{array}{l}
& z\_w = \tanh(Wx\_w +p) \\\\
& y\_w = U z\_w + q,
\end{array}
\right.
$$

这样输出层是一个$y\_w \in \mathbb{R}^N$的向量，但是这个不能表示成上下文为$Context(w)$下一个词恰好是词典中第i个词的概率，还需要做一个softmax归一化。然后似然函数$p(w \vert Context(w))$就可以写成。
$$
p(w \vert Context(w)) = \frac{e^{y\_{w,i}}}{\sum\_{j=1}^{\vert D\vert} e^{y\_{w,j}}}
$$
神经网络参数：$W\in \mathbb{R}^{n\_h \times (n-1)m}$, $p\in \mathbb{R}^{n\_h}$, $U \in \mathbb{R}^{N\times n\_h}$, $q \in \mathbb{R}^{N}$. 词向量参数$V(w) \in \mathbb{R}^m$

神经概率语言模型相对于n-gram具有2点**优势**：词语间相似性使用词向量体现。自带smooth。

### 2.2 词向量
最简单就是one-hot representation，也就是词典大小是哪个词，哪一位就是1。另一种是Distributed Represetation，根据词的latent space Represetation的距离来判断它们语义信息。

刚刚说的神经网络就可以把词向量进行训练出来。也可以使用LSA和LDA估计词向量。

### 2.4 Hierarchical Softmax 生成词向量
主要是使用Huffman树来构建，因为主要对negative sampling过程感兴趣，暂不介绍了。

### 2.5 基于Negative Sampling 生成词向量
简称NEG，是NCE（noise contrastive estimation）简化版本。是使用相对简单的随机负采样，相对于Hierarchical Softmax提高速度，并且改善词向量质量。

### 2.5.1 **CBOW** 模型
CBOW模型就是已知w的上下文$Context(w)$，需要预测w。对于给定的$Context(w)$，词w就是正样本标注为1，其他就是负样本标注为0，当然负样本太多需要Sampling。希望最大化：
$$
g(w) = \prod\_{u \in \\{w\\} \bigcup NEG(w)} p(u\vert Context(w)),
$$
其中：
$$
p(u\vert Context(w)) = \left\\{\begin{array}{ll}
& \sigma(x\_w^T \theta^u) & ,L^w(u) = 1\\\\
& 1- \sigma(x\_w^T \theta^u) &, L^w(u) = 0
\end{array}
\right.
$$
写成整体就是：
$$
p(u\vert Context(w)) =
[\sigma(x\_w^T \theta^u)]^{L^w(u)}
[1- \sigma(x\_w^T \theta^u)]^{1-L^w(u)}
$$
最大化$g(w)$就相当于最大化$\sigma(x\_w^T \theta^w)$同时最小化$\sigma(x\_w^T \theta^u)$。对于一个语料库C，函数:
$$
G = \prod\_{w\in C}g(w)
$$
就是最后优化目标。
$$
\mathcal{L}(w,u) = \log G = \sum\_{w\in C} \left\\{ \log [\sigma(x\_w^T \theta^w)] + \sum\_{u \in NEG(w)}\log [\sigma(-x\_w^T \theta^u)] \right\\}
$$
接下来推导$\theta^u$和$x\_w$公式。
$$
\theta^u = \theta^u + \eta [L^w(u) - \sigma(x\_w^T \theta^u)]x\_w.
$$
$$
\frac{\partial \mathcal{L}(w,u) }{\partial x\_w} = [L^w(u) - \sigma(-x\_w^T \theta^u)] \theta^u.
$$
$$
v(\tilde w) = v(\tilde w) + \eta \sum\_{u} \frac{\partial \mathcal{L}(w,u) }{\partial x\_w}, \tilde w \in Context(w)
$$
### 2.5.2 **skip-gram** 模型
也就是把上面的优化函数$G$改写：
$$
G = \prod\_{w\in C} \prod\_{u \in Context(w)}g(u)
$$
$$
g(u) = \prod\_{z \in \\{u\\} \bigcup NEG(u)} p(z\vert w).
$$
$$
p(z\vert w) = [\sigma(v(w)^T \theta^z]^{L^u(z)}[1-\sigma(v(w)^T\theta^z)]^{1-L^u(z)}
$$
### 2.5.3 负采样
对于负样本的词，基本就是一个带权采样问题。

### 2.6 Word2Vec源码的一些trick
$\sigma$近似计算，当$\vert x\vert>6$就直接设置为0,1
词典D采用hash进行存储。
</s>代替语料中换行符。
使用一个min\_count去掉低频词
Subsampling，设置一个词频阈值。
# 3 paragraph2vec
在进行训练的时候，假如一个新的paragraph matrix，每个paragraph都被映射到一个向量。也就是算的时候不仅仅是CBOW的临近的词，还加上一个paragraph。具体可以看参考[1]。

# 参考
[1] Distributed Representations of Sentences and Documents
[2] word2vec数学原理详解：http://suanfazu.com/t/word2vec-zhong-de-shu-xue-yuan-li-xiang-jie-duo-tu-wifixia-yue-du/178
[3] https://www.zhihu.com/question/21661274
[4] https://github.com/placebokkk/writing/blob/master/word_embedding_note/word_representation_note_en.pdf

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info