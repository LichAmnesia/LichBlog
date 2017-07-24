---
title: Mongodb windows 配置
date: 2016-03-05 15:03:27
tags: Mongodb
---



## 1. 下载
下载mongodb的windows版本，有32位和64位版本，根据系统情况下载,下载地址：http://www.mongodb.org/downloads
按照步骤进行安装。
默认是在C:\Program Files\MongoDB\Server\3.2\bin,我的是64位的。
Path添加C:\Program Files\MongoDB\Server\3.2\bin这行。这样就可以命令行启动了

## 2. 启动
运行mongodb服务，--dbpath指的是数据库地址
>mongod.exe --dbpath D:/mongodb/data/db

启动成功后能够看到是数据库端口和Web端口，默认分别是27017和28017，在浏览器中打开http://localhost:28017，可以看到其相关的一些信息。

可以通过添加参数--port的方式，来修改数据库端口：

>mongod.exe  --port 10001 --dbpath D:/mongodb/data/db

上面这个是服务，还需要再开一个终端进行连接数据库
>mongo

就可以连接上mongodb的服务

## 3. 自启动加入windows服务
这样每次启动MongoDB很不方便，我们可以像安装的MySQL一样，把它作为Windows服务，这样就方便多了。
安装MongoDB的windows服务的方法为是在相应目录下创建logs目录，然后在CMD命令行输入
>mongod --logpath D:/Work/Mongodb/logs/mongodb.log --logappend --dbpath D:/Work/Mongodb/data/db --directoryperdb --serviceName MongoDB --install

注意CMD要是管理员模式
数据文件目录：/data/db，并且参数--directoryperdb说明每个DB都会新建一个目录；
Windows服务的名称：MongoDB；

以后就可以在cmd下用命令net start MongoDB和net stop MongoDB来启动和停止MongoDB了，也可以在本地服务中看到
