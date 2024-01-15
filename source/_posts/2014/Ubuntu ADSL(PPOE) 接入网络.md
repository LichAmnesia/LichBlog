---
title: Ubuntu ADSL(PPOE) 接入网络
tags:
  - Ubuntu
date: 2014-04-06 11:15:36
---

**使用pppoeconf命令拨号**

**第一次用的时候：**

启用有线连接：

```
sudo ifconfig eth0 up
```

在终端中输入:

```bash
sudo pppoeconf
```
	 

	 

之后在需要的时候启动ADSL连接，可以在终端中输入：

```bash
sudo pon dsl-provider
```

断开ADSL连接，可以在终端中输入：

```bash
sudo poff dsl-provider
```

如果你发现连接正常工作，尝试手动去调整你之前ADSL连接的配置。

需要查看日志，可以在终端中输入：

```bash
plog
```

获得接口信息，可以在终端中输入：

```bash
ifconfig ppp0
```


----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
 