---
title: Spark 编程指导 文件操作 任务提交 SQL操作
date: 2016-03-18 23:04:37
tags:
    - Spark
    - Python
    - Scala
---


　　本文主要首先测试了pyspark读取hdfs文件进行word count应用，以及使用spark-shell同样进行了测试。
　　使用python编写spark应用并提交集群测试。
　　最后使用Spark进行SQL操作json文件。

<!-- more -->

# 1. Spark 的pyspark读取hdfs文件
　　首先使用hdfs命令put文件进入文件系统
```
su - hdfs
hadoop fs -ls /tmp/ #看下这个文件夹有什么
hadoop fs -put harryport.txt /tmp/
hadoop fs -ls /tmp/ #发现已经put上去了
```

　　使用Spark最简单的方式就是使用交互式命令行提示符。打开PySpark终端，在命令行中打出pyspark。
读入文件，默认port是8020，node1是按照你自己的设定主机进行修改。
　　下面的例子是使用pyspark读取hdfs文件，然后进行word count的例子。
　　首先是把调试信息输出出来的结果，下面有完整Python程序。


```python
>>> text = sc.textFile("hdfs://node1:8020/tmp/harryport.txt")
16/03/16 10:32:06 INFO MemoryStore: ensureFreeSpace(194600) called with curMem=0, maxMem=556038881
16/03/16 10:32:06 INFO MemoryStore: Block broadcast_0 stored as values in memory (estimated size 190.0 KB, free 530.1 MB)
16/03/16 10:32:06 INFO MemoryStore: ensureFreeSpace(22599) called with curMem=194600, maxMem=556038881
16/03/16 10:32:06 INFO MemoryStore: Block broadcast_0_piece0 stored as bytes in memory (estimated size 22.1 KB, free 530.1 MB)
16/03/16 10:32:06 INFO BlockManagerInfo: Added broadcast_0_piece0 in memory on 172.171.51.131:53064 (size: 22.1 KB, free: 530.3 MB)
16/03/16 10:32:06 INFO SparkContext: Created broadcast 0 from textFile at NativeMethodAccessorImpl.java:-2
>>> print text
MapPartitionsRDD[1] at textFile at NativeMethodAccessorImpl.java:-2
>>> from operator import add
>>> def tokenize(text):
... 	return text.split()
... 
>>> words = text.flatMap(tokenize)
>>> print words
PythonRDD[2] at RDD at PythonRDD.scala:43
>>> wc = words.map(lambda x : (x,1))
>>> print wc.toDebugString()
16/03/16 10:36:52 INFO FileInputFormat: Total input paths to process : 1
(2) PythonRDD[3] at RDD at PythonRDD.scala:43 []
 |  MapPartitionsRDD[1] at textFile at NativeMethodAccessorImpl.java:-2 []
 |  hdfs://node1:8020/tmp/harryport.txt HadoopRDD[0] at textFile at NativeMethodAccessorImpl.java:-2 []
>>> counts = wc.reduceByKey(add)
>>> counts.saveAsTextFile("wc")
```


```python
from operator import add
def tokenize(text):
    return text.split()

text = sc.textFile("hdfs://node1:8020/tmp/harryport.txt")
words = text.flatMap(tokenize)
print words
wc = words.map(lambda x : (x,1))
print wc.toDebugString()
counts = wc.reduceByKey(add)
counts.saveAsTextFile("wc")
```

　　**注意：** 如果报Exception。
>Exception: Python in worker has different version 2.6 than that in driver 2.7, PySpark cannot run with different minor versions 

　　要去./conf/spark-spek-env.sh里面修改配置文件


# 2. Spark 的spark-shell读取hdfs文件 Scala

