---
title: Tank_War 大一课程设计更新报告
date: 2013-09-11 10:15:59
tags:
---

第一次写这样的项目，用VS的cpp写的比较简单，先放一个下载文件

	 http://pan.baidu.com/share/link?shareid=694816596&uk=168774939 

	要添加一个easyx的库，非常不安全，以后不这样的，这次敢时间

	 

	首先遇到了加载过多dll的问题，可以写出一个.reg文件里面内容是如下，再添加进注册表就行了

<pre class="brush:other">
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINESOFTWAREMicrosoftWindowsCurrentVersionExplorer]
"AlwaysUnloadDLL"="1"</pre>

	 

	VS出现了unsafe，貌似是error C4996，你用了getch什么的就不让你编译通过，可以去网上搜一个解决方案，getch的问题改成_getch就可以编译通过了，见如下

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; ">菜单： </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; "> </span><wbr style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; " /><span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; ">项目 | 属性 | 配置属性 | C/C++ | 命令行 | 附加选项（其他选项）,加入【/D"_CRT_SECURE_NO_DEPRECATE" 】(注：加入中括号中完整的内容)</span>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; line-height: 26px; ">或者_CRT_SECURE_NO_WARNINGS，不过不建议，这样就全部都没了</span>

	 