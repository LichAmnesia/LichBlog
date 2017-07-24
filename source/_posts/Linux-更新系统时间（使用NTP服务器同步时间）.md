---
title: Linux 更新系统时间（使用NTP服务器同步时间）
date: 2016-08-30 08:21:17
tags:
    - Linux
---

# 1. 介绍
对于很多服务和进程而言，时间同步一直很重要。要更新Linux系统时间，需要完成下面两件事。
- 更改时区
- 修改NTP服务器，并同步

<!--more-->

# 2. 更改时区
首先在`/usr/share/zoneinfo `目录下找到你需要的时区文件，比如我目前时区文件是`/usr/share/zoneinfo/America/Denver`。

```
root@cubieboard2:~# ls /usr/share/zoneinfo/
Africa	    CET      Egypt    GMT+0	 Iran	    MST7MDT  Poland	US	     posix
America     CST6CDT  Eire     GMT-0	 Israel     Mexico   Portugal	UTC	     posixrules
Antarctica  Canada   Etc      GMT0	 Jamaica    NZ	     ROC	Universal    right
Arctic	    Chile    Europe   Greenwich  Japan	    NZ-CHAT  ROK	W-SU	     zone.tab
Asia	    Cuba     Factory  HST	 Kwajalein  Navajo   Singapore	WET
Atlantic    EET      GB       Hongkong	 Libya	    PRC      SystemV	Zulu
Australia   EST      GB-Eire  Iceland	 MET	    PST8PDT  Turkey	iso3166.tab
Brazil	    EST5EDT  GMT      Indian	 MST	    Pacific  UCT	localtime
```
Copy这个文件到`localtime`文件下，主要是为了防止系统重启时区改变。
```
sudo cp /usr/share/zoneinfo/America/Denver /etc/localtime  
```

# 3. NTP同步
一般直接重启NTP就可以了。
```
service ntp restart
```

# 参考文献
[1] 为 Linux 实例设置时间：http://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/set-time.html#change_time_zone
[2] ubuntu设置时区，网上同步时间：http://www.cnblogs.com/php5/archive/2011/02/15/1955432.html

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
