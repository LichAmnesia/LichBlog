---
title: Kali Linux 安装配置
date: 2016-03-13 20:39:35
tags:
    - Kali
---



# 1. kali linux介绍
Kali Linux是一个高级渗透测试和安全审计Linux发行版。Kali是BackTrackLinux完全遵循Debian开发标准彻底的完全重建。并且拥有超过300个渗透测试工具: 

- 永久免费: Kali Linux一如既往的免费。你永远无需为Kali Linux付费。
- 开源Git树:开源,想调整或重建包的人可以得到所有源代码。
- 遵循FHS: Kali被开发成遵循Filesystem Hierarchy Standard,Linux用户可以方便的找到命令文件,帮助文件,库文件等。
- 大量支持无线设备:Kali Linux尽可能地支持更多的无线设备,在各种各样的硬件上正常运行,兼容大量USB和其它无线设备。
- 集成注入补丁的内核:作为渗透测试者或开发组经常需要做无线安全评估。所以内核包含了最新的注入补丁。
- 安全的开发环境:Kali Linux开发团队由一群可信任的人组成,他们只能在使用多种安全协议的时候提交包或管理源。
- 包和源有GPG签名:所有Kali的包都在它们编译和被提交时被每个开发者签名,而源在其后也对其签名。
- 多语言:虽然渗透工具趋向于用英语,但我们确保Kali有多语言支持,可以让用户使用本国语言定位到他们工作时需要的工具。
- 完全的可定制:让更多有创新精神的用户定制Kali Linux(甚至定制内核)成他们喜欢的样子变得尽可能的容易.
- ARMEL和ARMHF支持:现在有ARMEL和ARMHF系统，支持ARM。Kali Linux有完整的主线发行版的ARM源,所以ARM版的工具将会和别的版本同时更新.Kali现在可以运行在如下的ARM设备:
 + rk3306 mk/ss808
 + Raspberry Pi
 + ODROID U2/X2
 + MK802/MK802 II
 + Samsung Chromebook

# 2. 修改源
kali安装好之apt-get update是不会有更新的。需要修改源。
修改sources.list文件：
>vim /etc/apt/sources.list

注释掉之前的源，增加下面的源。
```
#中科大kali源
deb http://mirrors.ustc.edu.cn/kali kali main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali main non-free contrib
deb http://mirrors.ustc.edu.cn/kali-security kali/updates main contrib non-free

#阿里云kali源
deb http://mirrors.aliyun.com/kali kali main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali main non-free contrib
deb http://mirrors.aliyun.com/kali-security kali/updates main contrib non-free
```

保存之后，安装更新。
>apt-get update
>apt-get upgrade
>apt-get dist-upgrade

# 3. 终端字符集修改
Kali2016会出现终端字符串重叠的问题。需要安装几个包进行解决。在上面源修改之后运行。
>apt-get install ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy

这个时候终端字符集已经正常了。


# 4. Python包的安装
安装python必备组件。
>apt-get install python-setuptools python-pip

