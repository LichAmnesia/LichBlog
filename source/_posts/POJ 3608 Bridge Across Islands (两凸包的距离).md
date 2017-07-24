---
title: POJ 3608 Bridge Across Islands (两凸包的距离)
tags:
  - ACM
date: 2014-03-29 11:51:07
---

```cpp
#include <iostream>
#include <cstring>
#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
# define MAXN 10010
const double EPS = 1e-8;
const double pi = 3.14159265359;
//const double PI = M_PI;
inline int sgn(double x) {
	return (x > EPS) - (x < -EPS);
}

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
Vector operator / (Vector a, double k) {
	return Vector(a.x / k, a.y / k);
}
bool operator == (const Point &a, const Point &b) {
	return sgn(a.x - b.x) == 0 && sgn(a.y - b.y) == 0;
}
bool operator < (const Point &a, const Point &b) {
	return a.y < b.y || (a.y == b.y && a.x < b.x);
}
inline double dot(Vector a, Vector b) {
	return a.x * b.x + a.y * b.y;
}
inline double cross(Vector a, Vector b) {
	return a.x * b.y - a.y * b.x;
}
inline double xmult(Point a, Point b, Point c) {
	return cross(b - a, c - a);
}
inline double length(Vector a) {
	return sqrt(dot(a, a));
}
inline double dis_pp(Point a, Point b) {
	return sqrt ((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
inline double dis_ps(Point p, Point a, Point b) {
	Vector v1 = b - a, v2 = p - a, v3 = p - b;	
	if (a == b) return length(p - a);
	if (sgn(dot(v1 , v2)) < 0) return length(v2);
	if (sgn(dot(v1 , v3)) > 0) return length(v3);
	return fabs(cross(v1 , v2)) / length(v1);
}
inline double dis_pl(Point p, Point a, Point b) {
	Vector v1 = b - a, v2 = p - a;
	return fabs(cross(v1 , v2)) / length(v1);
}
inline double dis_ss(Point a, Point b, Point c, Point d){
	return min(min(dis_ps(c,a,b),dis_ps(d,a,b)),min(dis_ps(a,c,d),dis_ps(b,c,d)));
}
Point p1[MAXN],p2[MAXN],ch1[MAXN],ch2[MAXN];

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

double minimum_distance(Point c1[],int n,Point c2[],int m)
{
	int a = 0, b = 0;
	for (int i = 0; i < n; i ++)
		if (sgn(c1[i].y - c1[a].y) < 0) a = i;
	for (int i = 0; i < m; i ++)
		if (sgn(c2[i].y - c2[b].y) > 0) b = i;
   	int p = a, q = b;
   	double res = dis_pp(c1[p],c2[q]);

   	do{
   		int np = (p + 1 == n ? 0 : p + 1), nq = (q + 1 == m ? 0 : q + 1);
   		int t = sgn(cross(c1[np] - c1[p], c2[q] - c2[nq]));

   		if (t > 0){//转第一个凸包
   			res = min(res,dis_ps(c2[q],c1[p],c1[np]));
   			p = np;
   		}else if (t < 0){//转第二个凸包
   			res = min(res,dis_ps(c1[p],c2[q],c2[nq]));
   			q = nq;
   		}else {
   			res = min(res,dis_ss(c1[p],c1[np],c2[q],c2[nq]));
   			p = np;
   			q = nq;
   		}

   	}while (p != a || q != b);
   	return res;

}

int main(int argc, char const *argv[])
{
	int n,m;
	while (~scanf("%d%d", &n, &m) && (n + m)){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p1[i].x, &p1[i].y);
		}
		n = convex_hull(ch1,p1,n);

		for (int i = 0; i < m; i ++){
			scanf("%lf%lf", &p2[i].x, &p2[i].y);
		}

		m = convex_hull(ch2,p2,m);
		printf("%.5fn",minimum_distance(ch1,n,ch2,m));
	}
	return 0;
}
```

	 