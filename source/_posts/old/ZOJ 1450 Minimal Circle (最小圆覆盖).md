---
title: ZOJ 1450 Minimal Circle (最小圆覆盖)
tags:
  - ACM
date: 2014-03-29 11:49:41
---

```cpp
#include <iostream>
#include <cstdio>
# include <cmath>
# include <algorithm>	
using namespace std;
# define MAXN 110
const double EPS = 1e-8;
const double PI = acos(-1.0);
const double pi = 3.14159265359;
typedef struct Point {
	double x, y;
	Point(double x = 0, double y = 0): x(x), y(y) {}
} Vector;
Point p[MAXN];
struct Circle {
	Point c;
	double r;
	Circle(Point c = Point(), double r = 0): c(c), r(r) {}
};
inline int sgn(double x) {
	return (x > EPS) - (x < -EPS);
}

inline double dis_pp(Point a, Point b) {
	return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

Point circumcenter(Point a, Point b, Point c) {
	double x1 = b.x - a.x, y1 = b.y - a.y, e1 = (x1 * x1 + y1 * y1) / 2;
	double x2 = c.x - a.x, y2 = c.y - a.y, e2 = (x2 * x2 + y2 * y2) / 2;
	double _d = x1 * y2 - x2 * y1;
	double _x = a.x + (e1 * y2 - e2 * y1) / _d;
	double _y = a.y + (x1 * e2 - x2 * e1) / _d;
	return Point(_x, _y);
}

Circle min_circle_cover(Point *p, int n) {
	Point c = p[0]; double r = 0;
	for ( int i = 1; i < n; ++i) {
		if (sgn(dis_pp(c, p[i]) - r) <= 0) continue ;
		c = p[i], r = 0;
		for ( int j = 0; j < i; ++j) {
			if (sgn(dis_pp(c, p[j]) - r) <= 0) continue ;
			c.x = (p[i].x + p[j].x) / 2;
			c.y = (p[i].y + p[j].y) / 2;
			r = dis_pp(c, p[j]);
			for ( int k = 0; k < j; ++k) {
				if (sgn(dis_pp(c, p[k]) - r) <= 0) continue ;
				c = circumcenter(p[i], p[j], p[k]);
				r = dis_pp(c, p[k]);
			}
		}
	}
	return Circle(c, r);
}

int main(int argc, char const *argv[])
{
	int n;Circle c;
	while (~scanf("%d", &n) && n){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p[i].x, &p[i].y);
		}
		c = min_circle_cover(p,n);
		printf("%.2f %.2f %.2fn", c.c.x,c.c.y,c.r);
	}
	return 0;
}
```
	 