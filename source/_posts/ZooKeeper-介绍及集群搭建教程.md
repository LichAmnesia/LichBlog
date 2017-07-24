---
title: ZooKeeper 介绍及集群搭建教程
date: 2016-03-05 00:08:13
tags: ZooKeeper
---

## 介绍
Zookeeper是一个分布式开源框架，提供了协调分布式应用的基本服务，它向外部应用暴露一组通用服务——分布式同步（Distributed Synchronization）、命名服务（Naming Service）、集群维护（Group Maintenance）等，简化分布式应用协调及其管理的难度，提供高性能的分布式服务。ZooKeeper本身可以以单机模式安装运行，不过它的长处在于通过分布式ZooKeeper集群（一个Leader，多个Follower），基于一定的策略来保证ZooKeeper集群的稳定性和可用性，从而实现分布式应用的可靠性。

在分布式应用中，由于工程师不能很好地使用锁机制，以及基于消息的协调机制不适合在某些应用中使用，因此需要有一种可靠的、可扩展的、分布式的、可配置的协调机制来统一系统的状态。Zookeeper的目的就在于此。

## 数据存储模型
- Persistent Nodes: 永久有效地节点,除非client显式的删除,否则一直存在
- Ephemeral Nodes: 临时节点,仅在创建该节点client保持连接期间有效,一旦连接丢失,zookeeper会自动删除该节点
- Sequence Nodes: 顺序节点,client申请创建该节点时,zk会自动在节点路径末尾添加递增序号,这种类型是实现分布式锁,分布式queue等特殊功能的关键

## 典型使用场景
### 分布式锁
分布式锁，主要得益于ZooKeeper保证数据的强一致性，即ZooKeeper集群中任意节点（一个server）上系统znode的数据一定相同。

锁服务可以分为两类：

- 保持独占锁：所有试图来获取这个锁的客户端，最终只有一个可以成功获得这把锁。通常的做法是把ZooKeeper上的一个znode看做是一把锁，通过create znode的方式来实现。所有客户端都去创建/distribute_lock节点，最终成功创建的那个客户端也即拥有了这把锁。
- 控制时序锁：所有试图来获取这个锁的客户端，最终都是会被安排执行，只是有个全局时序了。与保持独占锁的做法类似，不同点是/distribute_lock已经预先存在，客户端在它下面创建临时有序节点（可以通过节点控制属性控制：CreateMode.EPHEMERAL_SEQUENTIAL来指定）。zk的父节点(/distribute_lock)维持一份sequence，保证子节点创建的时序性，从而形成每个客户端的全局时序。

### 发布与订阅
发布与订阅即所谓的配置管理，顾名思义就是将数据发布到ZooKeeper节点上，供订阅者动态获取数据，实现配置信息的集中式管理和动态更新。例如：全局的配置信息、地址列表等。

- 索引信息和集群中机器节点状态放在ZooKeeper的一些指定节点，供各个客户端订阅使用。
- 系统日志（经处理后）存储，这些日志通常2-3天后清除。
- 应用中用到的一些配置信息集中管理，在应用启动的时候主动来获取一次，并在节点上注册一个Watcher，以后每次配置有更新，实时通知到应用，获取最新的配置信息。
- 业务逻辑中需要用到的一些全局变量，比如一些消息中间件的消息队列通常有个offset，这个offset存放在ZooKeeper上，这样集群中每个发送者都能知道当前的发送进度。
- 系统中有些信息需要动态获取，并且还会存在人工手动去修改这个信息。以前通常是暴露出接口，例如JMX接口，有了ZooKeeper后，只要将这些信息存放到ZooKeeper节点上即可。

### 分布通知/协调
ZooKeeper中特有的watcher注册于异步通知机制，能够很好的实现分布式环境下不同系统之间的通知与协调，实现对数据变更的实时处理。使用方法通常是不同系统都对ZooKeeper上同一个znode进行注册，监听znode的变化（包括znode本身内容及子节点内容），其中一个系统update了znode，那么另一个系统能够收到通知，并做出相应处理。
使用ZooKeeper来进行分布式通知和协调能够大大降低系统之间的耦合。

