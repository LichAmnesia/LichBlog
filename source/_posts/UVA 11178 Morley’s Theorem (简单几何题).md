---
title: UVA 11178 Morley’s Theorem (简单几何题)
tags:
  - ACM
date: 2014-02-09 14:52:10
---

实在是太久没写几何题了调试了快一个小时～～～郁闷

简单的计算就行了

```cpp

/* From: Lich_Amnesia
 * Time: 2014-02-09 13:55:35
 *
 * UVA 11178
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <set>
#include <vector>
using namespace std;

const int INF = ~0u>>1;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define EPS 1e-8
typedef struct Point {
	double x,y;
	Point(double x = 0, double y = 0):x(x),y(y){}
	void read_point(){
		scanf("%lf%lf", &x, &y);
	}
}Vector;

struct Line {
	Point p;
	Vector v;
	double a;
	Line (Point p = Point(),Vector v = Vector(1,0)):p(p),v(v){
		a = atan2(v.y, v.x);
	}
	bool operator < (const Line &u) const { return a < u.a; }
};

Vector operator + (Vector A, Vector B){
	return Vector(A.x + B.x, A.y + B.y);
}
Vector operator - (Vector A, Vector B){
	return Vector(A.x - B.x, A.y - B.y);
}
Vector operator * (Vector A, double k){
	return Vector(A.x * k, A.y * k);
}

inline double cross(Vector A, Vector B){
	return A.x * B.y - A.y * B.x;
}

double Dot(Vector A, Vector B){
	return	A.x * B.x + A.y * B.y;
}

double Length(Vector A){
	return sqrt(Dot(A,A));
}

double Angle(Vector A, Vector B){
	return acos(Dot(A, B) / Length(A) / Length(B));
}

inline Vector Rotate(Vector A, double rad){
	return Vector(A.x * cos(rad) - A.y * sin(rad), 
			A.x * sin(rad) + A.y * cos(rad));
}

inline Point intersection_ll(Line a,Line b){
	Vector u = a.p - b.p;
	double t = cross(b.v, u) / cross(a.v, b.v);
	//cout << a.v.x << &#39; &#39; << a.v.y << endl;
	return a.p + a.v * t;
}

Point getD(Point A, Point B, Point C){
	Vector v1 = C - B;
	double a1 = Angle(A - B, v1);
	//cout << a1 << endl;
	v1 = Rotate(v1,a1 / 3);
	Line l1 = Line(B,v1); 

	Vector v2 = B - C;
	double a2 = Angle(A - C, v2);
	v2 = Rotate(v2,-a2 / 3);
	Line l2 = Line(C,v2);
//	cout << l2.p.x << &#39; &#39; << l2.v.y << endl;	
	return intersection_ll(l1,l2);
}

int main(){
	int t;
	cin >> t;
	Point A,B,C,D,E,F;
	while (t --){
		A.read_point();
		B.read_point();
		C.read_point();
		D = getD(A,B,C);
		E = getD(B,C,A);
		F = getD(C,A,B);
		printf("%.6lf %.6lf %.6lf %.6lf %.6lf %.6lfn",D.x, D.y, E.x, E.y, F.x, F.y);
	}
	return 0;
}
```

	 