---
title: 解决vpn错误:l2tp 连接尝试失败,因为安全层在初始化与远程计算机的协商时遇到一个处理错误
date: 2016-04-06 20:01:37
tags:

---

<!-- more -->

Windows配置VPN，选择“使用IPsec的第2层隧道协议(L2TP/IPSec)”时，有时候正常有时候。

1. 单击“开始”，单击“运行”，键入“regedit”，然后单击“确定”

2. 找到下面的注册表子项，然后单击它： HKEY_LOCAL_MACHINE\ System\CurrentControlSet\Services\Rasman\Parameters

3. 在“编辑”菜单上，单击“新建”->“DWORD值”

4. 在“名称”框中，键入“ProhibitIpSec”

5. 在“数值数据”框中，键入“1”，然后单击“确定”

6. 退出注册表编辑器，然后重新启动计算机


----
　

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info