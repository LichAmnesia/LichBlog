---
title: ZOJ 3416 Balanced Number (数位dp)
tags:
  - ACM
date: 2013-09-20 16:41:52
---

发现用记忆化搜索写数位DP 比较好写
```cpp
/* ZOJ 3416 数位DP
 * 一个数是Balanced ，指这个数的力矩为0
 * 如 4139 选支点为3  4*2 + 1*1 = 9*1 
 * 为[x,y]内有多少个Balanced Number   0<=x<=y<=10^18
 *
 * watashi的博客里提到如果 <=10^9 用 sqrt(n)的方法打表，
 * 打印每10w个数之间有多少个Balanced Number
 * 感觉这种方法很好  sqrt(n)
 *
 * 这题数据规模很大10^18，要用数位统计
 *
 * dp的预处理我想的少了一位，最后问别人
 * dp[all,len,total] 表示总长度为all，字符占的长度为len，力矩为total的方案数
 * 如xxx123 即是 dp[6,3,1*3+2*4+3*5]
 *
 * init后，就用数位统计cal(x)统计[0,x]内多少个Balanced Number
 * 枚举位数，枚举该位小于bit[i]的数字j
 * 然后再枚举支点位置，1到len  然后统计
 * （枚举的位置是1到len,第一次遇到枚举的位置可以是pre的东西）
 *
 * 由于一个数的支点只有一个！！！所以不会重复计数
 * "就会发现一个数最多关于一个digit是balanced的
 * （一个严格单调函数最多有一个零点）。
 * 注意到了这一点就会知道，这题是不存在重复计算这种问题的。"
 *
 * 但注意的是0的支点不止一个，所以要减去重复的0
 * 000000  支点任意一个都可以
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
#define ll long long 

int dig[20];
ll dp[20][20][10000]; 

void init(){
	memset(dp,-1,sizeof(dp));
}

ll dfs(int pos,int bal,int prenum,bool islim){
	if (prenum < 0) return 0;//从后向前枚举的所以不能小于0
	if (pos == -1) return prenum == 0;
	if (!islim && dp[pos][bal][prenum] != -1){
		return dp[pos][bal][prenum];
	}
	int end = islim ? dig[pos] : 9;
	ll ans = 0; 
	for (int i = 0; i <= end; i++){
		ans += dfs(pos-1,bal,prenum+(pos-bal)*i,islim && i == end);
	}
	if (!islim)
		dp[pos][bal][prenum] = ans;
	return ans;

}

ll cal(ll n){
	int num = 0;
	while (n){
		dig[num++] = n % 10;
		n /= 10;
	}
	ll ret = 0;
	for (int i = 0; i < num; i++)
		ret += dfs(num-1,i,0,1);
	return ret-num+1;//因为0的支点可以整个数的数位减去重复的
	//比如00000支点任意一个都可以
}

int main(){
	int t;
	init();	
	ll l,r;

	for (scanf("%d", &t); t--;){
		cin >> l >> r;
		cout << cal(r) - cal(l-1) << endl;
	}
	return 0;
}
```
	 