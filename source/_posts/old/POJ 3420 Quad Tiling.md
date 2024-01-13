---
title: POJ 3420 Quad Tiling
tags:
  - ACM
date: 2013-12-16 21:01:55
---

```cpp
/* From: Lich_Amnesia
 * Time: 2013-12-16 20:21:11
 *
 * POJ 3420 DP + 状态压缩 + 矩阵快速幂
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
typedef long long ll;
#define maxn 100010
ll ans[16][16];
#define N 16
void product_mod(ll a[][16], ll b[][16],int n, ll mod){
	ll c[N][N] = {};
	for (int i = 0; i < n; i ++){
		for (int j = 0; j < n; j ++){
			for (int k = 0; k < n; k ++){
				c[i][j] += a[i][k] * b[k][j];
			}
			c[i][j] %= mod;
		}
	}
	for (int i = 0; i < n; i++){
		for (int j = 0; j < n; j++){
			a[i][j] = c[i][j];
		}
	}
}

void power_mod(ll a[][N], ll x, int n, ll mod){
	memset(ans, 0, sizeof(ans));
	for (int i = 0; i < n; i ++) ans[i][i] = 1;
	while (x){
		if (x&1) product_mod(ans, a, n, mod);
		product_mod(a, a, n, mod);
		x >>= 1;
	}
}
ll a[N][N];
int bits[N];

void init(){
	for (int i = 0; i < 4; i++)
		bits[i] = (1<<i);
	memset(a,0,sizeof(a));
	int tmp;
	for (int i = 0; i < 16; i++){
		a[i][(~i & 0xf)] = 1;	
		tmp = (~i & 0xf);
		for (int j = 0; j < 3; j ++){
			if ((tmp & bits[j]) == 0 && (tmp & bits[j + 1]) == 0){
				a[i][tmp | bits[j] | bits[j+1]] = 1;
			}
		}
	}
	a[15][15] = 1;
	/*for (int i = 0; i < 16; i++){
		for (int j = 0; j < 16; j++)
			cout << a[i][j] << &#39; &#39; ;
		cout << endl;
	}*/
}

int main(){
	int n, mod;
	while (~scanf("%d%d", &n, &mod) && (n + mod)){
		init();
		power_mod(a, n, 16, (long long)mod);
		printf("%lldn", ans[15][15]);
	}
	return 0;
}
```

 

用矩阵表示状态的转移

位运算计算下一行的状态

两个能够转化的连接一条边

 