---
title: POJ 2391 Ombrophobic Bovines (二分最大流+拆点+floyd)
tags:
  - ACM
date: 2014-07-06 09:14:49
---

### 题意

给出一些牛棚，开始牛棚边有一些牛，牛棚之间有路相连，走一条路会花费固定的时间。牛在牛棚边吃草，下雨时牛得躲进牛棚，每个牛棚容量有限。

求：在所有牛都能进牛棚时最少需要多少时间。

如果知道了时间time，则如果两个牛棚之间所需的最少时间<=time，每个牛棚拆成两点x1和x2。如果两个牛棚a和b之间可以相连,则ax1连ax2，容量为无穷（因为路是无限大的，可以容纳任意多的牛）。s->x1,容量为每个牛棚容量为牛棚的牛数量，x2->t，容量为每个牛棚的容量。

一定要把每个点拆成两个点的。如果直接连原图中的点，是不对的。举个例子:1->2->3, 边长度都为1，则1到3是2。如果枚举ans等于1是，会产生1->2,2->3合法，则最后1也可以到3了，这是错的。


```cpp
/* From: Lich_Amnesia
 * Time: 2014-07-05 14:59:19
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
typedef long long ll;
long long INF = 1e17;
int inf = 1e9;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define maxn 500
//点很容易开少！！！

struct Edge{
	int to,cap,flow;
	Edge(){}
	Edge(int a,int b,int c){
		to = a;
		cap = b;
		flow = c;
	}
};

struct Dinic{
	int n,m,s,t; // 结点数，边数（包括反向弧），源点编号，汇点编号
	vector<Edge> edg; // 边表 edg[e]和edg[e^1]互为反向弧
	vector<int> g[maxn];//邻接表，g[i][j]表示结点i的第j条边在e数组的序号
	bool vis[maxn];//bfs使用
	int d[maxn];//从起点到i的距离，相当于level数组
	int cur[maxn];//当前弧下标

	void init(int N){
		this->n = N;
		edg.clear();
		for (int i = 0; i <= n; i ++){
			g[i].clear();
		}
		memset(d,0,sizeof(d));
	}

	void addEdge(int from,int to,int cap){
		edg.pb(Edge(to,cap,0));
		edg.pb(Edge(from,0,0));
		m = edg.size();
		g[from].pb(m - 2);
		g[to].pb(m - 1);
	}

	bool bfs(){
		memset(vis,0,sizeof(vis));
		queue<int> q;
		q.push(s);
		d[s] = 0;
		vis[s] = 1;
		while (!q.empty()){
			int u = q.front();q.pop();
			for (int i = 0; i < g[u].size(); i ++){
				Edge& e = edg[g[u][i]];
				if (!vis[e.to] && e.cap > e.flow){ // 只考虑残量网络中的弧
					vis[e.to] = 1;
					d[e.to] = d[u] + 1;
					q.push(e.to);
				}
			}
		}
		return vis[t];
	}

	int dfs(int u,int a){
		if (u == t || a == 0) return a;
		int flow = 0, f;
		for (int& i = cur[u]; i < g[u].size(); i ++){//从上次考虑的弧
			Edge& e = edg[g[u][i]];
			if (d[u] + 1 == d[e.to] && 
					(f = dfs(e.to, min(a,e.cap - e.flow))) > 0){
				e.flow += f;
				edg[g[u][i]^1].flow -= f;
				flow += f;
				a -= f;
				if (a == 0) break;
			}
		}
		return flow;
	}

	int maxFlow(int s,int t){
		this->s = s;
		this->t = t;
		int flow = 0;
		while (bfs()){
			memset(cur, 0, sizeof(cur));
			flow += dfs(s, inf);
		}
		return flow;
	}
}G;

#define maxp 500
ll maps[maxp][maxp];
int n,m;
int c[maxp],w[maxp];
void floyd(){
	for (int k = 1; k <= n; k ++){
		for (int i = 1; i <= n; i ++){
			for (int j = 1; j <= n; j ++){
				if (maps[i][k] != INF && maps[k][j] != INF){
					maps[i][j] = min(maps[i][j], maps[i][k] + maps[k][j]);
				}
			}
		}
	}
}

int sum;
bool ok(ll mid){
	G.init(2 * n + 10);
	int st = 2 * n + 1,ed = 2 * n + 2;
	for (int i = 1; i <= n; i ++){
		G.addEdge(st, i, c[i]);
	}
	for (int i = 1; i <= n; i ++){
		G.addEdge(i + n, ed, w[i]);
	}
	for (int i = 1; i <= n; i ++){
		for (int j = 1; j <= n; j ++){
			if (maps[i][j] <= mid){
				G.addEdge(i, j + n, inf);
			}
		}
	}
	return sum == G.maxFlow(st,ed);
	//cout << "ret = " << ret << endl;
}

int main(){
	//cout << INF << endl;
	while (~scanf("%d%d", &n, &m)){
		sum = 0;
		for (int i = 1; i <= n; i ++){
			scanf("%d%d", &c[i], &w[i]);
			sum += c[i];
		}
		for (int i = 1; i <= n; i ++){
			for (int j = 1; j <= n; j ++){
				maps[i][j] = INF;
			}
		}
		//fill(maps, maps + (n + 2) * (n + 2), INF); 
		for (int i = 1; i <= n; i ++) maps[i][i] = 0;
		int u,v,len;
		ll le = 0,ri = 0;
		for (int i = 1; i <= m; i ++){
			scanf("%d%d%d", &u, &v, &len);
			ri += len;
			if (maps[u][v] > len) maps[u][v] = maps[v][u] = len;
		}
		floyd();
		/*for (int i = 1; i <= n; i ++){
			for (int j = 1; j <= n; j ++){
				cout << maps[i][j] << &#39; &#39;;
			}cout << endl;
		}*/	
		//cout << ri << endl;
		ll ans = -1;
		//ri += 1;
		while (le <= ri){
			ll mid = MID(le,ri);
			//cout << le << &#39; &#39; << mid << &#39; &#39; << ri << endl;
			if (ok(mid)){
				ri = mid - 1;
				ans = mid;
			}else {
				le = mid + 1;
			}
		}
		printf("%lldn", ans);
	}
	return 0;
}

```

