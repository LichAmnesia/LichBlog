---
title: POJ 2796 Feel Good (单调队列)
tags:
  - ACM
date: 2013-09-16 21:11:00
---

想了半天愣是搞不定怎么写

	4

	2 3 4 3

为什么这样可以用单调队列搞呢维护一个不降的序列

把2 3 4 分别入栈，然后遇到3 了，发现不能继续做了，于是先算以最上面4的那个数作为区域最小的那个数能不能实现tmp < ans，之后把4弹出

然后看3发现不小了就继续。

之后遇到-1 数组最后值为-1，那么就是说一直弹栈到最后，把每个在栈的数作为最小的数来进行算tmp

```cpp
/* POJ 2796 单调队列 维护一个单调不降的序列，然后每次遇到比top小的数时进行
 * 出栈操作并且把值更新下
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
ll st[100100],a[100100],sum[100100];
int main(){
	int n;

	while (~scanf("%d", &n)){
		memset(a,0,sizeof(a));
		memset(st,0,sizeof(st));
		for (int i = 1; i <= n; i++){
			scanf("%lld", &a[i]);
			sum[i] += sum[i-1] + a[i];
		}
		int top = 0;
		a[n + 1] = -1;
		ll tmp,ans = -1;
		int l , r;
		for (int i = 1; i <= n + 1; i++){
			while (top != 0 && a[st[top]] > a[i]){
				tmp = a[st[top]] * (sum[i-1] - sum[st[top - 1]]);
				if (tmp > ans){
					ans = tmp;
					l = st[top-1] + 1;
					r = i - 1;
				}
				top --;
			}
			top ++;
			st[top] = i;
		}
		printf("%lldn%d %dn",ans,l,r);
	}
	return 0;
}
```

	 