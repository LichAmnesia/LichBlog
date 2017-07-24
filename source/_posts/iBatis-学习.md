---
title: iBatis 学习
date: 2016-03-13 20:46:36
tags: 
    - iBatis
---



# 1. 原理
iBATIS 通过 SQL Map 将 Java 对象映射成 SQL 语句和将结果集再转化成 Java 对象，与其他 ORM 框架相比，既解决了 Java 对象与输入参数和结果集的映射，又能够让用户方便的手写使用 SQL 语句。本文主要介绍了 iBATIS 框架的体系结构和运行流程，以及 iBATIS 如何完成 SQL 语句的解析与 Java 对象与数据字段映射关系的建立，最后用一个实例说明了 iBATIS 是如何帮我们完成工作的。

# 2. iBatis 系统结构

1. 根据 JDBC 规范建立与数据库的连接；
2. 通过反射打通 Java 对象与数据库参数交互之间相互转化关系。

# 3. Spring 调用 iBATIS 执行一个 Statement 的时序图
![此处输入图片的描述](http://7xrh75.com1.z0.glb.clouddn.com/ibatis_ibatis%E6%97%B6%E5%BA%8F%E5%9B%BE.jpg)

# 4. ibatis主要使用的一个Demo
http://www.cnblogs.com/ycxyyzw/archive/2012/10/13/2722567.html

# 5. iBatis的parameterClass用法
在ibatis，输入的参数对象常以parameterClass来定义，输出的结果集常以resultMap来定义。(resultMap:方便JAVABEAN属性及字段的映射，调用JAVABEAN的setter进行设置值。通常我们不采用resultClass属性进行映射，因为它不具备映射数据库表字段的持久化特性。)
 
在ibateis中，parameterClass的类型大都是：string,int/对象/hashmap
                        resultclass/resultMap的类型大都是：对象/hashmap
当parameterClass为string,int时，可用#value#表示或直接用传入的值名表示。
当parameterClass/resultMap的类型是对象时，用#属性#表示。程序会调用JAVABEAN的getter方法，进行获取属性值。
当parameterClass/resultMap的类型是hashmap(Map是key-value结构的)时，那程序会直接通过key来分析取参数。

# 6. iBatis #与\$
注意：#与\$区别：
1.#是把传入的数据当作字符串，如#field#传入的是id,则sql语句生成是这样，order by "id",这当然会报错．．
2.$传入的数据直接生成在sql里，如$field$传入的是id,则sql语句生成是这样，order by id, 这就对了． 
 $方式一般用于传入数据库对象．例如传入表名.
\#方式一般用于传入插入/更新的值或查询/删除的where条件


# 7. parameterMap 使用
http://xulongfa.iteye.com/blog/423576