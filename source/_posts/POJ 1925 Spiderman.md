---
title: POJ 1925 Spiderman
tags:
  - ACM
date: 2013-08-16 23:52:59
---

各种wa各种TLE，觉得没有错。

之后发现错了好几处，首先赋值的时候值太大了0x7fffffff可能过INT？然后开小点。

第二个因为10^6的平方用的int，直接超，所以肯定错

不过最后一个没发现导致一直TLE，这个很不爽啊，最后去了for循环里面的判断条件，判断dp这个是不是可以达到的条件，然后就好了，没想到一个if也这么慢啊？其实发现不需要这个条件，就算不可答的dp之后并不会影响结果

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
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define maxn 5005
using namespace std;
int X[maxn],Y[maxn];
int dp[2000020];
int main(){
	int t,n;
	long long d;
	scanf("%d", &t);
	while (t--){
		scanf("%d", &n);
		for (int i = 0; i < n; i++)
			scanf("%d%d", &X[i], &Y[i]);
		for (int i = 0; i < 2*X[n-1] + 1; ++i) 
			dp[i] = 0x7fffff;
		dp[X[0]] = 0;
		for (int i = 1; i < n; ++i){
			for (int j = X[i] - 1; j >= X[0]; --j){
					d = (long long)(X[i]-j)*(X[i]-j)+(long long)(Y[0]-Y[i])*(Y[0]-Y[i]);
					if (d > (long long)Y[i]*Y[i]) break;
					dp[X[i]+(X[i]-j)] = min(dp[X[i]+(X[i]-j)] ,dp[j] + 1);
			}
		}
		int ans = maxn * 2;
		for (int j = X[n-1]; j <= 2*X[n-1]; ++j)
			if (dp[j] < ans) ans = dp[j];
		printf("%dn", ans != maxn * 2 ? ans : -1);
	}
	return 0;
}

```

	 