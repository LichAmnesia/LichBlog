---
title: HDU 4622 Reincarnation (2013 多校第三场 B)
tags:
  - ACM
date: 2013-08-12 18:02:19
---

字符串hash，用到一个技巧，看代码

```cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#define ll long long
#define MID(x,y) ((x+y)>>1)
#define maxn 2205
#define print() cout<<"------------"<<endl
using namespace std;
char s[20005];
unsigned int hash[maxn],ans[maxn][maxn],h[maxn][maxn];
int seed=13;
pair<int,int> pa[maxn];
int q,n,m;

int binsearch(int val,int l,int r){
	while (l <= r){
		int mid = MID(l,r);
		if(hash[mid] == val) return mid;
		else if(hash[mid] < val) return binsearch(val,mid+1,r);
		else return binsearch(val,l,mid-1);
	}
}

int main (){
	int t,l,r;
	cin>>t;

	while (t--){

		cin>>s;
		n = strlen(s);
		for (int i = 0; i <= n; ++i)
			for (int j = 0; j <= n; ++j)
				ans[i][j] = 0;

		for (int i = 0; i < n; ++i){
			int val = 0;
			for (int j = i; j < n; ++j){
				val = val * seed + s[j];
				h[i][j] = (val & 0x7FFFFFFF);
			}
		}

		for (int len = 1; len <= n; len++){
			m = 0;
			for(int i = 0; i < n-len+1; ++i){
				hash[m++] = h[i][i+len-1];
			}
			sort(hash,hash+m);
			int tmp = 0;
			for (int i = 1; i < m; ++i)
				if(hash[tmp] != hash[i])
					hash[++tmp] = hash[i];
			m = tmp +1;
			for (int i = 0;i < m; ++i) 
				pa[i] = make_pair(-1,-1);
			//cout << "len" << len << endl;
			for (int i = 0; i < n-len+1; ++i)
			{
				//cout << i << endl;
				int val = h[i][i+len-1];
				int pos = binsearch(val,0,m-1);
				r = i + len - 1;
				int le1 = -1,le2 = i + 1;
				//if(pa[pos].first != -1) le1 = pa[pos].first;
				le1 = pa[pos].first+1;
				ans[le1][r] ++;
				ans[le2][r] --;
				pa[pos] = make_pair(i,i+len-1);	
			}
			//cout << len << endl;
		}

		for (int i = 0; i < n; ++i)
			for (int j = 1; j < n; ++j)
				ans[i][j] += ans[i][j-1];

		for (int j = 0; j < n; ++j)
			for (int i = 1; i < n; ++i)
				ans[i][j] += ans[i-1][j];	
		cin>>q;
		for (int i = 0; i < q; ++i)
		{
			scanf("%d%d", &l, &r);
			//cin>>l>>r;
			l--;r--;
			//if(l == r) printf("1n");
			//else 
			printf("%dn", ans[l][r]);	
		}
	}
	return 0;
}
```

	 