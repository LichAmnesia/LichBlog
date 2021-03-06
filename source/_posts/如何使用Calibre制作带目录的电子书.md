---
title: 如何使用Calibre制作带目录的电子书
date: 2017-01-03 18:58:40
tags:
  - RegExp
---

# 1. 导言
本文主要讲如何使用`Calibre`通过`txt`格式的电子书，制作成带目录的`mobi`或者`epub`格式的电子书。

主要准备工作包括，你需要有`Calibre`，并且懂得一点正则表达式（可以参考[这里](http://alwa.info/2016/08/06/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%AF%AD%E6%B3%95/)）
<!-- more -->

# 2. 安装Calibre
[下载链接](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiT1u_v9abRAhUHjlQKHXD0D4EQFggcMAA&url=https%3A%2F%2Fcalibre-ebook.com%2F&usg=AFQjCNHrK4qOcViUurGreerg73pXoyUaog&sig2=w7yl2Pa_1Y-KDKGb4c3Udg)

# 3. 制作目录
下载一个`txt`格式的电子书。我以《陆小凤传奇》为例（版权问题就不放下载链接了）。

使用`Atom`打开（当然用`Sublime`和`Word`也是一样的，大文件别用Atom打开，会炸）。找到替换，然后打开 正则表达式匹配选项（regular expression）。

首先这本书有五部：
1. 金鹏王朝（又名陆小凤传奇）
2. 绣花大盗
3. 决战前后
4. 银钩赌坊
5. 幽灵山庄

所以先匹配第几部作为目录第一级。目录第一级在文本里用`#`表示。

搜寻框填写
```
(第 [一二三四五六七八九] 部)
```

替换框填写
```
# $1
```
原本是
```
第 一 部 金鹏王朝
```
变成了
```
# 第 一 部 金鹏王朝
```
然后就是匹配各个章节，作为目录第二级。目录第二级在文本里用`##`表示。


搜寻框填写。因为出现
```
第 一 回　有四条眉毛的人
第二回　丹凤公主
```
两种不同格式，所以需要匹配那个多的空格。超过百回的一样的原理，多一个百。
```
(第)[ ]*([一二三四五六七八九][十]*[一二三四五六七八九]*)[ ]*(回)
```

替换框填写
```
## $1$2$3
```

原本是
```
第 一 回　有四条眉毛的人
第二回　丹凤公主
```

变成了
```
## 第一回　有四条眉毛的人
## 第二回　丹凤公主
```
因为每本都有一个尾声，再匹配一下尾声就行。
```
尾　声
```
替换为
```
## 尾　声
```

这样就已经完成制作电子书目录的工作，后面就是转换书籍格式。把修改好的电子书拖进`Calibre`书库里面。

# 转换格式
原本在`Calibre`里是我们修改好的`txt`电子书，现在我们需要把电子书转换成`mobi`格式。`epub`等其他格式后面用`mobi`可以直接进行转换。

选择这本书，然后按选项栏里的`转换书籍`。可以看到最左边是书籍本身格式`txt`,把右边格式输出格式改成`mobi`。当然你可以修改图书基本属性，以及封面等。如图所示：

![图](http://storage.googleapis.com/lichamnesia.appspot.com/images/%E8%87%AA%E5%88%B6%E7%94%B5%E5%AD%90%E4%B9%A61.PNG)

然后选择`内容目录`，调整为如图所示。主要是一级目录和二级目录表达式：`//h:h1`。这也是为了对应之前我们所说的`#`和`##`。注意上面的最大章节数可能需要修改。完成后点击确定。
![图](http://storage.googleapis.com/lichamnesia.appspot.com/images/%E8%87%AA%E5%88%B6%E7%94%B5%E5%AD%90%E4%B9%A62.PNG)

# 成书
现在就可以打开书籍，发现目录已经生成。
![图](http://storage.googleapis.com/lichamnesia.appspot.com/images/%E8%87%AA%E5%88%B6%E7%94%B5%E5%AD%90%E4%B9%A63.PNG)

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
