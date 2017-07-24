---
title: POJ 1036 Gangsters
tags:
  - ACM
date: 2013-08-16 20:22:48
---

注意ans不是dp{N},想想就明白，dp[i]表示的是取到第i个的结果，需要的是第i个能够取否则会出现问题。

```cpp
/* 宾馆有个可以伸缩的门，每秒钟可以伸长1个单位，或者缩小1个单位，
 * 或者原地不动。有N个强盗，每个强盗会在t的时间内到达并按，
 * 如果此时门的开方度和他的身材s正好相等，这个强盗就会进来，
 * 然后你就能得到p的加分。
 *
 * 初始状态门是关闭的，让你求出在t时刻得到的最大得分。
 *
 * 分析：按时间从小到大排序，t时间内最大的得分由t之前的时刻决定，满足无后效性，每一个时刻都能得到最优解，满足最有子结构，所以DP。
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
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define maxn 105
#define print() cout<<"-----"<<endl
using namespace std;

struct node{
	int t,p,s;
	bool operator < (const node &u) const{
		return t < u.t;
	}
}p[maxn];
int dp[maxn];
int main(){
	int N, K, T;
	scanf("%d%d%d", &N, &K, &T);
	for(int i = 1;i <= N; ++i)
		scanf("%d", &p[i].t);
	for(int i = 1;i <= N; ++i)
		scanf("%d", &p[i].p);
	for(int i = 1;i <= N; ++i)
		scanf("%d", &p[i].s);
	sort(p+1,p+N+1);
	p[0].s = 0;p[0].t = 0;p[0].p = 0;

	memset(dp,0,sizeof(dp));
	int ans = 0;
	for (int i = 1; i <= N; ++i){
		for (int j = i-1; j >= 0; --j){
			if((dp[j] != 0 || j == 0) && iabs(p[j].s - p[i].s) <= p[i].t - p[j].t){
				dp[i] = max(dp[i],dp[j] + p[i].p);
			}
		}
		ans = max(dp[i],ans);
	}
	printf("%dn", dp[N]);
	return 0;
}
```

 