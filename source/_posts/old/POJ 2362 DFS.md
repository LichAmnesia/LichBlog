---
title: POJ 2362 DFS
tags:
  - ACM
date: 2013-07-27 19:44:14
---

别人问为什么TLE了，然后就写了一个，发现几乎一模一样，也许是他名字起的不好听吧

```cpp
/* POJ 2362 简单DFS 加 简单减枝
 *
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
#define maxn 100
int st[maxn];
int n,side;
bool vis[maxn];
bool cmp(int a,int b)
{
	return a>b;
}
bool dfs(int bian,int len,int id)//边数，目前长度，现在的线段编号
{
	if(bian==3) return 1;
	vis[id]=1;
	for(int i=id;i<n;i++)
		if(!vis[i]){
			if(len+st[i]>side) continue;
			vis[i]=1;
			if(len+st[i]==side&&dfs(bian+1,0,0))
					return 1;
			if(len+st[i]<side&&dfs(bian,len+st[i],i))
				return 1;
			vis[i]=0;
	}
	return 0;
}

int main(){
	int t;
	scanf("%d",&t);
	while(t--)
	{
		memset(vis,0,sizeof(vis));
		scanf("%d",&n);
		int total=0;
		for(int i=0;i<n;i++)
		{	
			scanf("%d",&st[i]);
			total+=st[i];
		}
		if(total%4!=0){
			printf("non");
			continue;
		}
		side=total/4;
		sort(st,st+n,cmp);
		if(st[0]>side){
			printf("non");
			continue;
		}
		if(dfs(0,0,0)){
			printf("yesn");
		}
		else printf("non");
	}
	return 0;
}
```