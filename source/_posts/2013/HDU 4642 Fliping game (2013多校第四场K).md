---
title: HDU 4642 Fliping game (2013多校第四场K)
tags:
  - ACM
date: 2013-08-13 20:30:14
---

```cpp
/* 找规律发现只跟右下角的那个硬币有关
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
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
int main(){
	int t,n,m,a;
	scanf("%d", &t);
	while (t--){
		scanf("%d%d", &n, &m);
		for (int i = 0; i < n; ++i)
			for (int j = 0; j < m; ++j){
				scanf("%d", &a);
			}
		if(a) printf("Alicen");
		else printf("Bobn");
	}
	return 0;
}
```

	 