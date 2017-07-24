---
title: Ubuntu 双显示器 分辨率过低
tags:
  - Ubuntu
date: 2013-09-03 16:07:45
---

外接显示器可能无法被Ubuntu检测，显示是未知然后，分辨率最高也就1024 * 768 。

	可以通过下面方法修改

	一.只是本次需要，关机之后回复原来状态

	（1）首先使用xrandr命令查看能检测到的分辨率

<pre class="brush:other">
Screen 0: minimum 320 x 200, current 3286 x 1080, maximum 8192 x 8192
LVDS1 connected 1366x768+0+312 (normal left inverted right x axis y axis) 344mm x 194mm
   1366x768       60.0*+   40.1  
   1360x768       59.8     60.0  
   1024x768       60.0  
   800x600        60.3     56.2  
   640x480        59.9  
VGA1 connected 1920x1080+1366+0 (normal left inverted right x axis y axis) 0mm x 0mm
   1024x768       60.0  
   800x600        60.3     56.2  
   848x480        60.0  
   640x480        59.9  

</pre>

	可以看到目前有两个一个LVDS1是我笔记本的，一个VGA1是我外接的显示器

	（2）然后需要用xrandr命令新增加显示模式，用cvt获得显示模式

<pre class="brush:bash">
cvt X Y H </pre>

	X表示宽度，Y表示高度，H表示显示器的HZ这个可以查看你的显示器的参数，我是1920*1080 60hz的，命令为

<pre class="brush:bash">
cvt 1920 1080 60</pre>

	得到

<pre class="brush:bash">
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
</pre>

	（3）之后把cvt得到的模式用xrandr命令添加，终端输入（具体按照你自己得到的模式输入）

<pre class="brush:bash">
xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
xrandr --addmode VGA1 "1920x1080_60.00"
xrandr --output VGA1 --mode 1920x1080_60.00
xrandr --output VGA1 --right-of LVDS1</pre>

	（4）这样直接就可以显示出效果了

	 

	二，每次开机都能这样配置的方法

	（1）在你自己的主文件夹形成一个display.sh的文件里面输入

<pre class="brush:bash">
#!/bin/bash
xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync;
xrandr --addmode VGA1 "1920x1080_60.00";
xrandr --output VGA1 --mode 1920x1080_60.00;
xrandr --output VGA1 --right-of LVDS1;</pre>

	（2）打开终端输入

<pre class="brush:bash">
cd /etc/
sudo gedit profile
</pre>

	（3）在打开的profile文件里加一句

<pre class="brush:bash">
~/display.sh</pre>

	（4）重启看看效果

	 

	 

	 

	 