---
title: Introduction to Deep Learning
date: 2017-08-17 14:15:24
tags:
    - DeepLearning
    - MOOC
    - mathematic
---

# Introduction
My note for MOOC lesson Introduction to Deep Learning.

<!-- more -->

# Lecture 2:
### 2.1 Bag of words
**Problem:** no sequence. cannot represent the order of words.
This leads to **relearn** the ruls of language at each point in the sentence.

**markov assumption**: each state depends only on the last state. $P(x\_{t+1} \vert x\_t)$
**Problem**: from far past and future to accurately guess the correct word. So markov not work.

### 2.2 RNN
- word order
- share parameters across the sequence(W,U weight matrics)
- keep track of long-term dependencies

$x\_0$: vector representeation of first word,
$s\_0$: cell state at t=0
$s\_1$: cell state at t=1
For the $s\_1$
$$
s\_1 = tanh(Wx\_0+Us\_0)
$$
For $s\_2$:
$$
s\_2 = tanh(Wx\_1 + Us\_1)
$$
$s\_n$ can contain informmation from all past timesteps

### 2.4 possible task
**language model**: what most likely next word. output the possibility of each $s\_i$. aka softmax.
**classification**:sentiment on twitters. output at the end of the learning. Get (negative, nueral, positive) at the last state $s\_n$. aka softmax.
**machine translation**: 
encoder -> takes one setence fomr from one laguage you want to translate. output $s\_n$ to decoder
decoder -> $s\_n$ in encoder is the input for decoder. $s\_i$ to each input state of decoder.

### 2.5 Train: backpropagation
- take the derivative
- shift paremeters in the opposite direction.

### 2.6 Loss
we make prediction each time, loss at each timestep.
$$
\sum J (\Theta)
$$
$$
\frac{\partial J}{\partial W} = \sum\_t \frac{\partial J\_t}{\partial W}
$$
try **chain rule**:
$$
\frac{\partial J\_i}{\partial W} = \frac{\partial J\_i}{\partial y\_i}\frac{\partial y\_i}{\partial s\_i} \frac{\partial s\_i}{\partial W}
$$

Consider $s\_2$ and $t = 2$:
$$
\frac{\partial J\_2}{\partial W} = \frac{\partial J\_2}{\partial y\_2}\frac{\partial y\_2}{\partial s\_2} \frac{\partial s\_2}{\partial W}
$$
$$
s\_2 = tanh(Us\_1 + Wx\_2)
$$
$s\_2$ is dependent on $W$.
$$
\frac{\partial s\_2}{\partial W} = \frac{\partial s\_2}{\partial W} + \frac{\partial s\_2}{\partial s\_1}\frac{\partial s\_1}{\partial W} + \frac{\partial s\_1}{\partial s\_0}\frac{\partial s\_0}{\partial W}
$$

### 2.7 RNN Problem
**Problem**: because of chain rule, it will vanish gradient.
$$
\frac{\partial s\_n}{\partial s\_{n-1}} 
$$
Now we multiply a lot of small numbers. So the parameters become biased to capture shorter-term dependencies.

