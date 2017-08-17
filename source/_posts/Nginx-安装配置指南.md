---
title: Nginx 安装配置指南
date: 2017-08-17 15:53:12
tags:
    - Linux
    - Ubuntu
---


# 1. 安装
　　在线安装：
>$sudo apt-get install nginx

　　ubuntu安装Nginx之后的文件结构大致为：
　　所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下
　　启动程序文件在/usr/sbin/nginx
　　日志放在了/var/log/nginx中，分别是access.log和error.log
　　并已经在/etc/init.d/下创建了启动脚本nginx
　　默认的虚拟主机的目录设置在了/usr/share/nginx/www

　　在线安装的启动过程
>$sudo /etc/init.d/nginx start

# 参考文献
[1] Ubuntu中Nginx的安装与配置：http://www.cnblogs.com/languoliang/archive/2013/04/01/nginx.html

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
