---
title: iGraph python 安装
date: 2016-11-26 06:59:00
tags:
  - Python
  - Ubuntu
---

<!--more-->
# 1. 下载文件
```
wget http://igraph.org/nightly/get/c/igraph-0.7.1.tar.gz
wget http://igraph.org/nightly/get/python/python-igraph-0.7.0.tar.gz
tar xzf igraph-0.7.1.tar.gz
tar xzf python-igraph-0.7.0.tar.gz
```
```
cd igraph-0.7.1
./configure
make
sudo make install
sudo ldconfig
```
这样把igraph的c依赖装好了。接着准备装Python的依赖。
注意那个`ldconfig`是用来解决下面找不到so文件的。

# 2.编译setup.py安装
```
cd ../python-igraph-0.7.0
python setup.py build
sudo python setup.py
```
这样不出意外会出错，需要下面两个都解决才行

# 3. add LD_LIBRARY_PATH for .so files
>export LD_LIBRARY_PATH=/usr/local/lib

注意要加到`.bashrc`文件里。

# 4. 安装lxml2
>sudo apt-get install libxml2-dev

libxml2 is the runtime shared library, suitable for running already-compiled programs that use that library. If you want to compile programs that use libxml2, you need to install libxml2-dev.

This is true for most library packages on ubuntu (and debian, mint, etc. RH and others have similar conventions) - libfoo is the runtime shared library, libfoo-dev contains the development headers and .a archive

For libz, the package is zlib1g-dev

BTW, python-igraph 0.6.5-1 is packaged for debian - are you sure it's not also pre-packaged for ubuntu? If it is, you're much better off installing the ubuntu packa

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