要看懂这块建议先看[Backward Propagation](http://cpmarkchang.logdown.com/posts/277349-neural-network-backward-propagation)的推导过程，以及[RNN推导](http://cpmarkchang.logdown.com/posts/278457-neural-network-recurrent-neural-network)和[RNN公式](http://www.cnblogs.com/yangperasd/p/5906604.html)。

[理解LSTM网络](https://www.yunaitong.cn/understanding-lstm-networks.html)

### 2.8 RNN Solution
1. activation function
2. initialization(weights matrix -> $I$ not zeros)
3. gated celss(lead to LSTM), complex unit with gates
LSTM的详解可以参看[理解LSTM网络](https://www.yunaitong.cn/understanding-lstm-networks.html)。

### 2.9 Solution for LSTM(translation task)
Give part of the output states of encoder to decoder. Like attention?


# Lecture 3: Deep Learning for Computer Vision
Learning is optimization of a function
### 3.1 CNN layers
一般是3D的数据，前两维是图像，第三维可以理解为RGB这样。

Input:[32x32x3]
**CONV**:this layer will computer the output of neurons that are connected to local regions in the input. If [32x32x12] this is 12 filters.
RELU: activation function, leave the size unchanged.
POOL: do downsampling operation. result in like [16x16x12]
FC: fully-connected layre computer the class scores. result in like [1x1x10] where the 10 numbers correspond to a class score.

### 3.2 
Depth: number of filters（）
Stride: filter step size（也就是每次移动的距离）
padding: zero-pad the input（input的边缘用不用0来进行填充）

# Lecture 4: Deep Generative Models
Using learning to generate images/speech/handwriting/language

**idea**: learn to understand data through generation

### 4.1 Setup
**Discriminative model**: give n examples $(x^{(i)}, y^{(i)})$, learn h: $X \to Y$.
**Generative model**: give n examples $x^{(i)}$, recover $p(x)$.
**Maximum-likelihood objective**: $\prod\_i p\_\theta(x) = \sum\_i \log p\_\theta (x)$
**Generation**: Sampling from $p\_\theta (x)$.

### 4.2 Autoregressive Models
build a next-step prediction model $p(x\_n \vert x\_1, \cdots, x\_{n-1})$.
If x is discrete, network outputs a probability for each possible value.
If x is continuous, network outputs parameters of simple distribution(Guassian mean and variance).

**Generation**: sample one step at a time, conditioned on all previous steps.
**RNN** can also be written as autoregressive language models
e.g. PixelRNN (van der Oord et al. 2016): Autoregressive RNN over pixels in an image

### 4.3 Problem about Autoregressive Models
autoregressive models are powerful density estimators. but **sequential generation** can be slow. not reflect the true generating process, not very good for learning representations.

### 4.4 Autoencoders for representation learning
input to encoder output(bottleneck layer), then latent representation to reconstruction.

So the loss is **Reconstruction loss**( forces hidden layer to represent information about the input),  **bottleneck hidden layer** forces network learn a compressed latent representation.

### 4.5 compression as implicit generative modeling

Variational Autoencoders（变分自动机）
Generative extension of autoencoders which allow sampling and estimating probabilities 
“Latent variables” with fixed prior distribution $p(z)$

Probabilistic encoder and decoder: $q(z\vert x), p(x \vert z)$.
Trained to maximize a lower bound on log-probability: 
$\log p(x) \ge E\_{z\sim q(z\vert x)}[\log  p(x\vert z) + \log p(z) - \log q(z)]$

### 4.6 Problems with VAEs
Encoder and decoder's output distributions are typically limited (diagonal-covariance Gaussian or similar).
**Generative Adversarial Networks**: make a generative model by having two neural networks compete with each other. 与一般的被用于Supervised Learning任务的深度神经网络不同，GAN同时要训练一个生成网络(Generator)和一个判别网络(Discriminator)，前者输入一个noise变量 z ，输出一个伪图片数据$ G(z;θ\_g)$ ，后者输入一个图片(real image)／伪图片(fake image)数据 x ，输出一个表示该输入是自然图片或者伪造图片的二分类置信度 $D(x;θ\_d)$ ，理想情况下，判别器 D 需要尽可能准确的判断输入数据到底是一个真实的图片还是某种伪造的图片，而生成器G又需要尽最大可能去欺骗D，让D把自己产生的伪造图片全部判断成真实的图片。
$$
Loss = \frac{1}{m}\sum\_i [\log D(x^i) + \log (1 - D(G(z^i)))]
$$
具体可以参看[【青年学者专栏】解读GAN及其 2016 年度进展](https://zhuanlan.zhihu.com/p/25000523?refer=dlclass)。
**discriminator**: distinguish genuine data
**generator**: turns random noise into immitation of the data

# 5. Lecture 5：Multimodal Learning
### 5.1 What is multimodal Learning
1. Multiple modalities are learned jointly
2. One modality assists in the learning of another
3. Input is one modality, output is another

### 5.2 Why is multimodal learning hard?
**different representations** for different data.
Images -> Real-valued, Dense
Text -> Discrete, Sparse

**Noisy and missing data**

### 5.2 How to solve 
**combine** seprate models for a single modality at a higher level
**pre-train** models on single-modality data
Use **Embeddings** to combine these models.

### 5.3 Pretrain
1. initialize with the weights from another network(better than random)
2. low-level features are still be useful.

### 5.4 Embeddings
A way to represent data.
In deep learning, this is usually a **high-dimensional vector**.
A neural network can take a piece of data and create a corresponding vector in an embedding space.
A neural network can take embedding vector as an input(word embeddings).

**word embeddings**: word $\to$ high-dimensional vector.

Can use embeddings to switch between modalities.

### 5.5 Flickr tagging: model
Guassian model?
Replicated Softmax?
**Task**: combine a model that can represent images and text. Like you feed a image of a sunset and text sea. It will returns a image of sea sunset.

pretrain unimodal models and combine them at a higher level. pretrain $V\_{image}$ and $V\_{text}$ speperate.

Two Models: image-specific model and text-specific model.

picture is a vector and word so on.

### 5.6 Image Captioning
Image $\to$ Vision(Deep CNN) $\to$ Language Generating RNN $\to$ sentence.

### 5.7 SoundNet
Task: learning sound representation from videos.

1. Video $\to$ Raw Waveform $\to$ $g(y)$
2. Video $\to$ RGB frames $\to$ Visual Recognition networks $\to$ $f(x; \theta)$
The loss: $D\_{KL}(g(y) \Vert f(x;\theta))$

# 6. Learning to Do
### 6.1 Learning Task
Supervised Learning: given **data**, predict **labels**.
Unsupervised Learning: given **data**, learn about that **data**.
Reinforcement Learning: given **data**, choose **action** to maximize expected **long-term reward**.

### 6.2 Q-learning
$s\_0, a\_0, r\_0, s\_1, a\_1, r\_1, \cdots, s\_T, r\_T$. is the sequence of states and actions.
**Transition function**: $P(s\_{t+1}, r\_t \vert s\_t, a\_t)$.

**Policy Learning**: find $\pi(s)$. $a \sim \pi(s)$
**Value learning**: find $Q(s,a)$. $a = \arg \max\_{a'}Q(s,a')$

maximum expected future rewards starting at state $s\_i$. choosing action $a\_i$, and then following an **optimal policy** $\pi^\*$.

Define approximate $Q^\*$ function.
$$
\min\_{\theta} \sum\_{e\in E}\sum\_{t=0}^T \Vert \hat Q(s\_t,a\_t \vert \theta) - \left(r\_t + \gamma \max\_{a'} \hat Q (s\_{t+1}, a' \vert \theta)\right)\Vert
$$


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
