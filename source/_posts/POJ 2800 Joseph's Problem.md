---
title: "POJ 2800 Joseph's Problem"
date: 2013-10-10 16:24:44
tags:
  - ACM
---

题意是说求 k % i (i从1到n),直接做肯定是超时的，可以先写一个暴力的程序打表找规律。

1:当n > k 时，n>k的那部分的余数都是 k

2:当n <= k 时，余数呈现等差数列的形式而且等差数列除了最后的那个其他的都是以0结尾，可以枚举k的i分之一正好整除的时候，恰好是等差数列的末项+1和首项，这样就可以做，不过这样还是会超时

还要再加一个优化，比如 12/5 12/6都是2 但是你枚举ndiv时候就多算了，这种多余的可以通过 n == k / (ndiv + 1) 判断进行。

```cpp
/* From: Lich_Amnesia
 * Time: 2013-10-10 08:37:34
 *
 * POJ 2800 
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

ll solve(ll n,ll k){
	ll sum = 0;
	if (n > k){
		sum += k*(n-k);
		n = k;
	}
	int ndiv = k / n;
	int nnext,low,high;
	while (n > 1){
		nnext = k / (ndiv + 1);
		if (n == nnext){
			sum += k % n;
			n--;
			ndiv = k / n;
			continue;
		}
		low = k % n;
		high = k % (nnext + 1);
		sum += ((low + high) * (n - nnext)) >> 1;
		n = nnext;
		ndiv++;
	}
	return sum;
}

int main(){
	ll n,k;
	while(~scanf("%lld%lld",&n,&k)){
		printf("%lldn",solve(n,k));
	}
	return 0;
}
```

	 