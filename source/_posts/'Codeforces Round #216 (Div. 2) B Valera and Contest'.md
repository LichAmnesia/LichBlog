---
title: 'Codeforces Round #216 (Div. 2) B Valera and Contest'
tags:
  - ACM
date: 2013-11-30 16:59:03
---

分成k和n-k的部分，然后算sk/k 和(sall - sk) /(n - k)，易知，前面的k个数肯定是比较大的，然后前面k个进行均分sk%k的值在前k中分配且要不能大于r，然后后面的n-k也是一样的只是不能大于a[k]

```cpp
#include <iostream>
#include <algorithm>
#include <map>
#include <cstdio>
using namespace std;
int a[1010];
int main(int argc, char const *argv[])
{
	int n,k,l,r,sall,sk;
	scanf("%d%d%d%d%d%d", &n, &k, &l, &r, &sall, &sk);
	int Maxn = sk / k;
	int Maxmod = sk % k;
	for (int i = 0; i < k; i++){
		a[i] = Maxn;
		if (Maxmod){
			if (Maxmod + a[i] >= r) {
				Maxmod -= r - a[i];
				a[i] = r;
			}else {
				a[i] += Maxmod;
				Maxmod = 0;
			}
		}
	}
	if (n > k){
		Maxn = (sall - sk) / (n-k);
		Maxmod = (sall - sk) % (n-k);

		for (int i = k; i < n; i++){
			a[i] = Maxn;
			if (Maxmod){
				if (Maxmod + a[i] >= a[k-1]) {
					Maxmod -= a[k-1] - a[i];
					a[i] = a[k-1];
				}else {
					a[i] += Maxmod;
					Maxmod = 0;
				}
			}
		}
	}
	for (int i = 0; i < n; i ++){
		printf("%d ", a[i]);
	}

	return 0;
}
```

	 