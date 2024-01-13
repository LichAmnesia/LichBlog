---
title: scrapy 和 splash 教程
toc: true
date: 2020-05-25 16:19:58
tags:
 - Python
 - Web
 - JavaScript
---


scrapy 框架不能执行 js，现在比较好的解决方法之一，就是引入 splash。

<!-- more -->

## 1. 安装 splash
Splash 是一个执行 JavaScript 的渲染框架。
```
Splash is our in-house solution for JavaScript rendering, implemented in Python using Twisted and QT. Splash is a lightweight web browser which is capable of processing multiple pages in parallel, executing custom JavaScript in the page context, and much more. Best of all, it’s open source!
```

### 1.1 安装 docker
splash 需要 [docker](https://www.docker.com/) 才能运行。先安装 docker。

安装完之后运行如下，把 splash 的环境配好。
```
$ docker pull scrapinghub/splash
$ docker run -p 5023:5023 -p 8050:8050 -p 8051:8051 scrapinghub/splash
```

现在你可以通过 http://localhost:8050/ 看到相应的页面。

### 1.2 安装 pymysql
安装 pymysql connector。并通过配置
```
pip3 install PyMySQL
```

## 2. 设置splash
主要参考：https://www.jianshu.com/p/7ec32ee1e9d4


### 2.1 scrapy 程序运行
创建一个项目
```
scrapy startproject videospider
```
```
scrapy crawl quotes
```

## 3. FAQ
- 如何设置 post request： https://stackoverflow.com/questions/46925968/how-to-send-a-post-request-with-splashrequest-in-scrapy-splash
- 查看代理：http://www.cloakfish.com/?tab=proxy-analysis
- 匿名代理网站：http://www.gatherproxy.com/zh/proxylist/anonymity/?t=Anonymous
- requests 使用代理：https://www.zhihu.com/question/23825711

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info