---
title: Vagrant 配置 Jupyter Notebook
date: 2016-09-20 22:13:24
tags:
    - Python
    - Vagrant
    - Windows
---


# 介绍
本文介绍一下如何在`vagrant`里配置`Jupyter`开发环境，并在本机上可以用浏览器访问。

<!--more-->
# Vagrant File 需要修改配置
```
config.vm.network "forwarded_port", guest: 8888, host: 8888
```

# Check 一下包是否都安装
```
jinja2
sphinx
pyzmq
tornado
ipython
```
如果有没有安装的安装一下：
```
sudo apt-get install jinja2 sphinx pyzmq tornado ipython
```

# 安装Jupyter
直接`pip`安装，`sudo`模式，或者`virtualenv`环境
```
pip install jupyter
```
# 修改Jupyter配置为
```
jupyter notebook --generate-config
```
以上将会在 ~/.jupyter/ 下创建默认config 文件: jupyter_notebook_config.py
```
# The IP address the notebook server will listen on.
c.NotebookApp.ip = '0.0.0.0'
```

原本是localhost，改一下就行

或者运行
```
jupyter notebook --ip=0.0.0.0.
```
然后本机浏览器登录localhost:8888就可以了。

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
