---
title: HDU 4637 Rain on your Fat brother (2013多校第四场F)
tags:
  - ACM
date: 2013-08-13 16:23:51
---
```cpp
/* HDU 4637 
 * 我们可以把雨滴看做静止不动，然后maze（这题的那个人）
 * 就是往左上方运动就可以了，计算出maze能跑到的最远的点，
 * 然后就是求起点和终点所构成的线段与每个雨滴交的时间，
 * 注意题目说每个雨滴可能会相交，所以我们对于每个雨滴算出相交的区间，
 * 然后对这些区间进行合并并且计算答案。
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define EPS 1e-8
#define pii pair <double,double>
#define X first
#define Y second 
#define pb push_back
using namespace std;

inline int dcmp(double x){
	if (iabs(x) < EPS) return 0;
	else return (x > 0)? 1 : -1;
}
struct point{
	double x,y;
	point(){}
	point(double x,double y):x(x),y(y){}
	double operator *(const point &u)const{
		return x*u.x+y*u.y;
	}
	point operator - (const point &u)const{
		return point(x-u.x,y-u.y);
	}
	point operator + (const point &u)const{
		return point(x+u.x,y+u.y);
	}
	point operator * (const double &u)const{
		return point(x * u,y * u);
	}
}s,e;
int cases,n;
double v1,v2,v,t,T,x,ans;
inline double dou(double x){
	return x * x;
}
inline double cross(point o,point a,point b){
	return (a.x-o.x)*(b.y-o.y) - (a.y-o.y)*(b.x-o.x);
} 
inline double dis(point a,point b){
	return sqrt(dou(a.x-b.x)+dou(a.y-b.y));
}
inline bool SegIntersect(point a,point b,point l,point r){//两条线段相交 不考虑共线
	return cross(a,b,l) * cross(a,b,r) < EPS && 
		cross(l,r,a) * cross(l,r,b) < EPS;
}
inline double intersect(point a,point b,point l,point r){//两直线相交求交点的x
	double ret = a.x;
	double t = ((a.x-l.x) * (l.y-r.y) - (a.y-l.y) * (l.x-r.x)) /
			((a.x-b.x) * (l.y - r.y) - (a.y-b.y)*(l.x-r.x));
	return ret + (b.x-a.x)*t;
}
vector <double> vec;
vector <pii> res;
struct rain{
	point o,a,b,c;
	double r,h;
	void readin(){
		scanf("%lf%lf%lf%lf", &o.x, &o.y, &r, &h);
		a = o;b = o;c = o;
		a.x -= r;b.x += r;
		c.y += h;
	}
	bool inside(point p){//点是否再雨滴里面
		return (dis(o,p) - EPS < r && p.y - EPS < o.y)
			|| (p.y - EPS > o.y && cross(c,a,p) > -EPS 
				&& cross(c,p,b) > -EPS );
	}

	void intersectC(){//与雨滴半园的交点 求 交点
		point b = s, d = e - s;
        double A = d * d;
        double B = (b - o) * d * 2;
        double C = (b - o) * (b - o) - r * r;
        double dlt = B * B - 4 * A * C;
        if (dlt < -EPS) return;

        if (dlt < EPS) dlt = 0;		//消除dlt负数零的情况
        else dlt = sqrt(dlt);

        double t = (-B - dlt) / (2 * A);
        point tp = b + d * t;
        if (tp.x - EPS < s.x && tp.x + EPS > e.x && tp.y - EPS < o.y)	//因为是半圆，注意把没用的点判掉
            vec.pb(tp.x);

        t = (-B + dlt) / (2 * A);
        tp = b + d * t;
        if (tp.x - EPS < s.x && tp.x + EPS > e.x && tp.y - EPS < o.y)
            vec.pb(tp.x);
    }

	void intersectT(){//与雨滴三角形的交点求交点
		double x;
		if (SegIntersect(a,c,s,e)){
			x = intersect(a,c,s,e);
			if (x - EPS > e.x && x + EPS < s.x)
				vec.pb(x);
		}
		if (SegIntersect(b,c,s,e)){
			x = intersect(b,c,s,e);
			if (x - EPS > e.x && x + EPS < s.x)
				vec.pb(x);
		}
	}

	void solve(){
		vec.clear();
		intersectC();
		intersectT();
		if (inside(s)) vec.pb(s.x);
		if (inside(e)) vec.pb(e.x);
		sort(vec.begin(),vec.end());
		int cnt = unique(vec.begin(),vec.end()) - vec.begin();
		if (cnt >= 2)//取最大最小的两个点作为这个区域的时间段的两个端点
			res.pb(make_pair(vec[0],vec[cnt-1]));
	}
}p;

int main(){
	int _,cases=0;
	scanf("%d", &_);
	while (_--){
		scanf("%lf%lf%lf%lf%lf", &v1, &v2, &v, &t, &x);
		s.x = x; s.y = 0;
		T = v1 * t / (v2 - v1) + t;
		e.x = x - T*v1; e.y = T*v;
		scanf("%d", &n);
		res.clear();
		ans = 0;
		for (int i = 0; i < n; ++i){
			p.readin();
			p.solve();
		}
		sort(res.begin(),res.end());
		double r = e.x;
		int sz = res.size();
		for (int i = 0; i < sz; ++i){
			if (res[i].X - EPS < r && r - EPS < res[i].Y){
				ans += res[i].Y - r;
				r = res[i].Y;
			}
			else if (r - EPS < res[i].X){
				ans += res[i].Y - res[i].X;
				r = res[i].Y;
			}
		}
		printf("Case %d: %.4fn", ++cases, ans / v1);
	}
	return 0;
}

```
	 