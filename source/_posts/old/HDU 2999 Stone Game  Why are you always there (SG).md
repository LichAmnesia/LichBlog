---
title: "HDU 2999\t Stone Game, Why are you always there? (SG)"
tags:
  - ACM
date: 2013-11-12 15:13:52
---

[http://acm.hust.edu.cn/vjudge/contest/view.action?cid=31424#overview](http://acm.hust.edu.cn/vjudge/contest/view.action?cid=31424#overview)

自己搜集的一些SG和博弈类的题目

 

题目：给出一串石头，和一个集合，每次取出若干个连续的石头（数量必须为集合中的），最后取完的获胜，问有没有必胜策略。

http://acm.hdu.edu.cn/showproblem.php?pid=2999

好像不是很理解SG函数的含义， 可还是乱七八糟的搞出了SG，然后水过去。

对于一个连续的串，比如说长度为5，可行只有2，那么取了之后可能分为两段

如后继可能为：（1，3），｛（1），（4，5）｝，｛（1，2），（5）｝，｛3，5｝这四种情况。两个区间异或之后，取mex操作

虽不明但觉厉，然后就AC了。

局面是确定的，没有存在不确定的情况

```cpp
/* 
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
int n,m;
int sg[1010],ni[1010];
int mex(int num){
	if (sg[num] != -1) return sg[num];
	int judge[1010] = {0};
	int tmp;
	for (int i = 0; i < n; i++){
		tmp = num - ni[i];
		if (tmp < 0) break;
		for (int j = tmp; j >= 0; j--){
			judge[mex(j) ^ mex(num-j-ni[i])] = 1;
		}
	}
	for (int i = 0;;i++)
		if (!judge[i]) 
			return sg[num] = i;
}

int main(){
	while (~scanf("%d", &n)){
		memset(sg,-1,sizeof(sg));
		for (int i = 0; i < n; i++)
			scanf("%d", &ni[i]);
		sort(ni, ni + n);
		int i ,j;
		for (i = j = 1; i < n; i++){
			if (ni[i] != ni[j-1]) 
				ni[j++] = ni[i];
		}
		n = j;
		scanf("%d", &m);
		int num,sgans = 0;
		for (int i = 0; i < m; i++){
			scanf("%d", &num);

			//	sgans ^= mex(num);

			if (mex(num) == 0) printf("2n");
			else printf("1n");
		}
	}
	return 0;
}
```
	 