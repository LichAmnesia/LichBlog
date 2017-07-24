---
title: Hadoop的hdfs文件下Hive数据存储形式
date: 2016-03-11 09:56:32
tags:
    - Hive
    - Hadoop
---



# 1. 查看hive表数据所在路径，并删除相应数据
先切换到hdfs用户，原本是root用户
>su - hdfs


查看根目录
```
[hdfs@node1 ~]$ hadoop fs -ls /
Found 6 items
drwxr-xr-x   - hbase hbase               0 2016-03-10 13:46 /hbase
drwxr-xr-x   - kylin kylin               0 2016-03-07 18:01 /kylin
drwxrwxr-x   - solr  solr                0 2016-03-10 13:32 /solr
drwxr-xr-x   - hdfs  supergroup          0 2016-03-07 17:33 /system
drwxrwxrwt   - hdfs  supergroup          0 2016-03-10 14:16 /tmp
drwxrwxrwx   - hdfs  supergroup          0 2016-03-10 14:32 /user
```

CDH会在user下面创建创建各个组件的目录，根据hive自己的配置文件，db会放在warehose里面。这样能看到自己相应的数据库。
>hadoop fs -ls /user/hive/warehouse/bi.db/

继续向下ls可以看到自己load进去的文件。
```
[hdfs@node1 ~]$ hadoop fs -ls /user/hive/warehouse/bi.db/stalogs/logdate=20151102
Found 2 items
-rwxrwxrwt   3 root hive  253645300 2016-03-10 14:35 /user/hive/warehouse/bi.db/stalogs/logdate=20151102/ap_stalogs_20151102.json
-rwxrwxrwt   3 root hive  253645300 2016-03-10 14:41 /user/hive/warehouse/bi.db/stalogs/logdate=20151102/ap_stalogs_20151102_copy_1.json
```
运行rm命令就可以把多load进去的文件删除掉了
```
[hdfs@node1 ~]$ hadoop fs -rm /user/hive/warehouse/bi.db/stalogs/logdate=20151102/ap_stalogs_20151102_copy_1.json
16/03/10 14:58:33 INFO fs.TrashPolicyDefault: Namenode trash configuration: Deletion interval = 1440 minutes, Emptier interval = 0 minutes.
Moved: 'hdfs://node1:8020/user/hive/warehouse/bi.db/stalogs/logdate=20151102/ap_stalogs_20151102_copy_1.json' to trash at: hdfs://node1:8020/user/hdfs/.Trash/Current
[hdfs@node1 ~]$ hadoop fs -ls /user/hive/warehouse/bi.db/stalogs/logdate=20151102
Found 1 items
-rwxrwxrwt   3 root hive  253645300 2016-03-10 14:35 /user/hive/warehouse/bi.db/stalogs/logdate=20151102/ap_stalogs_20151102.json
```


# 2. hadoop 常用命令
>hadoop fs -mkdir /tmp/input              在HDFS上新建文件夹
hadoop fs -put input1.txt /tmp/input  把本地文件input1.txt传到HDFS的/tmp/input目录下
hadoop fs -get  input1.txt /tmp/input/input1.txt  把HDFS文件拉到本地
hadoop fs -ls /tmp/output                  列出HDFS的某目录
hadoop fs -cat /tmp/ouput/output1.txt  查看HDFS上的文件
hadoop fs -rmr /home/less/hadoop/tmp/output  删除HDFS上的目录
hadoop dfsadmin -report 查看HDFS状态，比如有哪些datanode，每个datanode的情况
hadoop dfsadmin -safemode leave  离开安全模式
hadoop dfsadmin -safemode enter  进入安全模式
