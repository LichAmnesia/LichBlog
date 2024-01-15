---
title: ZOJ Monthly, January 2014 F (模拟)
tags:
  - ACM
date: 2014-01-26 14:51:43
---

```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-26 12:57:00
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

const int INF = ~0u>>1;
typedef pair <int,int> P;
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define pb push_back
#define mp make_pair
#define print() cout<<"--------"<<endl
#define EPS 1e-10
bool check(int a,int b,int c){
	if (a && b && c && a + b > c && a + c > b && b + c > a)
		return 1;
	else return 0;
}

double solve(int a,int b,int c){
	double p = (a+b+c+0.0)/2;
	return sqrt(p * (p-a) * (p-b) * (p-c));
}

double ans = 0.0;
int a,b,c,cnt;
bool vis[12];
int num[4][3];
void dfs(int i){
	if (i > 3){
		if (check(a,b,c))
			ans = max(ans,solve(a,b,c));
		return;
	} 
	for (int j = 0; j < 6; j ++){
		if (j < 3){
			switch(j){
				case 0:a += num[i][1] + num[i][2]; dfs(i+1); a-=(num[i][1] + num[i][2]); break;
				case 1:b += num[i][1] + num[i][2]; dfs(i+1); b-=(num[i][1] + num[i][2]);break;
				case 2:c += num[i][1] + num[i][2]; dfs(i+1); c-=(num[i][1] + num[i][2]);break;
			}	
		}
		if (!vis[j]){	
			if (j == 3){
				vis[j] = 1;
				a += num[i][1];
				c += num[i][2];
				dfs(i+1);
				a -= num[i][1];
				c -= num[i][2];
				vis[j] = 0;

				vis[j] = 1;
				a += num[i][2];
				c += num[i][1];
				dfs(i+1);
				a -= num[i][2];
				c -= num[i][1];
				vis[j] = 0;
			}	
			else if (j == 4){
				vis[j] = 1;
				a += num[i][1];
				b += num[i][2];
				dfs(i+1);
				a -= num[i][1];
				b -= num[i][2];
				vis[j] = 0;

				vis[j] = 1;
				a += num[i][2];
				b += num[i][1];
				dfs(i+1);
				a -= num[i][2];
				b -= num[i][1];
				vis[j] = 0;
			}	
			else if (j == 5){
				vis[j] = 1;
				b += num[i][1];
				c += num[i][2];
				dfs(i+1);
				b -= num[i][1];
				c -= num[i][2];
				vis[j] = 0;

				vis[j] = 1;
				b += num[i][2];
				c += num[i][1];
				dfs(i+1);
				b -= num[i][2];
				c -= num[i][1];
				vis[j] = 0;
			}	
		}
	}
}

int main(){
	while (~scanf("%d%d",&num[1][1], &num[1][2])){
		scanf("%d%d",&num[2][1], &num[2][2]);
		scanf("%d%d",&num[3][1], &num[3][2]);
		ans = 0.0;a=b=c=0;
		memset(vis,0,sizeof(vis));
		dfs(1);
		printf("%.9fn",ans);
	}
	return 0;
}
```

	 