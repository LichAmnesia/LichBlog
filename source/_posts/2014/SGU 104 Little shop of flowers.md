---
title: SGU 104 Little shop of flowers
tags:
  - ACM
date: 2014-03-05 22:29:35
---

简单递推，记得记录路径
dp[i][j] = max(dp[i-1][j-1] + a[i][j], dp[i][j-1])
可能会出现
3 5
-50 -50 -50 -50 -50
-50 -50 -50 -50 -50
-50 -50 -50 -50 -50
这样的数据
记得初始化好

```cpp
/* From: Lich_Amnesia
 * Time: 2014-03-05 21:53:31
 *
 * poj 1157 || sgu 104 简单递推
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

#define maxn 110
int a[maxn][maxn];
int dp[maxn][maxn];
int pre[maxn][maxn];

int main(){
	int f,v;
	while (~scanf("%d%d", &f, &v)){
		memset(pre,0,sizeof(pre));
		memset(dp,0,sizeof(dp));
		for (int i = 1; i <= f; i ++){
			for (int j = 1; j <= v; j ++){
				scanf("%d", &a[i][j]);
			}
		}
		for (int i = 1; i <= f; i ++){
			dp[i][i] = dp[i-1][i-1] + a[i][i];
			pre[i][i] = 1;
		}
		for (int i = 1; i <= f; i ++){
			for (int j = i + 1; j <= v; j ++){
				dp[i][j] = dp[i][j-1];
				if (dp[i-1][j-1] + a[i][j] > dp[i][j]){
					dp[i][j] = dp[i-1][j-1] + a[i][j];
					pre[i][j] = 1;
				}
			}
		}
		printf("%dn",dp[f][v]);
		int ans[maxn],cnt = 0;
		for (int i = f,j = v; i > 0; --i){
			while (pre[i][j] == 0) j --;
			ans[cnt ++] = j --;
		}
		while (cnt --) printf("%d ",ans[cnt]);
		printf("n");
	}
	return 0;
}
```
	 