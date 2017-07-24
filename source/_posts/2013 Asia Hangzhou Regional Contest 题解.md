---
title: 2013 Asia Hangzhou Regional Contest 题解
tags:
  - ACM
date: 2014-11-03 13:03:53
---

自己圈的一场比赛,没想到这场等于有三道搜索,A题dfs,B题bfs+dfs,I题记忆化dfs,也是醉了

##### **A题:**

不要考虑什么先把能放的放下,反而导致编码复杂度非常高,因为只有15点,直接搜,把这个点作为中心点枚举四个方向就行.一点剪枝都不需要.


```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>

using namespace std;
char s[220][220];
int ma[222][222];
int now[222][222];
#define maxn 101
struct Node{
    int x,y;
}p[maxn];
int pnum;
int tmpans;

void dfs(int id,int step,bool flag){
    if (id == pnum){
        for (int i = 0; i < pnum; i ++){
            if (now[p[i].x][p[i].y] == 0){
                return;
            }
        }
        tmpans = min(tmpans,step);
        return ;
    }
    int x = p[id].x, y = p[id].y;
    int t1 = now[x][y],t2 = now[x][y + 1], t3 = now[x - 1][y], t4 = now[x][y - 1],t5 = now[x + 1][y];
    if (ma[x][y] == 1 && ma[x - 1][y] != 0 && ma[x][y + 1] != 0){
        if (t1 == 1 && t2 == 1 && t3 == 1){
        }else {
            now[x][y] = 1;
            now[x][y + 1] = 1;
            now[x - 1][y] = 1;
            dfs(id + 1,step + 1, flag);
            now[x][y] = t1;
            now[x][y + 1] = t2;
            now[x - 1][y] = t3;

        }
    }
    if (!flag && ma[x][y] == 1 && ma[x - 1][y] != 0 && ma[x][y - 1] != 0){
        if (t1 == 1 && t3 == 1 && t4 == 1){
        }else {
            now[x][y] = 1;
            now[x][y - 1] = 1;
            now[x - 1][y] = 1;
            dfs(id + 1,step + 1, 1);
            now[x][y] = t1;
            now[x][y - 1] = t4;
            now[x - 1][y] = t3;

        }
    }
    if (!flag && ma[x][y] == 1 && ma[x + 1][y] != 0 && ma[x][y + 1] != 0){
        if (t1 == 1 && t5 == 1 && t2 == 1){
        }else {
            now[x][y] = 1;
            now[x][y + 1] = 1;
            now[x + 1][y] = 1;
            dfs(id + 1,step + 1, 1);
            now[x][y] = t1;
            now[x][y + 1] = t2;
            now[x + 1][y] = t5;

        }
    }
    if (!flag && ma[x][y] == 1 && ma[x + 1][y] != 0 && ma[x][y - 1] != 0){
        if (t1 == 1 && t4 == 1 && t5 == 1){
        }else {
            now[x][y] = 1;
            now[x][y - 1] = 1;
            now[x + 1][y] = 1;
            dfs(id + 1,step + 1, flag);
            now[x][y] = t1;
            now[x][y - 1] = t4;
            now[x + 1][y] = t5;

        }
    }
    dfs(id + 1,step, flag);
}

int main(){
    int n,m;
    while (~scanf("%d%d", &n, &m) && (n + m)){
        memset(ma, -1, sizeof(ma));
        memset(now, -1, sizeof(now));
        for (int i = 0; i < n; i ++){
            scanf("%s",s[i]);
            for (int  j = 0; j < m; j ++){
                if (s[i][j] == '#'){
                    ma[i + 1][j + 1] = 0;
                    now[i + 1][j + 1] = -1;
                }else {
                    ma[i + 1][j + 1] = 1;
                    now[i + 1][j + 1] = 0;
                }
            }   
        }

        pnum = 0;
        tmpans = 999999;
        for (int i = 1; i <= n; i ++){
            for (int j = 1; j <= m; j ++){
                if (ma[i][j] == 1){
                    p[pnum].x = i;
                    p[pnum ++].y = j;
                }           
            }
        }
        dfs(0,0,0);
        printf("%dn",tmpans == 999999? -1 : tmpans);           
    }
    return 0;
}
```

 

