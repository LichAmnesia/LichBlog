---
title: 'ZOJ 2167 || POJ 1981 Circle and Points'
tags:
  - ACM
date: 2014-02-24 11:25:31
---

先上一个O(n^3)的算法

也就是枚举两个距离小于2的点，用它们来固定一个圆，当然对称圆也要算，再枚举所有点，看是不是在这个圆内，当然这题这样就可以水过，不过这并不是最优的。

注意ans至少为1个.

```cpp

/* From: Lich_Amnesia
 * Time: 2014-02-24 08:56:31
 *
 * POJ 1981
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
#define maxn 310
#define EPS 1e-8
typedef struct Point{
	double x,y;
	Point(double x = 0, double y = 0):x(x),y(y){}
}Vector;
int n;
struct Circle{
	Point c;
	double r;
	Circle(Point c = Point(), double r = 0):c(c),r(r){}
};

bool cmp(Point a,Point b){
	return a.x == b.x ? a.y < b.y : a.x < b.x;
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

inline double dis_pp(Point a,Point b){
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

Point p[maxn];

inline int solve(Point a, Point b){
	Point mid = Point((a.x + b.x) / 2, (a.y + b.y) / 2);
	double angle = atan2(a.y - b.y, a.x - b.x) + acos(-1.0)/2;//圆直径的倾斜角
	double len = sqrt(1 - dis_pp(a,b)/ 4);
	mid.x += cos(angle) * len;
	mid.y += sin(angle) * len;
	int ret = 0;
	for (int i = 0; i < n; i ++){
		if (dis_pp(mid,p[i]) <= 1 + EPS) ++ret;
	}
	return ret;
}

int main(){ 
	while (~scanf("%d",&n) && n){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p[i].x, &p[i].y);
		}
		sort(p, p + n, cmp);
		int ans = 1;
		for (int i = 0; i < n; i ++){
			for (int j = i + 1; j < n && (p[j].x - p[i].x <= 2); j ++){
				if (dis_pp(p[i],p[j]) <= 4 + EPS){
					ans = max(ans, max(solve(p[i],p[j]),solve(p[j],p[i])));
				}
			}
		}
		printf("%dn",ans);
	}
	return 0;
}
```
	 

还有一个O(n^2 log n)的算法，这种方法其实也简单，先枚举一个点，再枚举所有与它距离小于2的点（保证两圆相交），这样就可以求出相交弧，对于每一个圆把所有弧保存下来（只保存弧上的那两个端点一个设为-1一个设为1），并离散化（把端点存到数组里面，然后按照极角排序），这样从极角最小的开始扫，直到扫到端点对数达到这个圆上的弧的个数为止，每次扫描从1开始，标记这个弧开始了sum++，然后直到扫到这个弧结束扫到-1，这时sum--，相当于区间最大和。

就能算出覆盖次数最多的一段弧，这个次数也就是答案了，具体看代码吧

```cpp

/* From: Lich_Amnesia
 * Time: 2014-02-24 08:56:31
 *
 * POJ 1981 & ZOJ 2167
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
#define maxn 310
#define EPS 1e-8
typedef struct Point{
	double x,y;
	Point(double x = 0, double y = 0):x(x),y(y){}
}Vector;
int n;
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
			if (dis_pp(p[i], p[j]) > 2 + EPS) continue; //也许不需要开根
			Point a,b;
			intersection_cc(Circle(p[i],1), Circle(p[j],1), a, b);
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
	while (~scanf("%d",&n) && n){
		for (int i = 0; i < n; i ++){
			scanf("%lf%lf", &p[i].x, &p[i].y);
		}

		printf("%dn",solve(n));
	}
	return 0;
}
```

	 