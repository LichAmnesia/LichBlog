---
title: HDU 4635 Strongly connected (2013多校第四场D)
tags:
  - ACM
date: 2013-08-14 11:21:59
---

题意：

给你一个有向图，问你最多能添加多少条边使得这个图依然不是强联通的。

做法：

1，求出图中的所有强连通分量

2，把上述的强连通分量缩成一个点。

3，问题现在变成问一个完全图，最少需要去除多少条边使得这个图不强联通，

那么肯定是去除所有强联通分量中含有点数最少的点的所有进边。

复制了一个模板，然后搞定了

```cpp
#include<iostream>
#include<cstring>
#include<cstdio>
using namespace std;
#define N 100050//点数
#define M 100050//边数

struct Edge {
    int v;
    int next;
};
Edge edge[M]; //边的集合
int node[N]; //顶点集合
int instack[N]; //标记是否在stack中
int stack[N];
int Belong[N]; //各顶点属于哪个强连通分量
int DFN[N]; //节点u搜索的序号(时间戳)
int LOW[N]; //u或u的子树能够追溯到的最早的栈中节点的序号(时间戳)
int n, m; //n：点的个数；m：边的条数
int cnt_edge; //边的计数器
int Index; //序号(时间戳)
int top;
int Bcnt; //有多少个强连通分量

void add_edge(int u, int v)//邻接表存储
{
    edge[cnt_edge].next = node[u];
    edge[cnt_edge].v = v;
    node[u] = cnt_edge++;
}

void tarjan(int u) {
    int i, j;
    int v;
    DFN[u] = LOW[u] = ++Index;
    instack[u] = true;
    stack[++top] = u;
    for (i = node[u]; i != -1; i = edge[i].next) {
        v = edge[i].v;
        if (!DFN[v])//如果点v没被访问
        {
            tarjan(v);
            if (LOW[v] < LOW[u])
                LOW[u] = LOW[v];
        } else//如果点v已经被访问过
            if (instack[v] && DFN[v] < LOW[u])
            LOW[u] = DFN[v];
    }
    if (DFN[u] == LOW[u]) {
        Bcnt++;
        do {
            j = stack[top--];
            instack[j] = false;
            Belong[j] = Bcnt;
        } while (j != u);
    }
}

void solve() {
    int i;
    top = Bcnt = Index = 0;
    memset(DFN, 0, sizeof (DFN));
    memset(LOW, 0, sizeof (LOW));
    for (i = 1; i <= n; i++)
        if (!DFN[i])
            tarjan(i);
}
int ru[N], chu[N],geshu[N];
int main() {
    int i, j, k, S, K;
    scanf("%d", &S);
    for (K = 1; K <= S; K++) {
        cnt_edge = 0;
        memset(node, -1, sizeof (node)); //记得清空
        scanf("%d%d", &n, &m);
        for (i = 1; i <= m; i++) {
            scanf("%d%d", &j, &k);
            add_edge(j, k);
        }
        solve();
        memset(ru,0,sizeof(ru));
        memset(chu,0,sizeof(chu));
        memset(geshu,0,sizeof(geshu));
        int max=0;
        for (i=1;i<=n;i++){
            geshu[Belong[i]]++;
            if(max<Belong[i])
                max=Belong[i];
            for(j=node[i];j!=-1;j=edge[j].next){
                if(Belong[i]!=Belong[edge[j].v]){
                    chu[Belong[i]]++;
                    ru[Belong[edge[j].v]]++;
                }
            }
        }
        if(max==1){
            printf("Case %d: -1n",K);
            continue;
        }
        int min=999999999;
        for(i=1;i<=max;i++){
            if(chu[i]==0||ru[i]==0){
                if(geshu[i]<min)
                    min=geshu[i];
            }
        }
        int sum;
        sum=n*(n-1);
        sum=sum-m-min*(n-min);
        printf("Case %d: %dn",K,sum);
    //    for (i = 1; i <= n; i++)
    //        printf("%d ", Belong[i]);
    }

}
```

	 