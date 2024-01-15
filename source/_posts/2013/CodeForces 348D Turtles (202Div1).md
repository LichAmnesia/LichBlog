---
title: CodeForces 348D Turtles (202Div1)
tags:
  - ACM
date: 2013-09-30 09:21:30
---

如果不相交很好求，就是work函数动态规划就行了，可是相交，最多三个交点，也就是在两个人的路中有一个交点，把这种情况给删除掉，就是(1,2)走到了(N,M-1)和(2,1)走到了(N-1,M)的位置

```cpp
/* From: Lich_Amnesia
 * Time: 2013-09-29 21:48:22
 *
 * CF 202 Div1 D
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
int N,M;
ll mod = 1000000007;
char s[3100][3100];
ll f[2][3100][3100];
void work(int k,int x,int y){
	if (s[x][y] == '.') f[k][x][y] = 1;
	for (int i = x; i <= N; i++)
		for (int j = y; j <= M; j++)
			if (s[i][j] == &#39;.&#39; && (i!=x || j!=y)){
				f[k][i][j] = (f[k][i-1][j] + f[k][i][j-1]) % mod;
		}
}

int main(){
	scanf("%d%d", &N, &M);
	for (int i = 1; i <= N; i++)
		scanf("%s", s[i] + 1);
	work(0,1,2);work(1,2,1);
	ll ans = ( f[0][N-1][M]*f[1][N][M-1]%mod - 
		f[0][N][M-1]*f[1][N-1][M]%mod + mod ) % mod;

	//这样能够保证剪掉的都是不相交的
	cout << ans << endl;
	return 0;
}
```

	 