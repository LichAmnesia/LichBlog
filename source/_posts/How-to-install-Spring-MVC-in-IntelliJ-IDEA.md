---
title: How to install Spring MVC in IntelliJ IDEA
date: 2017-09-22 10:43:54
tags:
    - Java
    - Mac
toc: true
---

# 1. Download IntelliJ IDEA Ultimate
You can apply for student in JetBrains. It's free. [Application Link](https://www.jetbrains.com/student/)
[Download Link](https://www.jetbrains.com/idea/download/)

# 2. Download Tomcat 8.5.20
This is for Mac, linux is similar.
- First go to apache tomcat [website](https://tomcat.apache.org/download-80.cgi#8.5.20). Download zip from `Core` part(tar.gz is fine too).
- Goto `~/Downloads`, unzip the file into a folder.
- Move the extracted folder `apache-tomcat-8.5.20` to `~/Applications`.
- In `~/Applications` folder, run `sudo ln -s apache-tomcat-8.5.20 tomcat`

In case you don't have permission. You can try the following commands.
```
$ sudo chown -R nobody:nobody ~/Applications/tomcat
   // -R: recursive thru sub-directories
   // {user}:{group}
 
// To start tomcat as user nobody
$ cd ~/Applications/tomcat/bin
$ sudo -u nobody ./startup.sh       // No console message
$ sudo -u nobody ./catalina.sh run  // See console message
```

# 3. Download the Spring MVC example code
Download [Spring MVC example](https://github.com/vivlai/SpringMVC) code to a IDEA project. Open the folder and try.

Click `Edit Configuration` in the picture below.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC1.png)

If you have installed the `Tomcat`, your configuration should be the same as below. Ohterwise you should install `Tomcat` firstly. And if you have installed `Tomcat`, you need to choose the `Tomcat` folder. And then run.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC2.png)

After you run your program, you can see the following. It meens Spring MVC has been installed in your machine.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC3.png)

# 4. If you are using Eclipse
You can check this [post](http://www.mkyong.com/spring-mvc/spring-mvc-hello-world-example/) to see how to do.


# Reference
1. [Mac User, how to install ...](https://www.ntu.edu.sg/home/ehchua/programming/howto/MacUsers_HowTo.html)