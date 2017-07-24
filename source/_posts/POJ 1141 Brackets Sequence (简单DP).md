---
title: POJ 1141 Brackets Sequence (简单DP)
tags:
	- ACM
date: 2014-01-01 15:44:43
---

求出最小的匹配的个数，然后找到需要加多少个，

dp[i,j] 表示着从i到j最少要加多少个，并且path[i,j]表示这个在哪里进行分段。

dp[i,j] = min(dp[i,k] + dp[k+1,j]) k是i到j的遍历，并且要判断i和j是否两个正好匹配，否则dp[i,j]得出来的值需要和dp[i+1,j-1]进行比较

```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-01 00:03:17
 *
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

const int INF = 0x7fffffff;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl

char str[300];
int dp[300][300];
int path[300][300];

void oprint(int i, int j){
	if (i > j) return;
	if (i == j){
		if (str[i] == '[' || str[i] == ']&#39;){
			printf("[]");
		}else printf("()");
	}else if (path[i][j] == -1) {
		printf("%c", str[i]);
		oprint(i + 1,j - 1);
		printf("%c", str[j]);
	}else {
		oprint(i, path[i][j]);
		oprint(path[i][j] + 1, j);
	}
}

int main(){
	while (gets(str)){
		int n = strlen(str);
		if (n == 0) {printf("n");continue;}
		memset(dp,0,sizeof(dp));
		memset(path,-1,sizeof(path));
		for (int i = 0; i < n; i ++)
			dp[i][i] = 1;
		for (int len = 1; len < n; len ++){
			for (int i = 0; i < n - len; i ++){
				int	j = i + len;//末尾
				dp[i][j] = INF;
				if ((str[i] == '(' && str[j] == &#39;)&#39;) || 
						(str[i] == '[' &&str[j] == ']&#39;)){
					dp[i][j] = dp[i + 1][j - 1];
					path[i][j] = -1;
				}
					for (int k = i; k < j; k++){
						if (dp[i][j] > dp[i][k] + dp[k + 1][j]){
							path[i][j] = k;
							dp[i][j] = dp[i][k] + dp[k + 1][j];
						}
					}  

			}
		}
		oprint(0,n - 1);
		printf("n");
	}
	return 0;
}
```

	 