---
title: POJ 3104 Drying (二分)
tags:
  - ACM
date: 2014-03-03 17:59:10
---

二分答案

假设当前二分的答案为 t，那么：

对于ai <= t的衣服，显然让它们自然风干就可以了。

对于ai > t的衣服，我们需要知道该衣服最少用多少次烘干机。

设该衣服用了x1分钟风干，用了x2分钟烘干机。

那么有 x1 + x2 = t 和 ai <= x1 + x2 * k，联立两式可得 x2 >= (ai - t) / (k - 1)，即最少使用次数为[(ai - t) / (k - 1)] 的最小上界。

最后，判断一下总使用次数是否少于 t 即可。

记得不要除零

```cpp
/* From: Lich_Amnesia
 * Time: 2014-03-03 17:33:06
 *
 * POJ 3104 二分答案
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

#define maxn 100050
typedef long long ll;
ll k,num[maxn],ans;
int n;

bool check(ll mid){
	ll cnt = 0;
	for (int i = 0; i < n; i ++){
		if (num[i] <= mid) continue; 
		cnt += (num[i] - mid + k - 2)/(k - 1);//加上k-2相当于取上界了
		//k-1可能会等于0啊
		if (cnt > mid) return false;
	}
	return true;
}

ll solve(){
	ll l = 1,mid, r = ans;
	while (l <= r){
		mid = MID(l,r);
		if (check(mid)) {
			r = mid - 1;
			ans = mid;
		}else l = mid + 1;
	}
	return ans;
}

int main(){
	scanf("%d", &n);
	ans = 0;
	for (int i = 0; i < n; i ++){
		scanf("%lld", &num[i]);
		ans = max(num[i],ans);
	}
	scanf("%lld", &k);
	printf("%lldn",k == 1?ans : solve());
	return 0;
}
```

	 