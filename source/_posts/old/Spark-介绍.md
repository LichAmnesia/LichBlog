---
title: Spark 介绍
date: 2016-03-15 22:47:18
tags:
    - Spark
---



　　Spark最为重要的特性之一就是可以在多个操作（Action）之间，将一个或多个RDD关联的数据集（Dataset）以分区（Partition）为单位进行持久化（Persist）或缓存（Cache），存储介质通常是内存（Memory）。

# 1. RDD含义
　　RDD的全称是“Resilient Distributed Dataset”，即“弹性分布式数据集”，它是一个可以并行操作的具有容错性的元素集。有两种方法可以创建RDD：一个存在scala的驱动程序（即spark程序），或者引用一个外部存储系统（例如共享文件系统、HDFS、Hbase，或其他任何支持hadoop输入格式的数据源）中的数据集。用户可以使用RDD在内存，在并行运算中有效地重复利用。如果节点挂掉，RDD可以自动恢复。


# 2. 对Spark编程

　　编写Spark应用与之前实现在Hadoop上的其他数据流语言类似。代码写入一个惰性求值的驱动程序（driver program）中，通过一个动作（action），驱动代码被分发到集群上，由各个RDD分区上的worker来执行。然后结果会被发送回驱动程序进行聚合或编译。本质上，驱动程序创建一个或多个RDD，调用操作来转换RDD，然后调用动作处理被转换后的RDD。

　　这些步骤大体如下：

- 定义一个或多个RDD，可以通过获取存储在磁盘上的数据（HDFS，Cassandra，HBase，Local Disk），并行化内存中的某些集合，转换（transform）一个已存在的RDD，或者，缓存或保存。
- 通过传递一个闭包（函数）给RDD上的每个元素来调用RDD上的操作。Spark提供了除了Map和Reduce的80多种高级操作。
- 使用结果RDD的动作（action）（如count、collect、save等）。动作将会启动集群上的计算。

.


　　当Spark在一个worker上运行闭包时，闭包中用到的所有变量都会被拷贝到节点上，但是由闭包的局部作用域来维护。Spark提供了两种类型的共享变量，这些变量可以按照限定的方式被所有worker访问。广播变量会被分发给所有worker，但是是只读的。累加器这种变量，worker可以使用关联操作来“加”，通常用作计数器。

　　Spark应用本质上通过转换和动作来控制RDD。


# 3. Spark的执行

　　简略描述下Spark的执行。本质上，Spark应用作为独立的进程运行，由驱动程序中的SparkContext协调。这个context将会连接到一些集群管理者（如YARN），这些管理者分配系统资源。集群上的每个worker由执行者（executor）管理，执行者反过来由SparkContext管理。执行者管理计算、存储，还有每台机器上的缓存。

　　重点要记住的是应用代码由驱动程序发送给执行者，执行者指定context和要运行的任务。执行者与驱动程序通信进行数据分享或者交互。驱动程序是Spark作业的主要参与者，因此需要与集群处于相同的网络。这与Hadoop代码不同，Hadoop中你可以在任意位置提交作业给JobTracker，JobTracker处理集群上的执行。



# 4. Spark提交任务介绍
### 4.1 Yarn 集群任务提交
　　yarn需要submit提交到集群:https://spark.apache.org/docs/1.2.0/submitting-applications.html#master-urls


### 4.2 Spark提交任务
spark1.0起的版本在提交程序到集群有很大的不同，需要注意：
```
./bin/spark-submit \
  --class <main-class>
  --master <master-url> \
  --deploy-mode <deploy-mode> \
  ... # other options
  <application-jar> \
  [application-arguments]
```

**例如：**
Run application locally on 8 cores
```
./bin/spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master local[8] \
  /path/to/examples.jar \
  100
```

Run on a Spark standalone cluster
```
./bin/spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master spark://207.184.161.138:7077 \
  --executor-memory 20G \
  --total-executor-cores 100 \
  /path/to/examples.jar \
  1000
```

Run on a YARN cluster
```
export HADOOP_CONF_DIR=XXX
./bin/spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master yarn-cluster \  # can also be `yarn-client` for client mode
  --executor-memory 20G \
  --num-executors 50 \
  /path/to/examples.jar \
  1000
```
Run a Python application on a cluster
```
./bin/spark-submit \
  --master spark://207.184.161.138:7077 \
  examples/src/main/python/pi.py \
  1000
```

# 5. 参考文献
Spark编程指导：http://www.kinelf.com/?p=217



----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info


