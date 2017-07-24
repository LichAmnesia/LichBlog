---
title: otter 介绍以及安装配置教程
date: 2016-03-09 17:31:58
tags:
    - ZooKeeper
    - otter
---



# 1. 介绍
otter是基于数据库增量日志解析，准实时同步到本机房或异地机房的mysql/oracle数据库。是一个分布式数据库同步系统。

原理描述：

- 基于Canal开源产品，获取数据库增量日志数据。 
- 典型管理系统架构，manager(web管理)+node(工作节点)
 + manager运行时推送同步配置到node节点
 + node节点将同步状态反馈到manager上

- 基于zookeeper，解决分布式状态调度的，允许多node节点之间协同工作. 
![原理](http://7xrh75.com1.z0.glb.clouddn.com/otter_canalotter.jpg)

otter的wiki页面：[otter](https://github.com/alibaba/otter)
wiki上的安装以及配置教程很详细。运维方面主要考虑的要在需要同步的数据库节点上装上Node。在管理节点上装manager。并且还需要事先先装好zookeeper。

# 2. otter的安装
### 2.1 环境依赖
otter的环境需要：mysql, jdk, zookeeper, node, aria2, manager。

otter安装首先需要两台服务器，我实现的是两台服务器之间的Mysql数据库双主同步，即双写同步。
假设两个服务为A,B，下面进行安装。首先安装好JDK并配好环境变量，以及mysql的安装。
**otter只支持5.6及以下的mysql，如果版本不对需要重新安装**

安装完后，修改mysql的配置文件：
>vi/etc/my.cnf

检查以下的配置：
```
log-bin=mysql-bin
# binary logging format - mixed recommended
#binlog_format=mixed
binlog_format=ROW #修改成ROW
server-id = 1 #两个机房的serverid设置为不一样的值
```

### 2.2 设置otter数据库账号和密码
然后启动数据库，分别在AB库上分配otter的数据库账号和密码，例如canal/canal，执行sql:
```sql
CREATE USER canal IDENTIFIED BY 'canal'; 
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
 -- GRANT ALL PRIVILEGES ON *.* TO 'canal'@'%' ;
 -- 赋权限，
FLUSH PRIVILEGES;
```
查看权限的sql语句：
```sql
show grants for 'canal';
```
 
### 2.3 匿名删除
需要注意的是，有的Mysql版本，自带了两个匿名用户，需要把两个匿名用户删除。执行sql:
```sql
use mysql; --进入mysql库
select user,host,password from mysql.user; --查询用户列表
delete from mysql.user where user=''; --删除匿名用户
```
## 3. 安装zookeeper
安装过程可参考：
[ZooKeeper 介绍及集群搭建教程](http://alwa.info/2016/03/05/ZooKeeper-%E4%BB%8B%E7%BB%8D%E5%8F%8A%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA%E6%95%99%E7%A8%8B/)
 zookeeper可以只单机安装，也可以以集群形式安装，安装完成后启动。

 
## 4. 安装Node
安装过程可参考：
[Node_Quickstart](https://github.com/alibaba/otter/wiki/Node_Quickstart)，官方文档的启动教程部分。
注意是要做数据抽取服务的机器都要装。

## 5. 安装Manager
安装过程可参考：
[Manager_Quickstart](https://github.com/alibaba/otter/wiki/Manager_Quickstart)，官方文档的启动教程部分。
