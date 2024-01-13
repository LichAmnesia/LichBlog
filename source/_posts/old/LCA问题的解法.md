---
title: LCA问题的解法
date: 2014-08-18 16:18:41
tags:
    - DataStructure
---

lca问题主要有两种解法，一种是基于二分搜索的算法，一种是把问题转化为RMQ问题来解决的。

* * *

**算法一:**
1.首先假设求lca(u,v)的话，不妨设v的depth比较大，那么就是说v先向上走depth[v] - depth[u]步，这样depth[u] == depth[v]。
2.有一种可能就是现在u，v已经在一个点了，那就不用管了。否则的话，u和v每次同步的向上走一个步长，直到走到同一个点为止。

上面的算法都需要每次向上走一个步长，这个步长的确定类似于parent[u]，不过现在的变成了parent[k][u]，这个表示从u点开始向上走2^k步到达的点，比如说parent[0][u]就相当于u的父亲节点，parent[1][u]这个点就是parent[0][u]这个点再向上走一步，也就是parent[0][parent[0][u]]。
对于这个k，我们进行二分搜索复杂度在logn。首先得预处理出来pa数组。
这样这个算法的复杂度就出来了。预处理是O(nlogn)，而每次查询lca的复杂度是O(logn)。

一个大概的的板子:
```cpp
vector <int> ve[maxn];
int root;
int pa[maxlog][maxn]; //向上走2^k步到达的节点（超过根设为-1）
int dep[maxn];  //节点深度，从0开始

void dfs(int u, int p, int d){
    pa[0][u] = p;
    dep[u] = d;
    for (int i = 0; i < ve[u].size(); i ++){
        if (ve[u][i] != p) dfs(ve[u][i], u, d + 1);
    }
}

void init(){
    //memset(pa, -1, sizeof(pa));
    //预处理出pa[0]和dep数组
    dfs(root, -1, 0);
    //预处理pa数组
    for (int k = 0; k + 1 < maxlog; k ++){
        for (int i = 1; i <= n; i ++){
            if (pa[k][i] < 0) pa[k + 1][i] = -1;
            else pa[k + 1][i] = pa[k][pa[k][i]];
        }
    }
}

int lca(int u, int v){
    //让u和v先到达同一深度
    if (dep[u] > dep[v]) swap(u, v);
    for (int k = 0; k < maxlog; k ++){
        if ((dep[v] - dep[u]) >> k & 1){
            v = pa[k][v];
        }
    }
    if (u == v) return u;
    //二分搜索计算lca
    for (int k = maxlog - 1; k >= 0; k --){
        if (pa[k][u] != pa[k][v]){
            u = pa[k][u];
            v = pa[k][v];
        }
    }   
    return pa[0][u];
}
```

* * *

 

**算法二:**
<span style="color: #2c3e50;">首先定义：LCA(u,v)就是访问u之后到访问v之前所经过的顶点中距离根最近的那个。</span>

* * *

 

 

## 例题：

### POJ 1470

题意：
求出所有的lca(u,v)后看每个点出现几次。

思路：
1.就是直接上板子的题目很简单。
2.关键是求root，要算每个点的入度，入度为0便是root

代码：

```cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <cstring>
using namespace std;
int n,m;
#define maxn 4010
#define maxlog 13
vector <int> ve[maxn];
int ans[maxn];
int ru[maxn];
int root;
int pa[maxlog][maxn];
int dep[maxn];
void dfs(int u, int p, int d){
    pa[0][u] = p;
    dep[u] = d;
    for (int i = 0; i < ve[u].size(); i ++){
        if (ve[u][i] != p) dfs(ve[u][i], u, d + 1);
    }
}
void init(){
    //memset(pa, -1, sizeof(pa));
    dfs(root, -1, 0);
    for (int k = 0; k + 1 < maxlog; k ++){
        for (int i = 1; i <= n; i ++){
            if (pa[k][i] < 0) pa[k + 1][i] = -1;
            else pa[k + 1][i] = pa[k][pa[k][i]];
        }
    }
}
int lca(int u, int v){
    if (dep[u] > dep[v]) swap(u, v);
    for (int k = 0; k < maxlog; k ++){
        if ((dep[v] - dep[u]) >> k & 1){
            v = pa[k][v];
        }
    }
    if (u == v) return u;
    //二分搜索计算lca
    for (int k = maxlog - 1; k >= 0; k --){
        if (pa[k][u] != pa[k][v]){
            u = pa[k][u];
            v = pa[k][v];
        }
    }   
    return pa[0][u];
}
int main(){
    while (~scanf("%d", &n)){
        memset(ans, 0, sizeof(ans));
        memset(ru, 0, sizeof(ru));
        int u,pnum,v;
        for (int i = 1; i <= n; i ++){
            scanf("%d:(%d)", &u, &pnum);
            ve[u].clear();
            for (int j = 0; j < pnum; j ++){
                scanf("%d", &v);
                ve[u].push_back(v);
                ru[v] ++;
            }
        }
        for (int i = 1; i <= n; i++){
            if (ru[i] == 0) {
                root = i;
                break;
            }
        }
        init();
        scanf("%d", &m);
        char c;
        for (int i = 0; i < m; i ++){
            while(~scanf("%c", &c)){
                if (c == '('){
                    scanf("%d %d)", &u, &v);
                    ans[lca(u,v)] ++; 
                    break;
                }
            }
        }
        for (int i = 1; i <= n; i ++){
            if (ans[i] > 0){
                printf("%d:%dn", i, ans[i]);
            }
        }
    }
    return 0;
}
```
 

### POJ 1986

题意：
求出lca(u,v)的同时算上这个路径上的len之和。

思路：
1.就是直接上板子的题目很简单，要加上一个dp[k][u]表示从u点向上走2^k的路径长度，这样处理的时候注意一点。
2.root随便设一个点不会改变路径的。

代码：

```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <vector>
using namespace std;
struct Info{
    int v,len;
    Info(int a,int b){
        v = a;
        len = b;
    }
};
#define maxn 100100
#define maxlogv 20
vector <Info> ve[maxn];
int n,m;
int pa[maxlogv][maxn];
int dep[maxn];
int dp[maxlogv][maxn];
void dfs(int u, int p, int d){
    pa[0][u] = p;
    dep[u] = d;
    for (int i = 0; i < ve[u].size(); i ++){
        if (ve[u][i].v != p){
            dp[0][ve[u][i].v] = ve[u][i].len;
            dfs(ve[u][i].v, u, d + 1);
        }
    }
}
void init(){
    memset(dp, 0, sizeof(dp));
    dfs(1, -1, 0);
    for (int k = 0; k + 1 < maxlogv; k ++){
        for (int v = 1; v <= n; v ++){
            if (pa[k][v] < 0) {
                pa[k + 1][v] = -1;
                dp[k + 1][v] = dp[k][v];
            }else {
                pa[k + 1][v] = pa[k][pa[k][v]];
                dp[k + 1][v] = dp[k][v] + dp[k][pa[k][v]];
            }
        }
    }
}
int lca(int u,int v){
    int ret = 0;
    if (dep[u] > dep[v]) swap(u, v);
    for (int k = 0; k < maxlogv; k ++){
        if ((dep[v] - dep[u]) >> k & 1){
            ret += dp[k][v];
            v = pa[k][v];
        }
    }
    if (u == v) return ret;
    for (int k = maxlogv; k >= 0; k --){
        if (pa[k][u] != pa[k][v]){
            ret += dp[k][u];
            ret += dp[k][v];
            u = pa[k][u];
            v = pa[k][v];
        }
    }
    //return pa[0][u];
    return ret + dp[0][u] + dp[0][v];
}
int main(){
    char s[100];
    int u,v,len;
    while (~scanf("%d%d", &n, &m)){
        for (int i = 1; i <= n; i ++){
            ve[i].clear();
        }
        for (int i = 1; i <= m; i ++){
            scanf("%d%d%d%s", &u, &v, &len, s);
            ve[u].push_back(Info(v,len));
            ve[v].push_back(Info(u,len));
        }
        init();
        int k;
        scanf("%d", &k);
        for (int i = 0; i < k; i ++){
            scanf("%d%d", &u, &v);
            printf("%dn", lca(u,v));
        }
    }
    return 0;
}
```
 

----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info