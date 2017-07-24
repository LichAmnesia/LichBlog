---
title: POJ 1502 MPI Maelstrom
tags:
  - ACM
date: 2013-08-18 10:27:54
---

```cpp
/* floyd + 字符串变数字 
 * 看input的里面就行了
 * 题意就是求第一个点到各个点最短路径中的最大值。
 * 学到直接把字符串改为整型，长整型：
 * atof（）             将字符串转换成浮点数值 
 * atoi()                 将字符串转换成整数值 
 * atol()                 将字符串转换成长整数值;
 * strtod()             将字符串转换成双精度型数值 
 * strtol()             将字符串转换成长型数值 
 * 注意把g[i][i] 作为inf虽然应该是0，但floyd进行dp的时候用inf不影响结果但是
 * 会少做很多次
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
#define maxn 105

int n, g[maxn][maxn];
void floyd(){
	FOR(k,1,n)
		FOR(i,1,n)
			FOR(j,1,n)
			if(g[i][k] != INF && g[k][j] != INF){
				g[i][j] = min(g[i][j],g[i][k]+g[k][j]);
			}
}

int main(){
	char s[10];
	scanf("%d", &n);
	getchar();
	FOR(i,1,n) g[i][i] = INF;//用inf更加快，0会慢一点
	FOR(i,2,n)
		FOR(j,1,i-1){
			scanf("%s", s);
			if (s[0] == 'x') g[i][j] = g[j][i] = INF;
			else {
				g[i][j] = atoi(s);
				g[j][i] = g[i][j];
			}
		}
	floyd();
	int ans = 0;
	FOR(i,1,n) ans = max(ans,g[1][i]);
	printf("%dn", ans);
	return 0;
}
```

	 