---
title: ubuntu 下设置gogent
id: 172
categories:
  - 未分类
tags:
---

开始适用ubuntu，先把翻墙搞定。

<pre class="brush:bash">
sudo apt-get install python-gevent
sudo apt-get install python-vte</pre>

	一开始按照wiki说的做，上面两个命令装一下python的东西。然后下载gogent

	&nbsp;

	然后就看到有人说，其实直接把win下的gogent复制过去就行啦 @_@。。

	然后一试，果然可以运行。 =w= 省事了～

	接着就是配置 SwitchySharp。

	chrome应用商店现在可以下载了（当初在win配置的时候chrome商店貌似不能下载哎），然后用导入官网的配置文件出错了哎。 就是网页一直处于加载状态的说。。。

	灵机一动，去把 win&nbsp;chrome的配置文件导出来，在ubuntu的chrome导上去，可以用了～

	可是用的时候要开一个终端，多不好看阿，并且要是能开机启动就好了耶～

	wiki 上说：运行goagent-gtk.py可以使用gtk托盘方式运行goagent。那么我们只需把goagent-gtk.py设为放到启动项里就行啦。

	方法： (ubuntu 12.04)

	Unity桌面右上角 &ldquo;设置&rdquo;（长得像关机键的按钮） -&gt; &ldquo;启动应用程序..&rdquo;。

	然后 &ldquo;添加&rdquo;，&ldquo;名称&rdquo;随便取， &ldquo;命令&rdquo;填写：

	python ~/你的Gogent路径/local/goagent-gtk.py

	这样就OK啦～ 开机自动启动，还可以隐藏成托盘放在Unity桌面的右上方(输入法图标旁边)。