　　使用Scala的语法进行Spark的word count程序。
```scala
val text = sc.textFile("hdfs://node1:8020/tmp/harryport.txt")
val count = text.flatMap(line => line.split(" ")).map(word => (word,1)).reduceByKey(_+_)
count.collect()
```
　　输出结果：
```scala
scala> 
text: org.apache.spark.rdd.RDD[String] = MapPartitionsRDD[8] at textFile at <console>:21

scala>
count: org.apache.spark.rdd.RDD[(String, Int)] = ShuffledRDD[11] at reduceByKey at <console>:23

scala> 
res2: Array[(String, Int)] = Array((untrustworthy.,1), (Ah!,1), (reunion,1), (bone,10), (Justifiable,1), (Dursley's,2), (obviously.",1), (four-poster.,3), (color?,1), (blandly,2), (reek-ing,1), (Hats,1), ("champions,",1), (MIDNIGHT,1), (Burrow;,1), ('Around,1), (hem,18), (something.��,3), (think,",19), (Friend,2), (fuller,2), ("tinny,1), (Hermione;,12), (dismounting;,1), (happy.",5), (Toffees.,1), (crying,38), (soon;,1), (��Hang,3), (breath,116), (chart.,3), (grades.,2), (thinking��,1), (fowl,1), (coat;,1), (husky,1), (half-packed,1), (ear-related,1), (afterward,5), (ignore,35), (pacifying,1), (locket's,2), (tea,,18), (obsessed.,1), (logic,,1), (luminous,10), (wand-tip.,1), (ingredients.",1), (centuries,,3), (people!,5), ("Quidditch!",1), (anil,1), (upsets,1), (fastenings,1), (am.,1), (...
```

# 3. 编写Spark 的 Python 程序并提交到集群
　　Spark集群的可视化页面地址http://node1:18088/ ，这个是Spark History可以看到 spark-shell，pyspark和具体的job信息。包括已经Complete和Incomplete的所有任务信息。
　　在本地编写app.py文件，然后使用spark-submit提交到集群。
　　如下是app.py的源代码：
```python
## Spark Application - execute with spark-submit

## Imports
from pyspark import SparkConf, SparkContext
from operator import add
## Module Constants
APP_NAME = "My Spark Application"

## Closure Functions
def tokenize(text):
    return text.split()

## Main functionality

def main(sc):
    text = sc.textFile("hdfs://node1:8020/tmp/harryport.txt")
    words = text.flatMap(tokenize)
    print words
    wc = words.map(lambda x : (x,1))
    print wc.toDebugString()
    counts = wc.reduceByKey(add)
    counts.saveAsTextFile("wcapp")

if __name__ == "__main__":

# Configure Spark
    conf = SparkConf().setAppName(APP_NAME)
    conf = conf.setMaster("local[*]")
    sc   = SparkContext(conf=conf)


# Execute Main functionality
    main(sc)
                     
```
　　
　　submit会出现一大堆log，可以看到input,output，log文件信息等等，按照我python程序写的，最终结果是存在hdfs里面，具体可能有区别
```
16/03/16 11:29:58 INFO FileOutputCommitter: Saved output of task 'attempt_201603161129_0001_m_000000_2' to hdfs://node1:8020/user/root/wcapp/_temporary/0/task_201603161129_0001_m_000000
```

# 4. scala 读取json文件，并执行sql查询
　　首先在hue的hive执行，beeline链接执行也一样，只是测试读取结果是正确的。
>select count(*) from stalogs where logdate = 20151101

　　结果是411750

