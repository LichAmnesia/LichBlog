---
title: POJ 2151 Check the difficulty of problems（概率DP）
tags:
  - ACM
date: 2014-02-05 19:49:29
---

**题意**

一次比赛中，共M道题，T个队，p[i][j]表示队i解出题j的概率；

问每队至少解出一题且冠军队至少解出N道题的概率。



**思路**

f[i][j][k]表示 第i个队伍在前i个题目里过了k道题

dp[i][j] 表示第i个队伍过了1道到 j 道题

ans1 表示1～T个队伍过题数都在 1～M之间的概率

ans2 表示1～T个队伍过题数都在 1～N-1之间概率

ans1 - ans2 就是所求答案

 

```cpp
/* From: Lich_Amnesia
 * Time: 2014-02-05 19:19:45
 *
 * POJ 2151
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
double p[maxn][40],f[maxn][40][40],dp[maxn][40];

int main(){
	int m,n,t;
	while (~scanf("%d%d%d", &m, &t, &n) && (m + t + n)){
		for (int i = 1; i <= t; i ++){
			for (int j = 1; j <= m; j ++){
				scanf("%lf", &p[i][j]);
			}
		}
		memset(f,0,sizeof(f));
		memset(dp,0,sizeof(dp));
		//f 表示 第i个人在前i个题目里过了k道题
		for (int i = 1; i <= t; i ++){
			f[i][1][0] = 1 - p[i][1];
			f[i][1][1] = p[i][1];
			for (int j = 2; j <= m; j ++){
				for (int k = 0; k <= j; k ++){
					if (k)
						f[i][j][k] = f[i][j - 1][k] * (1 - p[i][j])
							+ f[i][j - 1][k - 1] * p[i][j];
					else 
						f[i][j][k] = f[i][j - 1][k] * (1 - p[i][j]);
				}
			}
		}
		//dp 表示第i个人过了1-j道题
		for (int i = 1; i <= t; i ++){
			for (int j = 1; j <= m; j ++){
				for (int k = 1; k <= j; k ++){
					dp[i][j] += f[i][m][k];
				}
			}
		}

		double ans1 = 1; 
		double ans2 = 1;
		for (int i = 1; i <= t; i ++){
			ans1 *= dp[i][m];
			ans2 *= dp[i][n - 1];
		}

		printf("%.3fn", ans1 - ans2);
	}
	return 0;
}

```
	 