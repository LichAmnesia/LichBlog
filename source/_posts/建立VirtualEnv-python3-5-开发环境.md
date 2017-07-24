---
title: 建立Virtualenv python3.5 开发环境
date: 2016-05-04 19:40:17
tags:
    - Python
---


　　本文介绍如何使用Virtualenv，不影响系统本身Python的情况下，建立独立的Python开发环境。
　　
<!-- more -->
# 1. 下载安装python3.5
```
wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tgz
tar zxvf Python-3.5.1.tgz
cd Python-3.5.1
```

　　在编译前先在/usr/local建一个文件夹python3（作为python的安装路径，以免覆盖老的版本） 
```
sudo mkdir /usr/local/python3.5
```

　　开始编译安装 
```
./configure --prefix=/usr/local/python3.5 
make 
sudo make install
```
　　完成之后进行符号链接
```
sudo ln -s /usr/local/python3.5/bin/python3.5 /usr/bin/python3.5 
```

　　**PS：也可以直接使用系统自带的安装，注意最好装python-dev或者python3-dev，否则可能会出现pip安装包的时候无法安装。**
```
sudo apt-get install python3.5 python3-dev python-dev
```

# 2. 建立Virtualenv的python开发环境

>virtualenv is a tool to create isolated Python environments.


　　virtualenv通过创建独立Python开发环境的工具, 来解决依赖、版本以及间接权限
问题. 比如一个项目依赖python3 而当前全局开发环境为python2, 版本跨度过大, 导致不兼容使项目无法正在运行, 使用virtualenv可以解决这些问题.

### 2.1 安装Virtualenv

```
pip install virtualenv
```

### 2.2 基本操作

　　创建虚拟开发环境
```
virtualenv ENV 
```

　　激活当前Virtualenv
```
source ./bin/activate  #激活当前virtualenv
```

　　关闭Virtualenv
```
deactivate
```


### 2.3 指定python版本

　　可以使用-p PYTHON_EXE选项在创建虚拟环境的时候指定python版本
```
 virtualenv -p /usr/bin/python3 .5
```
　　
　　输出结果，建立虚拟开发环境成功！
```
Already using interpreter /usr/bin/python3
Using base prefix '/usr'
New python executable in /home/vagrant/ENV/ENV3.5/bin/python3
Also creating executable in /home/vagrant/ENV/ENV3.5/bin/python
Installing setuptools, pkg_resources, pip, wheel...done.
```


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info