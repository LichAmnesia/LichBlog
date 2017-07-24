---
title: CodeForces 349B Color the Fence (202Div2)
tags:
  - ACM
date: 2013-09-30 09:15:12
---

先找到最长能有多少位，因为最大的数必定是最长的。然后从高位到低位对剩余的进行查找看能不能更大了

```cpp
/* CF 202div2 B
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
int main(){
	int v,num[10],min = 1;
	scanf("%d", &v);
	for (int i = 1; i <= 9; i++){
		scanf("%d", &num[i]);
		if (num[min] >= num[i]) min = i;
	}
	int n = v / num[min];
	int remain = v % num[min];
	int j;
	if (n == 0) {
		puts("-1");
		return 0;
	}
	for (int i = 0; i < n; i++){
		for (j = 9; j > min; j--){
			if (remain - num[j] + num[min] >= 0) {
				remain = remain - num[j] + num[min];
				break;
			}
		}
		putchar(&#39;0&#39; + j);
	}
	puts("");
	return 0;
}
```
	 