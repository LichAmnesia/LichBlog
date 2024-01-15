---
title: Hexo yilia 源码目录结构及构建须知
toc: true
date: 2020-03-28 22:18:59
tags:
  - hexo
---


## 1. 前言
[hexo-theme-yilia](https://github.com/litten/hexo-theme-yilia) 项目已经好几年没做更新，我 fork 了作者的项目并在此基础上做了一些更新和优化。地址在此[hexo-theme-yilia](https://github.com/LichAmnesia/hexo-theme-yilia)

这篇文章主要介绍源码目录以及我目前所做的一些修改。

<!-- more -->

## 2. 目录结构
- source - Hexo加载主题资源的主目录，需要编译生成
- source-src - 源文件目录，编译到source目录
- layout - 模板目录
- languages - 语言配置目录

一般来说，如果你想修改页面的html，请到layout文件夹里直接修改； 如想修改css，js，请到source-src文件夹里，并通过后面介绍的开发步骤，编译到source里。

## 3. 开发步骤
安装 node + npm。

安装依赖 进入根目录，执行 `npm install`。

开发 执行 `npm run dev` 此时会用webpack打包，把文件编译到 `source` 文件里，但文件不会经过压缩。

发布 执行`npm run dist` 最终确定版本，此时的编译会经过压缩并且编译到 `source` 文件夹里面。

## 4. Hexo博客优化记录
- 增加 Google Adsense 支持
- 去除 report.js，原版这个增加太多 latency
- 升级 npm packages
- 友链增加头像
- [Hexo yilia 主题添加隐藏左边栏目按钮](https://www.alwa.info/2020/Hexo-yilia-%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E9%9A%90%E8%97%8F%E5%B7%A6%E8%BE%B9%E6%A0%8F%E7%9B%AE%E6%8C%89%E9%92%AE.html)


---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info