---
title: 自适应辛普森 数值积分 uVa 1356 Bridge
tags:
  - ACM
date: 2013-08-29 15:34:13
---

首先是Simpson积分公式：

![](http://upload.wikimedia.org/math/8/0/c/80ca47af148fedc25f9b42d84725c0b2.png)（感谢维基百科）

详细讲解请戳：[http://zh.wikipedia.org/wiki/%E8%BE%9B%E6%99%AE%E6%A3%AE%E7%A9%8D%E5%88%86%E6%B3%95](http://zh.wikipedia.org/wiki/%E8%BE%9B%E6%99%AE%E6%A3%AE%E7%A9%8D%E5%88%86%E6%B3%95)

 

由于直接套这个公式很容易得出差得离谱的解，所以要稍加改进，使用自适应Simpson积分：

1.取三个点a, (a+b)/2, b

2.利用Simpson积分公式分别计算原图像在[a, b], [a, (a+b)/2], [(a+b)/2\. b]的面积(分别记为S0, S1, S1)，若S0与S1+S2的值相差无几，则可以认为S0为原图像在[a, b]内的面积。

 

另外需要提及的是，自适应Simpson积分不仅可以求"正常"函数的积分，还可以用来求不规则图像的面积。这个时候，我们就不能狭隘地认为f[a]表示原函数在自变量为a的时候的值，而应该视为直线x=a被图像覆盖的长度（这也就是微积分的本质）。最后求出来的面积是整个图像的总面积，而不像微积分一样把x轴以下部分的面积算作负的（当然，这个自适应Simpson积分也可以做到）。



但是自适应Simpson积分很容易被数据卡掉（毕竟我们只通过5个点来大致确定一个图像的面积），所以求面积时最好分段。
	 

然后是一道例题

```cpp
/* 自适应辛普森 UVA 1356 
 * 二分求解高度 求解抛物线的长度是不是合适
 *
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <set>
#include <vector>
using namespace std;

const int INF = ~0u>>1;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl

// 这里为了方便，把a声明成全局的。
// 这不是一个好的编程习惯，但在本题中却可以提高代码的可读性
double a; 

//simpson 公式用的函数 (这个需要根据题目而改变函数)
double F(double x){
	return sqrt(1 + 4*a*a*x*x);
}

//三点simpson法，这里要求F是一个全局函数
double simpson(double a,double b){
	double c = a + (b-a)/2;
	return (F(a) + 4*F(c) + F(b)) * (b-a) / 6;
}

//自适应simpson公式(递归)。已知整个区间[a,b]上三点的simpson值A
double asr(double a,double b,double eps,double A){
	double c = a + (b-a)/2;
	double L = simpson(a,c),R = simpson(c,b);
	if (fabs(L+R-A) <= 15*eps) return L+R+(L+R-A)/15.0;
	return asr(a,c,eps/2,L) + asr(c,b,eps/2,R);
}

//自适应simpson公式(主过程)
double asr(double a,double b,double eps){
	return asr(a,b,eps,simpson(a,b));
}

//下面这个函数依题面而异，本题求解simpson求解宽度为w,高度为h的抛物线长度
double solve(double w,double h){
	a = 4.0 * h / (w*w); //修改全局变量a，从而改变F的行为
	return asr(0,w/2,1e-5)*2;
}

int main(){
	int t,cas = 0;
	scanf("%d", &t);
	while (cas++<t){
		int D,H,B,L;
		scanf("%d%d%d%d", &D, &H, &B, &L);
		int n = (B+D-1) / D;
		double D1 = (double) B / n;
		double L1 = (double) L / n;
		double x = 0, y = H;
		while(y-x > 1e-5){//二分求解高度
			double m = x + (y-x) / 2;
			if(solve(D1,m) < L1) x = m;
			else y = m;
		}
		if(cas > 1) puts("");
		printf("Case %d:n%.2fn", cas, H - x);
	}

	return 0;

}
```

	 