---
title: ZOJ 3767 Elevator
tags:
  - ACM
date: 2014-04-07 11:21:47
---

2014年浙大校赛 A

	 
```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-06 13:33:57
 *
 * ZOJ 3767
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
int main(){
	int t;
	int n,m;
	cin >> t;
	while (t--){
		scanf("%d%d", &n, &m);
		int sum = 0,cnt;
		for (int i = 0; i < n; i ++){
			scanf("%d",&cnt);
			sum += cnt;
		}
		if (sum > m) puts("Warning");
		else puts("Safe");
	}
	return 0;
}
```

	 