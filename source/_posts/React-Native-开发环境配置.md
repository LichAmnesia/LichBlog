---
title: React Native 开发环境配置
date: 2016-09-20 22:23:51
tags:
    - Windows
    - JavaScript
---

# 1. 介绍
React Native充分利用了Facebook的现有轮子。可以说既拥有Native的用户体验、又保留React的开发效率。详细可看参考文献1和2.

<!--more-->

# 2. 安装测试
### 2.1 SDK location not found 问题
注意如果出现这样问题。
>SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

下面是解答原文：

Go to the android/ directory of your react-native project
Create a file called local.properties with this line:

sdk.dir = /Users/USERNAME/Library/Android/sdk
Where USERNAME is your username

[StackOverFlow问题链接](http://stackoverflow.com/questions/32634352/react-native-android-build-failed?newreg=fe1100fd6e6d44f5acf90f7f07437777)


### 2.2 SDK build error
安装相应的sdk版本，在`Android Studio`下安装。因为有可能出现`Android SDK`版本没装的情况。

### 2.3 无法connect device
windows下要先把sdk\platform-tools加入到path，就是`Android Studio`安装tools目录，这样才能调用里面的命令。

还有一定要注意手机设置成：**开发者选项！！**

小米手机会出现神奇问题：https://github.com/facebook/react-native/issues/6499
以下是小米手机的解决方法：
1. enable developer mode - In your phone, go to Settings, About phone and click on MIUI version 7 times. You’ll see a pop up which says you are a developer now.
2. Go back to Settings, Additional settings, Developer options and enable USB Debugging.
3. Connect your phone to your PC/Mac and on the phone authorize your computer
4. go back to Developer options, scroll down to find Turn on MIUI optimization and disable it. Your phone will be rebooted
5. Try it now :)

### 2.4 安装simulator
推荐安装`Genymotion`，[链接](https://www.genymotion.com/)。
安装完之后要安装`Android`虚拟机。

### 2.5 解决windows无法reload
下面两个链接给出了相应解决方法。
[链接1](http://reactnative.cn/post/2297)
[链接2](http://bbs.reactnative.cn/topic/676/%E4%BF%AE%E6%94%B9index-android-js%E4%B8%8D%E8%83%BD%E5%AE%9E%E7%8E%B0hot-reload/2)

# 参考
[1] 我对React Native看法：http://div.io/topic/851
[2] 如何评价 React Native：https://www.zhihu.com/question/27852694

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
