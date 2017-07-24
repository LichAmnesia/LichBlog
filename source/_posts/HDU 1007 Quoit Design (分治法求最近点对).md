---
title: HDU 1007 Quoit Design (分治法求最近点对)
tags:
  - ACM
date: 2014-03-28 09:09:01
---

最近点对可能在下面三种情况

[l,mid] [mid + 1,r] 以及 mid 的左右 d区域

 

```cpp
//hdu1007
//最近点对问题

#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cmath>
#define maxn 100100
using namespace std;

struct Point{
	double x,y;
}p[maxn];
int num[maxn];
bool cmpx(Point a,Point b){
	if (a.x == b.x) return a.y < b.y;
	else return a.x < b.x;
}
bool cmpy(int a,int b)//按y递增排序
{
    return p[a].y < p[b].y;
}
double dis(int i,int j){
	return sqrt((p[i].x - p[j].x) * (p[i].x - p[j].x) +
	 (p[i].y - p[j].y) * (p[i].y - p[j].y));
}

double find(int l,int r){
	if (l + 1 == r) return dis(l,r);
	if (l + 2 == r) return min(min(dis(l + 1,r),dis(l,l + 1)),dis(l,r));
	int mid = (l + r) / 2;
	double ans = min(find(l,mid),find(mid + 1,r));
	int cnt = 0;
	for (int i = l; i <= r; i ++){
		if (fabs(p[i].x - p[mid].x) <= ans)
			num[cnt ++] = i;
	}
	sort(num,num+cnt,cmpy);
	for (int i = 0; i < cnt;i ++){
		for (int j = i + 1; j < cnt; j ++){
			if (fabs(p[num[j]].y - p[num[i]].y) > ans) break;
			ans = min(ans,dis(num[i],num[j]));
		}
	}
	return ans;
}

int main(int argc, char const *argv[])
{
	int n;
	while (~scanf("%d",&n) && n){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf",&p[i].x,&p[i].y);
		}
		sort(p,p + n,cmpx);
		printf("%.2lfn", find(0,n-1)/2);
	}		
	return 0;
}
```

	 