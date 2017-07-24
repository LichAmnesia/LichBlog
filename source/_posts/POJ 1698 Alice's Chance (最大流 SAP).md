---
title: "POJ 1698 Alice's Chance (最大流 SAP)"
tags:
  - ACM
date: 2014-02-03 16:17:08
---

一个源点s，向每部电影连边，容量为电影要拍的天数d

对于每部电影，向它能够拍摄的日子连边，容量为1，这些日子必须在这部电影的限期之内

加入一个汇点t，每个日子向t连边，容量为1，表示一天只能拍摄一部电影

最后判断一下最大流是否等于所有电影要拍的天数和即可。



用邻接矩阵建的图

```cpp
/* From: Lich_Amnesia
 * Time: 2014-02-03 11:00:14
 *
 * POJ 1698 SAP maxflow
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
typedef long long ll;
const int maxn = 400 + 10;
const int inf = 0x7ffffff;
struct SAP{
	int cap[maxn][maxn];//
	int flow[maxn][maxn];//流量网络
	int g[maxn][maxn];
	int n; //顶点数
	int h[maxn]; // 各顶点距离标号
	int vh[maxn];// 各高度顶点个数
	int source, sink;
	int mk[maxn];
	void init(int n){
		this->n = n;
		memset(cap, 0, sizeof(cap));
	}
	void addCap(int i, int j, int val){
		cap[i][j] = val;
	}
	int sap(const int idx, const int maxCap){
		if (idx == sink) return maxCap;
		int li = maxCap, d, minH = n;
		for (int i = 0; i < n; i ++){
			if (cap[idx][i] - flow[idx][i] > 0){ // 可行流
				if (h[idx] == h[i] + 1){
					d = sap(i, min(li, cap[idx][i] - flow[idx][i]));
					flow[idx][i] += d;
					flow[i][idx] -= d;
					li -= d;
					if (h[source] == n || li == 0) return maxCap - li;
				}		
				minH = min(minH, h[i] + 1);
			}
		}
		//如果没有允许弧
		if (li == maxCap){
			vh[h[idx]] --;
			vh[minH] ++;
			if (vh[h[idx]] == 0) h[source] == n;//一个常数优化
			h[idx] = minH;
		} 
		return maxCap - li;
	}
	int solve(int source, int sink){
		if (source == sink) return inf;
		this->sink = sink;
		this->source = source;
		memset(flow, 0, sizeof(flow));
		memset(h, 0, sizeof(h));//标号数组
		memset(vh, 0, sizeof(vh));
		int ans = 0;
		while (h[source] != n)
			ans += sap(source, inf);
		return ans;
	}

}mf;

int week[10];
int main(){
	int T;
	cin >> T;
	while (T--){
		int n,d,w;
		scanf("%d", &n);
		mf.init(401);
		int source = 0,sink = 400, sum = 0;
		for (int i = 1; i <= n; i ++){
			for (int j = 1; j <= 7; j ++){
				scanf("%d", &week[j]);
			}
			scanf("%d%d", &d, &w);
			sum += d;
			mf.addCap(source, i, d);
			for (int j = 1; j <= 7; j ++){
				if (week[j]){
					for (int k = 0; k < w; k ++){
						int id = n + k * 7 + j;
						mf.addCap(i, id, 1);
						mf.addCap(id, sink, 1);
					}
				}
			}
		}
		int maxflow = mf.solve(source, sink);
	//	cout << maxflow << &#39; &#39;  << sum << endl;
		if (maxflow == sum) puts("Yes");
		else puts("No");

	}
	return 0;
}

```
