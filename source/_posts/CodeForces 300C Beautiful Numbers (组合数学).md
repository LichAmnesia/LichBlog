---
title: CodeForces 300C Beautiful Numbers (组合数学)
tags:
  - ACM
date: 2014-01-21 14:44:35
---

[http://codeforces.com/blog/entry/7497](http://codeforces.com/blog/entry/7497)

借用一下,组合数学的乘法逆元的求法,先记一下，以后可能会用到



```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-21 14:32:49
 *
 * CF 300C Round181_div2 
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
const ll MOD = 1000000007;

bool check(int a, int b,int x){
	while (x){
		if (x % 10 != a && x % 10 != b) return false;
		x /= 10;
	}
	return true;
}

ll Pow_mod(ll a,ll n){
	ll ret = 1;
	while (n){
		if (n & 1) ret = ret * a % MOD;
		a = a * a % MOD;
		n >>= 1;
	}
	return ret;
}

int main(){
	int a,b,n;
	cin >> a >> b >> n;	
	int sum = 0;
	ll ret = 1;
	ll ans = 0;
	for (int i = 0; i <= n; i ++){
		sum = a * i + b * (n - i);
		if (check(a,b,sum)){
			ans = (ans + ret) % MOD;
		}
		ret = ret * (n - i) % MOD;
		ret = ret * Pow_mod(i + 1, MOD - 2) % MOD; 
	} 
	cout << ans << endl;
	return 0;
}
```

	 