* * *

 

##### **B题:**

先bfs找出所有的点对的距离然后存下来,然后dfs找出所有的序列.

 

 

* * *

 

##### **C题:**

只要找到[i][j]对应的四个点就行了.

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>

using namespace std;

int a[33][33],b[33][33];
int main(){
    int n;
    while (~scanf("%d", &n) && n){
        for (int i = 0; i < n; i ++){
            for (int j = 0; j < n; j ++){
                scanf("%d", &a[i][j]);
            }
        }
        for (int i = 0; i < n; i ++){
            for (int j = 0; j < n; j ++){
                scanf("%d", &b[i][j]);
            }
        }
        int cnt[4] = {0,0,0,0};
        for (int i = 0; i < n; i ++){
            for (int j = 0; j < n; j ++){
                if (a[i][j] == b[i][j]) cnt[0] ++;
                if (a[i][j] == b[j][n - i - 1]) cnt[1] ++;
                if (a[i][j] == b[n - i - 1][n - j - 1]) cnt[2] ++;
                if (a[i][j] == b[n - j - 1][i]) cnt[3] ++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 4; i ++){
            ans = max(ans, cnt[i]);
        }
        printf("%dn",ans);
    }
    return 0;
}
```

 

* * *

 

##### **F题:**

比较繁琐的模拟,就是要考虑这个点有没有气(旁边有没有空格了).要用并查集+map(set).

 

* * *

##### **I题:**

状态压缩DP+记忆化搜索

注意预处理所有的状态能得到的分数,A和B他们都是走最优策略可以一起考虑区别就是dp数组记录的时候的区别,要dfs的区别出来,一个是先手一个是后手

```cpp
#include <iostream>
#include <cstring>
#include <cstdio>
#include <algorithm>

using namespace std;

int num[33],bag[22][10];
int sc[1 << 21],b,g,s;
int dp[1 << 21];
void init(int maxStatus){
    //cout << g << endl;
    int tmp[20] = {0};
    memset(tmp, 0, sizeof(tmp));
    for (int i = 0; i < maxStatus; i ++){
        for (int j = 0; j < b; j ++){
            if (i & (1 << j)){
                for (int k = 1; k <= g; k ++){
                    tmp[k] += bag[j][k];
                }
            }
        }
        int ret = 0;
        for (int j = 1; j <= g; j ++){
        //  cout << tmp[j] << ' ' ;
            ret += tmp[j] / s;
            tmp[j] = 0;
        }
    //  cout <<g <<  i << ' ' << ret << endl;
        sc[i] = ret;

    }
}

int dfs(int stat, int remain){
    if (dp[stat] != -1) return dp[stat];
    int ntstat, cha, ret = 0;
    for (int i = 0; i < b; i ++){
        if ((stat & (1 << i)) == 0){
            ntstat = stat | (1 << i);
            cha = sc[ntstat] - sc[stat];
            if (cha){
                ret = max(ret, dfs(ntstat, remain - cha) + cha);
            }else {
                ret = max(ret, remain - dfs(ntstat, remain));
            }
        }
    }
    dp[stat] = ret;
    return ret;
}

int main(){
    while (~scanf("%d%d%d", &g, &b, &s)){
        if (g + b + s == 0) break;
        //cout << g << b << s << endl;
        memset(bag, 0, sizeof(bag));
        memset(num, 0, sizeof(num));
        memset(sc, 0, sizeof(sc));
        memset(dp, -1, sizeof(dp));
        int k,t;
        for (int i = 0; i < b; i ++){
            scanf("%d", &k);
            //cout << "k = " << k;
            for (int j = 0; j < k; j ++){
                scanf("%d", &t);
                bag[i][t] ++;
                num[t] ++;
                //cout << t ;
            }
            //cout << endl;
        }

        int sum = 0;
        for (int i = 1; i <= g; i ++){
            sum += num[i] / s;
        }
        int maxSt = 1 << b;
        //cout << "maxSt" << maxSt << endl;
        init(maxSt);
        dp[maxSt - 1] = 0;
        int ans = dfs(0, sum);
        //cout << sum << ' ' << ans << endl;
        printf("%dn", ans - (sum - ans));
    }
}
```

 