- 心跳检测机制：检测系统和被测系统之间并不直接关联起来，而是通过ZooKeeper上某个节点关联，大大减少系统耦合。
- 系统调度模式：某系统有控制台和推送系统两部分组成，控制台的职责是控制推送系统进行相应的推送工作。管理人员在控制台做的一些操作，实际上是修改了ZooKeeper上某些节点的状态，而ZooKeeper就把这些变化通知给它们注册watcher的客户端，即推送系统，于是，做出相应的推送任务。
- 工作汇报模式：一些类似于任务分发系统，子任务启动后，到zk来注册一个临时节点，并定时将自己的进度进行汇报（将进度写回这个临时节点），这样任务管理者就能够实时指导任务进度。

### 集群管理
- 集群机器监控：这通常用于那种对集群中机器状态、机器在线率有较高要求的场景，能够快速对集群中机器变化做出响应。这样的场景中，往往有一个监控系统，实时监测集群机器是否存活。利用ZooKeeper，可以实现另一种集群机器存活性监控系统：
 + 客户端在节点x上注册watcher，如果x的子节点发生变化，会通知该客户端。
 + 创建EPHEMERAL类型的节点，一旦客户端和服务器的会话结束或过期，该节点就会消失。
- Master选举：在分布式环境中，相同的业务应用分布在不同的机器上，有些业务逻辑（例如一些耗时的计算、网络I/O处理），往往需要让整个集群中的某一台机器进行执行，其余机器可以共享这个结果，这样可以减少重复劳动、提高性能。利用ZooKeeper的强一致性，能够保证在分布式高并发情况下节点创建的全局唯一性，即：同时有多个客户端请求创建/currentMaster节点，最终一定只有一个客户端请求能够创建成功。利用这个特性，就能很轻易的在分布式环境中进行集群选取了。另外，这种场景演化一下，就是动态Master选举。

## 集群搭建
其中ZooKeeper版本为3.4.8，安装目录于/usr/local/program/。ZooKeeper下载完成后的文件就是编译好的，可以直接使用的。
### 下载安装
```shell
wget http://mirror.nus.edu.sg/apache/zookeeper/zookeeper-3.4.8/zookeeper-3.4.8.tar.gz
tar -zxvf zookeeper-3.4.8.tar.gz -C /usr/local/program/
ln -s /usr/local/program/zookeeper-3.4.8 /usr/local/program/zookeeper
```

### config环境配置
首先进入conf目录
```shell
cd conf/
cp zoo_sample.cfg zoo.cfg
```

修改zoo.cfg文件
```shell
dataDir=/usr/local/program/zookeeper/data
dataLogDir=/usr/local/program/zookeeper/logs
clientPort=2181
tickTime=2000
initLimit=5
syncLimit=2
server.1=node4:2888:3888
server.2=node5:2888:3888
```

因为我的测试环境就部署了两台server，所以就用node4和node5，如果增加server就增加几行。
node4是修改host之后的。把ip的对应关系要先修改好。
两个server是一样的配置方法。

### 修改server的myid
在node5的修改为：
>mkdir -p /usr/local/program/zookeeper/data/ echo 2 > /usr/local/program/zookeeper/data/myid

在node4的修改为：
>mkdir -p /usr/local/program/zookeeper/data/ echo 1 > /usr/local/program/zookeeper/data/myid

### 启动ZooKeeper集群
在bin文件夹下运行如下指令。两台server都需要运行这个命令。看到STARTED表示运行成功。
>./zkServer.sh start

然后通过bin文件夹下的zkServer.sh
>./zkServer.sh status

通过上面状态查询结果可见，node4是集群的Leader，另一个结点是Follower。

### 停止ZooKeeper集群
在bin文件夹下运行
>./zkServer.sh stop

### 参考

[otter4使用介绍](https://docs.google.com/presentation/d/1FDrfVEoNV7AlPOrgXYKo2L_70NDizhwrMpfCG0vztf8/edit#slide=id.p)

[深入理解otter](https://docs.google.com/presentation/d/1FDrfVEoNV7AlPOrgXYKo2L_70NDizhwrMpfCG0vztf8/edit#slide=id.p)