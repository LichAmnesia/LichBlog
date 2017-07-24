---
title: 为何现在的Deep Learning不需要Pre-training了
date: 2016-04-22 00:08:13
tags:
    - 机器学习
    - mathematic
---


　　目前有一些paper但是并不像autoencoders或者RBMs。我认为是NN发展的问题。Stacked RBM和autoencoder是在2006和2007年分别提出来的。
在2009年ReLU的应用之后，unsupervised learning就有一定程度地被淘汰了（因为有足够的数据来进行直接监督学习）。就好像卷积神经网络（LeNet）在1989年被提出来，但是直到2012才被实践成深度结构。上面的能够实现还是因为ReLU带领的直接进行监督学习的火。

<!-- more -->
　　目前不用pretraining卷积网络，因为有很多更加创新的方法，而这些方法是纯粹的监督学习的。
　　
　　这些新方法其中之一就是不使用sigmoidal型函数（sigmoid,tanh）这样的激活函数，这样的激活函数会导致梯度减小甚至消失的情况。结果就是学习速度会直线下降，甚至接近于0，无法达到我们的目标。所以 Glorot, Bordes and Bengio 的文章[ Deep Sparse Rectifier Neural Networks ](http://jmlr.csail.mit.edu/proceedings/papers/v15/glorot11a/glorot11a.pdf)使用了rectified linear units (ReLUs)作为激活函数代替传统的sigmoidal函数。ReLUs 的形式类似：$f(x) = \max(0, x)$。注意这些函数都是无限的，并且对于正数部分有常量梯度1。
　　
　　 Glorot, Bordes and Bengio 的文章使用 ReLUs 来构造多层感知机和非卷积层。之前的一篇文章也可以作为参考[ What is the best Multi-Stage Architecture for Object Recognition ](http://yann.lecun.com/exdb/publis/pdf/jarrett-iccv-09.pdf)。都说明 rectifying nonlinearities （非线性矫正）似乎是纯粹监督学习和非监督预训练之间的桥梁。
　　 **ReLUs 的使用，使得网络可以自行引入稀疏性。这一做法，等效于无监督学习的预训练。**可以训练更深层的网络。
　　 
　　 另一个新方法就是使用标准化方差（standardizing variance ）初始化网络。[Understanding the Difficulty of Training Deep Feedforward Networks](http://machinelearning.wustl.edu/mlpapers/paper_files/AISTATS2010_GlorotB10.pdf) 文章给了一个使用线性激活假设来初始化深度网络的方法。[Delving Deep Into Rectifiers](Delving Deep Into Rectifiers) 修改上述方法的初始化权重方法，进行 rectifying nonlinearities(非线性矫正)。权重的初始化是大规模深度网络的一个重要组成部分。上述研究来自Microsoft Research。
　　 
　　其中另一个创新点使用 Dropout training。随机注入噪声或者模型平均技术，这让我们可以训练更深、更大的网络，却不必考虑过拟合问题。
　　
　　目前卷积神经网络的研究中，基本都使用 ReLUs（或者是修改的PReLUs）、Dropout，或者是纯粹监督学习（SGD + Momentum, possibly some adaptive learning rate techniques like RMSProp or ADAGrad）。

# 参考文献
[1] stackexchange上有关问答：http://stats.stackexchange.com/questions/163600/pre-training-in-deep-convolutional-neural-network

[2] ReLu(Rectified Linear Units)激活函数：http://www.cnblogs.com/neopenx/p/4453161.html

[3] 理解dropout：http://blog.csdn.net/stdcoutzyx/article/details/49022443

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info