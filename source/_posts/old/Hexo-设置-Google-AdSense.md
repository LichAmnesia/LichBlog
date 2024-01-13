---
title: Hexo 设置 Google AdSense
toc: true
date: 2020-03-16 17:13:04
tags:
  - hexo
  - Google AdSense
---

## 1. 前言
无意之间看到了google adsense的广告，于是就想到给我的站点也弄一个，本来以为是很简单的事，参考了很多资料，终于是部署成功了。

<!-- more -->

## 2. 注册google adsense
[注册 AdSense](https://support.google.com/adsense/answer/10162?hl=zh-Hans)

## 3. 把广告代码粘贴到网站上
复制 AdSense 代码到自己的网站上。

首先创建一个 custom 的 layout 在自己的 theme 文件夹下面比如我就是创建 `themes/yilia/layout/_partial/google-adsense.ejs`

```html
<% if (theme.google_adsense){ %>
<!-- Google AdSense start -->
<script data-ad-client="<%= theme.google_adsense %>" async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Google AdSense end -->
<% } %>
```

然后在相对应的 `head.ejs` 下面加上
```html
<%- partial('google-adsense') %>
```
因为引用 theme 下面的 config，你还需要在 theme 下面的 `_config.yml`，加上你 AdSense 的 ID
```
google_adsense: 'xxxxxxx'
```

## 4. 测试提交代码
```bash
hexo clean && hexo g && hexo s
```
打开 `localhost:4000` 在 debug 模式查看一下代码是否已经已经在页面里面，搜索一下你的 AdSense 代码就可以。



## 5. 关于自动广告

Google 是有自动广告，但是并不是很适合 hexo，如果你选择自动广告，很大概率你的广告只能在手机端显示。

所以务必要选择 AdSense 的广告单元，而不是自动广告。

然后对于广告单元，需要你自己插代码到相应的位置。

## 6. 插入广告位到相应位置

比如我想插入广告到文章结束。那么我在 `article.ejs` 文件里在结束之前加入代码：
```
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid"
  data-ad-client="xxx" data-ad-slot="x"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

然后就可以显示相应广告，大功告成。

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info