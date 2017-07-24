---
title: VS2012 出现加载很多dll文件 导致编译非常长
tags:
  - VS
date: 2013-09-06 00:19:21
---

  做VS项目的时候， 据说因为我的程序出BUG了，就导致VS莫名其妙出现加载很多DLL，编译很久都不显示界面，而且还非常卡

	  最后找到了一个解决方案。 

	  可以通过修改添加一个注册表文件，使得VS不会出现加载过多DLL的情况

	 

	 

	新建一个文本文件，用vim或者sublime打开添加如下

<pre class="brush:other">
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINESOFTWAREMicrosoftWindowsCurrentVersionExplorer]
"AlwaysUnloadDLL"="1"</pre>

	然后保存成*******.reg文件就可以了**是你随机文件名

	然后打开就行了