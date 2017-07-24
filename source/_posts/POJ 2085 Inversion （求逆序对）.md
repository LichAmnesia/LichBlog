---
title: POJ 2085 Inversion （求逆序对）
tags:
  - ACM
date: 2013-10-24 12:39:03
---

给定整数N，和一个序列的逆序数M，求以1，2...N为元素，逆序为M，且按字典序最小的那个序列。

只要知道这样一个事实：一个序列的逆序唯一决定了这个序列。

 

对这个问题可以采取贪心策略。

首先，如果所求序列以1为首，则1的逆序为0，可以从上表看出此时序列的逆序数最多为2+1=3<5，不满足。考虑以2为首，序列的逆序最多为3+1<5，不满足。

考虑以3为首，可见当1的逆序为3，2的逆序为2，4的逆序为0时满足要求，这时1，2，4均为最大逆序，因而只能排列为4，2，1，加上首数，所求序列为3，4，2，1。

若M=3，采取同样的贪心策略，可求得结果为1，4，3，2。

依此思路，可以得到所求序列关于N，M的关系式，具体如下：

1，2，3，...N-P,  N-((p-1)*p/2-M),  N  ,  N-1...N-P+1.(P是满足（P-1）*P/2>=M的最小值)。

代码就容易多了。

正好按照那样的排列会出现多了几个逆序数的情况，这样只需要把多的那个值的逆序的那个数移动到前面去就可以了 

 

```cpp
/* From: Lich_Amnesia
 * Time: 2013-10-24 10:44:52
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
int main(){
	int n,m;
	while (~scanf("%d%d", &n, &m) && (m!=-1 && n != -1)){
		int p = 1;
		while (p*(p-1)/2 < m) p++;
		int tmp = (p-1)*p/2;
		for (int i = 1; i <= n-p; i++)
			printf("%d ",i);
		printf("%d",n-(tmp-m));
		for (int i = n; i > n-p; i--)
			if (i != n-tmp+m) printf(" %d", i);
		puts("");
	}
	return 0;
}
```

	 