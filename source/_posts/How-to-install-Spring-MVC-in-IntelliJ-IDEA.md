---
title: How to install Spring MVC in IntelliJ IDEA
date: 2017-09-22 10:43:54
tags:
    - Java
    - Mac
toc: true
---

# 1. Download IntelliJ IDEA Ultimate
You can apply for student in JetBrains. It's free. [Application Link](https://www.jetbrains.com/student/).
After applying for student account. Download the [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/download/).

<!-- more -->

# 2. Download Tomcat 8.5.20
### 2.1 For Mac
This is for **Mac**, linux is similar.
- First go to apache tomcat [website](https://tomcat.apache.org/download-80.cgi#8.5.20). Download zip from `Core` part(tar.gz is fine too).
- Goto `~/Downloads`, unzip the file into a folder.
- Move the extracted folder `apache-tomcat-8.5.20` to `~/Applications`. Run `mv ~/Downloads/apache-tomcat-8.5.20 ~/Applications/apache-tomcat-8.5.20`
- In `~/Applications` folder, run `sudo ln -s apache-tomcat-8.5.20 tomcat`

### 2.2 For Windows
- First go to apache tomcat [website](https://tomcat.apache.org/download-80.cgi#8.5.20). Remember to download the windows version zip files.
- Goto `~/Downloads`, unzip the file into a folder. Remember the folder path.
- Add the tomcat path to the confiuration. When you work on 3.1. Other parts are the same.

# 3. Download the Spring MVC example code
### 3.1 Configure & Run example code
Download [Spring MVC example](https://github.com/vivlai/SpringMVC) code. Unzip the code to a folder and use IntelliJ to open the code folder.

Click `Edit Configuration` in the picture below.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC1.png)

If you have installed the `Tomcat`, your configuration should be the same as below. Ohterwise you should install `Tomcat` firstly. And if you have installed `Tomcat`, you need to choose the `Tomcat` path. And then run. In my computer, I use `/Users/lich/Applications/tomcat` for the `Tomcat` Home.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC2.png)

After you run your program, you can see the following. It meens Spring MVC has been installed in your machine.
![](http://7xrh75.com1.z0.glb.clouddn.com/SpringMVC3.png)

### 3.2 When you don't have the permission to run the project
When you run the project, it says you don't have permission. You can try the following commands.

The easiest way to do is to just chmod all the folder into 777 permissions.
```
sudo chmod -R 777 ~/Applications/tomcat
```
Otherwise, it's safe to set a new user nobody to run `Tomcat`.
```
$ sudo chown -R nobody:nobody ~/Applications/tomcat
   // -R: recursive thru sub-directories
   // {user}:{group}
 
// To start tomcat as user nobody
$ cd ~/Applications/tomcat/bin
$ sudo -u nobody ./startup.sh       // No console message
$ sudo -u nobody ./catalina.sh run  // See console message
```

# 4. If you are using Eclipse
You can check this [post](http://www.mkyong.com/spring-mvc/spring-mvc-hello-world-example/) to see how to do. 


# Reference
1. [Mac User, how to install ...](https://www.ntu.edu.sg/home/ehchua/programming/howto/MacUsers_HowTo.html)