---
title: 'Codeforces Round #216 (Div. 2) C Valera and Elections'
tags:
  - ACM
date: 2013-11-30 17:05:12
---

想象成一个树，然后有一个递归关系,

1.如果这个点src的子树中有一个含有2号边那就不用管直接return 1表示这个以src为根的子树已经判定完毕

2.如果这个点src正好是叶子节点那么就返回[src][pre]这条边的值，1表示需要修理，并且存下这个src必须得需要它这个点

3.如果这个src的子树中没有含有2号点的证明src下面的树中没有需要修理的。

两种情况：第一个是src和pre这条边是2号边那就return 1，表示这个点src是答案中的。第二个是如果src和pre的是1号边那么就return 0,不需要修理

```cpp
#include <iostream>
#include <algorithm>
#include <map>
#include <cstdio>
#include <set>
#include <cstring>
#include <vector>
using namespace std;

struct edge{
	int u,t;
}tmp;

#define maxn 100010
vector <edge> ve[maxn];
bool vis[maxn];
int ans[maxn],ansnum = 0;

bool solve(int src, int pre, int flag){
	vis[src] = 1;
	int cnt = 0;
	int ret = -1;
	int sumret = 0;
	for (int i = 0; i < ve[src].size(); i ++){
		//if (ve[src][i].u == pre) yeziret = ve[src][i].t ;
		if (!vis[ve[src][i].u]){
			ret = solve(ve[src][i].u,src,ve[src][i].t);
			sumret += ret;
		}
		else cnt ++;
		if (i == ve[src].size() - 1 && sumret == 0 && flag == 1 && cnt != ve[src].size()){
			ans[ansnum ++] = src;
			return flag;
		}
		if (i == ve[src].size() - 1 && cnt != ve[src].size()) return sumret;
	}
	if (cnt == ve[src].size()){
		if (flag) ans[ansnum ++] = src;
		return flag;
	}
}

int main(int argc, char const *argv[])
{
	int n,u,v,t;
	memset(vis,0,sizeof(vis));
	scanf("%d", &n);
	for (int i = 0; i < n - 1; i++){
		scanf("%d%d%d", &u, &v, &t);
		tmp.u = v;
		tmp.t = t - 1;
		ve[u].push_back(tmp);
		tmp.u = u;
		tmp.t = t - 1;
		ve[v].push_back(tmp);
	}
	solve(1,1,0);
	printf("%dn", ansnum);
	for (int i = 0; i < ansnum; i++)
		printf("%d ", ans[i]);
	return 0;
}
```
	 