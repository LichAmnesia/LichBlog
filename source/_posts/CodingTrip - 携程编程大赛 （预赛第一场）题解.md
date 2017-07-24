---
title: CodingTrip - 携程编程大赛 （预赛第一场）题解
tags:
  - ACM
date: 2014-04-10 21:12:18
---

A题是POJ1091

B题是POJ1141

 

### A

```cpp
//假设卡片上标号分别A1,A2,...,An,M，跳蚤跳对应号的次数分别是X1,X2,...,Xn,跳M个单位长度的次数是Xn-1,那么要满足一直条件只需满足方程Xn+1A1X1+A2X2+...+AnXn+M X^(n+1)=1有解，即（A1,A2,...,An,M）=1,接下来对M分解，然后排除共因子不是1的情况即可。

#include<iostream>
#include<cstdio>
#include<cstdlib>
#define LL long long
using namespace std;

const int N=64;
int bo[N],t;
void divide(int m){
    int i;
    t=0;
    for(i=2;i*i<=m;i++){
        if(m%i==0){
            t++;
            bo[t]=i;
            while(m%i==0) m/=i;
        }
    }
    if(m!=1){
        t++;
        bo[t]=m;
    }
}
LL quick_multi(LL a,LL b){//普通求幂
    LL ans=1;
    while(b){
        ans*=a;
        b--;
    }
    return ans;
}

LL ans,tmp;
int a[N],m,n;

void dfs(int b,int ct,int c){
    int i,x;
    if(ct==c){
        x=m;
        for(i=1;i<=c;i++)
            x/=a[i];
        tmp+=quick_multi(x,n);
        return;
    }
    for(i=b+1;i<=t;i++){
        a[ct+1]=bo[i];
        dfs(i,ct+1,c);
    }
}

int main(){
    int T,i;
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&m);
        ans=t=0;
        divide(m);
        for(i=1;i<=t;i++){
            tmp=0;
            dfs(0,0,i);
            if(i&1) ans+=tmp;
            else ans-=tmp;
        }
        ans=quick_multi(m,n)-ans;
        printf("%I64dn",ans);
    }
    return 0;
}
```

### B

```cpp
#include<stdio.h>
#include<string.h>
#include<algorithm>
using namespace std;
#define inf 9831892
int dp[105][105];
int main()
{
    int n,i,j,k,p;
    char s[105];
    scanf("%d",&n);
    while(n--)
    {
        getchar();
        scanf("%s",s);
        int l=strlen(s);
        memset(dp,0,sizeof(dp));
        for(i=0;i<l;i++) dp[i][i]=1;
        for(p=1;p<l;p++)
        {
            for(i=0;i<l-p;i++)
            {
                j=i+p;
                dp[i][j]=inf;
                if((s[i]=='('&&s[j]==')')||(s[i]=='['&&s[j]==']&#39;))
                    dp[i][j]=min(dp[i][j],dp[i+1][j-1]);//如果匹配，取中间需要的括号；
                else if(s[i]=='['||s[i]==&#39;(&#39;)
                    dp[i][j]=min(dp[i][j],dp[i+1][j])+1;//如果是左括号，取其i+1~j位置需要括号最少的个数；
                else if(s[i]==')'||s[i]==']&#39;)
                    dp[i][j]=min(dp[i][j],dp[i][j-1])+1;//如果是右括号，取其i~j-1位置需要括号最少的个数；
                for(k=i;k<j;k++)
                    dp[i][j]=min(dp[i][j],dp[i][k]+dp[k+1][j]);//分割求和比较最少需要括号的个数；
            }
        }
        printf("%dn",dp[0][l-1]);
    }
}
```


### C

```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-10 19:56:22
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
#define pi 3.14159265358979323846
typedef struct  
{  
    double x;  
    double y;  
    double z;  
}air;
struct Edge{
    int u,v;
    double d;
}ed[50500];
air p[110];
int num;
#define EPS 1e-8

int pa[110];
bool cmp(Edge a,Edge b){
    return a.d  < b.d;
}

int find(int x){
    return (pa[x] == x) ? x: pa[x] = find(pa[x]);
}

double Kruskal(int n)
{
    double total = 0;
    //对n个顶点初始化并查集
    for(int i = 0;i < n;i++) 
        pa[i] = i;
    //初始化序号记录集
    sort(ed,ed + num,cmp);
    for(int i = 0;i < num;i++)//对每一条边来考查
    {
        int ru = find(ed[i].u);
        int rv = find(ed[i].v);
        if(ru != rv)
        {
            total += ed[i].d;
            pa[rv] = ru;
        } 
     }
     return total;
}

int main(){
    int T,n;
    scanf("%d", &T);
    double D,L;
    while (T--){
        scanf("%lf", &D);
        scanf("%lf", &L);
        scanf("%d", &n);
        double R = D / 2.0;
        double l,r;
        for (int i = 0; i < n; i ++){
            scanf("%lf %lf", &l, &r);
            l = l * pi/180.0;  
            r = r * pi/180.0;  
            //p[i].x = R*cos(l)*cos(r);  
            //p[i].y = R*cos(l)*sin(r);  
            //p[i].z = R*sin(l);  
            p[i].x = l;
            p[i].y = r;
        }
        num = 0;
        double c;
        for (int i = 0; i < n; i ++){
            for (int j = 0; j < n; j ++){
                if (i == j) continue;
                c = sin(p[i].x) * sin(p[j].x) + cos(p[i].x) * cos(p[j].x)
                    * cos(p[i].y - p[j].y);
                ed[num].u = i;
                ed[num].v = j;
                ed[num++].d = fabs(R * acos(c));
                //ed[num++].d = dis(p[i],p[j]);
            }
        }
        double ans = Kruskal(n);
        //acerr<<ans<<endl;
        if (ans - EPS < L) puts("Y");
        else puts("N");
    }
    return 0;
}
```

### D

```cpp
/* From: Lich_Amnesia
 * Time: 2014-04-10 19:36:37
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

unsigned long long fac[80];

void init(){
    fac[0] = 1;
    for (int i = 1; i < 64; i ++){
        fac[i] = fac[i - 1] * 2;
    }

}
typedef unsigned long long ull;
ull num[100];

bool cmp(ull a,ull b){
    return a < b;
}
int main(){
    int T;
    cin >> T;
    char s[100];
    ull n,m;
    init();
    while (T--){
        int cnt = 0;
        cin >> m >> n;
        ull now = m;int flag = 0;
        for (int i = 0; i < n; i ++){
            if (now & fac[n - 1]) flag = 1;
            else flag = 0;
            now &= (fac[n - 1] - 1);
            now <<= 1;
            now |= flag;
            num[i] = now;
        }
        sort(num,num + n,cmp);
        for (int i = 0; i < n; i ++){
            s[i] = (num[i] & 1) + &#39;0&#39;;
        }
        s[n] = 0;
        printf("%sn",s);
    }
    return 0;
}
```

	 