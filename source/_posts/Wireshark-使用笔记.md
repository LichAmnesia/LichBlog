---
title: Wireshark 使用笔记
date: 2017-08-17 15:48:07
tags:
    - Windows
    - 网络
---

# 1. wireshark 和 fiddler 不同，在 HTTPS 解析方面
另外一个著名的 HTTP 抓包工具 Fiddler 是通过开启本地代理进行抓包的，它能够解密 HTTPS 流量的原理很简单：首先 Fiddler 作为客户端跟服务端建立 TLS 连接，使用服务端的证书，处理请求和响应；然后 Fiddler 又作为服务端跟浏览器建立 TLS 连接，使用 Fiddler 的证书，处理请求和响应。所以 Fiddler 要解密 HTTPS 流量，需要先把它生成的根证书添加到系统受信任的根证书列表之中。

Wireshark 的抓包原理是直接读取并分析网卡数据，要想让它解密 HTTPS 流量，有两个办法：1）如果你拥有 HTTPS 网站的加密私钥，可以用来解密这个网站的加密流量；2）某些浏览器支持将 TLS 会话中使用的对称密钥保存在外部文件中，可供 Wireshark 加密使用。本文重点介绍第二种方法。


# 2. Wireshark不能做的

为了安全考虑，wireshark只能查看封包，而不能修改封包的内容，或者发送封包。

# 3. Wireshark VS Fiddler

Fiddler是在windows上运行的程序，专门用来捕获HTTP，HTTPS的。

wireshark能获取HTTP，也能获取HTTPS，但是不能解密HTTPS，所以wireshark看不懂HTTPS中的内容

总结，如果是处理HTTP,HTTPS 还是用Fiddler,  其他协议比如TCP,UDP 就用wireshark

![image_1am33kci218dq1amo1qtr1oe71t699.png-335.8kB][1]


# 参考
[如何使用 Wireshark 解析HTTP2数据包](http://blog.jobbole.com/95106/)
[Wireshark 基本介绍和学习 TCP 三次握手](http://blog.jobbole.com/94996/)


  [1]: http://static.zybuluo.com/Alwa/otaafcvohmwfmird94exqtys/image_1am33kci218dq1amo1qtr1oe71t699.png

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
