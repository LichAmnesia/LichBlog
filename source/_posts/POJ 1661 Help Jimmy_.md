---
title: "POJ 1661 Help Jimmy\_"
tags:
  - ACM
date: 2014-04-04 09:18:58
---

dp[i][0]表示从上面落到i的左边的横向最短距离

dp[i][0]表示从上面落到i的右边的横向最短距离

 

```cpp
#include <iostream>
#include <cstring>
#include <cstdio>
#include <algorithm>

using namespace std;
#define MAX_VAL 999999999
#define maxn 1010
struct Node{
	int l,r,h;
}p[maxn];
int dp[maxn][3];//dp[i][0] 表示从上面落到i的左边的最短

bool cmp(Node a,Node b){
	if (a.h == b.h) return a.l < b.l;
	return a.h > b.h;
}

int main(int argc, char const *argv[])
{
	int MAX,x,n,y,T,ans;
	scanf("%d", &T);
	while (T--){
		memset(dp, 0, sizeof(dp));
		ans = MAX_VAL;
		scanf("%d%d%d%d", &n, &x, &y, &MAX);
		for (int i = 1; i <= n; i ++){
			scanf("%d%d%d", &p[i].l, &p[i].r, &p[i].h);
			dp[i][0] = dp[i][1] = MAX_VAL;
		}
		p[0].h = y;
		p[0].l = p[0].r = x;
		sort(p, p + n + 1, cmp);
		p[n + 1].h = 0;
		p[n + 1].l = -20000;
		p[n + 1].r =  20000;
		dp[0][0] = 0;dp[0][1] = 0;
		for (int i = 0; i <= n ; ++i){
			//bleft和bright用于标记从第i块木板左右两端下落是否找到了下一个落脚点
			bool bl = true, br = true;
			for (int j = i + 1; j <= 1 + n; j ++){
				if (!bl && !br || p[i].h - p[j].h > MAX) break;
				if (p[j].l <= p[i].l && p[j].r >= p[i].l && p[i].h != p[j].h && bl){
					bl = false;
					if (j == n + 1){
						ans = min(ans,dp[i][0]);
					}else {
						dp[j][0] = min(p[i].l - p[j].l + dp[i][0],dp[j][0]);
						dp[j][1] = min(p[j].r - p[i].l + dp[i][0],dp[j][1]);
					}
				}
				if (p[i].r <= p[j].r && p[i].r >= p[j].l && p[i].h != p[j].h && br){
					br = false;
					if (j == n + 1){
						ans = min(ans,dp[i][1]);
					}else {
						dp[j][0] = min(p[i].r - p[j].l + dp[i][1],dp[j][0]);
						dp[j][1] = min(p[j].r - p[i].r + dp[i][1],dp[j][1]);
					}
				}
			}
		}
		printf("%dn", ans + y);
	}
	return 0;
}
```