---
title: 'Codeforces Round #216 (Div. 2) A Valera and Plates'
tags:
  - ACM
date: 2013-11-30 16:49:51
---

判定1，2。算一下 有没有可以用的盘子或者碗，然后加减一下就行

```cpp
#include <iostream>
#include <algorithm>
#include <map>
#include <cstdio>
using namespace std;
int a[1010];
int main(int argc, char const *argv[])
{
	int n,m,k;
	scanf("%d%d%d", &n, &m, &k);
	int bow = m, plat = k;
	int ans = 0;
	for (int i = 0; i < n; i ++){
		scanf("%d", &a[i]);
		if (a[i] == 1) {
			if (bow) bow --;
			else ans ++;
		}else {
			if (plat) {
				plat --;
			}else if (bow){
				bow --;
			}else ans ++;
		}
	}
	cout << ans << endl;

	return 0;
}
```

	 