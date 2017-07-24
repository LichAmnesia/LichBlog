---
title: 树状数组-Lich整理版
tags:
  - 树状数组
  - 算法
date: 2013-08-18 20:54:58
---

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	<span style="line-height: 24px; font-size: 12pt;">树状数组是一种非常优雅的数据结构.</span>
</div>

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	 
</div>

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	<span style="line-height: 24px; font-size: 12pt;">当要频繁的对数组元素进行修改,同时又要频繁的查询数组内任一区间元素之和的时候,可以考虑使用树状数组.</span>
</div>

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	 
</div>

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	<span style="line-height: 24px; font-size: 12pt;">最直接的算法可以在O(1)时间内完成一次修改,但是需要O(n)时间来进行一次查询.</span>
</div>

<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
	<span style="line-height: 24px; font-size: 12pt;">而树状数组的修改和查询均可在O(log(n))的时间内完成.</span>
</div>

<div style="font-size: 14px; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">

		<span style="font-family: 微软雅黑;">对于维护的序列`A`，定义`C[i]=A[j+1]+...+A[i]`，其中`j`为`i`的二进制表示中把最右边的1换成0的值。`j`的值可以通过`lowbit`求出，即</span>

	<pre class="brush:cpp">
j = i - lowbit(i);</pre>

		`lowbit(a)`为`2^(a的二进制表示末尾0的个数)`。可以用下面式子求出

	<pre class="brush:cpp">
lowbit(a)=a&(~a+1)</pre>

		或者根据补码的性质简化为

	<pre class="brush:cpp">
lowbit(a)=a&(-a)</pre>

		lowbit函数

	<pre class="brush:cpp">
inline int lowbit(int x)
{
	return x & (-x);
}</pre>

		修改方式如下

	<pre class="brush:cpp" style="font-family: Verdana, tahoma, Arial, Helvetica, sans-serif;">
void modify(int p,int delta){
	while (p<=n){//n的含义要记得，原数组的下标是1～n
		c[p] += delta;
		p += lowbit(p);
	}
}</pre>

		求前缀和如下

	<pre class="brush:cpp">
int sum(int p){
	int ret = 0;
	while (p){
		res += c[p];
		p -= lowbit(p);	
	}
	return ret;
}</pre>

		 

* * *

		树状数组求解区间最大值的时候，需要按照一定的顺序进行求解，把前面的区间后加上去就可以求。

		然后树状数组求解逆序对的时候，就是求对i，之前比它大的数有几个，树状数组里面存的是数字有没有在数组里面出现，这样就能求逆序。

		求一个数排第几也是同样的想法，有就置为1，没有这个位置就是0。

		 

* * *

	<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
		树状数组可以解决更新线段区间，查询某个点的问题。

		在这种情况下，更新线段区间和查询点的时间复杂度仍然为O(logn).

			 

			 

			设A[1,N]为我们要处理的数组。

			<span style="line-height: 24px; font-size: 12pt;">另外设置一个数组B[1,N]，使得B[1] + B[2] + .. B[i] = A[i], 其中1 <= i <= N.</span>即B[i] = A[i] - A[i-1]

			 

			 

	</div>

		<span style="color: rgb(0, 0, 0); font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px;">当要查询A[i]的时候，我们只需在数组B上使用一般的树状数组操作查询区间[1,i]即可</span>

		<span style="font-family: Verdana, tahoma, Arial, Helvetica, sans-serif;">当我们要给区间A[a~b]加上delta时，只需要在数组B上对B[a]进行一般树状数组的更新delta的操作，同时对数组B上对B[b+1]进行 - delta操作。</span>

		 

* * *

		树状数组可被扩展到多维的情况。假设在一个布满点的平面上(坐标是非负的)。 你有以下三种查询：

1.  将点(x, y)置1
2.  将点(x, y)置0
3.  计算左下角为(0, 0)右上角为(x, y)的矩形内有多少个点(即有多少个1)

	<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">
		C[x][y] = <span style="font-size: 10.5pt; font-family: 宋体;">&sum; a[i][j], 其中，

		x-lowbit(x) + 1 <= i <= x,

		y-lowbit(y) + 1 <= j <= y.</span>
	</div>

	<div style="font-size: 14px; font-family: Verdana, tahoma, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0); word-break: break-all; line-height: 21px;">

		在二维情况下，对应的更新和查询函数为：

			 

			 

			 

			 

		<div style="word-break: break-all;">
			<pre class="brush:cpp">
void Modify(int x, int y, int delta)
{
    for(int i = x; i <= N; i += lowbit(i))
       for(int j = y; j <= N; j += lowbit(i))
          C[x][y] += delta;
}</pre>

				 

			<pre class="brush:cpp">
int Sum(int i, int j)
{
    int ret = 0;
    for(int x = i; x > 0; x -= lowerbit(x))
    {
        for(int y = j; y > 0; y -= lowerbit(y))
        {
            ret += C[x][y];
        }
    }
    return ret;
}</pre>

				 

				 

				 

				 

				 

		</div>

			 

			 

			 

			 

	</div>

* * *

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2; font-size: large;">总结</span>

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2;">BIT很容易编码实现</span>

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2;">所有的查询均花费logn或者常数时间</span>

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2;">需要线性数量级的空间</span>

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2;">可以扩展到n维的情况，BIT可以作为一种多维的数据结构，即可扩展到多维。以上只是一维二维的情况。</span>

		 

* * *

		<span style="font-size:16px;">扩展阅读</span>

		<span style="color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px; line-height: normal; orphans: 2; text-align: -webkit-auto; widows: 2;">翻译自TopCoder上的一篇文章： </span>[Binary Indexed Trees](http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=binaryIndexedTrees) ：[http://hawstein.com/posts/binary-indexed-trees.html](http://hawstein.com/posts/binary-indexed-trees.html) 

		比较详细的树状数组介绍 ：[http://duanple.blog.163.com/blog/static/7097176720081131113145832/](http://duanple.blog.163.com/blog/static/7097176720081131113145832/)

		二维树状数组 ： [http://old.blog.edu.cn/user3/Newpoo/archives/2007/1712628.shtml](http://old.blog.edu.cn/user3/Newpoo/archives/2007/1712628.shtml)

		 

* * *

		 

</div>