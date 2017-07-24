---
title: Theano DeepLearning 源码学习
date: 2016-04-22 17:29:49
tags:
    - 机器学习
    - mathematic
---

本文主要讲Theano跟DL有关的相关Demo的源码。

- 主要涉及的Github上[DeepLearningTutorials](https://github.com/LichAmnesia/DeepLearningTutorials)。这个是我fork之后修改的库。
- 源代码在code里面，data数据是mnist数据。
- 主要在ipython进行测试
- 讲解DBN的theano使用，包括输入数据格式，输出数据格式。

<!-- more -->
# 1. 导入必须的库
```
import numpy
import theano
import theano.tensor as T
import pickle
import gzip
```
### 1.1 pickle的使用
Theano的Demo里面用的是pickle的数据然后经过zip之后的数据。原数据格式是mnist.pkl.gz。code文件是在logistic_sgd.py里面写了有关数据处理的部分load_data这个函数。
附上代码里有关数据处理的部分：
```python
def load_data(dataset):
    ''' Loads the dataset

    :type dataset: string
    :param dataset: the path to the dataset (here MNIST)
    '''

    #############
    # LOAD DATA #
    #############

    # Download the MNIST dataset if it is not present
    data_dir, data_file = os.path.split(dataset)
    if data_dir == "" and not os.path.isfile(dataset):
        # Check if dataset is in the data directory.
        new_path = os.path.join(
            os.path.split(__file__)[0],
            "..",
            "data",
            dataset
        )
        if os.path.isfile(new_path) or data_file == 'mnist.pkl.gz':
            dataset = new_path

    if (not os.path.isfile(dataset)) and data_file == 'mnist.pkl.gz':
        from six.moves import urllib
        origin = (
            'http://www.iro.umontreal.ca/~lisa/deep/data/mnist/mnist.pkl.gz'
        )
        print('Downloading data from %s' % origin)
        urllib.request.urlretrieve(origin, dataset)

    print('... loading data')

    print(dataset)
    
    # Load the dataset
    with gzip.open(dataset, 'rb') as f:
        try:
            train_set, valid_set, test_set = pickle.load(f, encoding='latin1')
        except:
            train_set, valid_set, test_set = pickle.load(f)
    # train_set, valid_set, test_set format: tuple(input, target)
    # input is a numpy.ndarray of 2 dimensions (a matrix)
    # where each row corresponds to an example. target is a
    # numpy.ndarray of 1 dimension (vector) that has the same length as
    # the number of rows in the input. It should give the target
    # to the example with the same index in the input.

    def shared_dataset(data_xy, borrow=True):
        """ Function that loads the dataset into shared variables

        The reason we store our dataset in shared variables is to allow
        Theano to copy it into the GPU memory (when code is run on GPU).
        Since copying data into the GPU is slow, copying a minibatch everytime
        is needed (the default behaviour if the data is not in a shared
        variable) would lead to a large decrease in performance.
        """
        data_x, data_y = data_xy
        shared_x = theano.shared(numpy.asarray(data_x,
                                               dtype=theano.config.floatX),
                                 borrow=borrow)
        shared_y = theano.shared(numpy.asarray(data_y,
                                               dtype=theano.config.floatX),
                                 borrow=borrow)
        # When storing data on the GPU it has to be stored as floats
        # therefore we will store the labels as ``floatX`` as well
        # (``shared_y`` does exactly that). But during our computations
        # we need them as ints (we use labels as index, and if they are
        # floats it doesn't make sense) therefore instead of returning
        # ``shared_y`` we will have to cast it to int. This little hack
        # lets ous get around this issue
        return shared_x, T.cast(shared_y, 'int32')

    test_set_x, test_set_y = shared_dataset(test_set)
    valid_set_x, valid_set_y = shared_dataset(valid_set)
    train_set_x, train_set_y = shared_dataset(train_set)

    rval = [(train_set_x, train_set_y), (valid_set_x, valid_set_y),
            (test_set_x, test_set_y)]
    return rval
```

这个函数主要完成读取pkl压缩之后的pkl.gz文件，先解压然后读取。想看具体的过程可以先解压文件
```
gunzip mnist.pkl.gz
```
得到mnist.pkl的二进制文件，然后
```python
dataset = 'mnist.pkl文件目录地址'
fe = open(dataset,'rb')
```
然后使用pickle.load来读这个文件。结果如下：
```python
In [40]: pickle.load(fe)
Out[40]: 
((array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         ..., 
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.]], dtype=float32),
  array([5, 0, 4, ..., 8, 4, 8])),
 (array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         ..., 
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.]], dtype=float32),
  array([3, 8, 6, ..., 5, 6, 8])),
 (array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         ..., 
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.],
         [ 0.,  0.,  0., ...,  0.,  0.,  0.]], dtype=float32),
  array([7, 2, 1, ..., 4, 5, 6])))

```
很明显，我们已经能够读取这个文件了。并看到了文件具体内容，接下来就是看到底这个格式是什么。
```python
t,v,te = pickle.load(fe)
```
分别把train，validation和test的数据读出来。然后type(t)发现这个是一个元组格式数据。
```python
In [60]: v
Out[60]: 
(array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
        [ 0.,  0.,  0., ...,  0.,  0.,  0.],
        [ 0.,  0.,  0., ...,  0.,  0.,  0.],
        ..., 
        [ 0.,  0.,  0., ...,  0.,  0.,  0.],
        [ 0.,  0.,  0., ...,  0.,  0.,  0.],
        [ 0.,  0.,  0., ...,  0.,  0.,  0.]], dtype=float32),
 array([3, 8, 6, ..., 5, 6, 8]))

In [61]: type(v)
Out[61]: tuple

In [62]: v[0]
Out[62]: 
array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
       [ 0.,  0.,  0., ...,  0.,  0.,  0.],
       [ 0.,  0.,  0., ...,  0.,  0.,  0.],
       ..., 
       [ 0.,  0.,  0., ...,  0.,  0.,  0.],
       [ 0.,  0.,  0., ...,  0.,  0.,  0.],
       [ 0.,  0.,  0., ...,  0.,  0.,  0.]], dtype=float32)

In [63]: v[1]
Out[63]: array([3, 8, 6, ..., 5, 6, 8])

In [64]: type(v[0])
Out[64]: numpy.ndarray

In [65]: type(v[1])
Out[65]: numpy.ndarray

In [66]: v[0].shape
Out[66]: (10000, 784)

In [67]: v[1].shape
Out[67]: (10000,)

```
可以发现，其实这是一个numpy.ndarray格式的二维数组（矩阵）。然后我们要使用theano的话，要把这个格式的数据转化成theano格式的。
### 1.3 numpy.ndarray转化为theano的matrix格式

```python
In [72]: data_x, data_y  = t 

In [74]: share_x = theano.shared(numpy.asarray(data_x,dtype=theano.config.floatX),borrow=True)

In [75]: share_x
Out[75]: <TensorType(float64, matrix)>
```
到此我们已经知道theano的基本操作了。



# 参考文献
[1] numpy.ndarray文档：http://docs.scipy.org/doc/numpy-1.10.0/reference/generated/numpy.ndarray.html

[2] tensor variable basic link：http://deeplearning.net/software/theano/library/tensor/basic.html

[3] Python 元组理解：http://www.runoob.com/python/python-tuples.html

[4] Deep_belief_networks：http://scholarpedia.org/article/Deep_belief_networks

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info