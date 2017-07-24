---
title: HDU 4627 The Unsolvable Problem (2013 多校第三场 G)
tags:
  - ACM
date: 2013-08-12 17:45:17
---
```cpp
/* HDU 4627 2013多校第三场G
 * 简单题 分成奇数和能被四整除和的偶数
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
int main(){
	int t;
	scanf("%d", &t);
	long long n,ans;
	while (t--){
		scanf("%I64d", &n);
		if (n == 2) ans = 1;
		else if (n & 1) ans = n/2*(n/2+1);
		else if((n>>1) & 1) ans = (n/2+2)*(n/2-2);
		else ans = (n/2-1)*(n/2+1);
		cout << ans << endl;
	}
	return 0;
}
```

	 