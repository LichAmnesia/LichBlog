---
title: Google Cloud Storage 设置免费 SSL
toc: true
date: 2020-03-16 17:51:28
tags:
  - Google
  - Google Cloud Storage
  - SSL
  - hexo
---

## 1. 前言
如果还不知道如何在 gcs 上设置静态网站，请看上一篇文章[如何在Google Cloud建立静态博客](http://www.alwa.info/2019/04/19/%E5%A6%82%E4%BD%95%E5%9C%A8Google-Cloud%E5%BB%BA%E7%AB%8B%E9%9D%99%E6%80%81%E5%8D%9A%E5%AE%A2/)。

你需要已经有一个域名 `www.yourexample.com`。

<!-- more -->

## 2. 使用 Cloudflare
原理就是使用 Cloudflare 再进行 redirect，因为你可以免费使用他们家的 shared ssl，这样就保证你的网站是使用 HTTPS 了。

创建 Cloudflare 账号

点击 'Add Site'，然后输入你的域名：
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/ssl_1.png)

选择免费plan
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/ssl_2.png)

查看你的 DNS 记录，直接下一步
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/ssl_3.png)

选择默认方法，另外一个要转域名到 Cloudfare，并不需要
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/ssl_4.png)

然后把你域名提供商的 DNS 记录改到直接访问 Cloudfare，确认完了之后点击下一步。
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/ssl_5.png)


然后你等待几个小时再访问你的域名就可以是 HTTPS 访问了。大功告成！

你也可以使用子域名转向，把所有 http 请求都转向。

## 其他
如果你不在乎每个月付钱，可以使用 Google Load Balance，这个也可以实现 SSL。

大概每个月 18$。


---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info