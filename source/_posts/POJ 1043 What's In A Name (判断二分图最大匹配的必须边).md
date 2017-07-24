---
title: "POJ 1043 What's In A Name? (判断二分图最大匹配的必须边)"
tags:
  - ACM
date: 2014-04-02 08:09:17
---

```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <set>
#include <map>
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
#define maxn 110

int x[maxn],y[maxn];
int g[maxn][maxn];
bool vis[maxn];
int zero,n,m,k,nx,ny;
 map <string, int> mp1;            // 用来保存用户名 
 map <string, int> mp2;            // 用来记录代号 
char str[100][100];
string str2[100];
set< int >cur;                    // set 的插入与消去，好好用，第一次实用 
pair< string, int >pair1[100];    // 20-21 解的保存，pair的第一次实用 
int os[100];
bool path(int u){
	for (int v = 1; v <= ny; v ++){
		if (g[u][v] && !vis[v]){
			vis[v] = 1;
			if (y[v] == -1 || path(y[v])){
				x[u] = v;
				y[v] = u;
				return true;
			}
		}
	}
	return false;
}

int MaxMatch(){
	int ans = 0;
	//if (zero == k) {puts("0");return;} 
	memset(x, -1, sizeof(x));
	memset(y, -1, sizeof(y));
	for (int i = 1; i <= nx; i ++){
		if (x[i] == -1){
			memset(vis, 0, sizeof(vis));
			if (path(i)){
				ans ++;
			}
		}
	}
	return ans;
}

int main(){
	int n;

	cin >> n;
	for (int i = 1; i <= n; i ++)
		for (int j = 1; j <= n; j ++) g[i][j] = 1;
	for (int i = 1; i <= n; i ++){
		scanf("%s",str[i]);
		mp1[str[i]] = i;
	}

	int cnt = 0;
	char sign[10],name[100];
	while (scanf("%s",sign) && sign[0] != &#39;Q&#39;){
		scanf("%s", name);
		if (sign[0] == &#39;E&#39;){

			if (mp2[name] == 0){
				mp2[name] = ++cnt;
				str2[cnt] = name;
			}
			int y = mp2[name];
			cur.insert(y);
		}else if (sign[0] == &#39;L&#39;){
			int y = mp2[name];
			cur.erase(y);
		}else {
			int x = mp1[name];

			for (int i = 1; i <= n; i ++){
				if (cur.find(i) == cur.end()){
					g[x][i] = 0;
				}
			}

		}
	}
	nx = ny = n;

	int mat = MaxMatch();
	//cout << mat << endl;
	for (int i = 1; i <= n; i ++){
		pair1[i] = mp(str2[i],i);
		os[i] = 0;
		for (int j = 1; j <= n; j ++){
			if (g[j][i]){
				g[j][i] = 0;
				int tmp = MaxMatch();
				//cout << tmp << endl;
				if (tmp != mat){
					os[i] = j;
				}
				g[j][i] = 1;
			}
		}
	}
	sort( pair1 + 1, pair1 + n +1 );    // 对解的排序 
	int i, j;
    for( i = 1; i <= n; i++ )
    {
		cout<< pair1[i].first << ":"; 
    	if( os[pair1[i].second] == 0 )
            cout<< "???" << endl; 
    	else 
            cout<< str[os[pair1[i].second]] << endl; 
     }
	return 0;
}
```

	 