---
title: CentOS 6.7 升级 Python
date: 2016-03-09 16:32:59
tags: Python
---


# 1. 介绍
CentOS 6.7 还仍然是python2.6.6，很多python的库都支持不好了。记录一下升级过程

# 2. 升级python

先升级Python,执行
```
wget https://www.python.org/ftp/python/2.7.9/Python-2.7.9.tgz
 tar zxvf Python-2.7.9.tgz 
cd Python-2.7.9
./configure
make all
make install
make clean
make distclean
```

# 3. 修改版本
目前的安装路径应该是/usr/local/bin/python2.7,顺便看下版本/usr/local/bin/python2.7 -V
然后查下当前的版本
```
python -V
```
我这里显示的是2.6.6
```
mv /usr/bin/python /usr/bin/python2.6 # 可能有的是python2.6.6
ln -s /usr/local/bin/python2.7 /usr/bin/python
```

现在再看下版本python -V，显示2.7.9。这样就可以运行python了

# 4. yum依赖修改
>vim /usr/bin/yum

将头部的#!/usr/bin/python修改为#!/usr/bin/python2.6，有可能会改成2.6.6基于具体情况。

# 5. 安装setuptools和pip

```
wget http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg 
sh setuptools-0.6c11-py2.7.egg
```

安装pip
```
wget http://pypi.python.org/packages/source/p/pip/pip-1.0.2.tar.gz 
tar zxf pip-1.0.2.tar.gz
cd pip-1.0.2
python setup.py install
```

现在,可以很方便的使用pip install安装东西,例如
```
pip install pelican
pip install Markdown
```

