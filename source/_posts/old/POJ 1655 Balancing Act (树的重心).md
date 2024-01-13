---
title: POJ 1655 Balancing Act (树的重心)
tags:
  - ACM
date: 2013-11-12 16:49:11
---

找出树的重心

s数组表示包括此点产生的所有子树的点的和

f数组表示以此点为重心切产生的最大子树的节点数

```cpp
/* From: Lich_Amnesia
 * Time: 2013-11-12 16:26:24
 * POJ 1655 求树的重心
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

#define maxn 20010
vector<int> ve[maxn];
int s[maxn],f[maxn],n,root;

void solve(int now,int fa){
	int son;
	s[now] = 1;
	f[now] = 0;
	for (int i = 0; i < ve[now].size(); i ++){
		if ((son=ve[now][i]) != fa){
			solve(son,now);
			s[now] += s[son];
			f[now] = max(f[now],s[son]);
		}
	}
	f[now] = max(f[now], n - s[now]);
	if (f[now] < f[root]) root = now;
}

int main(){
	int t,u,v;
	scanf("%d", &t);
	while (t--){
		scanf("%d", &n);
		for (int i = 0; i <= n; i++)
			ve[i].clear();
		for (int i = 1; i < n; i++){
			scanf("%d%d", &u, &v);
			ve[u].pb(v);
			ve[v].pb(u);
		}
		f[0] = n;
		solve(1,root = 0);
		for (int i = 1; i <= n; i++)
			if (f[i] == f[root]) {
				root = i;
				break;
		}
		printf("%d %dn", root , f[root]);
	}
	return 0;
}
```

	 