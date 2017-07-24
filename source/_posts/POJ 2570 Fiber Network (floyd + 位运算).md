---
title: POJ 2570 Fiber Network (floyd + 位运算)
tags:
  - ACM
date: 2014-07-01 20:19:59
---

**题目大意**

一些公司共同拥有一个具有n个顶点的网格，给出了一些边，以及边上会有一些公司，问给出一个起点和重终点，求出这个路径经过的公司，就是每条边上都有的公司。


**解题思路**

很明显的传递闭包。稍微改改floyd就变成传递闭包了。可以解决图中两个点是否有路径可达。

```cpp
void Floyd(){
	for (int k = 1; k <= n; k ++)
		for (int i = 1; i <= n; i ++)
			for (int j = 1; j <= n; j ++){
				map[i][j] = map[i][j] | (map[i][k] & map[k][j]);
			}
}
```

现在题目还要求我们在转移图的情况的时候，还要传递一些其他的状态，于是可以考虑在map里面加入状态，就可以考虑进行位运算，把字符串压位存进去。

**代码**

```cpp
/* From: Lich_Amnesia
 * Time: 2014-07-01 16:14:45
 *
 * POJ 2570
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

#define maxn 222
int map[maxn][maxn];
int n;

void Floyd(){
	for (int k = 1; k <= n; k ++)
		for (int i = 1; i <= n; i ++)
			for (int j = 1; j <= n; j ++){
				map[i][j] = map[i][j] | (map[i][k] & map[k][j]);
			}
}

int main(){
	int u,v;
	char s[100];
	while (cin >> n){
		if (n == 0) break;
		memset(map,0,sizeof(map));
		while (scanf("%d%d", &u, &v)){
			if (u == 0 && v == 0) break;
			scanf("%s", s);
			//cout << s << endl;
			for (int i = 0; i < strlen(s); i ++){
				map[u][v] |= (1<<(s[i] - &#39;a&#39;));
			}
		}
		Floyd();
		while (scanf("%d%d", &u, &v)){
			if (u == 0 && v == 0) break;
			if (map[u][v]){
				for (int i = 0; i <= 26; i ++){
					if (map[u][v] & (1 << i)){
						printf("%c", &#39;a&#39; + i);
					}
				}
				puts("");
			}else {
				puts("-");
			}
		}
		puts("");
	}
	return 0;
}

```

