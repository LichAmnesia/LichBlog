---
title: 网络最大流——SAP
tags:
  - SAP
date: 2014-02-03 16:34:27
---

SAP算法综合起来说，时间复杂度很低，编程很简单，而且很易于理解。

	SAP算法框架：

	1、定义距离标号为各点到汇点距离的下界(即最短距离) h数组。

	2、在初始距离标号的基础上，不断沿着可行弧找增广路。可行弧的定义为{( i , j ) , h[ i ] == h[ j ]+1 };

	3、遍历当前节点完以后，为了保证下次再来的时候有路可走，重新标号当前距离。

	    h[ i ] = min(h[ j ] +1)；

	4、检查重新标记的顶点，若其为原点，且被标记的高度等于节点个数时，图中已经不存在增广路，算法可结束。否则继续从原点开始遍历

	 

	一些心得优化：

	1、理论上初始标号要用反向BFS求得，实践中全部设为0，这样做几乎不改变实践复杂度。

	2、GAP常数优化！（性价比极高）

	     由于我们不停的遍历，最大流很可能便早就已经求出来了。那么我们接下来的遍历便成了无用功。可以发现，距离标号是连续单调变化的。如果某一种大小标号的节点数量为零。也就是出现了不连续，断层！那么图中也不肯能再存在增广路了。实践中，我们用一个vh[ i ]数组用来记录标号为i的顶点的个数，若重标号使得vh数组中的原标号数目变为了0，那么就停止算法。

	3、临界表优化

	如果顶点多的话，往往N^2存不下，这时候就要存边：

	存每条边的出发点，终止点和价值，然后排序一下，再记录每个出发点的位置。以后要调用从出发点出发的边时候，只需要从记录的位置开始找即可（其实可以用链表）。优点是时间加快空间节省，缺点是编程复杂度将变大，所以在题目允许的情况下，建议使用邻接矩阵。

	4、当前弧优化

	为了使每次找增广路的时间变成均摊O(V)，还有一个重要的优化是对于每个点保存"当前弧"：初始时当前弧是邻接表的第一条弧；在邻接表中查找时从当前弧开始查找，找到了一条允许弧，就把这条弧设为当前弧；改变距离标号时，把当前弧重新设为邻接表的第一条弧。

	 

	贴上一个邻接矩阵一个邻接表的模板:

<pre class="brush:cpp">
/*
* Edge list
*/
#define th(x) this->x = x
const int MAXN = 20000 + 10;
const int MAXM = 200000 + 10;
const int inf = 0x3f3f3f3f;
struct Nod
{
	int b, next;
	int cap, flow;
	void init(int b, int cap, int next)
	{
		th(b);
		th(cap);
		th(next);
	}
};
struct SAP
{
	int E[MAXN], n;
	int h[MAXN], vh[MAXN], source, sink;
	Nod buf[MAXM * 4]; int len;
	void init(int n)
	{
		this->n = n;
		len = 0;
		memset(E, 255, sizeof(E));
	}
	void addCap(int i, int j, int cap1, int cap2 = 0)
	{
		buf[len].init(j, cap1, E[i]);
		E[i] = len++;
		buf[len].init(i, cap2, E[j]);
		E[j] = len++;
	}
	int sap(const int idx, const int maxCap)
	{
		if (idx == sink)
				return maxCap;
		int l = maxCap, d, minH = n;
		for (int i = E[idx]; i != -1; i = buf[i].next)
		{
				Nod & nod = buf[i];
				if (nod.cap-nod.flow > 0)
				{
						if (h[idx] == h[nod.b] + 1)
						{
								d = sap(nod.b, min(l, nod.cap - nod.flow));
								nod.flow += d;
								buf[i ^ 1].flow -= d;
								l -= d;
								if (h[source] == n || l == 0) return maxCap - l;
						}
						minH = min(minH, h[nod.b] + 1);
				}
		}
		if (l == maxCap)
		{
				vh[h[idx]]--;
				vh[minH]++;
				if (vh[h[idx]] == 0)
						h[source] = n;
				h[idx] = minH;
		}
		return maxCap - l;
	}
	int solve(int source, int sink)
	{
		if (source == sink) return inf;
		th(source); th(sink);
		memset(h, 0, sizeof(h));
		memset(vh, 0, sizeof(vh));
		for (int i = 0; i < len; i++)
				buf[i].flow = 0;
		int ans = 0;
		while (h[source] != n)
				ans += sap(source, inf);
		return ans;
	}
};

/*
* Adjacency matrix
*/
const int MAXN = 100 + 10;
const int inf = 0x3f3f3f3f;
struct SAP
{
	int cap[MAXN][MAXN], flow[MAXN][MAXN], g[MAXN][MAXN];
	int n;
	int h[MAXN], vh[MAXN], source, sink;
	int mk[MAXN];
	void init(int n)
	{
		this->n = n;
		memset(cap, 0, sizeof(cap));
		memset(g, 0, sizeof(g));
		memset(mk, 0, sizeof(mk));
	}
	void addCap(int i, int j, int val)
	{
		cap[i][j] += val;
		g[i][j] = 1;
	}
	int sap(const int idx, const int maxCap)
	{
		if (idx == sink)
			return maxCap;
		int l = maxCap, d, minH = n;
		for (int i = 0; i < n; i++)
		{
			if (cap[idx][i] - flow[idx][i] > 0)
			{
				if (h[idx] == h[i] + 1)
				{
					d = sap(i, min(l, cap[idx][i] - flow[idx][i]));
					flow[idx][i] += d;
					flow[i][idx] -= d;
					l -= d;
					if (h[source] == n || l == 0) return maxCap - l;
				}
				minH = min(minH, h[i] + 1);
			}
		}
		if (l == maxCap)
		{
			vh[h[idx]]--;
			vh[minH]++;
			if (vh[h[idx]] == 0)
				h[source] = n;
			h[idx] = minH;
		}
		return maxCap - l;
	}
	int solve(int source, int sink)
	{
		if (source == sink) return inf;
		this->sink = sink;
		this->source = source;
		memset(flow, 0, sizeof(flow));
		memset(h, 0, sizeof(h));
		memset(vh, 0, sizeof(vh));
		int ans = 0;
		while (h[source] != n)
			ans += sap(source, inf);
		return ans;
	}
	void dfs(int u)
	{
		mk[u] = 1;
		for (int i = 0; i < n; i++)
		{
			if (!mk[i] && cap[u][i] - flow[u][i] > 0) dfs(i);
		}
	}
	void output()
	{
		for (int i = 0; i < n; i++)
			for (int j = 0; j < n; j++)
				if (g[i][j] && cap[i][j] - flow[i][j] == 0 && mk[i] != mk[j])
					printf("%d %dn", i + 1, j + 1);
	}
}sap;</pre>

	 

	 