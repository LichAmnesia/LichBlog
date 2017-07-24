---
title: Markdown wordpress 使用笔记
tags:
  - Markdown
date: 2015-06-10 20:03:50
---

# 前言

如何在wordpress下面使用jetpack的Markdown，因为这里面的Markdown语法和普通略有不同（少了一些功能），现整理如下

# Markdown语法

## 强调

*   _斜体_使用`*斜体*`或者`_斜体_`
*   **加粗**使用`*加粗*`或者`__加粗__`进行加粗
*   水平线在一行输入三个或者以上的--------,*****
*   ~~删除线~~用两个波浪线括起来`~删除线~`

## 链接

*   行内链接  [link](http://example.com)   使用`[link](http://example.com)`
*   引用链接  ：
Some text with [a link](http://example.com/) and
another [link](http://example.org/).
举例如下：

<pre class="lang:default decode:true " >Some text with [a link][1] and
another [link][2].

[1]: http://example.com/
[2]: http://example.org/</pre>

## 列表

*   在行首使用  `*Item`或者  `_Item`
*   数字列表在行首使用  `1\. Item`
*   1.  混合列表使用  `* 1\. Item`

## 引用

> Example

在行首使用 ` > `或者 ` > > ` 即可

## 代码

*   行内代码 'Example' 使用单引号`'Example'`
*   代码块 使用`Code`即可````Code````
*   相应代码高亮使用

    #button {
        border: none;
    }
    `</pre>

    使用举例：

    <pre class="lang:default decode:true " >```css
    #button {
        border: none;
    }
    ``