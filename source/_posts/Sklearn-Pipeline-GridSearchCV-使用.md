---
title: Sklearn Pipeline GridSearchCV 使用
date: 2016-10-07 15:21:57
tags:
    - 机器学习
    - Python
---


# 1. 介绍
Sklearn 的 GridSearchCV 和 Pipeline 能够合并多个模型，并且可以使用 FeatureUnion 合并自己 extraction 的 feature 的确是比较方便的。

本文主要在 MNIST 数据集上进行测试。使用比较简单的 KNN 算法进行预测。

<!--more-->

# 2. 方法
主要代码在 [Github](https://github.com/LichAmnesia/NLP_Learning/blob/master/MNIST/MNIST.ipynb) 上。
 
使用 GridSearchCV 进行参数选择以及crossvalidation。注意 param_grid 也就是每个模型的参数选择。

Pipeline 可以把设置一个训练过程，如果有多个feature需要使用FeatureUnion 进行操作。

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info