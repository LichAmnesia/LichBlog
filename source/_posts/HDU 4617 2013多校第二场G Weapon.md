---
title: HDU 4617 2013多校第二场G Weapon
tags:
  - ACM
date: 2013-07-27 22:00:51
---

学习了一下三维的计算几何的直线距离，注意平行是另外的情况

```cpp
/* HDU 4617 多校第二场 三维几何题 G
 * 告诉你圆心以及圆上的两个点，圆柱是无限长的
 * 也就是说求圆柱中心的那个直线，枚举每个圆柱之间的距离
 * 如果小于
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define maxn 33
#define EPS 1e-8
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
struct point{	
	double x,y,z;
	point (){}
	point (double x,double y,double z):x(x),y(y),z(z){}
	point operator + (point a) {return point(x+a.x,y+a.y,z+a.z);}
	point operator - (point a) {return point(x-a.x,y-a.y,z-a.z);}
	point operator * (double a) {return point(x*a,y*a,z*a);}
	point operator / (double a) {return point(x/a,y/a,z/a);}
}pt[maxn][3],p[maxn],nor[maxn];
double r[maxn];
inline int dcmp(double x){ return (x>EPS)-(x<-EPS);}
inline double dot(point a,point b) {return a.x*b.x+a.y*b.y+a.z*b.z;}
inline point cross(point a,point b) {
	return point(a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x);}
inline double veclen(point x) {return sqrt(dot(x,x));} 
inline double ptdis(point a,point b){return veclen(a-b);}
inline point vecunit(point x) {return x/veclen(x);}
bool lldis(point p1,point u,point p2,point v,double &s){//判断空间两条直线是否平行，平行则输出0，否则～
	double b=dot(u,u)*dot(v,v)-dot(u,v)*dot(u,v);
	if(dcmp(b)==0) return false;
	double a=dot(u,v)*dot(v,p1-p2)-dot(v,v)*dot(u,p1-p2);
	s=a/b;
	return true;
}
double p21(point p,point a,point b){//求平行直线距离
	point v1= b - a ,v2 =p -a;
	return veclen(cross(v1,v2))/veclen(v1);
}
int main(){
	int T,n;
	scanf("%d",&T);
	while(T--&&scanf("%d",&n))
	{
		for(int i=0;i<n;i++)
			for(int j=0;j<3;j++){
				scanf("%lf%lf%lf",&pt[i][j].x,&pt[i][j].y,&pt[i][j].z);
				p[i]=pt[i][0];
				r[i]=veclen(pt[i][0]-pt[i][1]);
				nor[i]=cross(pt[i][1]-pt[i][0],pt[i][2]-pt[i][0]);
			}
		double ans=1e10;
		bool touch=0;
		for(int i=0;i<n&&!touch;i++)
			for(int j=i+1;j<n&&!touch;j++)
			{
				double s,t,dis;
				if(lldis(p[i],nor[i],p[j],nor[j],s)){
					lldis(p[j],nor[j],p[i],nor[i],t);
					point a=p[i]+nor[i]*s;
					point b=p[j]+nor[j]*t;
					dis=ptdis(a,b);
				}else dis=p21(p[i],p[j],p[j]+nor[j]);
				if(dis<=r[i]+r[j]) touch=1;
				ans=min(ans,dis-r[i]-r[j]);

			}
		if(touch) cout<<"Lucky"<<endl;
		else printf("%.2fn",ans);
	}
	return 0;
}
```

 