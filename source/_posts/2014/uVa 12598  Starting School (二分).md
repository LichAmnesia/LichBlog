---
title: uVa 12598  Starting School (二分)
tags:
  - ACM
date: 2014-03-03 18:03:36
---

题意：有n个人排成一列，给出前k个人的数字，从第k+1个人开始，给他们分配数字，分配的方法是取当前没有出现过的最小正整数，例如8人，前3人的数字为3 5 8，第4到第8个人的数字分别为1 2 4 6 7，整个序列为3 5 8 1 2 4 6 7

数据很大，不可能模拟

1.留意到一点，因为是取最小的没用过的正整数，所以我们可以先把所有可能用的正整数保存下来，按区间保存

2.例如已经用了3 5 8，没用的就是

[1,2] 2个

[4,4] 1个

[6,8] 3个

现在

要为第k+1个人分配数字，那么可以立刻知道是分配1，因为1是第1个没有用过的

要为第k+5个人分配数字，可以立刻知道是7，因为7是第5个没有用过的数字

所以要为第m个数字分配数字，在上面没有用过的数字表里面找，先找到它在哪一块，再找到是哪一块的第几个，其中找在哪一块，用二分即可

 

```cpp
/* From: Lich_Amnesia
 * Time: 2014-03-03 16:51:26
 *
 * uva 12598 二分
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

#define maxn 51010

int sum[maxn],num[maxn],use[maxn];

struct Segment{
	int l,r,len;
	Segment(){}
	Segment(int a,int b,int c){
		l = a;r = b; len = c;
	}
}seg[maxn];
int nm;
int binary(int key){
	int l = 1,r = nm -1,ans;
	while (l <= r){
		int mid = MID(l,r);
		if (key <= sum[mid]){
			ans = mid; r = mid - 1;
		}else l = mid + 1;
	}
	return ans;
}

int main(){
	int T,n,k,q;
	cin >> T;
	int t = 0;
	while (t ++ < T){
		scanf("%d%d%d", &n, &k, &q);
		for (int i = 1; i <= k; i ++){
			scanf("%d", &num[i]);
			use[i] = num[i];
		}
		use[0] = 0;use[k + 1] = INF;
		sort(use, use + k + 2);

		nm = 1;int r,l;
		seg[0] = Segment(0,0,0);
		for (int i = 1; i <= k + 1; i ++){
			l = use[i-1] + 1;
			r = use[i] - 1;
			if (r > n) r = n;
			if (r - l + 1 > 0) {
				seg[nm ++] = Segment(l,r,r - l + 1);
			}
		}

		memset(sum,0,sizeof(sum));
		sum[0] = 0;
		for (int i = 1; i < nm; i ++){
			sum[i] = seg[i].len + sum[i - 1];
		}

		printf("Case %d:n",t);
		int cnt;
		for (int i = 0; i < q; i ++){
			scanf("%d", &cnt);
			if (cnt <= k) {
				printf("%dn", num[cnt]);continue;
			}
			cnt -= k;
			int index = binary(cnt);
			printf("%dn",seg[index].r - (sum[index] - cnt));
		}
	}
	return 0;
}
```
	 