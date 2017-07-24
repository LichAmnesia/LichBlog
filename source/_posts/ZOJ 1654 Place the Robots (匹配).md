---
title: ZOJ 1654 Place the Robots (匹配)
tags:
  - ACM
date: 2014-01-24 21:53:27
---

求最大独立集转化为求最大匹配


```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-24 21:10:12
 * 
 * ZOJ 1654 匹配
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
#define maxn 55

int x[maxn * maxn],y[maxn * maxn];//x匹配的y顶点
int xs[maxn][maxn],ys[maxn][maxn];//横的坐标x的取值
int xnu,ynu;
char s[maxn][maxn];
bool g[maxn * maxn][maxn * maxn];
bool vis[maxn * maxn]; //DFS算法中记录顶点访问状态

bool path(int u){
	for (int v = 1; v <= ynu; v ++){
		if (g[u][v] && !vis[v]){
			vis[v] = 1;
			//如果v没有匹配
			//或者v已经匹配了,但是从y[v]出发能找到一条增广路

			if (!y[v] || path(y[v])) {
				x[u] = v;
				y[v] = u;
				return 1;
			}
		}
	}
	return 0;
}

void MaxMatch(){
	int ans = 0;
	memset(x,0,sizeof(x));
	memset(y,0,sizeof(y));
	for (int i = 1;i <= xnu; i ++){
		if (!x[i]) {
			memset(vis,0,sizeof(vis));
			if (path(i)){
				ans ++;
			}
		}
	}

	printf("%dn", ans);
}

int main(){
	int T,t = 0,m,n;
	cin >> T;
	while (t++ < T){
		printf("Case :%dn", t);
		scanf("%d%d", &m, &n);
		for (int i = 0; i < m; i ++){
			scanf("%s", s[i]);
		}
		memset(xs,0,sizeof(xs));
		memset(ys,0,sizeof(ys));
		int number = 0;
		for (int i = 0; i < m; i ++){
			int flag = 1;
			for (int j = 0; j < n; j ++){
				if (s[i][j] == &#39;o&#39;) {
					if (flag) number ++,flag = 0;
					xs[i][j] = number;
				}
				if (s[i][j] == &#39;#&#39;) flag = 1;
			}
		}
		xnu = number,number = 0;
		for (int j = 0; j < n; j ++){
			int flag = 1;
			for (int i = 0; i < m; i ++){
				if (s[i][j] == &#39;o&#39;) {
					if (flag) number ++,flag = 0;
					ys[i][j] = number;
				}
				if (s[i][j] == &#39;#&#39;) flag = 1;
			}
		}
		ynu = number;

		memset(g,0,sizeof(g));
		for (int i = 0; i < m; i ++){
			for (int j = 0; j < n; j ++){
				if(xs[i][j]) g[xs[i][j]][ys[i][j]] = 1;
			}
		}

		MaxMatch();
	}
	return 0;
}
```
	 