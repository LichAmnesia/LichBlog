---
title: TensorFlow Ubuntu 配置
date: 2017-02-05 17:43:52
tags:
  - DeepLearning
  - mathematic
  - 机器学习
---
# 1. 介绍
使用的是Ubuntu 16.04，并且是用的CUDA 8.0下安装`Tensorflow`。注意如果是`VirtualEnv`虚拟环境需要先进入再进行`pip`操作。

<!--more-->

# 2. 安装 CUDA
### 2.1 安装CUDA 8.0
访问：https://developer.nvidia.com/cuda-downloads
下载相应版本的CUDA Toolkit 8.0。
下载完成之后按照网易下端的教程进行安装：
```
sudo dpkg -i cuda-repo-ubuntu1604-8-0-local_8.0.44-1_amd64.deb
sudo apt-get update
sudo apt-get install cuda
```
这将会把CUDA安在: /usr/local/cuda
如果你是

### 2.2 安装CudNN 5.1

下载：https://developer.nvidia.com/cudnn
注意选择好是tgz的版本
```
tar -xzvf cudnn-8.0-linux-x64-v5.1.tgz
sudo cp cuda/include/cudnn.h /usr/local/cuda/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
```
### 2.3 Path添加到系统
把以下三行加到`~/.bashrc`里。如果是`zsh`就加到`~/.zshrc`，同样是`source`一下
```
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda/lib64:/usr/local/cuda/extras/CUPTI/lib64"
export CUDA_HOME=/usr/local/cuda
export PATH=$PATH:CUDA_HOME/bin
```
执行`source`命令。
```
source ~/.bashrc
```
### 2.4 验证CUDA安装
```
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2016 NVIDIA Corporation
Built on Sun_Sep__4_22:14:01_CDT_2016
Cuda compilation tools, release 8.0, V8.0.44
```
```
$ nvidia-smi
Sun Feb  5 14:36:17 2017       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 367.57                 Driver Version: 367.57                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 1070    Off  | 0000:01:00.0      On |                  N/A |
|  0%   43C    P8    10W / 220W |    409MiB /  8112MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID  Type  Process name                               Usage      |
|=============================================================================|
|    0      1142    G   /usr/lib/xorg/Xorg                             183MiB |
|    0      1907    G   compiz                                         108MiB |
|    0      2266    G   fcitx-qimpanel                                   8MiB |
|    0      3457    G   ...d/PasswordManagerSettingsMigration/Enable    70MiB |
|    0     20457    G   /proc/self/exe                                  36MiB |
+-----------------------------------------------------------------------------+

```
# 3. 安装TensorFlow
### 3.1 使用pip进行安装
```
# Ubuntu/Linux 64-bit, GPU enabled, Python 3.5
# Requires CUDA toolkit 8.0 and CuDNN v5. For other versions, see "Installing from sources" below.
$ export TF_BINARY_URL=https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow_gpu-0.12.1-cp35-cp35m-linux_x86_64.whl
# Python 3
$ sudo pip3 install --upgrade $TF_BINARY_URL
```

### 3.2 验证安装
可以参考`TensorFlow`的[文档](https://www.tensorflow.org/get_started/os_setup#test_the_tensorflow_installation)。
```python
In [1]: import tensorflow as tf
I tensorflow/stream_executor/dso_loader.cc:128] successfully opened CUDA library libcublas.so locally
I tensorflow/stream_executor/dso_loader.cc:128] successfully opened CUDA library libcudnn.so locally
I tensorflow/stream_executor/dso_loader.cc:128] successfully opened CUDA library libcufft.so locally
I tensorflow/stream_executor/dso_loader.cc:128] successfully opened CUDA library libcuda.so.1 locally
I tensorflow/stream_executor/dso_loader.cc:128] successfully opened CUDA library libcurand.so locally

In [2]: hello = tf.constant('Hello, TF!')

In [3]: sess = tf.Session()
I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:937] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
I tensorflow/core/common_runtime/gpu/gpu_device.cc:885] Found device 0 with properties:
name: GeForce GTX 1070
major: 6 minor: 1 memoryClockRate (GHz) 1.797
pciBusID 0000:01:00.0
Total memory: 7.92GiB
Free memory: 7.44GiB
I tensorflow/core/common_runtime/gpu/gpu_device.cc:906] DMA: 0
I tensorflow/core/common_runtime/gpu/gpu_device.cc:916] 0:   Y
I tensorflow/core/common_runtime/gpu/gpu_device.cc:975] Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce GTX 1070, pci bus id: 0000:01:00.0)

In [4]: print(sess.run(hello))
b'Hello, TF!'
```
### 3.4 安装keras和pytorch
有了Cuda和TF就可以很简单的安装`keras`
```
sudo pip3 install keras
```
CUDA 8.0 安装`pytorch`。附上`pytorch`的[教程](https://github.com/pytorch/tutorials/blob/master/Deep%20Learning%20with%20PyTorch.ipynb)。
```
pip install https://s3.amazonaws.com/pytorch/whl/cu80/torch-0.1.8.post1-cp35-cp35m-linux_x86_64.whl
pip install torchvision
```
# 参考
[1] Verify CUDA installation：http://askubuntu.com/questions/799184/how-can-i-install-cuda-on-ubuntu-16-04
[2] 官方安装教程：https://www.tensorflow.org/get_started/os_setup#optional_install_cuda_gpus_on_linux
[3] Pytorch 教程：https://github.com/pytorch/tutorials/blob/master/Deep%20Learning%20with%20PyTorch.ipynb

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
