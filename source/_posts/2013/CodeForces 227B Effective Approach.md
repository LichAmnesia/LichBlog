---
title: CodeForces 227B Effective Approach
tags:
  - ACM
date: 2013-12-03 09:40:33
---

做一个映射表第一次出现的位置就行了

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
#include <map>
#include <cstdio>
using namespace std;
typedef long long ll;
#define maxn 100010
int a[maxn],b[maxn];
map<int,int>map1,map2;
bool cmp(int a,int b){
	return a > b;
}
int main(){
	int n,m;
	cin >> n;
	for (int i = 0; i < n; i++)
	{	
		cin >> a[i];
		b[n - i - 1] = a[i];
	}
	int num = 1;
	for (int i = 0; i < n; i++){
		if (map1[a[i]] == 0) map1[a[i]] = i + 1;
	}

	for (int i = 0; i < n; i++){
		if (map2[b[i]] == 0) map2[b[i]] = i + 1;
	}
	cin >> m;
	int cnt;
	ll ansmin = 0,ansmax = 0;
	for (int i = 0; i < m; i++){
		cin >> cnt;
		if (map1[cnt] == 0) ansmin += n;
		else ansmin += map1[cnt];
		if (map2[cnt] == 0) ansmax += n;
		else ansmax += map2[cnt];
	}
	cout << ansmin << &#39; &#39; << ansmax << endl;
 	return 0;
}
```

	 