---
title: How to install Hibernate in IntelliJ IDEA
date: 2017-09-28 23:49:28
tags:
    - Java
    - Mac
toc: true
---

## 1. Install database
In this post, we just use mysql as the database. You can use other databases as well. 

<!-- more -->

First, you should install mysql in your computer. Then in terminal use your password to open mysql:


```
> mysql -u root -p
```

Create a `test` database:
```
mysql> CREATE DATABASE test;
mysql> use test;
mysql> CREATE TABLE example (
         id INT,
         data VARCHAR(100)
       );
```

## 2. Import Hiberante into IntelliJ IDEA
Use the previous project [Spring MVC example](https://github.com/vivlai/SpringMVC) code. Unzip the code to a folder and use IntelliJ to open the code folder. You can refer the previous [post](http://alwa.info/2017/09/22/How-to-install-Spring-MVC-in-IntelliJ-IDEA/) to see more details.

### 2.1 Configure hibernate
In `File` -> `Project Structure` -> `Modules` -> `Add` -> `Hibernate`:

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate1.png)

Add `hibernate.cfg.xml`:

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate2.png)

### 2.2 Connect to mysql
Next, we need to connect to database (Now we use mysql for example, you can use what database you want). `View` -> `Tool Windows` -> `Database` -> `Choose Mysql`:

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate3.png)

Fill your database information. Then click `Apply`. In `Schema` section, choose current schema.
Maybe, you need to install jdbc in the configuration. Just click install button in this configuration.

### 2.3 Generate model and hbm files 
In `View` -> `Tool Windows` -> `Persistence` -> `Generate Persistence Mapping` -> `By database schema`:

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate4.png)

Set where the generated code is. I set in the package `org.shen.model`. And choose the data source.

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate5.png)

Then the files will be generated, and hibernate has been installed in IntelliJ.

![](http://7xrh75.com1.z0.glb.clouddn.com/hibernate6.png)


