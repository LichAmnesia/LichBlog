---
title: Spring Session 以及 Redis 配置
date: 2017-02-05 18:00:09
tags:
  - Java
---

# 1 介绍
本文介绍如果使用Spring Session以及Redis连接配置。

<!-- more -->

# 2. Start Redis
首先运行` Redis `确定已经安装。
```
$>redis-cli                                                                                                  
127.0.0.1:6379>
```

# 3. Pom 配置
```
        <!--Spring Session-->
        <dependency>
            <groupId>org.springframework.session</groupId>
            <artifactId>spring-session-data-redis</artifactId>
            <version>1.2.2.RELEASE</version>
            <type>pom</type>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>4.2.5.RELEASE</version>
        </dependency>

```

# 参考
[1] http://www.jianshu.com/p/b4a60b3d52df
[2] http://zk-chs.iteye.com/blog/228556
[3] Session工作原理：https://www.pureweber.com/article/how-session-work
[4] 通过Spring Session实现新一代的Session管理：http://www.infoq.com/cn/articles/Next-Generation-Session-Management-with-Spring-Session
[5] Spring Rest Session：http://docs.spring.io/spring-session/docs/current/reference/html5/guides/rest.html


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
