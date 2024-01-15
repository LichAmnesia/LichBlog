---
title: CodeForces 305C Ivan and Powers of Two
tags:
  - ACM
date: 2014-01-24 14:32:11
---

<span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">First of all, let&#39;s carry over all powers of two in the following way: if we have </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>&thinsp;=&thinsp;_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_j_</span></span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">, </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_i_&thinsp;&ne;&thinsp;_j_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">, carry 1 to </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>&thinsp;+&thinsp;1</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">. Now as all of </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span></span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> are distinct, the answer is </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_max_(_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>)</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> &mdash; </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_cnt_(_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>)</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> + 1, where </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_max_(_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>)</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> &mdash; maximal value of </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span></span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">,</span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_cnt_(_a_<span class="lower-index" style="font-size: 13px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;">_i_</span>)</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> &mdash; size of </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_a_</span>

因为从小到大输入SET所以能够保证总是distinct。

```cpp
/* From: Lich_Amnesia
 * Time: 2014-01-24 14:23:29
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

set<int>Set;
int main(){
	int n,cnt,Max = 0;
	cin >> n;
	for (int i = 0; i < n; i ++){
		cin >> cnt;
		while (Set.count(cnt)) Set.erase(cnt),cnt++;
		Set.insert(cnt);
		Max = max(Max,cnt);
	}
	cout << Max - Set.size() + 1 << endl;
	return 0;
}
```
	 