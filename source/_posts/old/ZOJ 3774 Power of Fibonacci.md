---
title: ZOJ 3774 Power of Fibonacci
tags:
  - ACM
date: 2014-04-07 21:25:57
---

看了ACdreamers的解题[http://blog.csdn.net/acdreamers/article/details/23039571](http://blog.csdn.net/acdreamers/article/details/23039571)



```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-07 20:49:38
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

typedef long long ll;
#define maxn 100005
const ll mod = 1000000009;
ll fac[maxn],A[maxn],B[maxn];

void init(){
	fac[0] = 1;
	for (int i = 1; i < maxn; i ++){
		fac[i] = fac[i-1] * i % mod;
	}
	A[0] = B[0] = 1;
	for (int i = 1; i < maxn; i++){
		A[i] = A[i-1] * 691504013 % mod;
		B[i] = B[i-1] * 308495997 % mod;
	}
}

ll quick_mod(ll n,ll k,ll mod){
	ll ret = 1;
	n %= mod;
	while (k){
		if (k & 1) ret = ret * n % mod;
		k >>= 1;
		n = n * n % mod;
	}
	return ret;
}

ll solve(ll n, ll k){
	ll ret = 0;
	for (int r = 0; r <= k; r ++){
		ll t = A[k - r] * B[r] % mod;
		ll x = fac[k];
		ll y = fac[k-r] * fac[r] % mod;
		ll c = x * quick_mod(y, mod - 2, mod) % mod;
		ll tmp = t * (quick_mod(t, n, mod) - 1) % mod 
			* quick_mod(t-1,mod-2,mod) % mod;
		if (t == 1) tmp = n % mod;
		tmp = tmp * c % mod;
		if (r & 1) ret -= tmp;
		else ret += tmp;
		ret %= mod;
	}
	ll m = quick_mod(383008016,mod-2,mod);
	ret = ret * quick_mod(m,k,mod) % mod;
	ret = (ret % mod + mod) % mod;
	return ret;
}

int main(){
	int T;
	ll n,k;
	init();
	cin >> T;
	while (T--){
		cin >> n >> k;
		cout << solve(n,k) << endl;
	}
	return 0;
}
```
	 