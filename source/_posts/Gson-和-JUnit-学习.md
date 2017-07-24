---
title: Gson 和 JUnit 学习
date: 2016-03-05 16:40:51
tags:
---


# 1. Gson
Gson 是 Google 提供的用来在 Java 对象和 JSON 数据之间进行映射的 Java 类库。可以将一个 JSON 字符串转成一个 Java 对象，或者反过来。

### 1.1 Gson转换出格式
Map的存储结构式Key/Value形式,Key 和 Value可以是普通类型,也可以是自己写的JavaBean,还可以是带有泛型的List.
### 1.1 具体例子
将Json转回为普通JavaBean对象时TypeToken的定义.[JavaBean](http://blog.csdn.net/lk_blog/article/details/7685210)
Json转回为带泛型的对象List,并且List中的泛型对象有多种实体.[LIST](http://blog.csdn.net/lk_blog/article/details/7685224)


# 2. JUnit
JUnit 是一个 Java 编程语言的单元测试框架。JUnit 在测试驱动的开发方面有很重要的发展，是起源于 JUnit 的一个统称为 xUnit 的单元测试框架之一。

JUnit 促进了“先测试后编码”的理念，强调建立测试数据的一段代码，可以先测试，然后再应用。这个方法就好比“测试一点，编码一点，测试一点，编码一点……”，增加了程序员的产量和程序的稳定性，可以减少程序员的压力和花费在排错上的时间。
[详细的教程](http://wiki.jikexueyuan.com/project/junit/overview.html)
