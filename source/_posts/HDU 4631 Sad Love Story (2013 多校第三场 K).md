---
title: HDU 4631 Sad Love Story (2013 多校第三场 K)
tags:
  - ACM
date: 2013-08-12 17:57:10
---

用set进行,加上一个小优化，就可以算最近点对，没有特别的数据
```cpp
#include <iostream>
#include <cstdio>
#include <set>
#include <cmath>
#include <algorithm>
#define maxn 500005
#define ll __int64
using namespace std;

ll x[maxn],y[maxn];
struct node
{
	ll x,y;
	bool operator < (const node &u) const{
		if(x == u.x) return y < u.y;
		return x < u.x;
	}
};
int main()
{
	int t;
	ll n,Ax,Ay,Bx,By,Cx,Cy;
	scanf("%d", &t);
	while (t--){
		set<node> st;
		st.clear();
		cin>>n>>Ax>>Bx>>Cx>>Ay>>By>>Cy;
		//cout<<n<<&#39; &#39;<<Ax<<&#39; &#39;<<Cy<<endl;
		//scanf("%I64d%I64d%I64d%I64d%I64d%I64d%I64d", &n, &Ax, &Bx, &Cx, &Ay, &By, &Cy);
		x[0] = 0; y[0] = 0;
		for (int i = 1; i <= n; ++i){
			x[i] = (x[i-1]*Ax + Bx) % Cx;
			y[i] = (y[i-1]*Ay + By) % Cy;
		}
		ll sum = 0;
		node tmp;
		tmp.x = 0; tmp.y =0;
		//st.insert(tmp);
		tmp.x = x[1]; tmp.y= y[1];
		st.insert(tmp);
		ll ans = 1e17;
		//cout << ans << endl;
		for (ll i = 2; i <= n; ++i)
		{
			tmp.x = x[i]; tmp.y = y[i];
			set<node>::iterator it,ii;
			it = st.lower_bound(tmp);	

			for (ii = it; ii != st.end(); ++ii)
			{
				if((ii->x-tmp.x) * (ii->x-tmp.x) >= ans) break;
				ll dis = (ii->x-tmp.x) * (ii->x-tmp.x) + (ii->y-tmp.y) * (ii->y-tmp.y) ;
				ans = min(ans,dis);
			}	
			ii = it;
			while (ii != st.begin())
			{
				ii --;
				if((ii->x-tmp.x) * (ii->x-tmp.x) >= ans) break;
				ll dis = (ii->x-tmp.x) * (ii->x-tmp.x) + (ii->y-tmp.y) * (ii->y-tmp.y) ;
				ans = min(ans,dis);
			}
			sum += ans;
			st.insert(tmp);
		}
		//printf("%I64dn",sum);	
		cout << sum << endl;
	}
	return 0;
}
```

	 