---
title: CodeForces 348A Mafia (202Div1)
tags:
  - ACM
date: 2013-09-30 09:18:15
---

安排表形成一个矩阵n是已知的求的就是天数x，x*n大约等于sum，记得sum-1因为正好的话会出现问题

```cpp
/* From: Lich_Amnesia
 * Time: 2013-09-29 20:57:37
 * 
 * CF 202div1 A
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
ll s = 0;

int main(){
	int n,x;
	int Max = 0;
	scanf("%d", &n);
	for (int i = 0; i < n; i++){
		scanf("%d", &x);
		s += x;
		Max = max(x,Max);
	}
	printf("%dn", max(1ll * Max,(s-1)/(n-1) + 1));
	return 0;
}
```

	 