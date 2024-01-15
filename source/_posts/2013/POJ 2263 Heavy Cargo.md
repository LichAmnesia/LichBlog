---
title: POJ 2263 Heavy Cargo
tags:
  - ACM
date: 2013-08-27 17:09:59
---

简单的最短路应用，只是把修改dist数组或者dp数组的条件改变一下就行

还有Map的查找

```cpp
/*
 *
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <set>
#include <map>
#include <vector>
using namespace std;

const int INF = 10020000;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define maxn 220
int n,m,num;
map<string,int>maps;
int edge[maxn][maxn];
int query(string s)
{
	map<string,int>::iterator it;
	it = maps.find(s);
	if (it == maps.end()){
		maps[s] = num++;
		return maps[s];
	}else return maps[s];
}

void floyd()
{
	for (int k = 1; k <= n; k++)
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= n; j++)
			{
				edge[i][j] = max(edge[i][j],min(edge[i][k],edge[k][j]));
			}
}

int main(){
	int co = 0,w;
	char s1[100],s2[100];
	while (scanf("%d%d", &n, &m) && (m + n)){
		getchar();
		num = 1;
		for (int i = 1; i <= n; ++i)
			for (int j = 1; j <= n; j++)
				edge[i][j] = 0;
		for (int i = 1; i <= m; ++i)
		{
			scanf("%s%s%d", s1, s2, &w);getchar();
			int x = query(s1);
			int y = query(s2);
			edge[x][y] = w;
			edge[y][x] = w;
		}
		floyd();
		scanf("%s%s",s1,s2);
		int x = query(s1);
		int y = query(s2);
		printf("Scenario #%dn%d tonsnn", ++co, edge[x][y]);
	}
	return 0;
}
```

	 