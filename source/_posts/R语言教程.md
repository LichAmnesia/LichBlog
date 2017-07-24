---
title: R语言教程
date: 2017-02-05 17:46:51
tags:
  - R
---

# 1. 安装
对于 Windows，直接安装 [R-project](https://www.r-project.org/) 下面的32位或者64位。然后再去下载一个 [RStudio](https://www.rstudio.com/) 的 IDE 就可以使用了。

<!--more-->

对于Ubuntu，参考如下顺序先安装`R`。
```
sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu xenial/" | sudo tee -a /etc/apt/sources.list
gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9
gpg -a --export E084DAB9 | sudo apt-key add -
sudo apt-get update
sudo apt-get install r-base r-base-dev
```
`RStudio`安装和windows差不多。

# 2. 基础语法
### 2.1 help
help 可以调用到文档，可以查看指令命令。
```r
help(norm)
help(c)
```
### 2.2 设置工作目录
获取当前目录和修改当前目录：setwd() 和 getwd()
```r
> getwd()
[1] "C:/Users/Lich_/Documents"
```


### 2.3 产生序列
```r
> x = c(1,2)
> x
[1] 1 2
> x = 1:5
> x
[1] 1 2 3 4 5
> seq(2,-2,by=-1)
[1]  2  1  0 -1 -2
> seq(2,-2,length=4)
[1]  2.0000000  0.6666667 -0.6666667 -2.0000000
> rep(x, each=5)
 [1] 1 1 1 1 1 2 2 2 2 2 3 3 3 3 3 4 4 4 4 4 5 5 5 5 5
> rep(x, times=5)
 [1] 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5
```
### 2.4 向量角标
去掉某个位置值用负号表示。标号从 1 开始。

```r
> x=5:10
> x
[1]  5  6  7  8  9 10
> x[-1]
[1]  6  7  8  9 10
> x[1:3]
[1] 5 6 7
```
取几个位置的值，并且变成向量
```
> i = c(1, 4)
> x[i]
[1] 5 8
```


### 2.5 数学操作
| 函数        | 解释           |
| :-------------: |:-------------:|
| +,-,*,/,^,%%,%/% | 四则、同余 |
|<,>,<=,>=,==,!= | 比较、逻辑|
|log(x),log10(),log2(),exp(),expm1(),log1p() | 对数、指数|
|sqrt(),sign(),factorial()|开方、符号、阶乘|
|cos(),sin(),tan(),acos(),asin(),atan(),atan2()|三角函数|
|cosh(),sinh(),tanh(),acosh(),asinh(),atanh()|反三角函数|
|union(),append(),intersect()|集合|
|max(),min(),which.max(),which.min()|最大值，最小值|
|identical(),all.equal,setdiff(),setequal()|比较|
|append(),rbind(),cbind()|合并|
|sum(),prod(),cumsum(),cumprod()|连加、连乘|
|length(),range(),round()|长度，范围，取整|

### 2.6 向量排序
sort()：输出排序后的结果；order()：输出排序后的各个分量位置；rank()：各个分量的排名;rev()：将向
量逆序重新排列
```r
> a=c(3,9,0,12,19)
> sort(a)
[1] 0 3 9 12 19
> order(a)
[1] 3 1 2 4 5
> rank(a)
[1] 2 3 1 4 5
> rev(a)
[1] 19 12 0 9 3
```
### 2.7 矩阵操作
定义矩阵，默认按照列来进行填充。
```
> x=1:20
> y=matrix(x,nrow=4,ncol=5)
> y
[,1] [,2] [,3] [,4] [,5]
[1,] 1 5 9 13 17
[2,] 2 6 10 14 18
[3,] 3 7 11 15 19
[4,] 4 8 12 16 20
> z=matrix(x,4,5,byrow=TRUE)
> z
[,1] [,2] [,3] [,4] [,5]
[1,] 1 2 3 4 5
[2,] 6 7 8 9 10
[3,] 11 12 13 14 15
[4,] 16 17 18 19 20

```

可以使用方括号提取矩阵的元素,y[i,j] 表示矩阵第 i 行第 j 列的那个元素，y[i,] 表示第 i 行，y[,j] 表
示第 j 列。若在 i 或 j 前面加上负号 -，则表示除去这些行或列剩下的部分

| 函数        | 解释           |
| :-------------: |:-------------:|
|t()|矩阵转置|
|det(),norm()|行列式、模|
|solve()|非奇异方阵的逆矩阵|
|diag(),upper.tri(),lower.tri(),|对角、上三角、下三角|
|dim(),nrow(),ncol()|维数、行数、列数|
|qr(),svd(),eigen()|QR分解、SVD分解、谱分解|
|rowMeans(),rowSums,colMeans(),colSums()|每行/列的平均值/和|

### 2.8 字符串操作
大小写转换
```r
> toupper(s)
[1] "SUNDAY" "MONDAY" "TUESDAY" "WENDESDAY" "THURSDAY" "FRIDAY" "SATURDAY"
> tolower(s)
[1] "sunday" "monday" "tuesday" "wendesday" "thursday" "friday" "saturday"
```
截取字符串从 1 到 3 号位置。
```
> substr(s,1,3)
```
### 2.9 数据框
数据框（data frame）是一个属于”data.frame” 类的列表。不过，对于可能属于数据框的列表对象有
下面一些限制条件，
• 分量必须是向量 (数值, 字符, 逻辑)，因子，数值矩阵，列表或者其他数据框;
• 矩阵，列表和数据框为新的数据框提供了尽可能多的变量，因为它们各自拥有列，元素或者
变量;
• 数值向量，逻辑值，因子保持原有格式，而字符向量会被强制转换成因子并且它的水平就是
向量中出现的独立值;
• 在数据框中以变量形式出现的向量结构必须长度一致，矩阵结构必须有一样的行数.
```
> city=c("DC","LA","NY")
> PI=c(11.3,10.2,13.0)
> FS=c(4.2,4.5,3.5)
> fin=data.frame(City=city,Person.Income=PI,Family.Size=FS)
> fin
City Person.Income Family.Size
1 DC 11.3 4.2
2 LA 10.2 4.5
3 NY 13.0 3.5

```


# 3. 文档操作
### 3.1 读取csv文件
文档函数
```
read.csv(file, header = TRUE, sep = ",", quote = "\"",
         dec = ".", fill = TRUE, comment.char = "", ...)

```
```
> a=read.csv("authors.csv")
> b=read.table("books.txt",header=TRUE)
> a
surname nationality deceased
1 Tukey US yes
2 Venables Australia no
3 Tierney US no
4 Ripley UK no
5 McNeil Australia no
```
对应的，可以用 write.csv() 或 write.table() 将数据写入文件。若给定的文件不存在，则创建新的文
件；若已经存在，则会覆盖掉，因此应当小心设置文件名。
```r

```
> write.csv(a,"authors-new.csv",row.names=FALSE)



# 4. 绘图
使用ggplots进行绘图

### 4.1 箱线图
基本参考[官方教程](http://docs.ggplot2.org/current/geom_boxplot.html)。
```
library(ggplot2)
p <- ggplot(mpg, aes(class, hwy))
p + geom_boxplot()
```
![](http://docs.ggplot2.org/current/geom_boxplot-2.png)

把点显示出来
```
p + geom_boxplot() + geom_jitter(width = 0.2)
```
![](http://docs.ggplot2.org/current/geom_boxplot-4.png)

设置外围点不同颜色
```
>p + geom_boxplot(outlier.colour = "blue", outlier.shape = 1)
```

### 4.2 设置多个图在一张图上
使用下面的函数。
```
a = read.csv("features_out.csv", sep = '\t')
p1 <- ggplot(a, aes(alpha, density)) + geom_boxplot(aes(group = cut_width(alpha, 0.1))) + geom_jitter(width = 0.001) + ggtitle("Weight User Graph Filter Figure")
p2 <- ggplot(b, aes(alpha, density)) + geom_boxplot(aes(group = cut_width(alpha, 0.1))) + geom_jitter(width = 0.001) + ggtitle("Latency User Graph Filter Figure")
multiplot(p1, p2, cols=2)
# 调用方法
```
先定义下面这个函数
```
# Multiple plot function
#
# ggplot objects can be passed in ..., or to plotlist (as a list of ggplot objects)
# - cols:   Number of columns in layout
# - layout: A matrix specifying the layout. If present, 'cols' is ignored.
#
# If the layout is something like matrix(c(1,2,3,3), nrow=2, byrow=TRUE),
# then plot 1 will go in the upper left, 2 will go in the upper right, and
# 3 will go all the way across the bottom.
#
multiplot <- function(..., plotlist=NULL, file, cols=1, layout=NULL) {
  library(grid)

  # Make a list from the ... arguments and plotlist
  plots <- c(list(...), plotlist)

  numPlots = length(plots)

  # If layout is NULL, then use 'cols' to determine layout
  if (is.null(layout)) {
    # Make the panel
    # ncol: Number of columns of plots
    # nrow: Number of rows needed, calculated from # of cols
    layout <- matrix(seq(1, cols * ceiling(numPlots/cols)),
                    ncol = cols, nrow = ceiling(numPlots/cols))
  }

 if (numPlots==1) {
    print(plots[[1]])

  } else {
    # Set up the page
    grid.newpage()
    pushViewport(viewport(layout = grid.layout(nrow(layout), ncol(layout))))

    # Make each plot, in the correct location
    for (i in 1:numPlots) {
      # Get the i,j matrix positions of the regions that contain this subplot
      matchidx <- as.data.frame(which(layout == i, arr.ind = TRUE))

      print(plots[[i]], vp = viewport(layout.pos.row = matchidx$row,
                                      layout.pos.col = matchidx$col))
    }
  }
}
```

http://www.cookbook-r.com/Graphs/Multiple_graphs_on_one_page_(ggplot2)/


# 参考
[1] Swirl，一个R的学习包：http://swirlstats.com/students.html
[2] R语言绘图基础：http://blog.qiubio.com:8080/archives/2395
[3] ggplot2 折线图： http://rstudio-pubs-static.s3.amazonaws.com/156544_29574b45d8de481aabaf673997426c74.html
[4] ggplot2 散点图：https://www.douban.com/note/427543680/

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
