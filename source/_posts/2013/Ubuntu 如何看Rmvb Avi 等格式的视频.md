---
title: Ubuntu 如何看Rmvb Avi 等格式的视频
tags:
  - Ubuntu
date: 2013-08-30 13:58:34
---

  之前一直用Ubuntu自带的那个电影播放器，每次播放都弹出一个python更新的界面，可是每次都是不成功，后来就做罢了，看电影就换Windows。<span style="line-height: 1.6em;">实在受不了，就研究了下。</span>

	<span style="line-height: 1.6em;">1.最省事的最方便的就是用VLC，我一直在用VLC，一直觉得非常好用，就听听歌就行了的就用用吧。VLC直接打开就能播放。你可以直接在软件源找到它然后安装。</span>

<pre class="brush:bash">
sudo apt-get install vlc</pre>

	<span style="line-height: 1.6em;">2.也可以用Mplayer不过这个需要内核和一个前端，解码器，依次输入</span>

<pre class="brush:bash">
sudo apt-get install mplayer</pre>

<pre class="brush:bash">
sudo apt-get install smplayer</pre>

<pre class="brush:bash">
sudo apt-get install smplayer-themes</pre>

	最后一句可有可无，安装两个就能播放

	当然如果需要解码器，目前还没有遇到这样的情况，遇到了再写