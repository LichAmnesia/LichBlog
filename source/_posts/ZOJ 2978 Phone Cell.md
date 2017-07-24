---
title: ZOJ 2978 Phone Cell
tags:
  - ACM
date: 2014-02-24 11:27:35
---

同2167，只不过这次不是单位圆覆盖了，是给定半径了

```cpp
/* From: Lich_Amnesia
 * Time: 2014-02-24 08:56:31
 *
 * ZOJ 2978
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
#define maxn 2010
#define EPS 1e-8
typedef struct Point{
	double x,y;
	Point(double x = 0, double y = 0):x(x),y(y){}
}Vector;
int n;double R;
struct Circle{
	Point c;
	double r;
	Circle(Point c = Point(), double r = 0):c(c),r(r){}
};
struct Node{
	double angle;
	int id,flag;
}node[maxn];

bool cmp(Node a,Node b){
	return a.angle == b.angle ? a.flag > b.flag : a.angle < b.angle;
}

Vector operator + (Vector a, Vector b) {
	return Vector(a.x + b.x, a.y + b.y);
}
Vector operator - (Vector a, Vector b) {
	return Vector(a.x - b.x, a.y - b.y);
}
Vector operator * (Vector a, double k) {
	return Vector(a.x * k, a.y * k);
}

inline double cross(Vector a, Vector b) {
	return a.x * b.y - a.y * b.x;
}
inline double dis_pp(Point a,Point b){
	return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

Point intersection_ll(Point a, Vector i, Point b, Vector j) {
	Vector k = a - b;
	double t = cross(j, k) / cross(i, j);
	return a + i * t;
}

// 计算直线与圆的交点保证直线与圆有交点,
// 计算线段与圆的交点可用这个函数后判点是否在线段上
void intersection_cl(Circle c, Point p, Vector v, Point &p1 , Point &p2) {
	Point l1 = p, l2 = p + v;
	Vector u = Vector(-v.y, v.x);
	Point p0 = intersection_ll(p, v, c.c, u);
	double d1 = dis_pp(p0 , c.c);
	double d2 = dis_pp(l1 , l2);
	double t = sqrt(c.r * c.r - d1 * d1)/ d2;
	p1.x = p0.x + (l2.x - l1.x) * t;
	p1.y = p0.y + (l2.y - l1.y) * t;
	p2.x = p0.x - (l2.x - l1.x) * t;
	p2.y = p0.y - (l2.y - l1.y) * t;
}

// pre -req: 保证圆与圆有交点, 圆心不重合
void intersection_cc(Circle c1 , Circle c2 , Point& p1 , Point& p2){
	double d = dis_pp(c1.c, c2.c);
	double t = (1.0 + (c1.r * c1.r - c2.r * c2.r) / d / d) / 2;
	Point u = Point(c1.c.x + (c2.c.x - c1.c.x) * t, c1.c.y + (c2.c.y - c1.c.y) * t);
	Point v = Point(u.x + c1.c.y - c2.c.y, u.y - c1.c.x + c2.c.x);
	intersection_cl(c1 , u, v - u, p1 , p2);
}

Point p[maxn];

inline int solve(int n){
	int ret = 1,cnt = 0;
	bool vis[maxn];
	for (int i = 0; i < n; i ++){
		cnt = 0;
		for (int j = 0; j < n; j ++){
			if (i == j) continue;
			if (dis_pp(p[i], p[j]) > 2 * R + EPS) continue; //也许不需要开根
			Point a,b;
			intersection_cc(Circle(p[i],R), Circle(p[j],R), a, b);
			node[cnt].id = j;
			node[cnt].flag = -1;
			node[cnt ++].angle = atan2(a.y - p[i].y, a.x - p[i].x);

			node[cnt].id = j;
			node[cnt].flag = 1;
			node[cnt ++].angle = atan2(b.y - p[i].y, b.x - p[i].x);
		}

		if (cnt == 0) continue;

		sort(node, node + cnt, cmp);
		memset(vis,0,sizeof(vis));

		int s = 0,sum = 1,k = 0;//s表示弧的对数
		while (s < cnt / 2){
			if (node[k].flag > 0){
				sum ++;
				ret = max(ret,sum);
				vis[node[k].id] = 1; // 标记进入
			}else {
				if (vis[node[k].id]){//遇到出去的点，并且之前已经进去过，
									//那么走过了一个完整的弧，标记下
					s ++;
					sum --;
				}
			}
			k ++;//保持k在0 到cnt-1
			k %= cnt;

		}

	}
	return ret;
}

int main(){ 
	while (~scanf("%d%lf",&n,&R) && n){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p[i].x, &p[i].y);
		}
		int ans = solve(n);

		printf("It is possible to cover %d points.n",ans );
	}
	return 0;
}

```
	 