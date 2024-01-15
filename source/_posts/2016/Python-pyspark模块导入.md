---
title: Python pyspark模块导入
date: 2016-03-13 21:07:18
tags:
    - Python
    - Spark
---

# 1. spark 的python接口
装好spark之后，直接从pyspark是可以直接进入python的spark客户端的，命令行下。
但是如果要写python的程序的话直接import pyspark还是不行，提示ImportError: No module named pyspark。

# 2. 修改bashrc的python依赖

修改~/.bashrc，把Path修改了，可以先看\$SPARK_HOME和\$PYTHONPATH是不是已经对了，然后去Spark的安装目录下看下路径和具体的文件是不是，修改bashrc文件。
```
export SPARK_HOME=/opt/cloudera/parcels/CDH-5.6.0-1.cdh5.6.0.p0.45/lib/spark
export PYTHONPATH=/usr/local/bin/python2.7
export PYTHONPATH=$SPARK_HOME/python:$SPARK_HOME/python/lib/py4j-0.8.2.1-src.zip:$PYTHONPATH
```
最后运行
>source .bashrc

# 3. 脚本测试
使用spark-submit提交脚本。

# 4. CDH里配置项的含义
CDH有python配置，可以配置python的路径，暂时还不清楚这个的意思是什么？这个CDH页面里的配置会修改spark的conf文件里的pythonpath。
上面的配置是配的全局的配置。