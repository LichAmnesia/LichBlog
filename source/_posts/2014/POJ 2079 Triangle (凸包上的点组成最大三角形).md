---
title: POJ 2079 Triangle (凸包上的点组成最大三角形)
tags:
  - ACM
date: 2014-03-29 12:06:02
---

```cpp
#include <iostream>
#include <cstdio>
# include <cmath>
# include <algorithm>	
using namespace std;
#define MAXN 50010 
const double EPS = 1e-8;
const double PI = acos(-1.0);
const double pi = 3.14159265359;

typedef struct Point {
	double x, y;
	Point(double x = 0, double y = 0): x(x), y(y) {}
} Vector;
Vector operator + (Vector a, Vector b) {
	return Vector(a.x + b.x, a.y + b.y);
}
Vector operator - (Vector a, Vector b) {
	return Vector(a.x - b.x, a.y - b.y);
}
Vector operator * (Vector a, double k) {
	return Vector(a.x * k, a.y * k);
}
bool operator < (const Point &a, const Point &b) {
	return a.y < b.y || (a.y == b.y && a.x < b.x);
}
Point p[MAXN],ch[MAXN];

inline double cross(Vector a, Vector b) {
	return a.x * b.y - a.y * b.x;
}
inline double xmult(Point a, Point b, Point c) {
	return cross(b - a, c - a);
}

int convex_hull(Point ch[], Point p[], int n)
{
	sort(p, p + n);
	int ix = 0;
	for (int i = 0; i < n; ++i) {
		while (ix > 1 && xmult(ch[ix - 2], ch[ix - 1], p[i]) < 0) --ix;
		ch[ix++] = p[i];
	}	
	int t = ix;
	for (int i = n - 2; i >= 0; --i) {
		while (ix > t && xmult(ch[ix - 2], ch[ix - 1], p[i]) < 0) --ix;
		ch[ix++] = p[i];
	}
	return n > 1 ? ix - 1 : ix;
}

int main(int argc, char const *argv[])
{
	int n,convexnum;
	while (~scanf("%d", &n) && (n != -1)){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p[i].x, &p[i].y);
		}
		convexnum = convex_hull(ch,p,n);
		//cout << convexnum << endl;
		double ret = 0,tmp;
		int p = 1,q = 2;
		for (int i = 0; i < convexnum; i ++){
			while ((fabs(xmult(ch[i],ch[p + 1],ch[q]))) >
				(tmp = fabs(xmult(ch[i],ch[p],ch[q])))){
				p = (p + 1) % convexnum;
			}
			ret = max(ret,tmp);
			while ((fabs(xmult(ch[i],ch[p],ch[q + 1]))) >
				(tmp = fabs(xmult(ch[i],ch[p],ch[q])))){
				q = (q + 1) % convexnum;
			}
			ret = max(ret,tmp);

		}
		printf("%.2fn", ret * 0.5);
	}
	return 0;
}
```
	 