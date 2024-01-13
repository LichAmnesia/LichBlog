---
title: CodeForces 205B Little Elephant and Sorting （贪心）
tags:
  - ACM
date: 2013-11-21 10:00:06
---

每个前面大的后面小的都需要使他们保持平衡

```cpp
#include <bits/stdc++.h>
using namespace std;

int num[100005];
int main(){
	int n;
	///memset(b,0,sizeof(b));
	scanf("%d", &n);
	int flag = 0,cnt,Mini,Min = 1000000002;
	int tmp;
	long long ans = 0;
	for (int i = 0; i < n; i++){
		tmp = cnt;
		scanf("%d", &cnt);
		if (i !=0 && tmp > cnt)
			ans += tmp - cnt;		
	}
	cout << ans << endl;
	return 0;
}
```

	 