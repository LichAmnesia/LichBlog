---
title: 矩阵快速幂优化DP状态转移
tags:
  - DP
date: 2014-07-14 16:26:13
---

先给出结论，然后给出几道例题

* * *

**结论**

	如果一个动态规划方程能够用矩阵乘法来进行优化，那么必须满足： 

1.  状态必须是一维或者两维。超过两维的情况，可以通过把多维状态压缩到一维的方法降到两维（其实就是一个pre一个now表示i+1和i并没有降低状态数） 
2.  每个状态dp[i][j]必须满足只和dp[i-1][k]有关，并且这是一个线性关系。 
3.  转移矩阵需要都相同或者至少是循环出现的，才能使用快速幂来加速矩阵乘法。 
4.  假设第一维的大小是N，第二维的大小是M，那么矩阵乘法的时间复杂度为O(M^3logN)，而直接转移的复杂度至多是O(M^2N)，有时候甚至更小，通常只有M很小的时候并且N相当大的时候才会使用矩阵乘法，否则不值得。



* * *

**POJ 3744 Scout YYF I**

**题意：**

	你在一条布满地雷的道路上，开始在坐标1。每次有概率P向前走一步，有概率1-P向前走两步。道中路某几个点上会有地雷，问你安全通过的概率。地雷数N<=10，坐标范围在100000000内。

	dp的方程还是很好想的dp[i] = p * dp[i-1] + (1-p) * dp[i-2]，但是n比较大直接转移不行，考虑通过矩阵快速幂解决DP的转移方程。

**代码：**

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
using namespace std;
typedef long long ll;
const ll mod = 1000000007ll;
int num[12];double p;
#define N 10
double Mat[N][N];
void product_mod(double a[][N], double b[][N], int n) {
    double c[N][N] = {};
    for ( int i=0; i<n; i++) {
        for ( int j=0; j<n; j++) {
            for ( int k=0; k<n; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    for ( int i=0; i<n; i++) {
        for ( int j=0; j<n; j++) {
            a[i][j] = c[i][j];
        }
    }
}
//a ^ x % mod 
void power_mod(double a[][N], int x, int n) {
    memset(Mat, 0, sizeof(Mat));
    for ( int i=0; i<n; i++) Mat[i][i] = 1;
    while (x != 0) {
        if (x & 1) product_mod(Mat, a, n);
        product_mod(a, a, n);
        x >>= 1;
    }
}
double a[N][N];
int main(int argc, char const *argv[])
{
    int n;
    while (~scanf("%d%lf",&n, &p)){
        for (int i = 1; i <= n; i ++){
            scanf("%d", &num[i]);
        }
        sort(num + 1, num + n + 1);
        n = unique(num + 1, num + n + 1) - (num + 1);
        double ans = 1;
        num[0] = 0;
        for (int i = 1; i <= n; i ++){
            a[0][0] = p;a[0][1] = 1-p;
            a[1][0] = 1;a[1][1] = 0;
            power_mod(a,num[i] - num[i-1] - 1,2);
            ans *= (1 - Mat[0][0]);
            //cout << Mat[0][0] << &#39; &#39; << ans << endl;
        }
        printf("%.7fn",ans);
    }
    return 0;
}
```

* * *

**HDU 2604 Queuing**

**题意：**

	求2个字母f和m构成的长度为m的序列中不含fmf以及fff的种数。

	这题数据太水可以暴力，不过这个也是一个可以矩阵优化DP的题目。 

	推出来的DP转移方程为dp[i] = dp[i-1] + dp[i-3] + dp[i-4] 

	具体来说就是，当第i位为m的时候前i-1位只要满足条件就能实现了。当第i位为f的时候，就需要分情况讨论了，当第i-1位为m的时候，i-2不能为f，否则出现fmf的情况，那么就是说i-2必须是m，才能够实现，就是dp[i-3] * 1,（表示i-2位只能取m）。然后当第i-1位为f的时候，i-2也只能是m，并且i-3也只能是m，所以最后的几位是mmff，也就是这种情况的解为dp[i-4] * 1(表示i-3只能取一位，而且i-2，i-1都只有一种情况)。最终得出来dp[i] = dp[i-1] + dp[i-3] + dp[i-4]。 

	而且这个还是一个线性转移，一维的考虑用矩阵进行转移 

	| 1 0 1 1 |   |F[n-1]|   |F[n] | 

	| 1 0 0 0 |   |F[n-2]|   |F[n-1]| 

	| 0 1 0 0 | * |F[n-3]| = |F[n-2]| 

	| 0 0 1 0 |   |F[n-4]|   |F[n-3]|

**代码：**

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
using namespace std;
typedef long long ll;
int num[12];
#define N 10
int Mat[N][N];
void product_mod(int a[][N], int b[][N], int n,int mod) {
    int c[N][N] = {};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k ++) {
                c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % mod;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            a[i][j] = c[i][j];
        }
    }
}
//a ^ x % mod 
void power_mod(int a[][N], int x, int n, int mod) {
    memset(Mat, 0, sizeof(Mat));
    for (int i = 0; i < n; i ++) Mat[i][i] = 1;
    while (x != 0) {
        if (x & 1) product_mod(Mat, a, n, mod);
        product_mod(a, a, n, mod);
        x >>= 1;
    }
}
int A[N][N];
int main(int argc, char const *argv[])
{
    int n,m;
    while (~scanf("%d%d",&n, &m)){
        int mod = m;
        memset(A, 0, sizeof(A));
        A[0][0] = 1;A[0][2] = 1; A[0][3] = 1;
        A[1][0] = 1;A[2][1] = 1; A[3][2] = 1;
        num[1] = 2;
        num[2] = 4;
        num[3] = 6;
        num[4] = 9;
        if (n <= 4){
            printf("%dn", num[n] % mod);
        }else {
            //cout << "n = " << n << endl;
            power_mod(A, n - 4, 4, mod);
            //cout << a[0][0] << ' ' << a[0][1] << ' ' << a[0][2] << ' ' << a[0][3] << endl;
            int ans = Mat[0][0] * num[4] + Mat[0][1] * num[3] + Mat[0][2] * num[2] +
                Mat[0][3] * num[1];
            ans %= mod;
            printf("%dn", ans);
        }
    }
    return 0;
}
```
	 
* * *

**HDU 2294 Pendant**</span>

	差不多的转移方程，只是矩阵的大小有改变。

	dp[i][j]=dp[i-1][j]*j+dp[i-1][j-1]*(k-j+1)   

	dp[i][j]表示由j种不同的珠子组成长度为i的吊链的方法数
    
----
　 

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info