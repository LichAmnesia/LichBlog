---
title: Aurora 2.3 连接 office 2016 使用 LaTex
date: 2016-05-04 20:38:47
tags:
    - 科研
---

　　Aurora 可以在 Word 中插入 LaTex 公式，排版和 LaTex 一样，非常漂亮。
　　当然你可以利用MathType转化为LaTex，在用Aurora渲染，不失为一种好方法。但是 MathType 是选择然后复制进去的，Aurora 是直接输入 LaTex 源码，然后直接插入（可以不用鼠标，个人觉得更加方便了。）
　　安装后在 Word 插入对象里多一个 Aurora 标签。

<!-- more -->
# 1. 下载 Aurora 

　　Aurora 的下载地址：链接：http://pan.baidu.com/s/1nvfCtp3 密码：3o05
　　直接下载，然后安装，自带的 MiKTeX 没有的话也得选择安装。
　　这时候在Word 2016里面就可以插入 LaTex 公式了，在插入 - 对象 - 点进去找到 Aurora 插入即可（Ctrl + S 以及 Esc）。但是这样会出现下面的问题。
　　
# 2. 解决注册和无法插入的问题

### 2.1 激活　　
　　激活是直接打开上述文件的激活工具，然后输入英文，激活既可以。

### 2.2 解决插入错误
　　然后 Word 里插入公式的时候会出现以下错误。
　　
```
Problems running LaTeX 
```

　　在打开的 Aurora 对话框中选"Properties——>Path"，修改路径为如下，具体可能有不同。
　　
```
C:\Program Files (x86)\MiKTeX 2.5\miktex\bin\latex.exe
C:\Program Files (x86)\MiKTeX 2.5\miktex\bin\dvipng.exe
C:\Program Files (x86)\MiKTeX 2.5\miktex\bin\pdflatex.exe
```
　　**PS：**也可以修改系统path为<目录>\miktex\bin，但是貌似没效果。　　
　　还需要将Windows系统时间往前调，09年或10年都行，然后打开office重新运行aurora，ok，没有出现问题。这时系统时间改回来即可。


# 3. Word 使用 Aurora
　　
　　Aurora 在 Word 2016 里面是一个对象，插入一个对象，可以把对象这个功能放到自定义快速访问工具栏。然后就可以使用 Alt + 数字键进行调用，具体可以先按下 Alt 键，然后看对象这个功能在哪里。插入的代码和效果基本如下面所示。
　　
```
\sqrt{x^2 + b^2} = c
```
$$\sqrt{x^2 + b^2} = c$$

# 4. 在 Aurora 中如何使用中文

　　   
　　对于CTeX 2.8/2.9 而言，在 Aurora 中使用中文需要重新配置字体，在默认为 TrueType 字体下是不能正确输出中文的。
 
　　1) 开始菜单—CTeX—FontSetup—勾选上“生成Type1字库”和“使用Type1字库”这两个选项，重新配置字体，完成安装。
 
　　2) 在打开的 Aurora 对话框中选"Properties——>Packages"，添加宏包“\usepackge{ctex}”。
 
　　3) 在数学环境中使用“\text{中文}”输入中文。
 
　　即可正确输出中文。

# 参考文献

[1] 知乎有关Auora的回答： https://www.zhihu.com/question/24613226

[2] 在 MSOffice 内输入 LaTeX 公式的很好用插件：http://blog.lehu.shu.edu.cn/shuishousong/A226792.html


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info