---
title: ZOJ 3772 Calculate the Function
tags:
  - ACM
date: 2014-04-07 20:39:45
---

2014 浙大校赛 F 单点更新线段树

把递推式子写成矩阵的形式，这样f[r]就相当于一个矩阵连成的形式

注意矩阵连乘时候的方向

```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-07 20:02:21
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

const int INF = ~0u>>1;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define lson l, m , rt << 1
#define rson m + 1, r , rt << 1 | 1

#define maxn 400040
typedef long long ll;
#define mod 1000000007
struct mat{
	ll a[2][2];
	mat(){
		memset(a,0,sizeof(a));
	}
	mat(ll x){
		a[0][0] = a[1][0] = 1;
		a[1][1] = 0;
		a[0][1] = x;
	}
	mat operator * (const mat &b) const{
		mat ret = mat();
		for (int i = 0; i < 2; i ++){
			for (int j = 0; j < 2; j ++){
				for (int k = 0; k < 2; k ++){
					ret.a[i][j] = (ret.a[i][j] + a[i][k] * b.a[k][j]) % mod;
				}
			}
		}
		return ret;
	}
};

ll num[maxn];
mat sum[maxn];

void PushUp(int rt){
	sum[rt] = sum[rt << 1 | 1] * sum[rt << 1];//会不会有问题
}

void build(int l, int r, int rt){
	if (l == r) {
		sum[rt] = mat(num[l]);
		return;
	}
	int m = MID(l,r);
	build(lson);
	build(rson);
	PushUp(rt);
}

mat query(int L,int R, int l, int r, int rt){
	if (L <= l && r <= R) return sum[rt];
	int m = MID(l, r);
	if (R <= m) return query(L, R, lson);//lson包括mid
	if (L > m) return query(L, R, rson);//rson从mid+1开始
	return query(L,R,rson) * query(L,R,lson);//会不会反了
}

int main(){
	int T,n,m;
	cin >> T;
	mat t;
	while (T--){
		scanf("%d%d", &n, &m);
		for (int i = 1; i <= n; i ++){
			scanf("%lld", &num[i]);
		}
		build(1, n, 1);
		int l,r;
		for (int i = 0; i < m; i ++){
			scanf("%d%d", &l, &r);
			if (l == r || r == l + 1){
				printf("%lldn", num[r]);continue;
			}
			t = query(l + 2,r,1,n,1);
			printf("%lldn", (t.a[0][0] * num[l + 1] + t.a[0][1] * num[l]) % mod);
		}
	}
	return 0;
}
```
	 