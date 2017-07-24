---
title: HDU 4632 Palindrome subsequence (2013多校第四场A)
tags:
  - ACM
date: 2013-08-14 11:17:16
---

```cpp
/* 区间dp
 * dp[i][j] 表示字符串的i~j段共有多少个不同子串
 * 那么dp[i][j] = dp[i][j-1] + dp[i+1][j] - dp[i+1][j-1]
 * 如果str[i] == str[j], 那么还要加上
 * dp[i][j] = dp[i][j]+dp[i+1][j-1]+1;
 * 要记得加mod否则会WA只是这是为什么呢？因为会出现负数
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
#define mod 10007
#define maxn 1010
char str[maxn];
int dp[maxn][maxn];
using namespace std;
int main(){
	int t,cas = 0;
	scanf("%d", &t);
	while (cas++ < t){
		scanf("%s", str);
		int len = strlen(str);
		for (int i = 0; i < len; ++i) dp[i][i] = 1;
		for (int i = 0; i < len -1; ++i) 
			if (str[i] == str[i+1]) dp[i][i+1] = 3;
			else dp[i][i+1] = 2;

		for (int s = 2; s < len; ++s)
			for (int i = 0; i < len - s; i++){
				int r = i + s;
				dp[i][r] = (mod + dp[i][r-1] + dp[i+1][r] - dp[i+1][r-1]) % mod;
				if (str[i] == str[r]) 
					dp[i][r] = (mod + dp[i][r] + dp[i+1][r-1] + 1 ) % mod;
			}
		printf("Case %d: %dn", cas, dp[0][len-1]);
	}
	return 0;
}
```

	 