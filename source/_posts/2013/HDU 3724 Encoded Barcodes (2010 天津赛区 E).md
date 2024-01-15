---
title: HDU 3724 Encoded Barcodes (2010 天津赛区 E)
tags:
  - ACM
date: 2013-08-01 13:32:25
---

算是一个Trie的模板，挺好的，记录出现次数

```cpp
/* HDU 3724 Encoded Barcodes 字典树 
 *
 * */
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <cmath>
#include <queue>
#include <vector>
#define MID(x,y) ((x+y)>>1)
#define iabs(x) ((x)>0?(x):-(x))
using namespace std;
const int Max_Node = 2000*30+10;
const int Child_Num = 26; 
struct Trie{
	int chd[Max_Node][Child_Num];//每个节点的儿子，状态转移
	int val[Max_Node];//记录关键数据
	int ID[128];//字母对应的ID
	int sz;//已使用节点个数
	void Initialize(){//初始化，计算字母对应的儿子ID，如&lsquo;a&rsquo;->0
		for(int i = 0; i < Child_Num; i ++){
			ID[i+'a']=i;
		}
	}
	void Reset(){//重新建树时需要先Rest
		memset(chd[0],0,sizeof(chd[0]));
		memset(val,0,sizeof(val));
		sz=1;
	}
	void Insert(char *s,int key) {//将权值为key的字符串插入到Trie
		int p = 0;
		for( ; *s; s ++){
			int c = ID[*s];
			if(!chd[p][c]){
				memset(chd[sz],0,sizeof(chd[sz]));
				chd[p][c] = sz ++;
			}
			p = chd[p][c];
			val[p] ++;
		}
	}
	int Find(char *s){
		int p = 0;
		for( ; *s;s ++)
		{
			int c = ID[*s];
			if(!chd[p][c]) return 0;
			else p = chd[p][c];
		}
		return val[p];
	}
}T;
int main(){
	int n,m,k,ret;
	char s[1000],find[1000];
	while(cin>>n>>m)
	{
		ret=0;
		T.Reset();
		T.Initialize();	
		for	(int i=0;i<n;i++)
		{
			scanf("%s",s);
			T.Insert(s,0);	
		}
		double val[8];
		for(int i=0;i<m;i++)
		{
			scanf("%d",&k);
			for (int j = 0; j < k; ++j)
			{
				int ans=0;int i2=1<<6;
				scanf("%lf",&val[0]);
				for(int l=1;l<8;l++)
				{
					scanf("%lf",&val[l]);
					double tmp=val[l]/val[0];
					if(tmp<=2.4&&tmp>=1.6){
						ans+=i2;
					}
					i2/=2;
				}
				find[j]=ans;
			}
			find[k]=0;
			ret+=T.Find(find);
		}

		printf("%dn",ret);
	}
}
```
	 