　　首先，上面的文件内容其实是json格式的，数据格式如下：
```
{"sta_up": 0, "sta_visited": "old", "ap_logical": {"typeids": null, "level0": "易达楼", "groupname": "内蒙古呼和浩特电信", "level2": "易达4-13#", "level0_id": 398, "level1_id": 565, "mername": "内蒙古师范大学鸿德学院", "merid": 17, "city": "呼和浩特市", "area": "赛罕区", "level2_tags": [], "latitude": 40.859748, "groupid": 4, "province": "内蒙古自治区", "level0_tags": [], "leaf_level": "易达4-13#", "address": "内蒙古自治区呼和浩特市赛罕区X034(机场辅路)", "mertags": [], "level1_tags": [], "level1": "4层", "level2_id": 578, "longitude": 111.806147}, "sta_curarea": "易达4-13#", "sta_total": 1, "sta_login": "2015-11-01 18:12:46", "sta_logout": "2015-11-01 18:12:51", "ap_mac": "78:A3:51:09:2E:A8", "sta_login_normal": true, "sta_down": 1, "sta_timelength": 5, "sta_mac": "60:92:17:37:8A:18", "sta_logout_normal": false, "sta_type": "auth"}
{"sta_up": 5, "sta_visited": "old", "ap_logical": {"typeids": null, "level0": "易达楼", "groupname": "内蒙古呼和浩特电信", "level2": "易达4-14#", "level0_id": 398, "level1_id": 565, "mername": "内蒙古师范大学鸿德学院", "merid": 17, "city": "呼和浩特市", "area": "赛罕区", "level2_tags": [], "latitude": 40.859748, "groupid": 4, "province": "内蒙古自治区", "level0_tags": [], "leaf_level": "易达4-14#", "address": "内蒙古自治区呼和浩特市赛罕区X034(机场辅路)", "mertags": [], "level1_tags": [], "level1": "4层", "level2_id": 579, "longitude": 111.806147}, "sta_curarea": "易达4-14#", "sta_total": 25, "sta_login": "2015-11-01 18:12:51", "sta_logout": "2015-11-01 18:07:40", "ap_mac": "78:A3:51:09:31:68", "sta_login_normal": true, "sta_down": 20, "sta_timelength": 0, "sta_mac": "60:92:17:37:8A:18", "sta_logout_normal": false, "sta_type": "auth"}
```
　　这个是scala运行的程序:
```scala
val sqlContext = new org.apache.spark.sql.SQLContext(sc) 
val path = "hdfs://node1:8020/tmp/ap_stalogs_20151101.json"
val c = sqlContext.read.json(path)
c.printSchema()
c.registerTempTable("stalogs")
val set = sqlContext.sql("select count(*) from stalogs")
set.collect().foreach(println)
```
　　如果用python写的话:
```python
path = "hdfs://node1:8020/tmp/ap_stalogs_20151101.json"
c = sqlContext.read.json(path)
c.printSchema()
c.registerTempTable("stalogs")
set = sqlContext.sql("select count(*) from stalogs")
set.collect()
set = sqlContext.sql("select ap_mac,sta_timelength from stalogs limit 2")
```

```scala
scala> val sqlContext = new org.apache.spark.sql.SQLContext(sc) 
scala> val path = "hdfs://node1:8020/tmp/ap_stalogs_20151101.json"
path: String = hdfs://node1:8020/tmp/ap_stalogs_20151101.json
scala> val c = sqlContext.read.json(path)
scala> c.printSchema()
root
 |-- ap_logical: struct (nullable = true)
 |    |-- address: string (nullable = true)
 |    |-- area: string (nullable = true)
 |    |-- city: string (nullable = true)
 |    |-- groupid: long (nullable = true)
 |    |-- groupname: string (nullable = true)
 |    |-- latitude: double (nullable = true)
 |    |-- leaf_level: string (nullable = true)
 |    |-- level0: string (nullable = true)
 |    |-- level0_id: long (nullable = true)
 |    |-- level0_tags: array (nullable = true)
 |    |    |-- element: string (containsNull = true)
 |    |-- level1: string (nullable = true)
 |    |-- level1_id: long (nullable = true)
 |    |-- level1_tags: array (nullable = true)
 |    |    |-- element: string (containsNull = true)
 |    |-- level2: string (nullable = true)
 |    |-- level2_id: long (nullable = true)
 |    |-- level2_tags: array (nullable = true)
 |    |    |-- element: string (containsNull = true)
 |    |-- longitude: double (nullable = true)
 |    |-- merid: long (nullable = true)
 |    |-- mername: string (nullable = true)
 |    |-- mertags: array (nullable = true)
 |    |    |-- element: string (containsNull = true)
 |    |-- province: string (nullable = true)
 |    |-- typeids: string (nullable = true)
 |-- ap_mac: string (nullable = true)
 |-- sta_curarea: string (nullable = true)
 |-- sta_down: long (nullable = true)
 |-- sta_login: string (nullable = true)
 |-- sta_login_normal: boolean (nullable = true)
 |-- sta_logout: string (nullable = true)
 |-- sta_logout_normal: boolean (nullable = true)
 |-- sta_mac: string (nullable = true)
 |-- sta_timelength: long (nullable = true)
 |-- sta_total: long (nullable = true)
 |-- sta_type: string (nullable = true)
 |-- sta_up: long (nullable = true)
 |-- sta_visited: string (nullable = true)
```

　　可以创建临时表，并执行sql语句进行查询
```scala
scala> c.registerTempTable("stalogs")
scala> val set = sqlContext.sql("select count(*) from stalogs")
scala> set.collect().foreach(println)
[411750]    

```
　　结果和之前一样


# 5. 参考文献
python编写规范: http://spark.apache.org/docs/latest/sql-programming-guide.html  

Spark入门（Python版）:http://blog.jobbole.com/86232/


----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info

