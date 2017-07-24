---
title: 'POJ 1325 || ZOJ 1364 Machine Schedule'
tags:
  - ACM
date: 2014-02-06 12:57:31
---

**题意**

有Ａ，Ｂ两种机器，给你三个数ｎ，ｍ，ｋ，分别表示机器Ａ有ｎ中工作模式（编号０　～　ｎ－１），机器Ｂ有ｍ种工作模式（编号０～ｍ－１），共有ｋ个任务，每种任务均可以在机器Ａ，Ｂ的一个模式下完成。

接下来输入ｋ行，每行三个整数i，u，v，其中，i为任务编号，u表示该任务可在机器Ａ的第u种模式下完成，v表示该任务可在机器Ｂ的第v中模式下完成。

但机器Ａ，Ｂ在变换模式时均需重启，让你完成所有的任务并使机器重启的次数最小。（机器Ａ，Ｂ初始时均在第０模式）

 

**思路**

求最小点覆盖，就是求最大匹配

注意点是0的模式不需要匹配，可以求匹配的时候直接从1开始做匹配，或者把跟0模式连的边删掉

```cpp
/* From: Lich_Amnesia
 * Time: 2014-02-06 10:54:17
 *
 * ZOJ 1364 || POJ 1325
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
#define maxn 110

int x[maxn],y[maxn];
int g[maxn][maxn];
bool vis[maxn];
int zero,n,m,k;

bool path(int u){
	for (int v = 0; v < m; v ++){
		if (g[u][v] && !vis[v]){
			vis[v] = 1;
			if (y[v] == -1 || path(y[v])){
				x[u] = v;
				y[v] = u;
				return true;
			}
		}
	}
	return false;
}

void MaxMatch(){
	int ans = 0;
	//if (zero == k) {puts("0");return;} 
	memset(x, -1, sizeof(x));
	memset(y, -1, sizeof(y));
	for (int i = 0; i < n; i ++){
		if (x[i] == -1){
			memset(vis, 0, sizeof(vis));
			if (path(i)){
				ans ++;
			}
		}
	}
	printf("%dn", ans);
}

int main(){
	int cnt,u,v;
	while (~scanf("%d", &n) && n){
		scanf("%d%d", &m, &k);
		zero = 0;
		memset(g, 0, sizeof(g));
		for (int i = 0; i < k; i ++){
			scanf("%d%d%d", &cnt, &u, &v);
			//g[u][v] = g[v][u] = 1;
			if (u != 0 && v != 0) {
				g[u][v] = 1;
			}
		}
		MaxMatch();
	}
	return 0;
}
```

	 