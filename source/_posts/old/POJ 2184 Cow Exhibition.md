---
title: POJ 2184 Cow Exhibition
tags:
  - ACM
date: 2013-08-28 09:31:57
---

```cpp
/* POJ 2184 DP 背包 
 * 在于有负数的情况，平移可以解决,平移100000，这样原来的0就是现在的100000
 * 在一般的01背包压缩空间的时候，体积的遍历是从大到小，
 * 因为dp[v]=max(dp[v],dp[v-c[i]]+w[i])，
 * 当前的dp[v]只取决于比自己小的dp[v-c[i]]，
 * 所以从大到小遍历时每次dp[v-c[i]]和dp[v]都是上一次的状态。
 * 如果体积为负v-c[i]>v，从大到小遍历dp[v-c[i]]是当前物品的状态，
 * 不是上一个，这样就会出错，解决的办法是从小到大遍历。
 *
 * 还有边界的部分不需要怎么考虑因为，数据比较小，
 * 按理不会出现达到-100000还能变到不是负数的情况所以你的dp[0]或者dp[p[i].s]
 * 开始没有多少区别
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <set>
#include <vector>
#include <climits>
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
const int maxn = 100005;
int dp[maxn * 2];
int n;
struct node{
	int s,f;
}p[200];
int main(){
	while (~scanf("%d", &n)){
		for (int i = 0; i < 2 * maxn; i++)
			dp[i] = INT_MIN;
		for (int i = 0; i < n; i++)
			scanf("%d%d", &p[i].s, &p[i].f);
		dp[100000] = 0;
		for (int i = 0; i < n; i++){
			if(p[i].s >= 0){
				for (int j = 2 * maxn - 1; j >= p[i].s; j--){
					if (dp[j-p[i].s] > INT_MIN)
						dp[j] = max(dp[j],dp[j-p[i].s]+p[i].f);
				}
			}else {
				for (int j = 0; j - p[i].s <= 200000; j++){
					if (dp[j-p[i].s] > INT_MIN)
						dp[j] = max(dp[j],dp[j-p[i].s]+p[i].f);
				}
			}
		}
		int ans = 0;
		for (int i = 100000; i < 2 * maxn; i++)
			if(dp[i] >= 0) // 注意f要>=0按照题意
				ans = max(ans,dp[i]+i-100000);
		printf("%dn", ans);
	}
	return 0;
}
```
	 