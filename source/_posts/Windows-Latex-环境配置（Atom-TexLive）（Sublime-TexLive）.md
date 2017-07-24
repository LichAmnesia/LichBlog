---
title: Windows Latex 环境配置（Atom + TexLive）（Sublime + TexLive）
date: 2016-08-30 08:37:23
tags:
    - Latex
    - Windows
---


# 1. 介绍
Latex就不用多说了，主要是一般Latex在Mac和Linux上写起来比较方便。想在Windows上安装Latex使用。以下介绍一下在Atom环境下一站式Compile/Build/Deploy使用。但是目前我已经可以使用Atom进行Compile了，但是却一直停留在Compiling，所以不知道到底哪里出了问题，网上暂时没有人能给出解答，暂时先放在这里，等待后续更新。
所以就加上了Sublime的配置教程，这个是可以一站式搞定的。

<!--more-->

# 2. Atom 插件安装
在Atom-setting-install里面搜索以下四个插件名称并安装：
- language-latex 高亮插件
- latex 编译Compile插件
- latex-autocomplete 自动补全插件
- pdf-view pdf预览插件

# 3. 安装Tex Live
[下载地址](https://www.tug.org/texlive/acquire-netinstall.html)

注意安装此Tex Live时候不需要修改默认安装路径，否则需要修改latex插件的config。如果是自己custome的，注意texpath这里一定要进行修改为你安装Tex Live的地址。如果需要自定义可以看参考链接[2]。

# 4. 注意电脑上Miktex版本
一定要是2.9，2.5已经不能安装包了，反正最好是最新的。
### 4.1 安装latexmk
[latexmk下载地址](http://personal.psu.edu/jcc8/software/latexmk-jcc/)，但是应该是在Miktex包管理器下，搜索之后直接安装。就可以了。

# 5. Perl的版本问题
如果你发现安装或者啥时候发现你Perl的版本是在Git下的，一定得重新安装Perl。据说这个问题是由于Git里的Perl不全的问题。[安装地址](http://strawberryperl.com/)。

# 6. Path 的添加问题
Tex Live的安装地址加到Path。比如我的`D:\Software\texlive\2016\bin\win32`
并且MaxTex安装地址加到Path。先后顺序要对。先哪个后哪个。

# 总结
到这里应该你就可以在Atom上进行编译了。但是我出现了一直Compiling的情况。所以转而用Sublime，下面是Sublime配置。

---

首先前面的Tex Live和Miktex仍然需要安装，以及系统Path也需要添加好。

# Sublime 安装插件
首先安装LatexTool。找到user的setting这块代码，修改这段配置文件。
```
"windows": {
  // Path used when invoking tex & friends; "" is fine for MiKTeX
  // For TeXlive 2011 (or other years) use
  // "texpath" : "C:\\texlive\\2011\\bin\\win32;$PATH",
  "texpath" : "D:\\Software\\texlive\\2016\\bin\\win32;$PATH",
  // TeX distro: "miktex" or "texlive"
  "distro" : "miktex",
```
如果仍然不清楚，可以看参考文献[4]。


# SumatraPDF 安装
[下载地址](http://www.sumatrapdfreader.org/)。注意要把可执行文件的安装目录加到系统Path里。Sublime会在编译完成之后调用SumatraPDF进行预览。

# 参考文献
[1] Reddit Atom Latex 讨论：https://www.reddit.com/r/Atom/comments/3n5ml8/completely_new_to_latex_what_plugins_would_you/
[2] Atom latex 插件主页：https://atom.io/packages/latex
[3] Tex Live 主页：https://www.tug.org/texlive/acquire-netinstall.html
[4] LaTeXTools 插件主页：https://github.com/SublimeText/LaTeXTools

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
