---
title: HDU 4630 No Pain No Game (2013 多校第三场 J)
tags:
  - ACM
date: 2013-08-12 17:51:23
---

```cpp
/* HDU 4630 2013多校第三场J题 离线 数状数组
 * 算区间最大值得时候因为是从后往前所以算从头到此处的最大值树状数组可以处理
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define maxn 500005

using namespace std;
int num[maxn],ans[maxn],n;
int big[maxn],pre[maxn];
struct node{
	int l,r,id;
	bool operator < (const node &u) const{
		return l > u.l;
	}
}p[maxn];
inline int lowbit(int x) {return x&(-x);} 
inline void update(int x,int val){
	while(x<=n){
		big[x] = max(big[x],val);
		x += lowbit(x);
	}
}
inline int query(int x){
	int ret = 0;
	while(x){
		ret = max(ret,big[x]);
		x -= lowbit(x);
	}
	return ret;
}
int main(){
	int t,q;
	cin >> t;
	while (t--){
		cin >> n;
		for (int i = 1; i <= n; ++i){
			scanf("%d", &num[i]);
		} 
		scanf("%d", &q);
		for (int i = 0; i < q; ++i){
			scanf("%d%d", &p[i].l, &p[i].r);
			p[i].id = i + 1;
		}
		sort(p,p+q);
		int k = 0;
		memset(big,0,sizeof(big));memset(pre,0,sizeof(pre));
		for (int i = n; i >= 1; --i){
			for (int j = 1; j*j <= num[i]; ++j){
				if (num[i] % j == 0){
					if (pre[j]) update(pre[j],j);
					pre[j] = i;
					if (j*j == num[i]) continue;
					if (pre[num[i]/j]) update(pre[num[i]/j],num[i]/j);
					pre[num[i]/j] = i;
				}
			}
			for(;p[k].l == i;k++) ans[p[k].id] = query(p[k].r);
		}
		for (int i = 1; i <= q; ++i){
			printf("%dn", ans[i]);
		}
	}

	return 0;
}
```

	 