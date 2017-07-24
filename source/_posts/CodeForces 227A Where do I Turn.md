---
title: CodeForces 227A Where do I Turn?
tags:
  - ACM
date: 2013-12-03 09:39:22
---
```cpp
#include <iostream>
#include <cmath>
#include <cstdio>

using namespace std;
typedef long long ll;
ll x[10],y[10];

int main(){
	cin >> x[0] >> y[0];
	cin >> x[1] >> y[1];
	cin >> x[2] >> y[2];
	x[3] = x[1] - x[0];y[3] = y[1] - y[0];
	x[4] = x[2] - x[1];y[4] = y[2] - y[1];
	ll ans = x[3] * y[4] - x[4] * y[3];
	if (ans > 0) printf("LEFTn");
	else if (ans < 0) printf("RIGHTn");
 	else printf("TOWARDSn");
 	return 0;
}
``` 