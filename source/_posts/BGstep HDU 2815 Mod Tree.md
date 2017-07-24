---
title: BGstep HDU 2815 Mod Tree
tags:
  - ACM
date: 2013-08-28 15:16:02
---

网上一堆讲解，基本知道什么样子然后套用模板就行

```cpp
/* BGstep HDU 2815
 * 求解a^x == c (mod p) 的 0 <= x < c
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
typedef long long llg;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
const int N = 100003;
struct Baby_step_Giant_step{
	struct edge{int key,times;edge*next;}g[N],*ls[N];
	int e;

	void add(int x,int times){
		int hash = x % N;
		for (edge*t=ls[hash];t;t=t->next)
			if(t->key == x) return ;
		g[++e].key = x; 
		g[e].times = times;
		g[e].next = ls[hash];
		ls[hash] = &g[e];
	}

	int In(int x){
		int hash = x % N;
		for (edge*t=ls[hash];t;t=t->next)
			if(t->key == x) return t->times;
		return -1;
	}

	int Power_mod(int a,int b,int mod){
		llg t = a, res = 1;
		while (b){
			if (b&1) res = res * t % mod;
			t = t * t % mod;
			b >>= 1;
		}
		return (int)(res);
	}

	llg exgcd(int a,int b,llg &x,llg &y){
		if (b == 0){
			x = 1; y = 0; return a; 
		}
		llg g = exgcd(b,a%b,x,y);
		llg tx = x,ty = y;
		x = ty; y = tx - a/b*ty;
		return g;
	}

	int solve(int a,int c,int p){
		if (c >= p) return -1;
		int i,j;
		int x = 1; int t = 1;
		int s = (int)ceil(sqrt((double)p));
		int res,cnt = 0;
		llg tx,ty,g;
		for (int i = 0; i <= 50; i++)
			if (Power_mod(a,i,p) == c) 
				return i;

		while ((g=exgcd(a,p,tx,ty)) != 1){
			if (c%g) return -1;
			c /= g;
			p /= g;
			x = (llg)(a)/g*x%p;
			cnt ++;
		} 

		e = 0;
		memset(ls,0,sizeof(ls));
		for (i = 0; i < s; i++) add(Power_mod(a,i,p),i);

		for (int step = Power_mod(a,s,p),i = cnt; i < p;
				i += s,x = (llg)(x) * step % p){
			g = exgcd(x,p,tx,ty);
			tx = tx * c % p;
			if (tx < 0) tx += p;
			res = In((int)tx);
			if (res == -1) continue;
			return res + i;
		}
		return -1;
	}
}Number_Theory;

int main(){
	int a,p,c;
	while(~scanf("%d%d%d", &a, &p, &c)){
		int ans = Number_Theory.solve(a,c,p);
		if (ans == -1) puts("Orz,I can&rsquo;t find D!");
		else printf("%dn", ans);
	}
	return 0;
}
```

	 