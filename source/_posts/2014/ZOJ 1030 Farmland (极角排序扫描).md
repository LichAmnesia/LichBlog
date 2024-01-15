---
title: ZOJ 1030 Farmland (极角排序扫描)
tags:
  - ACM
date: 2014-03-03 20:19:12
---

注意判定是逆时针旋转扫描边就行（这个还不是很清楚，check函数）

每次走的时候选择最左的

```cpp
/* From: Lich_Amnesia
 * Time: 2014-03-03 19:19:41
 *
 * zoj 1030 每次走时选离当前边最左的走
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
#define maxn 300
const double PI = acos(-1.0);
const double EPS = 1e-10;
vector<pair<double,int> > g[maxn];

int k,T,d,u,v,Len,n;
int ans;double x[maxn],y[maxn];int mark[maxn][maxn];

bool check(double a,double b){
	if (b > a + EPS) return b + EPS < a + PI;
	else return b + EPS < a - PI;
}

void dfs(int u,int v){
	vector<pair<double,int> >::iterator it;
	for (it = g[v].begin(); it->second != u; it ++);
	double w = it->first;
	if (it == g[v].begin()) it = --g[v].end();
	else it --;

	if (mark[v][it->second] == -1){
		mark[v][it->second] = mark[u][v] + 1;
		dfs(v, it->second);
	}else {
		if (mark[v][it->second] != -2 &&
			mark[u][v] - mark[v][it->second] + 1 == Len &&
			check(it->first,w))
			ans ++;
	}
	mark[u][v] = -2;
}

int main(){
	cin >> T;
	while (T--){
		scanf("%d", &n);
		for (int i = 1; i <= n; i ++) g[i].clear();
		for (int i = 1; i <= n; i ++){
			scanf("%d", &u);
			scanf("%lf%lf", &x[u], &y[u]);
			scanf("%d", &d);
			for (int j = 0; j < d; j ++){
				scanf("%d", &v);
				g[u].pb(mp(0,v));
			}
		}
		vector<pair<double,int> >::iterator it;
		scanf("%d", &Len);
		for (int i = 1; i <= n; i ++){
			for (it = g[i].begin(); it != g[i].end(); it++){
				it->first = atan2(y[it->second] - y[i],x[it->second] - x[i]);
			}
			sort(g[i].begin(),g[i].end());
		}
		ans = 0;
		memset(mark, -1, sizeof(mark));
		for (int i = 1; i <= n; i ++){
			for (it = g[i].begin(); it != g[i].end(); it ++){
				if (mark[i][it->second] == -1){
					mark[i][it->second] = 0;
					dfs(i,it->second);
				}
			}
		}
		printf("%dn",ans);
	}
	return 0;
}
```
