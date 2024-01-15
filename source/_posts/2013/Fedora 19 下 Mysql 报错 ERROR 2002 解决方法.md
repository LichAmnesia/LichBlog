---
title: Fedora 19 下 Mysql 报错 ERROR 2002 解决方法
tags:
  - Fedora
  - Mysql
date: 2013-11-12 09:32:00
---

使用

```
mysql -u root -p
```
启动Mysql报错


```
ERROR 2002 (HY000): Can't connect to local MySQL server through socket &#39;/var/lib/mysql/mysql.sock&#39; (2)
```
然后

```
su -
service mysqld start
mysql -u root -p
```

还是出现

```
ERROR 2002 (HY000): Can't connect to local MySQL server through socket &#39;/var/lib/mysql/mysql.sock&#39; (2)
```


发现是service 这里可能会有问题

用绝对路径启动就行了

```
/etc/init.d/mysqld start
```

启动Mysql

完整命令

```
su -
/etc/init.d/mysqld start
mysql -u root -p
```
	 