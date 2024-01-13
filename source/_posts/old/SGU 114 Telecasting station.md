---
title: SGU 114 Telecasting station
tags:
  - ACM
date: 2014-01-06 20:15:05
---

带权中位数，百度百科可以看[http://baike.baidu.com/view/1209446.htm](http://baike.baidu.com/view/1209446.htm)

```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-06 20:04:54
 *
 * SGU 114 带权中位数
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
#define print() cout<<"&mdash;&mdash;&ndash;"<<endl

#define maxn 15100
struct node{
    double pos;
    int num;
}p[maxn];
bool cmp(node a,node b){
    return a.pos < b.pos;
}

int main(){
    int n;
    int tot = 0;
    cin >> n;
    for (int i = 0; i < n; i ++){
        scanf("%lf%d",&p[i].pos, &p[i].num);
        tot += p[i].num;
    }
    sort(p, p + n, cmp);
    ++tot /= 2;
    int t = 0;
    for (int i = 0; i < n; i ++){
        t += p[i].num;
        if (t >= tot) {
            printf("%.5fn", p[i].pos);
            break;
        } 
    }
    return 0;
}
```	 