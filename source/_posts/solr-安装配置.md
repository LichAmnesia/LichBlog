---
title: solr 安装配置
date: 2017-08-17 15:44:56
tags:
    - Java
    - Linux
---


本文`java`版本 `1.8`，并且 `solr` 版本 `5.50` 。网上很多教程solr的版本太前，好多命令已经不再适用了。

<!-- more -->

# 1. Java 安装
安装方法参考http://docs.oracle.com/javase/7/docs/webnotes/install/linux/linux-jdk.html 

### 1.1 jdk安装
首先安装jdk（这里以.tar.gz版本，`jdk-8u77-linux-x64.tar.gz`）

选择要安装java的位置，如/usr/目录下。

将文件`jdk-8u77-linux-x64.tar.gz`移动到/usr/

解压：`tar -zxvf jdk-8u77-linux-x64.tar.gz`

删除`jdk-8u77-linux-x64.tar.gz`（为了节省空间）

至此，jkd安装完毕，下面配置环境变量

### 1.2 配置环境变量
打开`/etc/profile（sudo vim /etc/profile）`，添加如下
```
JAVA_HOME=/usr/jdk1.8.0_77
CLASSPATH=.:$JAVA_HOME/lib.tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME CLASSPATH PATH
```
编辑保存之后进行
```
source /etc/profile
```
验证是否成功

# 2. Solr 下载安装
### 2.1 Solr 安装
去 [Solr](http://lucene.apache.org/solr/) 官网下载 solr 的源代码。然后直接解压缩。
运行程序就在 bin 文件夹下面。
### 2.2 运行
进入bin文件夹。运行
```
./solr start 
```
就可以运行成功了，注意输出的调试参数。可以看到 port
```
./solr stop #关闭，如果关闭所有加-all
```
如果想看具体指令有哪些加上`-help`参数，比如
```
./solr start -help
```

### 2.3 使用
默认网址是 `http://localhost:8983`。进去之后就能到 `solr` 的Admin页面了。
# 3. Collection/Core创建以及使用

### 3.1 创建collection
```
bin/solr create [-c name] [-d confdir] [-n configName] [-shards #] [-replicationFactor #] [-p port]
```
为了进行测试，我创建了一个叫 `test` 的Core。
```
bin/solr create -c test
```
**注意：**创建的时候 `solr` 要在运行状态。

### 3.2 提交XML索引

```
bin/post -c test example/exampledocs/solr.xml
```
现在已经可以进行检索了，在query里面。


# 参考
[1] [schema.xml配置](http://my.oschina.net/MrMichael/blog/222071)
[2] [solr中文分词](http://blog.csdn.net/zhu_tianwei/article/details/46711511)
[3] [solr中国](http://www.solr.cc/blog/?p=1018)
[4] [solr各个组件](http://www.solr.cc/blog/?p=104)

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
