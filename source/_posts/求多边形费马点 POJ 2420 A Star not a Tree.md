---
title: 求多边形费马点 POJ 2420 A Star not a Tree?
tags:
  - ACM
date: 2013-08-31 13:33:23
---

随机选取一个点，再取一个步长，朝这个方向走，如果新位置到各点距离比原来小，则走过去。直到走不动为止，再缩小步长。直到步长小于题目精度。


```cpp
/* poj 2420 多边形费马点 用模拟退火法 逼近
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
#define maxn 120
struct point{
	double x,y;
	point(){
		x = 0;y = 0;
	}
	point(double a,double b){
		x = a; y = b;
	}
}p[maxn];
inline double dis(point a,point b){
	return sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}
double format(point *p,int n,point &pt){
	point u,v,tmp;
	double step = 0,curlen = 0.0,explen,minlen;
	int i, j, k, idx;
	for (int i = 0; i < n; i++){
		step += iabs(p[i].x) + iabs(p[i].y);
		u.x += p[i].x;
		u.y += p[i].y;
	}
	u.x /= n; u.y /= n;
	int flag = 0;
	for (int id = 0; id < n; id ++)
		curlen += dis(u,p[id]);

	while (step > 1e-10){
		flag = 1;
		while (flag){
			flag = 0;
			tmp = u;	
			for (int i = -1; i <= 1; i++)
				for (int j = -1; j <= 1; j++){
					v = point(u.x + step * i,u.y + step * j);
					explen = 0.0;
					for (int id = 0; id < n; id ++){
						explen += dis(v,p[id]);
					}
					if (explen < curlen)
						curlen = explen,flag=1,tmp=v;
				}

			u = tmp;
		}
		step /= 2.0;
	}
	pt = u;
	return curlen;
}

int main(){
	int t;
	scanf("%d", &t);
	for (int i = 0; i < t; i++){
		scanf("%lf%lf", &p[i].x, &p[i].y);
	}
	point p_format;
	double ans = format(p,t,p_format);
	printf("%dn",(int)(ans + 0.5));
	return 0;
}
```
	 