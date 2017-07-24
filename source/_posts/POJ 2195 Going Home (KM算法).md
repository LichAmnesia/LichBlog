---
title: POJ 2195 Going Home (KM算法)
tags:
  - ACM
date: 2014-01-26 11:16:42
---

**[二分图带权匹配与最佳匹配]**

什么是二分图的带权匹配？二分图的带权匹配就是求出一个匹配集合，使得集合中边的权值之和最大或最小。而二分图的最佳匹配则一定为**完备匹配**，在此基础上，才要求匹配的边权值之和最大或最小。二分图的**带权匹配与最佳匹配不等价，也不互相包含**。

我们可以使用KM算法实现求二分图的最佳匹配。方法我不再赘述，可以参考[tianyi的讲解](http://cuitianyi.com/blog/%E6%B1%82%E6%9C%80%E5%A4%A7%E6%9D%83%E4%BA%8C%E5%88%86%E5%8C%B9%E9%85%8D%E7%9A%84km%E7%AE%97%E6%B3%95/)。KM算法可以实现为O(N^3)。

**[KM算法的几种转化]**

KM算法是求最大权完备匹配，如果要求最小权完备匹配怎么办？方法很简单，只需将所有的边权值取其相反数，求最大权完备匹配，匹配的值再取相反数即可。

KM算法的运行要求是**必须存在一个完备匹配**，如果求一个最大权匹配(不一定完备)该如何办？依然很简单，把不存在的边权值赋为0。

KM算法求得的最大权匹配是**边权值和**最大，如果我想要**边权之积**最大，又怎样转化？还是不难办到，每条边权取<span style="text-decoration: underline;">自然对数</span>，然后求最大和权匹配，求得的结果a再算出e^a就是最大积匹配。至于精度问题则没有更好的办法了。

以上转自:[https://www.byvoid.com/blog/match-km](https://www.byvoid.com/blog/match-km)

* * *

```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-25 17:00:42
 *
 * POJ 2195 KM 算法
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
#define INT_MAX 1000000000
#define maxn 150
int w[maxn][maxn],n,m; //边集
int lenx,leny; // X顶点个数
int lx[maxn],ly[maxn]; //顶标
int slack[maxn]; //松弛操作
int le[maxn]; // Y集合点所匹配的X顶点标号
char maps[maxn][maxn];
bool S[maxn],T[maxn];// S集合 T集合

bool match(int u){
	S[u] = 1;
	for (int i = 1; i <= leny; i ++){
		if (!T[i] && lx[u] + ly[i] == w[u][i]){
			//找到相等子图
			T[i] = 1;
			if (!le[i] || match(le[i])){
				le[i] = u;
				return true;
			}
		}else if (slack[i] > lx[u] + ly[i] - w[u][i]){
			slack[i] = lx[u] + ly[i] - w[u][i];
		} //修改松弛值
	}
	return false;
}

void update(){ // 根据Delta修改顶标集合
	int d = INT_MAX;
	for (int j = 1; j <= leny; j ++)
		if (!T[j]) d = min(d,slack[j]);
	for (int j = 1; j <= lenx; j ++)
		if (S[j]) lx[j] -= d;
	for (int j = 1; j <= leny; j ++)
		if (T[j]) ly[j] += d;
}

int KM(){
	int ans = 0;
	for (int i = 1; i <= lenx; i ++) {
		lx[i] = -INT_MAX;
		for (int j = 1; j <= leny; j ++){
			lx[i] = max(lx[i],w[i][j]);
		}
	}
	memset(ly,0,sizeof(ly));
	memset(le,0,sizeof(le));

	//搜索增广路
	for (int i = 1;i <= lenx; i ++){
		for (int j = 1; j <= leny; j ++)
			slack[j] = INT_MAX;
		while (1){
			memset(S,0,sizeof(S));memset(T,0,sizeof(T));
			//找到I对应的增广路,找到便不再找
			//未找到便修正
			if (match(i)) break;
			else update();
		}
	}

	for (int i = 1; i <= leny; i ++)
		if (le[i]) ans += w[le[i]][i];
	return -ans;
}

int main(){
	while (~scanf("%d%d", &n, &m) && (n + m)){
		lenx = 0,leny = 0;
		for (int i = 0; i < n; i ++){
			scanf("%s", maps[i]);
			for (int j = 0; j < m; j ++){
				if (maps[i][j] == &#39;H&#39;){
					lx[++ lenx] = i,slack[lenx] = j;	
				}else if (maps[i][j] == &#39;m&#39;){
					ly[++ leny] = i,le[leny] = j;
				}
			}
		}
		for (int i = 1;i <= lenx; i ++){
			for (int j = 1; j <= leny; j ++){
				w[i][j] = -iabs(lx[i] - ly[j]) 
					- iabs(slack[i] - le[j]);
			}
		}

		printf("%dn",KM());
	}
	return 0;
}
``` 