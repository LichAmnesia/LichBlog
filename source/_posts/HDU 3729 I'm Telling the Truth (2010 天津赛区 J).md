---
title: HDU 3729 I'm Telling the Truth (2010 天津赛区 J)
tags:
  - ACM
date: 2013-08-01 12:53:17
---

主要是看看这个点有没有被覆盖过了，如果有，看能不能找到增广路。

```cpp
/* 2010 天津 赛区 J题 匹配的题（新生赛2的J当时是自己把匹配个YY出来了）
 * 其实就是一个DFS嘛
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
struct node{
	int l,r;
}p[maxn];
int ma[100005];
int vis[100005];
int ans[maxn],cnt=0;
bool dfs(int x)
{
	for(int i=p[x].l;i<=p[x].r;i++)
	{
		if(!vis[i]){
			vis[i]=1;
			if(ma[i]==-1||dfs(ma[i])){
				ma[i]=x;
				return 1;
			}
		}
	}
	return 0;
}

int main(){
	int t,n;
	scanf("%d",&t);
	while(t--)
	{
		cnt=0;
		scanf("%d",&n);
		for(int i=0;i<n;i++)
			scanf("%d%d",&p[i].l,&p[i].r);
		memset(ma,-1,sizeof(ma));
		for(int i=n-1;i>=0;i--)
		{
			memset(vis,0,sizeof(vis));
			if(dfs(i)){
				ans[cnt++]=i;
			}
		}
		printf("%dn",cnt);
		if(cnt==0) continue;
		for(int i=cnt-1;i>0;i--)
		{
			printf("%d ",ans[i]+1);
		}
		printf("%dn",ans[0]+1);
	}
	return 0;
}
```

	 