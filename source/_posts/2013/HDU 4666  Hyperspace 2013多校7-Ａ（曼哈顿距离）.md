---
title: HDU 4666  Hyperspace 2013多校7-Ａ（曼哈顿距离）
tags:
  - ACM
date: 2013-10-22 10:25:20
---

找一堆Ｋ维点的最长曼哈顿距离，可以用multiset这个STL做。

把绝对值去掉对于每个点来说都有一个$1<<m$的状态0表示+,1表示-，当作2进制来做
 然后就是找每个状态下的最大值和最小值减去就行了 </m的状态0表示+,1表示-，当作2进制来做

	 
```cpp
/* From: Lich_Amnesia
 * Time: 2013-10-20 08:30:06
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

multiset<int>mst[(1<<5)+1];
multiset<int>::iterator it1,it2;
int num[60020][10];

int main(){
	int n,m,od;
	while (~scanf("%d%d", &n, &m)){
		for (int i = 0; i < (1<<5); i++)
			mst[i].clear();
		for (int i = 1; i <= n; i++){
			scanf("%d", &od);
			if (od == 0){
				for (int j = 1; j <= m; j++)
					scanf("%d", &num[i][j]);
				for (int j = 0; j < (1 << m); j++){
					int sum = 0;
					for (int k = 1; k <= m; k++){
						if ((1<<(k-1)) & j)
							sum -= num[i][k];
						else sum += num[i][k];
					}
					mst[j].insert(sum);
				}	
			}else {
				int x;
				scanf("%d", &x);
				for (int j = 0; j < (1 << m); j++){
					int sum = 0;
					for (int k = 1; k <= m; k++){
						if ((1<<(k-1)) & j)
							sum -= num[x][k];
						else sum += num[x][k];
					}
					it1 = mst[j].find(sum);
					mst[j].erase(it1);
				}
			}
			int ans = 0;
			for (int j = 0; j < (1 << m); j++){
				it1 = mst[j].end();
				it1--;
				it2 = mst[j].begin();
				ans = max(ans,((*it1) - (*it2)));
			}
			printf("%dn", ans);
		}

	}
	return 0;
}
```

	 