---
title: POJ 1845 Sumdiv (二分+快速幂 也可以逆元)
tags:
  - ACM
date: 2013-09-22 11:03:58
---

```cpp
/* 给出A,B求A^B内的所有约数之和   mod 9901
 *
 * 约数之和，有公式 (p1^0 +  + p1^n1)**(pk^0 +  + pk^nk)
 * 用等比数列求和公式 (p^(n+1)-1)/(p-1)
 * 这里有1/(p-1)，需要求(p-1)关于mod的逆元
 * 但是，
 * 求逆元是有条件的 ax = 1 mod m    存在逆元a^-1 需要 gcd(a,m)  = 1
 *
 * 如果不满足，可用公式 a/b%m = a%(bm)/b
 * 这个公式是没条件的，当然b|a
 * 不过当心bm那里，最大有bm*bm会溢出
 * 不过这题，刚好
 * 对于(p-1)%m==0的那些数据，不会导致溢出
 *
 * 另外一种做法就是二分了
 * 对每个1 +p+..+p^n 
 * n为奇数 : (1++p^n/2) + p^(n/2+1)(1++p^n/2)
 * n为偶数 : (1++p^n/2) + p^n/2(p++p^n/2)
 * 注意维护p
 *
 * */
//#pragma comment(linker, "/STACK:102400000,102400000")
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
ll mod = 9901;
ll pr[100000],pnum[100000];

ll multmod(ll a, ll b){// a* b  % mod
	ll res = 0, base = a;
	while (b){
		if (b & 1) (res += base) %= mod;
		(base <<= 1) %= mod;
		b >>= 1;
	}
	return res;
}

ll powermod(ll prime,ll k){
	ll ret = 1;
	ll a = prime;
	while (k){
		if (k&1) ret = multmod(ret,a);
		a = multmod(a,a);
		k >>= 1;
	}
	return ret;
}

ll solve(ll prime, ll k){//a + a^2 + &hellip;&hellip; + a^k
	if (k == 1) return prime;
	ll halfsum = solve(prime, k >> 1);
	if (k & 1){
		ll half = powermod(prime,(k + 1)>> 1);
		return (halfsum + half + multmod(half,halfsum)) % mod;
	}else {
		ll half = powermod(prime,k >> 1);
		return (halfsum + multmod(half,halfsum)) % mod;
	}
}

int main(){
	ll a,b;
	while (cin >> a >> b){
		if (!b || a <= 1) {
			printf("1n");
			continue;
		}
		int bound = (ceil)(sqrt(a*1.0));
		int cnt = 0; 
		for (int i = 2; i < bound; i++){
			if (a % i == 0){
				pr[cnt] = i;
				pnum[cnt] = 0;
				while (a % i == 0){
					a /= i;
					pnum[cnt] ++;
				}
				pnum[cnt++] *= b;
			}
		}
		if (a > 1) {
			pr[cnt] = a;
			pnum[cnt++] = b;
		}
		ll ans = 1;
		for (int i = 0; i < cnt; i++){
			ll tmp = 1 + solve(pr[i],pnum[i]);
			ans = ans * tmp % mod;

		}
		cout << ans << endl;
	} 
	return 0;	
}
```
	 