---
title: Spark 流式计算
date: 2016-03-17 22:17:54
tags:
    - Spark
---



本文主要进行实验Spark Streaming流式计算模型。

# 1. TCP链接 进行 Spark streaming 流式计算
### 1.1 TCP链接
　　首先测试TCP连接的流式计算模型，
>yum install nc

　　先安装这个，然后使用
>nc -lk 9999

　　启动服务，后面直接朝这里输就能看到相应输出，这个是向localhost:9999发数据。

#### 1.2 Scala的Spark程序
　　这个程序是进行spark的word count测试，输入的数据就是如上的tcp链接的输入数据。可以在spark-shell里输入如下代码。
　
```scala
import org.apache.spark._
import org.apache.spark.streaming._
import org.apache.spark.streaming.StreamingContext._
// Create a local StreamingContext with two working thread and batch interval of 1 second
val conf = new SparkConf().setMaster("local[4]").setAppName("NetworkWordCount")
val ssc = new StreamingContext(conf, Seconds(1))
// Create a DStream that will connect to hostname:port, like localhost:9999
val lines = ssc.socketTextStream("localhost", 9999)
// Split each line into words
val words = lines.flatMap(_.split(" "))
import org.apache.spark.streaming.StreamingContext._
// Count each word in each batch
val pairs = words.map(word => (word, 1))
val wordCounts = pairs.reduceByKey(_ + _)
// Print the first ten elements of each RDD generated in this DStream to the console
wordCounts.print()
ssc.start()             // Start the computation
ssc.awaitTermination()  // Wait for the computation to terminate
```

　　**注意** ：可能会报initial失败的错误，可能是setMaster这边写错了，我这里是写的是local的开4核的意思。部署程序时一定要指定master的位置。
　　如果选择的部署模式是standalone且部署到你配置的这个集群上，可以指定MASTER=spark://node1:7070，依据你的spark集群，修改主机和端口号。
　　
# 2. Spark 指定Master URL
　　有几种方式可以进行指定Spark计算时候的Master。
### 2.1 Spark-shell直接指定
　　通过spark shell，执行后进入交互界面
```scala
MASTER=spark://IP:PORT ./bin/spark-shell
```

### 2.2 程序内指定（可以通过参数传入）
```scala
val conf = new SparkConf()
             .setMaster(...)
val sc = new SparkContext(conf)
```
### 2.3 传递给Spark的Master URL种类
local 本地单线程
local[K] 本地多线程（指定K个内核）
local[*] 本地多线程（指定所有可用内核）
spark://HOST:PORT 连接到指定的 Spark standalone cluster master，需要指定端口。
mesos://HOST:PORT 连接到指定的 Mesos 集群，需要指定端口。
yarn-client客户端模式 连接到 YARN 集群。需要配置 HADOOP_CONF_DIR。
yarn-cluster集群模式 连接到 YARN 集群 。需要配置 HADOOP_CONF_DIR。




----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info

