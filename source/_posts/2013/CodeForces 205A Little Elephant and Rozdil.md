---
title: CodeForces 205A Little Elephant and Rozdil
tags:
  - ACM
date: 2013-11-21 09:58:10
---

读懂题就行，不用排序找一下最小的是不是多个

```cpp
#include <iostream>
#include <stdio.h>
#include <string.h>
#include <algorithm>
using namespace std;

int num[100005];
int main(){
	int n;
	///memset(b,0,sizeof(b));
	scanf("%d", &n);
	int flag = 0,cnt,Mini,Min = 1000000002;
	for (int i = 0; i < n; i++){
		scanf("%d", &cnt);
		num[i] = cnt;
		if (Min > cnt)
			Mini = i;
		//if (Min == cnt) flag = 1;
		Min = min(cnt,Min);
	}
	for (int i = 0; i < n; i++)
	{
		if (Mini != i && Min == num[i])
			flag = 1;
	}
	if (flag) printf("Still Rozdiln");
	else printf("%dn", Mini + 1);
	return 0;
}
```
	 