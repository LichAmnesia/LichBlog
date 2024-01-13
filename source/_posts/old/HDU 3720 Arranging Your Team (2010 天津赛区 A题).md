---
title: HDU 3720 Arranging Your Team (2010 天津赛区 A题)
tags:
  - ACM
date: 2013-07-30 13:32:47
---

这题是作为Njust第二场新生赛A，比赛时先写了，写了一半就写不下去了，觉得太恶心，之后才好好写的，写完之后就是1Y

主要就是一个搜索，穷举答案，当有十一个人的时候判断一下就可以

 

```cpp
/* a.cpp 2013.07.29 新生赛A 题
 *
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <map>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
#define print() cout<<"------"<<endl
using namespace std;
int maps[30][30];//一开始不小心写成bool类型了了
struct node{
	int id,w;
}p[30];
map<string,int>m;
map<string,int>m2;
int num[30];
bool vis[30];
int ans;
void dfs(int src,int go,int de,int mid,int st)//go=1,de=4,mi=4,st=2
{
	int ret=0,cnt=0;
	if(go==1&&de==4&&mid==4&&st==2) {
		for(int i=0;i<23;i++){
			if(vis[i]){
				cnt++;
				ret+=p[i].w;
				for(int j=i+1;j<23;j++)
					if(vis[j]){
					ret+=maps[i][j];
				}
			}
		}
		ans=max(ans,ret);
		return ;
	}
	for(int i=src;i<23;i++)
	{
		if(!vis[i])
		{
			if(p[i].id==1&&go>=1) continue;
			if(p[i].id==2&&de>=4) continue;
			if(p[i].id==3&&mid>=4) continue;
			if(p[i].id==4&&st>=2) continue;
			vis[i]=1;
			if(p[i].id==1){
				dfs(i,go+1,de,mid,st);
			}
			if(p[i].id==2){
				dfs(i,go,de+1,mid,st);
			}
			if(p[i].id==3){
				dfs(i,go,de,mid+1,st);
			}
			if(p[i].id==4){
				dfs(i,go,de,mid,st+1);
			}
			vis[i]=0;
		}
	}
}

int main(){
	int t,n,va;
	string s2,s1;
	s2="goalkeeper";
	m[s2]=1;//1个
	s2="defender";
	m[s2]=2;//4
	s2="midfielder";
	m[s2]=3;//4
	s2="striker";
	m[s2]=4;//2
	while(cin>>s1)
	{
		ans=-0x7ffffff;
		memset(maps,0,sizeof(maps));
		m2.clear();
		m2[s1]=0;
		memset(num,0,sizeof(num));
		scanf("%d",&va);
		cin>>s2;
		p[0].w=va;
		p[0].id=m[s2];
		num[m[s2]]++;
		for(int i=1;i<23;i++)
		{
			cin>>s1;
			scanf("%d",&va);
			cin>>s2;
			m2[s1]=i;
			p[i].w=va;
			p[i].id=m[s2];
			num[m[s2]]++;
		}
		int M;
		scanf("%d",&M);
		for(int i=0;i<M;i++)
		{
			cin>>s1>>s2>>va;
			maps[m2[s2]][m2[s1]]=va;
			maps[m2[s1]][m2[s2]]=va;
		}
		if(num[1]<1) {
			printf("impossiblen");
			continue;
		}
		if(num[2]<4){
			printf("impossiblen");
			continue;
		}
		if(num[3]<4){
			printf("impossiblen");
			continue;
		}
		if(num[4]<2){
			printf("impossiblen");
			continue;
		}
			memset(vis,0,sizeof(vis));
			dfs(0,0,0,0,0);
		printf("%dn",ans);
	}

	return 0;
}
```

	 