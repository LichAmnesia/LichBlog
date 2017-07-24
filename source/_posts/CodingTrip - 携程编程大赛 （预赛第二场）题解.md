---
title: CodingTrip - 携程编程大赛 （预赛第二场）题解
tags:
  - ACM
date: 2014-04-11 20:59:01
---

A POJ 1182 食物链的

D POJ 1740 男人八题
 

### A

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
using namespace std;
#define maxn 50010
int parent[maxn],dis[maxn];
int n;
void init()
{
    for(int i=0;i<=n;i++)
    {
        parent[i]=i;
        dis[i]=0;
    }
}

int find(int x)
{
    if(parent[x]==x) return x;
    int tmp=find(parent[x]);
    dis[x]=(dis[x]+dis[parent[x]]+3)%3;
    return parent[x]=tmp;
}

void Union(int R1,int R2,int d)
{
    int r1=find(R1),r2=find(R2);
    parent[r2]=r1;
    dis[r2]=(dis[R1]-d+3-dis[R2])%3;
    //dis[R1]=(dis[R2]+d)%3;
}

int main(){
    int k,a,b,d,A,B;
    int T;
    scanf("%d",&T);
    while (T--){
        scanf("%d%d", &n, &k);
        int ans=0;
        init();
        for(int i=0;i<k;i++)
        {
            scanf("%d%d%d",&d,&a,&b);
            if(a>n||b>n) {ans++;continue;}
            if(a==b&&d==2) {ans++;continue;}
            A=find(a);
            B=find(b);
            d--;
            if(A==B){
                if(d==0&&dis[a]!=dis[b])
                    ans++;
                if(d==1&&(dis[a]-dis[b]+3)%3!=1)
                    ans++;
            }
            else{
                Union(a,b,d);
            }
        }
        printf("%dn",ans);
    }
    return 0;
}
```

	 

### B

```cpp
//906MS水过
//好多地方可以优化比如数组大小最大1600/2基本就够了
//其实是可以二维的

#include <iostream>
#include <stdio.h>
#include <algorithm>
#include <cmath>
using namespace std;

inline int f(int a,int b,int c){
	double p = (a +b+c)/2.0;
	return (int)(100.0*sqrt(p*(p-a)*(p-b)*(p-c)));
}

inline bool check(int a,int b,int c){
	if (a + b > c && a + c > b && b + c > a) return true;
	else return false; 
}
int ans = 0;
int n,num[45],to[45];
void dfs(int id,int a,int b,int c){
	if (id == n) {
		if (check(a,b,c)) {
			ans = max(ans,f(a,b,c));
		}
		return;
	}
	if (a + to[n - 1] - to[id] + b + num[id] < c) return;
	if (a + to[n - 1] - to[id] + c + num[id] < b) return;
	if (c + to[n - 1] - to[id] + b + num[id] < a) return;
	if (a > to[n - 1] / 2) return;
	if (b > to[n - 1] / 2) return;
	if (c > to[n - 1] / 2) return;
 	dfs(id + 1,num[id] + a, b, c);
	dfs(id + 1,a, num[id] + b, c);
	dfs(id + 1,a, b, num[id] + c);
}

int dp[2][1655][1655];
int main()
{
	while (~scanf("%d",&n) && n){
		ans = -1;
		for (int i = 1; i <= n; i ++){
			scanf("%d", &num[i]);
			if (i == 0) to[0] = num[0];
			else to[i] = to[i - 1] + num[i];
		}
		sort(num,num + n);
		//dfs(0,0,0,0);

		memset(dp,-1,sizeof(dp));
		dp[0][0][0] = 0;
		for (int i = 1; i <= n; i ++){
			for (int j = 0; j <= to[i]; j ++){
				for (int k = 0; k <= to[i]; k ++){
					if (j - num[i] >= 0){
						if (dp[(i + 1) % 2][j - num[i]][k] != -1){
							if (check(j,k,to[i] - j - k))
								dp[i % 2][j][k] = max(dp[i % 2][j][k],f(j,k,to[i]-j-k));
							else dp[i % 2][j][k] = max(0,dp[i % 2][j][k]);
						}
					}
					if (k - num[i] >= 0){
						if (dp[(i + 1) % 2][j][k - num[i]] != -1){
							if (check(j,k,to[i] - j - k))
								dp[i % 2][j][k] = max(dp[i % 2][j][k],f(j,k,to[i]-j-k));
							else dp[i % 2][j][k] = max(0,dp[i % 2][j][k]);
						}
					}
					if (to[i] - j - k - num[i] >= 0){
						if (dp[(i + 1) % 2][j][k] != -1){
							if (check(j,k,to[i] - j - k))
								dp[i % 2][j][k] = max(dp[i % 2][j][k],f(j,k,to[i]-j-k));
							else dp[i % 2][j][k] = max(0,dp[i % 2][j][k]);
						}
					}
				}
			}
		}
		for (int i = 0; i <= to[n]; i ++)
			for (int j = 0; j <= to[n]; j ++){
				ans = max(dp[n % 2][i][j],ans);
			}
		printf("%dn", ans == 0? -1:ans );
	}
	return 0;
}
```

### C

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdio>
using namespace std;
#define maxn 1010
struct Info{
    int x1,x2,y1,y2,r,g,b;
}p[maxn];

int main(int argc, char const *argv[])
{
    int x,y,n,m;
    while (~scanf("%d%d", &n, &m)){
        for (int i = 0; i < n; i ++){
            scanf("%d%d%d%d%d%d%d",&p[i].x1,&p[i].y1,&p[i].x2,&p[i].y2
                ,&p[i].r,&p[i].g,&p[i].b);
        }

        while(m--){
            scanf("%d%d", &x, &y);
            int r = 255,g = 255,b = 255    ;
            for (int i = n - 1; i >= 0; i --){
                if (p[i].x1 <= x && x <= p[i].x2 && p[i].y1 <= y && y <= p[i].y2){
                    r = p[i].r;
                    g = p[i].g;
                    b = p[i].b;
                    break;
                }
            }
            printf("%d %d %dn", r, g ,b);
        }

    }
    return 0;
}
```

### D

```cpp
#include <iostream>
#include <stdio.h>
#include <algorithm>
using namespace std;

int main()
{
int a[20],n;
    while(~scanf("%d",&n)&&n)
    {
        int k=0;
        for(int i=0;i<n;i++)
        {
            scanf("%d",&a[i]);
        }
        sort(a,a+n);
        for(int i=0;i<n;i+=2)
        if(a[i]==a[i+1]) k++;
        int j=n-2*k;
        if(j==0) printf("Losen");
        else printf("Winn");
    }
    return 0;
}
```

	 