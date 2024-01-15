---
title: 深度学习框架 Keras 介绍
date: 2016-04-22 17:09:42
tags:
    - 机器学习
    - mathematic
---

# 1. 介绍
　　keras基于Theano的深度学习框架，它的设计参考了Torch，使用Python编写，并且也是一个高度模块化的神经网络库，支持GPU和CPU。
　　地址：[文档](http://keras.io/)，[Github](https://github.com/fchollet/keras)
<!-- more -->

# 2. 安装
　　Keras是python的一个包，直接
```python
sudo pip install keras
```
或者
```
python -m pip install keras
```

依赖如下：
```
numpy, scipy
pyyaml
Theano
HDF5 and h5py (optional, required if you use model saving/loading functions)
Optional but recommended if you use CNNs: cuDNN.
```

# 3. Keras里的模块介绍
### 3.1 Optimizers
　　顾名思义，Optimizers包含了一些优化的方法，比如最基本的随机梯度下降SGD,另外还有Adagrad、Adadelta、RMSprop、Adam，一些新的方法以后也会被不断添加进来。

```
keras.optimizers.SGD(lr=0.01, momentum=0.9, decay=0.9, nesterov=False)
```
　　上面的代码是SGD的使用方法，lr表示学习速率,momentum表示动量项，decay是学习速率的衰减系数(每个epoch衰减一次),Nesterov的值是False或者True，表示使不使用Nesterov momentum。其他的请参考[文档](http://keras.io/optimizers/)。

　　如下是一个如何使用的代码例子，这个是实例化了一个优化算法：
```python
model = Sequential()
model.add(Dense(64, init='uniform', input_dim=10))
model.add(Activation('tanh'))
model.add(Activation('softmax'))

sgd = SGD(lr=0.1, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='mean_squared_error', optimizer=sgd)
```
　　当然我们也可以直接使用原本默认优化算法，只要把代码里修改`optimizer='sgd'`。
　　
　　下面我将介绍一些文档里默认的优化算法，其他可以参考[文档](http://keras.io/optimizers/)。
　　
　　**SGD（随机梯度下降优化器）**
```
keras.optimizers.SGD(lr=0.01, momentum=0.0, decay=0.0, nesterov=False)
```
　　参数：

- lr :float>=0，学习速率
- momentum :float>=0 参数更新的动量
- decay : float>=0 每次更新后学习速率的衰减量
- nesterov :Boolean 是否使用Nesterov动量项

　　**Adagrad（参数推荐使用默认值）**
```
keras.optimizers.Adagrad(lr=0.01, epsilon=1e-6)  
```
　　参数：

- lr : float>=0，学习速率
- epsilon :float>=0


### 3.2 Objectives

　　这是目标函数模块，就是常说的损失函数。是训练一个模型另外一个必备的参数。比较常用的就是均方误差和逻辑回归。keras提供了mean_squared_error，mean_absolute_error ，squared_hinge，hinge，binary_crossentropy，categorical_crossentropy这几种目标函数。

　　这里binary_crossentropy 和 categorical_crossentropy也就是logloss。[文档](http://keras.io/objectives/)。

　　使用方法：
```
model.compile(loss='mean_squared_error', optimizer='sgd')  
```
　　以下目标函数部分摘自：http://blog.csdn.net/niuwei22007/article/details/49132133
　　可以通过传递一个函数名。也可以传递一个为每一块数据返回一个标量的Theano symbolic function。而且该函数的参数是以下形式：
y_true : 实际标签。类型为Theano tensor
y_pred: 预测结果。类型为与y_true同shape的Theanotensor
　　
　　其实想一下很简单，因为损失函数的作用就是返回预测结果与实际值之间的差距。然后优化器根据差距进行参数调整。不同的损失函数之间的区别就是对这个差距的度量方式不同。

　　主要包含函数有：

- **mean_squared_error / mse均方误差，常用的目标函数，公式为((y_pred-y_true)^2).mean(axis=-1)就是把预测值与实际值差的平方累加求均值。**

- **mean_absolute_error / mae绝对值均差，公式为(|y_pred-y_true|).mean(axis=-1)就是把预测值与实际值差的绝对值累加求和。**

- mean_absolute_percentage_error / mape公式为：(|(y_true - y_pred) / clip((|y_true|),epsilon, infinite)|).mean(axis=-1) * 100，和mae的区别就是，累加的是（预测值与实际值的差）除以（剔除不介于epsilon和infinite之间的实际值)，然后求均值。

- mean_squared_logarithmic_error / msle公式为： (log(clip(y_pred, epsilon, infinite)+1)- log(clip(y_true, epsilon,infinite)+1.))^2.mean(axis=-1)，这个就是加入了log对数，剔除不介于epsilon和infinite之间的预测值与实际值之后，然后取对数，作差，平方，累加求均值。

- squared_hinge公式为：(max(1-y_true*y_pred,0))^2.mean(axis=-1)，取1减去预测值与实际值乘积的结果与0比相对大的值的平方的累加均值。
- hinge公式为：(max(1-y_true*y_pred,0)).mean(axis=-1)，取1减去预测值与实际值乘积的结果与0比相对大的值的的累加均值。

- binary_crossentropy:常说的逻辑回归.

- categorical_crossentropy:多分类的逻辑回归注意：using this objective requires that your labels are binary arrays ofshape (nb_samples, nb_classes).

### 3.3 Activations
　　这是激活函数模块，keras提供了linear、sigmoid、hard_sigmoid、tanh、softplus、relu、softplus、softmax。此外，像LeakyReLU和PReLU这种比较新的激活函数，keras在keras.layers.advanced_activations模块里提供。其中softplus和relu就是近似生物神经激活函数。Softplus具有新模型的前两点，却没有稀疏激活性。因而，校正函数max(0,x)成了近似符合该模型的最大赢家，具体可以看我的上一篇博文[为何现在的Deep Learning不需要Pre-training了](http://alwa.info/2016/04/22/%E4%B8%BA%E4%BD%95%E7%8E%B0%E5%9C%A8%E7%9A%84Deep-Learning%E4%B8%8D%E9%9C%80%E8%A6%81Pre-training%E4%BA%86/)。
　　
　　文档中有关Activation的介绍：[Available activations](http://keras.io/activations/)，[Advanced Activations Layers](http://keras.io/layers/advanced-activations/)。

　　常用激活函数：

- softmax: 在多分类中常用的激活函数，是基于逻辑回归的。

- Softplus：softplus(x)=log(1+e^x)，近似生物神经激活函数，最近出现的。

- Relu：近似生物神经激活函数，最近出现的。

- tanh：双曲正切激活函数，也是很常用的。

- sigmoid：S型曲线激活函数，最常用的。

- hard_sigmoid：基于S型激活函数。

- linear：线性激活函数，最简单的。

### 3.4 Initializations

　　这是参数初始化模块，在添加layer的时候调用init进行初始化。keras提供了uniform、lecun_uniform、normal、orthogonal、zero、glorot_normal、he_normal这几种。[初始化文档](http://keras.io/initializations/)。
　　
　　模型训练的时候会首先对权值矩阵和偏置进行初始化。有的是把权值初始化为0，但是这种情况不能适用于带有梯度下降算法的网络。因为每次的残差都一样，那么网络参数就达不到最优了。所以一般常用的就是随机数初始化，保证每个参数都不重复，但是差值也不会很大。随机数初始化一般按照概率分布去取值，比如常用的均匀分布等。

　　在Keras中对权值矩阵初始化的方式很简单，就是在add某一层时，同时注明初始化该层的概率分布是什么就可以了。
```
# init是关键字，’uniform’表示用均匀分布去初始化  
model.add(Dense(64, init='uniform')) 
```

在Keras自带的初始化函数有：

- **Uniform(scale=0.05) :均匀分布，最常用的。Scale就是均匀分布的每个数据在-scale~scale之间。此处就是-0.05~0.05。scale默认值是0.05。**

- lecun_uniform:是在LeCun在98年发表的论文中基于uniform的一种方法。区别就是lecun_uniform的scale=sqrt(3/f_in)。f_in就是待初始化权值矩阵的行。

- Normal：正态分布（高斯分布）。

- Identity ：用于2维方阵，返回一个单位阵

- Orthogonal：用于2维方阵，返回一个正交矩阵。

- Zero：产生一个全0矩阵。

- glorot_normal：基于normal分布，normal的默认 

- sigma^2=scale=0.05，而此处sigma^2=scale=sqrt(2 / (f_in+ f_out))，其中，f_in和f_out是待初始化矩阵的行和列。

- glorot_uniform：基于uniform分布，uniform的默认scale=0.05，而此处scale=sqrt( 6 / (f_in +f_out)) ，其中，f_in和f_out是待初始化矩阵的行和列。

- he_normal：基于normal分布，normal的默认 scale=0.05，而此处scale=sqrt(2 / f_in)，其中，f_in是待初始化矩阵的行。

- he_uniform：基于uniform分布，uniform的默认scale=0.05，而此处scale=sqrt( 6 / f_in)，其中，f_in待初始化矩阵的行。 



### layers

layers模块包含了core、convolutional、recurrent、advanced_activations、normalization、embeddings这几种layer。

其中core里面包含了flatten(CNN的全连接层之前需要把二维特征图flatten成为一维的)、reshape（CNN输入时将一维的向量弄成二维的）、dense(就是隐藏层，dense是稠密的意思),还有其他的就不介绍了。convolutional层基本就是Theano的Convolution2D的封装。

### 3.5 Preprocessing

这是预处理模块，包括序列数据的处理，文本数据的处理，图像数据的处理。重点看一下图像数据的处理，keras提供了ImageDataGenerator函数,实现data augmentation，数据集扩增，对图像做一些弹性变换，比如水平翻转，垂直翻转，旋转等。

### 3.6 Models

　　这是最主要的模块，模型。上面定义了各种基本组件，model是将它们组合起来。Keras可以建立两种模型，一种是线性叠加的，层与层之间是全连接的方式，一个输入，一个输出；另外一种是图型的，输入与输出数量任意，并且可以指定层与层之间的部分连接方式。其中线性叠加模型就是把每一层按照次序叠加起来，每层之间采用全连接方式。下面看一下对象model都有哪些方法。
```python
from keras.models import Sequential

model = Sequential([
    Dense(32, input_dim=784),
    Activation('relu'),
    Dense(10),
    Activation('softmax'),
])
```
　　当然如上代码也可以分开来写
```python
model = Sequential()
model.add(Dense(32, input_dim=784))
model.add(Activation('relu'))
```

　　在Model的首层需要加上Input shape表明输入数据的大小。

# 4. Model训练过程
　　这部分[API](http://keras.io/models/sequential/)。有一篇博文翻译得不错，具体请看参考文献[5]。
### 4.1 Compilation
　　在Model训练之前需要预先定义好 Compilation 的过程。它需要三个参数。
```python
compile(self, optimizer, loss, metrics=[], sample_weight_mode=None)
```

- an optimizer。 优化算法（比如rmsprop、adagrad），具体可以看[ optimizers ](http://keras.io/optimizers)文档。
- a loss function。 损失函数，也就是模型要最小化的函数。具体可以看[ objectives ](http://keras.io/objectives)文档。
- a list of metrics。暂时只有`metrics=['accuracy']` ，也可以自定义函数。

```python
# for a multi-class classification problem
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# for a binary classification problem
model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# for a mean squared error regression problem
model.compile(optimizer='rmsprop',
              loss='mse')
```

### 4.2 Training
　　训练一个模型，需要调用fit函数。
```
fit(self, x, y, batch_size=32, nb_epoch=10, verbose=1, callbacks=[], validation_split=0.0, validation_data=None, shuffle=True, class_weight=None, sample_weight=None)
```
### 4.3 Evaluate
　　评价一个模型训练效果。返回一个误差值。
```
evaluate(self, x, y, batch_size=32, verbose=1, sample_weight=None)
```

### 4.4 Predict
　　获得一个训练好的模型的预测结果。返回一个Numpy的数组，表示预测结果。
```
predict(self, x, batch_size=32, verbose=0)
```


# 参考文献
[1] 易用的深度学习框架Keras简介：http://blog.csdn.net/u012162613/article/details/45397033

[2] 基于Theano的深度学习(Deep Learning)框架Keras学习随笔-03-优化器：http://blog.csdn.net/niuwei22007/article/details/49131393

[3] 基于Theano的深度学习(Deep Learning)框架Keras学习随笔-07-初始化权值：http://blog.csdn.net/niuwei22007/article/details/49226495

[4] ReLu(Rectified Linear Units)激活函数：http://www.mamicode.com/info-detail-873243.html

[5] 基于Theano的深度学习(Deep Learning)框架Keras学习随笔-05-模型：http://blog.csdn.net/niuwei22007/article/details/49207187

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info