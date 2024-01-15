---
title: ZOJ 3768 Continuous Login
tags:
  - ACM
date: 2014-04-07 12:05:04
---

2014 浙大校赛 B

其实就是找到规律最多只可能是1，2，3种分割

```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-07 11:22:09
 *
 * ZOJ 3768
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

int check(int n){
	int k = max(0,(int)sqrt(2 * n) - 4);
	for (int i = k; i * i <= 2 * n; i ++){
		if (i * i  + i == 2 * n) return i;
	}
	return 0;
}

int main(){
	int T,n;
	cin >> T;
	while (T--){
		scanf("%d", &n);
		int l,k = check(n);
		if (k){
			printf("%dn", k);
		}else {
			bool flag = 0;
			for (int i = 1; i * i + i <= 2 * n; i ++){
				l = check(n - (i + 1) * i /2);
				if (l){
					printf("%d %dn", i, l);
					flag = 1;
					break;
				}
			}
			if (!flag){
				for (int i = 1; i * i + i <= 2 * n && !flag; i ++){
					int mod = n - (i + 1) * i / 2;
					for (int j = 1; j * (j + 1) / 2 <= mod && !flag; j ++){
						l = check(n - (j*(j+1)/2) - i * (i + 1) /2);
						if (l){
							printf("%d %d %dn", i, j ,l);
							flag = 1;
							break;
						}
					}
				}
			}
		}
	}
	return 0;
}
```