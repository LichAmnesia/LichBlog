---
title: ZOJ 3770 Ranking System
tags:
  - ACM
date: 2014-04-07 12:06:14
---

2014 浙大校赛 D 排序题

```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-06 14:17:00
 *
 *
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
struct Info{
	int i,id,day,va;
}p[2200];
int le[2200];
bool cmp(Info a,Info b){
	if (a.va == b.va){
		if (a.day == b.day){
			return a.id < b.id;
		}else return a.day < b.day;
	}else return a.va > b.va;
}
double val[10] = {0,0,0.4,0.3,0.2,0.07,0.03};
int main(){
	int t;
	cin >> t;
	int n,day,mon,year;
	while (t--){
		int nozero = 0;
		scanf("%d", &n);
		memset(le,-1,sizeof(le));
		for (int i = 0; i < n; i ++){
			scanf("%d", &p[i].id);
			scanf("%d/%d/%d", &year, &mon, &day);
			p[i].day = year * 10000 + mon * 100 + day;
			scanf("%d", &p[i].va);
			p[i].i = i;
			if (p[i].va > 0){ nozero ++;
				le[i] = 2;
			}
			if (p[i].va == 0) le[i] = 1;
		}
		sort(p,p + n,cmp);
		//for (int i = 0; i < n; i ++){
		//	cout << p[i].i << ' ' << p[i].id << ' '<< p[i].day<< ' ' << p[i].va << endl;
		//}
		int cnt = 0;
		for (int k = 6; k > 1; k --){
			int now = val[k] * nozero;
			while (now){
				le[p[cnt].i] = k;
				cnt ++;
				now --;
			}
		}
		for (int i = 0; i < n; i ++){
			printf("LV%dn",le[i]);
		}
	}
	return 0;	
}
```
	 

	 

	 

	 