---
title: HDU 4638 Group (2013多校第四场G)
tags:
  - ACM
date: 2013-08-13 20:55:57
---

```cpp
/* 离线数状数组,先预先处理出1-i的形成的连续段个数，然后将查询区域排序
 * 每次删去不许要的前面部分，因为前面删去的那个数，可能+1或者-1的数在后面
 * 导致对后面有影响把这个影响消去
 *
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
#define maxn 100005
using namespace std;
int n,m;
int num[maxn],c[maxn],pos[maxn],ans[maxn];
bool isgroup[maxn];
struct node {
	int l,r,id;

}p[maxn];
bool cmp(node a,node b){
	if(a.l == b.l) return a.r < b.r;
	else return a.l < b.l;
}
inline int lowbit(int x){return x&(-x);}
inline int query(int x){
	int ret = 0;
	while (x){
		ret += c[x];
		x -= lowbit(x);
	}
	return ret;
}
inline void update(int x,int val){
	while (x <= n){
		c[x] += val;
		x += lowbit(x);
	}
}

int main(){
	int t;
	scanf("%d", &t);
	while (t--){
		scanf("%d%d", &n, &m);
		for (int i = 1; i <= n; ++i){
			scanf("%d", &num[i]);
			pos[num[i]] = i;
		}
		for (int i = 0; i < m; ++i){
			scanf("%d%d", &p[i].l, &p[i].r);
			p[i].id = i;
		}
		sort(p,p+m,cmp);
		memset(c,0,sizeof(c));memset(isgroup,0,sizeof(isgroup));
		for (int i = 1; i <= n; ++i){
			int cnt = 0;
			if (isgroup[num[i]-1]) cnt++;
			if (isgroup[num[i]+1]) cnt++;
			if (cnt == 0) update(pos[num[i]],1);
			else if (cnt == 2) update(pos[num[i]],-1);
			isgroup[num[i]] = 1;
		}
		int cnt = 1;
		for (int i = 0; i < m; ++i){
			while (cnt < p[i].l) {
				if (pos[num[cnt]-1] > cnt && num[cnt] > 1)
					update(pos[num[cnt]-1],1);
				if (pos[num[cnt]+1] > cnt && num[cnt] < n)
					update(pos[num[cnt]+1],1);
				cnt ++;
			}
			ans[p[i].id] = query(p[i].r) - query(p[i].l-1);
		}
		for (int i = 0; i < m; ++i){
			printf("%dn", ans[i]);
		}
	}
	return 0;
}
```

	 