---
title: Hexo SEO 优化
toc: true
date: 2020-03-16 20:05:14
tags:
  - SEO
  - hexo
  - Google
---

## 1. SEO 是什么
> 搜索引擎优化（英语：search engine optimization，缩写为SEO），是一种通过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望通过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。当中尤以各种依靠广告维生的网站为甚。

<!-- more -->

>所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的数据比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

> 对于任何一个网站来说，要想在网站推广中获取成功，搜索引擎优化都是至为关键的一项任务。同时，随着搜索引擎不断变换它们的搜索排名算法规则，每次算法上的改变都会让一些排名很好的网站在一夜之间名落孙山，而失去排名的直接后果就是失去了网站固有的可观访问流量。所以每次搜索引擎算演法的改变都会在网站之中引起不小的骚动和焦虑。可以说，搜索引擎优化是一个愈来愈复杂的任务。
-—[维基百科](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E6%2590%259C%25E5%25B0%258B%25E5%25BC%2595%25E6%2593%258E%25E6%259C%2580%25E4%25BD%25B3%25E5%258C%2596)

## 2. 建立谷歌站点地图

### 2.1 什么是站点地图
站点地图是 xml 文件，您可以通过该文件列出您网站上的网页。

这样你网站内容组织架构可以告知 Google，以便爬虫更好的搜索你的网站。


### 2.2 使用 npm 安装谷歌站点地图插件
```
npm install hexo-generator-sitemap --save
```

在 `__config.yml` 添加 `Plugins`
```
Plugins:
- hexo-generator-sitemap

sitemap:
    path: sitemap.xml

```
### 2.3 开始生成站点地图文件
安装好插件后，插件会在每次 `hexo g` 会在 `public` 文件夹下生成一个 `sitemap.xml` 文件。


### 2.4 在谷歌站长控制台添加 sitemap.xml
打开谷歌站长控制台, 点击抓取 -> 站点地图 —> 添加/删除站点地图。

在其中填入sitemap.xml网站站点地图url就完成


## 3. 添加robots.txt测试工具
这文件的目的，就是告诉搜索引擎应该搜索具体哪些文件。

参考[robots.txt 文件简介](https://support.google.com/webmasters/answer/6062608)

在 hexo 的 `source` 文件夹下面新建 `robots.txt`

```
# hexo robots.txt
User-agent: *
Allow: /
Allow: /archives/

Disallow: /vendors/
Disallow: /js/
Disallow: /css/
Disallow: /fonts/
Disallow: /vendors/
Disallow: /fancybox/

Sitemap: https://www.alwa.info/sitemap.xml
```

## 4. 优化你的url
SEO搜索引擎优化认为，网站的最佳结构是用户从首页点击三次就可以到达任何一个页面。

但是我们使用 `hexo` 默认编译的文章的 url 是：`sitename/year/mounth/day/title`四层的结构，这样的结构很不利于 SEO，爬虫就会经常爬不到我们的文章。
于是，我们可以将url直接改成 `sitename/title` 的形式，在根目录的`_config.yml`下修改permalink如下：

因为我的文章太多了，全都放在 `public` 文件夹下面不太好管理，所以我加了一层 `year`。

```
url: https://alwa.info
root: /
permalink: :year/:title.html
permalink_defaults:
```

## 参考
- 1. [Hexo博客Next主题SEO优化方法](https://hoxis.github.io/Hexo+Next%20SEO%E4%BC%98%E5%8C%96.html)

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info