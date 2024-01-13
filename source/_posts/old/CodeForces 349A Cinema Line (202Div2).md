---
title: CodeForces 349A Cinema Line (202Div2)
tags:
  - ACM
date: 2013-09-30 09:12:12
---

简单题

```cpp
/* CF 202 div2 A
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
	int n,cnt;
	scanf("%d", &n);
	int a = 0, b = 0, c = 0;
	int flag = 1;
	for (int i = 0; i < n; i ++) {
		scanf("%d", &cnt);
		if (cnt == 25 && flag) a ++;
		else if (cnt == 50 && flag) {
			if (a <= 0) flag = 0;
			else {
				a--;b++;
			}
		}else if (cnt == 100 && flag){
			if (b > 0 && a > 0) {b--;a--;}
			else if (b <= 0 && a >= 3){
				a -= 3;
			} else {
				flag = 0;
			}
		}
	}
	if (flag) printf("YESn");
	else printf("NOn");
	return 0;
}
```
	 