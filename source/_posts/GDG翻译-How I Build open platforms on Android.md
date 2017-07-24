---
title: GDG翻译-How I Build open platforms on Android
tags:
  - GDG
date: 2015-05-09 23:40:23
---

 

youtube视频链接: https://www.youtube.com/watch?v=XVrZs-0lfcg

https://www.youtube.com/watch?v=XVrZs-0lfcg

* * *

 

在这个视频里，他介绍了EnPlug怎么颠覆传统数字电视广告，以及展现了怎么才能使用EnPlug平台来开发一个应用，并且EnPlug可以很方便地通过SDK进行开发，以及可以让人在各种设备上运行展示他的软件。

Our SDK helps you engage with more people. Develop a custom Enplug app to showcase something you've already built or start from scratch. Either way, we make it easy.

这个是他们的主页上所说，的确，现在的数字广告屏幕，一方面是广告主不能自己控制内容，酒店或者超市不能按照自己的意愿订制广告播放内容，另一方面，受众也无法与广告进行互动，只能被动的收看屏幕内容。Enplug要提供的就是一种全新的互动数字电视广告屏幕。

 

 

* * *

 

看srt文件麻烦，写了一个python提取字幕的文字。

<pre class="lang:python decode:true"># -*- coding: utf-8 -*-
f = open("[1504120596] How I Build open platforms on Android.srt")             
f2 = open("t.txt","w")
line = f.readline()
cnt = 0
f2.write('nhello boy!')
while line:
    cnt = cnt + 1
    if cnt % 5 == 3:
        f2.write(str(line))
    line = f.readline()

f.close()
f2.close()
</pre>

 

 