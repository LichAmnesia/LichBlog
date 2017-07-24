---
title: Fedora 18 （KDE）使用手册
tags:
  - Fedora
date: 2013-09-29 19:14:49
---

  经过别人的诱惑，开始上手Fedora，感觉要比之前自己配置的Ubuntu看起来要好看。于是准备使用，当然装的时候又是各种问题。

在Fedora的官网上下的LiveCD，不知道好不好用，反正我是没装上去。可能得用其他版本啊

一开始就出现硬盘的Grub装不能成功的问题，一种是卡在某个地方，而后换用各种指令，具体可以搜linux硬盘安装的教程，出现了BusyBox的情况，Ubuntu的卸载也这么难弄啊郁闷死

换用第二种方法，用Universal USB Installer弄进U盘里，可是还是不行，根本无法从U盘进入系统，直接是一个小光标一直在闪始终进不去。

然后实在没有办法了。问别人要了一个Fedora 18 的光盘，插入，安装直接就行了。（如果本身就有Linux系统的话，可以直接把/home那个用到Fedora里面不要格式化，把swap和/分区格式化就行了）

* * *

这样之后终于把Fedora装上去了，发现Fedora没有中文又没有中文输入法，各种没有YM~

因为出19了，就准备直接升级19，升级的命令如下：

1.首先把系统彻底的更新一遍

	 

```
sudo yum -y upgrade
```

2.安装fedup

```
sudo yum -y install fedup
```

3.开始升级，有三个选项可以选，为了方便我选择了网络更新，磁盘有的话不妨试试看光盘或者U盘更新的方法

```
sudo fedup --network 19
reboot
```


4.清理的工作

这里比较恶心的就是fedup可能在更新完后不能正确清理，只能手动来清理了

```
sudo fedup  --resetbootloader
sudo fedup --clean
```

这样grub.cfg和升级后的一些临时文件就能清理掉一些，接着

```
sudo yum clean all
sudo yum distro-sync
```

来把包都更成最新的，然后要清理fedora 18的残留内核，因为是版本升级，所以18的内核就都没用了，都要清掉，命令如下:

```
sudo package-cleanup --oldkernels --count 1
```

成功后升级你的配置文件，如果不失败，估计是你装得什么东西还对内核有依赖，yum删掉后再清除内核，然后更新grub2配置文件

```
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

更新你的grub2配置文件,重启

```
reboot
```

如果发现grub2变得很丑的话，进入系统后

```
sudo yum -y reinstall gurb2*
sudo grub2-mkconfig -o /boot/grub2/grub/cfg
```

这样就能解决问题

然后再更新一边你的配置文件

```
sudo grub2-mkconfig -o /boot/grub2/grub/cfg
```

重启看看，是不是一切都回到原样了

 

按照这样的方式可以很好地升级到19,不过我的电脑出问题了，没有声音了，然后我就很蛋疼的想是什么问题

后来觉得应该是显卡或者是声卡的问题，于是去网上搜了一个没有声音的教程

改了办法发现没有用，于是只好去网上找显卡驱动，之后找到了Navida的官网

然后就NC了，按照官网的英文提示，一点点地装，一开始装了几个，reboot发现声音好了

继续按照官网往下装，然后就开不了机了。郁闷，如果出现一样的没有声音的问题的话，去官网下，只能下到reboot之前的之后的下了就很危险

然后Fedora就启动不起来了，图形界面字符界面都进不去了，这就郁闷了。
 

* * *

没办法果断重装，具体还是用的光盘。

装完了之后会有好多方面的问题，一个个的解决如下

1.修改软件源为最快的那个并且更新下

```
 sudo yum -y install axel yum-plugin-fastestmirror && sudo -y update
```

2.中文的配置 KDE 的不带中文一开始就是英文看不懂加上各种问题

```
yum list kde*chinese
```

先找到有哪些可以安装的

然后两个都装是比较好的，不过我装了

```
yum install kde-l10n-Chinese.noarch
```

这个就行了

然后在system setting的Local然后是Languages里面有Available Languages里面选择就行了
记得注销或者重启

3.配置中文输入法

```
yum install ibus
yum install ibus-sunpinyin
```

先安装Ibus然后在Applications里面的settings里面有一个Input Method然后选择Ibus就行了，当然你的Ibus旁边的那个配置是需要改的，具体的自己看也能看明白，就是添加一个sunpinyin的输入


4.安装chromuim

首先切换到root用户,su - root 您可以可以使用sudu -i

增加Fedora Chromium YUM 源

```
cd /etc/yum.repos.d/
wget http://repos.fedorapeople.org/repos/spot/chromium/fedora-chromium-stable.repo
```

安装Chromium

```
yum install chromium
```

没有wget的话

```
sudo yum install wget
```

5.安装g++,c++ gvim

```
 sudo yum install gcc
 sudo yum install gcc-c++
 sudo yum install gvim
```

如果出现了如下情况

```
 // 事务校验出错：  
file /usr/lib64/audit from install of glibc-2.16.31........  
file from package audit-2.2.1-2.fc18.x86_64 
```

再安装一下

```
 sudo yum install audit 
```

然后进行安装



6. 安装flashplayer

```
yum install flash-plugin
```

具体的指令可能会变，输入flash按Tab来进行补全吧

 