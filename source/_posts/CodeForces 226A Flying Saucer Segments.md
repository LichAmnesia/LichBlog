---
title: CodeForces 226A Flying Saucer Segments
tags:
  - ACM
date: 2013-12-03 09:42:14
---

画图找规律

	f[1] = 2
	f[n] = f[n-1] + 1 + f[n-1] + 1 + f[n-1]
	f[n] = 3^n - 1 快速幂

```cpp
#include <iostream>
#include <cmath>
#include <cstdio>

using namespace std;
typedef long long ll;

ll quick_mod(ll n, ll k, ll mod){
	ll ret = 1;
	while (k){
		if (k&1) ret = (ret * n) % mod;
		k >>= 1;
		n = (n*n) % mod;
	}
	return ret;
}

int main(){
	ll n,m;
	cin >> n >> m;
	cout << (quick_mod(3,n,m) - 1 + m) % m<< endl;
 	return 0;
}
``` 

	 