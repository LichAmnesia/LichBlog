---
title: HDU 4433 locker (2012天津C-DP)
tags:
  - ACM
date: 2013-12-16 20:04:55
---

dp[i][x][y] 表示前i个已经完成匹配并且i+1为x，i+2为y的时候的最小变化次数

因为第i个是肯定要变的，然后后面的两个数的变换次数分别有up >= k >= l （up为i的变化，k为i+1的变换，l为i+2的变换）或者down >= k >= l

```cpp
/* From: Lich_Amnesia
 * Time: 2013-12-16 19:14:28
 *
 * HDU 4433 DP
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

const int INF = 100000000;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define maxn 1010

char s[maxn],t[maxn];
int dp[maxn][12][12];
int a[maxn],b[maxn];
int main(){
	while (~scanf("%s%s", s, t)){
		for (int i = 0; i <= strlen(s); i ++) 
			for (int j = 0; j < 10; j ++)
				for (int l = 0; l < 10; l ++)
					dp[i][j][l] = INF;

		for (int i = 0; i < strlen(s); i++){
			a[i+1] = s[i] - &#39;0&#39;;
			b[i+1] = t[i] - &#39;0&#39;;
		}
		int len = strlen(s);
		a[len + 1] = a[len + 2] = 0;
		b[len + 1] = b[len + 2] = 0;

		dp[0][a[1]][a[2]] = 0;

		for (int i = 1; i <= len; i ++){
			for (int x = 0; x < 10; x++){
				for (int y = 0; y < 10; y++){
					int down = (x + 10 - b[i]) % 10;
					for (int k = 0; k <= down; k++)
						for (int l = 0; l <= k; l++){
							dp[i][(y-k+10)%10][(a[i+2]-l+10)%10] = 
							min(dp[i-1][x][y] + down,
									dp[i][(y-k+10)%10][(a[i+2]-l+10)%10]);
						}
					int up = 10 - down;
					for (int k = 0; k <= up; k++)
						for (int l = 0; l <= k; l++){
							dp[i][(y+k)%10][(a[i+2]+l)%10] =
							min(dp[i-1][x][y] + up,dp[i][(y+k)%10][(a[i+2]+l)%10]);
						}
				}
			}
		}
		printf("%dn", dp[len][0][0]);
	}
	return 0;
}
```

	 