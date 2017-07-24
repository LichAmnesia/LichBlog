---
title: HDU 4675  GCD of Sequence 2013多校7-J（容斥原理）
tags:
  - ACM
date: 2013-10-24 12:34:53
---

  

其实就是从M算到1.

假如现在算i. 那么找到i ~ M中i的倍数。

看原序列中有多少个是i的倍数，设为cnt.

 

因为最终假如gcd是i的话，所有数都必须是i的倍数。

那就相当于在cnt个中，要把cnt-(N-K)个变掉，其余的(N-cnt)个要变成i的倍数。

i的倍数为t = M/i 个。

那么符合的数有C[cnt][N-K]*  (t-1)^(cnt-(N-K))  * t^(N-cnt)

 

这个算出来的是gcd是i的倍数的情况。

 

减掉gcd是2i,3i....这样的就行了

 

 
```cpp
/* From: Lich_Amnesia
 * Time: 2013-10-22 10:20:10
 *
 * HDU 4675 2013多校7 J
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

const int  N = 3e5 + 2;
#define mod 1000000007
typedef long long ll;

ll num[N],d[N],e[N],ans[N];//d表示阶乘
ll power_mod(ll n,ll k){
	ll ret = 1;
	while (k){
		if (k & 1) ret = (ret * n) % mod;
		n = (n*n) % mod;
		k >>= 1;
	}
	return ret;
}
/*求 n个里 选 m 个的方案数*/

ll cal(ll n, ll m){
	return (d[n] * e[m] % mod) * e[n-m] % mod;
}

int main(){
	int n,m,k;
	d[0] = e[0] = 1;
	for (int i = 1; i < N; i++){
		d[i] = d[i-1] * i % mod;
		e[i] = power_mod(d[i],mod-2);
	}
	while (~scanf("%d%d%d",&n,&m,&k)){
		memset(num,0,sizeof(num));
		int cnt;
		for (int i = 0; i < n; i++){
			scanf("%d", &cnt);
			num[cnt]++;
		}
		for (int i = m; i >= 1; i--){
			int sumd = 0;
			for (int j = i; j <= m; j += i){
				sumd += num[j];
			}
			if (sumd < n-k){
				ans[i] = 0;
			}else{
				ans[i] = power_mod(m/i,n-sumd) 
					* power_mod(m/i-1,k-(n-sumd)) % mod;
				ans[i] = ans[i] * cal(sumd,k-(n-sumd)) %mod;
				for (int j = 2 * i; j <= m; j += i){
					ans[i] = (ans[i] - ans[j] + mod) % mod;
				}
			}
		}
		for (int i = 1; i < m; i++)
			cout << ans[i] << &#39; &#39;;
		cout << ans[m] << endl;
	}
	return 0;
}
```
	 