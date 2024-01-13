---
title: POJ 1511 Invitation Cards (SPFA + JAVA)
tags:
  - ACM
date: 2014-03-19 13:52:03
---

尝试了一下Java写SPFA各种不习惯各种蛋疼，不过最终竟然以非常高的时间给过了``貌似是C的N倍了，没做java的IO优化，如果按照petr的那种IO的话应该会快点的




放上代码，觉得写的还不错

先MLE了，由于每次new的时候是new [maxn]这个maxn开的比较大，所以``

然后MLE是由于每个样例都new Graph了，开太多空间了

WA是因为SPFA函数类型是int其实超过int了得用long

RE是因为init的时候head数组初始化是1-M其实应该是1-N``



```java
import java.util.*;
import java.io.*;

class Edge{
	int v,next,w;
	Edge(){};
	Edge(int v,int w,int next){
		this.v = v;
		this.w = w;
		this.next = next;
	}
}

class Graph{
	int N,M;
	static int inf = 1000000050;
	Edge[] edge;
	int num  = 0;
	int[] Head;
	int[] dis;
	int[] vis;
	Graph(){}
	void init(int N,int M){
		this.N = N;
		this.M = M;
		num = 0;
		Head = new int[N + 10];
		for (int i = 0; i <= N; i ++) Head[i] = -1;
		edge = new Edge[M + 10];
		dis = new int[N + 10];
		vis = new int[N + 10];
	}

	void addEdge(int u, int v,int w){
		edge[num] = new Edge(v,w,Head[u]);
		Head[u] = num ++;
	}

	long SPFA(int st,int ed){
		for (int i = 1; i <= N; i ++){
			dis[i] = inf; vis[i] = 0; 
		}
		vis[st] = 1;
		dis[st] = 0;
		//Queue<Integer> queue = new LinkedList<Integer>();
		Queue<Integer> Q = new LinkedList<Integer>();
		Q.add(st);
		while (!Q.isEmpty()){
			int u = Q.peek();
			Q.remove();
			vis[u] = 0;
			for (int i = Head[u]; i != -1; i = edge[i].next){
				//System.out.println(u + " " + i);
				int v = edge[i].v;
				if (dis[u] + edge[i].w < dis[v]){
					dis[v] = dis[u] + edge[i].w;
					if (vis[v] == 0){
						vis[v] = 1;
						Q.add(v);
					}
				}
			}
		}
		long sum = 0;
		for (int i = st; i <= ed; i ++){
			sum += dis[i];
		}
		return sum;
	}

}

public class Main{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		int T = in.nextInt();
		Graph G1 = new Graph();
		Graph G2 = new Graph();
		while (in.hasNextInt()){
			int n = in.nextInt();
			int m = in.nextInt();
			G1.init(n,m);
			G2.init(n,m);
			int u,v,w;
			for (int i = 0; i < m; i ++){
				u = in.nextInt();
				v = in.nextInt();
				w = in.nextInt();
				G1.addEdge(u,v,w);
				G2.addEdge(v,u,w);

			}

			System.out.println(G1.SPFA(1,n) + G2.SPFA(1,n));
		}
	}
}
```

	 