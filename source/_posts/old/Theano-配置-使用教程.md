---
title: Theano 配置 使用教程
date: 2016-03-28 22:16:01
tags:
    - 机器学习
    - mathematic
---


本文主要讲Theano的安装，以及Theano的基本操作。最后给了一个完整的logistics回归的例子。


<!-- more -->

# 1. 安装
先安装python所需要的包，如果是centos之类的
```
sudo yum install python-pip
sudo yum install python-dev
sudo pip install numpy
sudo pip install theano
sudo yum install numpy scipy python-matplotlib ipython python-pandas sympy python-nose
```

Windows 安装（貌似需要MinGW的最新版本）
```
python -m pip install theano
python -m pip install gof
```
其中要先保证依赖的版本
```
numpy>=1.7.1 
scipy>=0.11 
six>=1.9.0 
```

具体安装可以使用pip安装

**注意：**最终运行python，进入命令行运行
```python
theano.test()
```

# 2. Baby step
### 2.1 两个scalar相加
```python
import numpy
import theano.tensor as T
from theano import function

x = T.dscalar('x')
y = T.dscalar('y')
z = x + y
f = function([x,y],z)
print f(2,3)

```
其中dsclar是theano的type:0-dimensional arrays (scalar) of doubles (d)。x和y就是dscalar的类型实例。
function想到于是创建一个函数，输入是x和y，然后z是这个函数的输出。

### 2.2 matrix 相加
```python
In [12]: x = T.dmatrix('x')
In [13]: y = T.dmatrix('y')
In [14]: z = x + y
In [15]: f = function([x,y],z)
In [16]: f([[2,1],[1,2]],[[2,2],[1,1]])
Out[16]: 
array([[ 4.,  3.],
       [ 2.,  3.]])
In [17]: a = T.vector()
In [18]: z = a ** 10 + a
In [19]: d = function([a],z)
In [20]: d([1,2,3])
Out[20]: array([  2.00000000e+00,   1.02600000e+03,   5.90520000e+04])
```


### 2.3 theano的type

+ byte: bscalar, bvector, bmatrix, brow, bcol, btensor3, btensor4
+ 16-bit integers: wscalar, wvector, wmatrix, wrow, wcol, wtensor3, wtensor4
+ 32-bit integers: iscalar, ivector, imatrix, irow, icol, itensor3, itensor4
+ 64-bit integers: lscalar, lvector, lmatrix, lrow, lcol, ltensor3, ltensor4
+ float: fscalar, fvector, fmatrix, frow, fcol, ftensor3, ftensor4
+ double: dscalar, dvector, dmatrix, drow, dcol, dtensor3, dtensor4
+ complex: cscalar, cvector, cmatrix, crow, ccol, ctensor3, ctensor4

具体可以参考[Basic Tensor Functionality](http://deeplearning.net/software/theano/library/tensor/basic.html#libdoc-tensor-creation)

# 3. Theano Functions
### 3.1 Logistic Funciton
Logistic Funciton的使用
$$ 
s(x) = \frac{1}{1+e^{-x}}
$$

```python
In [23]: x = T.dmatrix('x')
In [24]: s = 1 / (1+T.exp(-x))
In [25]: logistic = function([x],s)
In [26]: logistic([[0,1],[-1,-2]])
Out[26]: 
array([[ 0.5       ,  0.73105858],
       [ 0.26894142,  0.11920292]])

```

### 3.2 输出多个值
接上面的，多输出一个函数值
```python
In [27]: tan = 1/2 * (1 + T.tanh(x/2))
In [28]: log2 = function([x],[s,tan])
In [29]: log2([[0,1],[-1,-2]])
Out[29]: 
[array([[ 0.5       ,  0.73105858],
        [ 0.26894142,  0.11920292]]), array([[ 0.,  0.],
        [ 0.,  0.]])]

```

### 3.3 Random值使用

```
In [32]: from theano.tensor.shared_randomstreams import RandomStreams
In [33]: srng = RandomStreams(seed=234)
In [34]: rv_u = srng.uniform((2,2))
In [35]: rv_n = srng.normal((2,2))
In [36]: f = function([], rv_u)
In [37]: g = function([], rv_n, no_default_updates=True) 
In [38]: nearly_zeros = function([], rv_u + rv_u - 2 * rv_u)
In [39]: nearly_zeros
Out[39]: <theano.compile.function_module.Function at 0x18bafc10>
In [40]: nearly_zeros()
Out[40]: 
array([[ 0.,  0.],
       [ 0.,  0.]])
In [41]: nearly_zeros()
Out[41]: 
array([[ 0.,  0.],
       [ 0.,  0.]])
In [42]: f()
Out[42]: 
array([[ 0.44078224,  0.26993381],
       [ 0.14317277,  0.43571539]])
In [43]: f()
Out[43]: 
array([[ 0.86342685,  0.81031029],
       [ 0.86695784,  0.6813093 ]])
```



### 3.4 逻辑回归代码例子
使用%cpaste粘贴过去运行
```python
import numpy
import theano
import theano.tensor as T
rng = numpy.random

N = 400                                   # training sample size
feats = 784                               # number of input variables

# generate a dataset: D = (input_values, target_class)
D = (rng.randn(N, feats), rng.randint(size=N, low=0, high=2))
training_steps = 10000

# Declare Theano symbolic variables
x = T.matrix("x")
y = T.vector("y")

# initialize the weight vector w randomly
#
# this and the following bias variable b
# are shared so they keep their values
# between training iterations (updates)
w = theano.shared(rng.randn(feats), name="w")

# initialize the bias term
b = theano.shared(0., name="b")

print("Initial model:")
print(w.get_value())
print(b.get_value())

# Construct Theano expression graph
p_1 = 1 / (1 + T.exp(-T.dot(x, w) - b))   # Probability that target = 1
prediction = p_1 > 0.5                    # The prediction thresholded
xent = -y * T.log(p_1) - (1-y) * T.log(1-p_1) # Cross-entropy loss function
cost = xent.mean() + 0.01 * (w ** 2).sum()# The cost to minimize
gw, gb = T.grad(cost, [w, b])             # Compute the gradient of the cost
                                          # w.r.t weight vector w and
                                          # bias term b
                                          # (we shall return to this in a
                                          # following section of this tutorial)

# Compile
train = theano.function(
          inputs=[x,y],
          outputs=[prediction, xent],
          updates=((w, w - 0.1 * gw), (b, b - 0.1 * gb)))
predict = theano.function(inputs=[x], outputs=prediction)

# Train
for i in range(training_steps):
    pred, err = train(D[0], D[1])

print("Final model:")
print(w.get_value())
print(b.get_value())
print("target values for D:")
print(D[1])
print("prediction on D:")
print(predict(D[0]))
```


----
　

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info