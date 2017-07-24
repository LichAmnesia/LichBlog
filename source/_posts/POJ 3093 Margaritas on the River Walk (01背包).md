---
title: POJ 3093 Margaritas on the River Walk (01背包)
tags:
  - ACM
date: 2014-03-06 15:22:57
---

题意：

每个物体都有一个权值a[i]，求出的是背包目前sum值不能再放入任何一个物体，意思就是sum+a[i] <= d这个的方案数

想法：

先排序,sum[i]，前i个物体的权值和

可以枚举1-N那个物体不在背包的，这样子i之前的全都在背包里，在i+1-N的进行背包，背包的大小在d-sum[i]到d-sum[i-1]+1之间，相想为何要+1

然后从N开始向下枚举，改一改如上算法就行

```cpp
/* From: Lich_Amnesia
 * Time: 2014-03-06 15:04:22
 *
 * POJ 3093 01背包
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

#define maxn 1010
int dp[maxn],a[maxn];
int main(){
	int T,t = 0;
	int n,d,sum;
	cin >> T;
	while (t ++ < T){
		scanf("%d%d", &n, &d);
		sum = 0;
		for (int i = 1; i <= n; i ++){
			scanf("%d", &a[i]);
			sum += a[i];
		}
		sort(a + 1,a + n + 1);
		memset(dp,0,sizeof(dp));
		dp[0] = 1;
		int ans = 0;
		for (int i = n; i > 0; i --){
			sum -= a[i];
			for (int v = max(d - sum - a[i] + 1, 0); v <= d - sum; v++)
				ans += dp[v];
			for (int v = d; v >= a[i]; v --)
				dp[v] += dp[v - a[i]];
		}
		printf("%d %dn",t,a[1] > d ? 0 : ans);
	}
	return 0;
}
```

	 