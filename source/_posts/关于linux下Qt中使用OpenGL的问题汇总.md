---
title: 关于linux下Qt中使用OpenGL的问题汇总
tags:
  - OpenGL
  - Qt
date: 2014-03-10 21:17:13
---

　　最近在帮某陆老师搞一个小车的程序，虽然只是一小个模块，不过已经弄得吃不消了。

　　接触了一下Qt下的编程，然后好不容易才把OpenGL给调试了不会出错。

　　把遇到的问题汇总一下。

	 
　　首先，安装Qt+openGL，官网上下+google基本不会有多大问题。(评判装成功就是你Qt能不能跑Qt中的样例程序，那个3d的hello Qt程序)

　　可以看这个：[http://blog.csdn.net/silangquan/article/details/7845501](http://blog.csdn.net/silangquan/article/details/7845501)

　　然后就开始蛋疼了。

　　找到了那个经典的Nehe的教程，然后就开始头文件找不到，什么reference出错，然后看Qt的样例又貌似没用到`glut.h`之类的头文件。

　　网上的代码的看到的都是`#include <GL/GLUT.h>`之类的形式，怎么都找不到，火起来就直接在ubuntu下搜`glut.h`这个文件，然后发现竟然是小写的，改成小写就行了。大概如下：

```cpp
#include <GL/glut.h>
#include <GL/glu.h>
```

　之后又报错。原来是`.pro`文件得加opengl才行，于是就把所有的都添加了

```cpp
QT  += core gui opengl widgets
```

　　还是不行，有好些函数全都是reference出错，又没有引用错误，到stackoverflow上查到了，还得在`.pro`文件下加lib，如下

```cpp
LIBS+=-lglut -lGLU
```

　　上面两个头文件所需要的。

　　这样子基本就行了。

	 

　　还有一点要搞清的，opengl可绘图，Qt下也有绘图的库，搞混了就不好了，函数什么的都不一样。

	 