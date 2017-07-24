---
title: POJ 1463 Strategic game (树形DP)
tags:
  - ACM
date: 2013-11-12 15:52:18
---

树形DP

用dp[i][0]来表示该点没有放兵，以这个点为根的子树所需的最少兵数。

用dp[i][1]来表示该点有放兵，以这个点为根的子树所需的最少兵数。

那么可以得到状态方程

dp[fa][0]+=dp[son][1];//如果该父亲不放，那么儿子必须放

dp[fa][1]+=min(dp[son][0],dp[son][1]);//如果该父亲放，儿子在放和不放之间选择最小的

访问的时候，因为要先知道儿子的信息，用递归的解法

 

 

```cpp
/* From: Lich_Amnesia
 * Time: 2013-11-12 15:30:00
 *
 * POJ 1463 树形DP
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
#define maxn 1600

int dp[maxn][2];

vector<int> ve[maxn];

void solve(int fa){// 0表示父亲不放，1 表示父亲放
	dp[fa][0] = 0; dp[fa][1]= 1;
	int son;
	for (int i = 0; i < ve[fa].size(); i++){
		son = ve[fa][i];
		solve(son);
		dp[fa][0] += dp[son][1];
		dp[fa][1] += min(dp[son][1],dp[son][0]);

	}
}

int main(){
	int n;
	while (~scanf("%d", &n)){
		int u,v,num;
		int root = -1; // 设根
		for (int i = 0; i <= n; i++)
			ve[i].clear();
		for (int i = 0; i < n; i++){
			scanf("%d:(%d)", &u, &num);
			if (root == -1) root = u;
			for (int j = 0; j < num; j++){
				scanf("%d", &v);
				ve[u].pb(v);
			}
		}
		solve(root);
		printf("%dn", min(dp[root][0],dp[root][1]));
	}
	return 0;
}
```

	 