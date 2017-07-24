---
title: HDU 4628 Pieces (2013 多校第三场 H)
tags:
  - ACM
date: 2013-08-12 17:37:38
---

多校H，状态压缩Dp，先预处理出所有的回文串，然后枚举

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
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
int dp[1<<17];
char str[30],ss[30];
int n,m,len;
void init()
{
	memset(dp,0x3f,sizeof(dp));
	for (int i = 1; i < (1<<len); i++){
		int num = 0, flag = 1;
		for (int j = 0; j < len; j++){
			if (i & (1<<j)) ss[num++] = str[j];
		} 
		ss[num] = 0;
		for (int j = 0; j < num; j++){
			if (ss[j] != ss[num-j-1]) flag = 0;
		}
		if(flag) dp[i] = 1;
	}
}
int main(){
	int t;
	cin >> t;
	while (t--){
		scanf("%s",str);
		len = strlen(str);
		init();
		dp[0] = 0;
		for (int i = 1; i < (1<<len); i++){
			for (int j = i; j > 0; j = (j-1) & i)
				dp[i] = min(dp[i],dp[i^j]+dp[j]);
		}
		cout << dp[(1<<len)-1] << endl;
    }
    return 0;
    
}
```