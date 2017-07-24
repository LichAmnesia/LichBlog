---
title: POJ 1733 Parity Game (带权并查集 + 离散化)
tags:
  - ACM
date: 2014-07-01 20:01:39
---

**题目大意**

一个由0,1组成的数字串，现在告诉你，第i位到第j位的1的个数为奇数还是偶数。

但是告诉你的可能会自相矛盾，现在就是求出最多能有前几个回答是不矛盾的。

**解题思路**

对于带权并查集，基本都需要进行抑或操作，关系比较多的时候可能需要取模运算，比如说d[i]表示i与i的父亲的关系。d[i] = d[pa[i]] ^ d[i];

此题也是一样，可以把左端点看做是父亲节点，右端点看做是儿子节点，儿子节点向父亲节点连边，边就相当于c[i]。

于是对于某一个值L，假如出现了[L,R1]和[L,R2]这样的情况，那么R1,R2都是指向L的，并且我们可以解出[R1,R2]之间的关系为d[R1] ^ d[R2]。

这样就是如果出现L,R和其他某次出现的相同的时候会出现合并的情况，其他的就不会出现。

所有并查集的操作全都用抑或实现。

对于每个点，你需要先排序，然后离散化，得到离散化后的点再进行操作。

**代码**

```cpp
/* From: Lich_Amnesia
 * Time: 2014-07-01 09:33:42
 *
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
#define maxn 22222
int pa[maxn],d[maxn];
int l[maxn],r[maxn],x[maxn],c[maxn];

int find(int x){
	if (pa[x] == x) return x;
	int ret = find(pa[x]);
	d[x] ^= d[pa[x]];
	pa[x] = ret;
	return ret;
}

bool Union(int L,int R,int c){
	int l = find(L);
	int r = find(R);
	if (l == r){
		return ((d[L] ^ d[R]) == c);
	}else {
		if (l > r){
			pa[l] = r;
			d[l] = d[L] ^ c ^ d[R]; 
		}else {
			pa[r] = l;
			d[r] = d[R] ^ c ^ d[L];
		}
	}
	return 1;
}

int bin(int l,int r,int va){
	int mid = MID(l,r);
	while (l <= r){
		mid = MID(l,r);
		if (x[mid] == va) return mid;
		else if (x[mid] < va) l = mid + 1;
		else r = mid - 1;
	}
	return -1;
}

int main(){
	char s[15];int n,m;
	scanf("%d%d", &n, &m);
	int cnt = 0;
	for (int i = 0; i < m; i ++){
		scanf("%d%d%s", &l[i], &r[i], s);
		x[cnt ++] = l[i] - 1;
		x[cnt ++] = r[i];
		if (s[0] == 'o') c[i] = 1;
		else c[i] = 0;
	}
	sort(x, x + cnt);
	cnt = unique(x, x + cnt) - x;
	for (int i = 0; i <= maxn; i ++){
		pa[i] = i;
		d[i] = 0;
	}
	for (int i = 0; i < m; i ++){
		int L = bin(0, cnt - 1, l[i] - 1) + 1;
		int R = bin(0, cnt - 1, r[i])  + 1;

		if (Union(L,R,c[i]) == 0){
			printf("%dn", i);
			return 0;
		}
	}
	printf("%dn", m);
	return 0;
}

```

	 

	 