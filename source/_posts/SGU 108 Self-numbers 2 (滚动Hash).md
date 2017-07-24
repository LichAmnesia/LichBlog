---
title: SGU 108 Self-numbers 2 (滚动Hash)
tags:
  - ACM
date: 2013-12-20 22:56:53
---

很容易想到类似素数筛选的方法，但是发现空间这个题目开的很小，所以开那么大空间不行

发现d(n) - n < 7 * 9，函数与自身相减是小于63,某个数，最多只会影响它的第63个后面的数，考虑用一个类似滚动数组的hash，如果这个数是，那么就存储，如果这个数不是。就不做

不管怎样都要把后面一个消除影响以及这个数还原为可以的

```cpp
/* From: Lich_Amnesia
 * Time: 2013-12-20 22:34:03
 *
 * SGU 108
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
#define maxn 5010

struct node{
	int id,ans,val;
}num[maxn];

bool cmp(node a,node b){
	return a.val < b.val;
}

int val[10010];
bool vis[66];
int ans[maxn];
int main(){
	int n,k;
	scanf("%d%d", &n, &k);
	for (int i = 0; i < k; i++){
		scanf("%d", &num[i].val);
		num[i].id = i;
	}
	int len = 0;
	int now = 0;
	sort(num,num + k,cmp);

	//求d(n)的数字部分的和
	for (int i = 1; i <= 10000; i ++){
		val[i] = val[i /10] + i % 10;
	}
	memset(vis,1,sizeof(vis));

	for (int i = 1; i <= n; i ++){
		if (vis[i % 63]){
			len ++;
			while (num[now].val == len){
				ans[num[now++].id] = i;
			}
		}

		vis[i % 63] = 1;

		int next = i + val[i / 10000] + val[i % 10000];
		vis[next % 63] = 0;

	}
	cout << len << endl;
	for (int i = 0; i < now; i++){
		if (i) printf(" ");
		printf("%d", ans[i]);
	}
	cout << endl;
	return 0;
}
```
	 