---
title: ZOJ 3769 Diablo III
tags:
  - ACM
date: 2014-04-08 14:42:33
---

 分组背包，finger先n^2预处理出来

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
using namespace std;

char name[][100]={"Head", "Shoulder", "Neck", "Torso", "Hand", "Wrist", "Waist", 
"Legs", "Feet", "Shield", "Weapon", "Two-Handed", "Finger"};
int num[15],d[15][310],t[15][310],dp[15][50010];
char s[100];
int main(int argc, char const *argv[])
{
    int T,n,m;
    cin >> T;
    while (T--){
        memset(num,0,sizeof(num));
        cin >> n >> m;
        for (int i = 0; i < n; i ++){
            scanf("%s", s);
            int j;
            for (j = 0; ;j ++){
                if (strcmp(s,name[j]) == 0) break;
            }
            j ++;
            num[j] ++;
            scanf("%d%d", &d[j][num[j]], &t[j][num[j]]);
        }
        memset(dp,-1,sizeof(dp));
        dp[0][0] = 0;
        //注意每次都是从0到num[i]因为dp[i][j] = dp[i - 1][j]的就是说可能某个位置没有
        //预处理时候finger可以是0,1,2的混合
        //预处理出只有finger的情况
        for (int i = 0; i <= num[13]; i ++){
            for (int j = i + 1; j <= num[13]; j ++){
                dp[0][min(m,t[13][i] + t[13][j])] = max(dp[0][min(m,t[13][i] + t[13][j])],
                 d[13][i] + d[13][j]);
            }
        }

        for (int i = 1; i <= 11; i ++){
            for (int j = 0; j <= m; j ++){
                if (dp[i - 1][j] == -1) continue;
                for (int k = 0; k <= num[i]; k ++){
                    dp[i][min(m, j + t[i][k])] = max(dp[i][min(m, j + t[i][k])],
                     dp[i - 1][j] + d[i][k]);
                }
            }
        }
        //i - 1  = 9 在Feet i = 12
        for (int j = 0; j <= m; j ++){
            if (dp[9][j] == -1) continue;
            for (int k = 0; k <= num[12]; k ++){
                dp[11][min(m, j + t[12][k])] = max(dp[11][min(m, j + t[12][k])], 
                    dp[9][j] + d[12][k]);
            }
        }
        printf("%dn",max(-1,dp[11][m]));
    }
    return 0;
}
``` 