---
title: POJ 3041 Asteroids
tags:
  - ACM
date: 2013-08-02 23:59:37
---

第一道二分图匹配，求的是最小点覆盖=最大匹配数。用匈牙利跑一遍

```cpp
/*POJ 3041 二分图匹配第一题
*/
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
using namespace std;
#define maxn 555
int n, k, a, b;
bool map[maxn][maxn],v[maxn];
int link[maxn];

bool dfs(int x)
{
	int i;
	for(i = 1; i <= n; i++){
		if(!v[i] && map[x][i]){
			v[i] = 1;
			if(link[i]==0 || dfs(link[i]))
			{
				link[i] = x;
				return true;	
			}
		}
	}
	return false;
}

int main()
{
	memset(link,0,sizeof(link));
	memset(map,0,sizeof(map));
	scanf("%d%d", &n, &k);
	for (int i = 0; i < k; ++i)
	{
		scanf("%d%d", &a, &b);
		map[a][b]=1;
	}
	int ans=0;
	for (int i = 1; i <= n; ++i)
	{
		memset(v,0,sizeof(v));
		if(dfs(i)){
			ans++;
		}
	}
	printf("%dn", ans);
	return 0;
}
```
	 

	就行