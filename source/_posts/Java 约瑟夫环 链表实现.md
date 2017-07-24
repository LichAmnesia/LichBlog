---
title: Java 约瑟夫环 链表实现
tags:
  - Java
date: 2014-03-13 09:42:28
---

  数据结构的编程实验，源码如下：

	  利用Java的泛型编程，以及链表类全部手动实现

<pre class="brush:java">
// 循环链表

import java.io.*;
import java.util.*;
@SuppressWarnings("unchecked")
class LinkList<T extends Comparable<T>>{
	private Node<T> head;
	LinkList(){
		head = null;
	}
	static class Node<T extends Comparable<T>>{
		T data;
		Node<T> next;
		Node(T data, Node<T> next){//中间节点使用此构造方法
			this.data = data;
			this.next = next;
		}
		Node(T data){ //头尾节点使用此构造方法
			this.data = data; 
			this.next = this;
		}
	} 

	void addHead(T point){ //为链表增加头节点
		head = new Node<T>(point);
	}

	//void addTail(T point){ //为链表增加尾节点
	//	tail = new Node<T>(point);
	//	head.next = tail;
	//}

	void insert(T point){
		if (point.compareTo(head.data) < 0){
			Node<T> newNode = new Node(point,head);
			head = newNode;	
		}else {
			Node<T> preNext = head;
			while (preNext.next != head && 
					point.compareTo(preNext.next.data) > 0){
				preNext = preNext.next;
			}
			Node<T> newNode = new Node(point,preNext.next);
			preNext.next = newNode;

		}
	}

	void show(){//打印链表
		Node<T> cur = head;
		if (!isEmpty()){
			System.out.print(cur.data + " ");
			cur = cur.next;
			while (cur != head){
				System.out.print(cur.data + " ");
				cur = cur.next;
			}
			System.out.println();
		}else {
			System.out.println("链表错误");
		}
		return ;
	}
	boolean isEmpty(){    //判断链表是否为空  
		if(head != null){    
			return false;    
		}    
		return true;    
    }   

	void delete(T data){   //删除某一节点  
		Node<T> curr = head,prev = head;  
		boolean b = false;
		//System.out.println(head.data);
		if (curr.data.equals(data)){
			while (prev.next != head) prev = prev.next;
			prev.next = head.next;
			head = prev;
			b = true;
			return ;
		}
		curr = head.next;
		while(curr != head){  
		  if(curr.data.equals(data)){  
			//判断是什么节点  
			if(curr == head){   //如果删除的是头节点  
				//System.out.println("delete head node");  
				head = curr.next;  
				b = true;  
				return;  
			}  
			if(curr.next == head){ //如果删除的是尾节点  
				//System.out.println("delete tail node");    
				prev.next = head;  
				b = true;  
				return;  
			}  
			else{  //  如果删除的是中间节点（即非头节点或非尾节点）  
				//System.out.println(&#39;n&#39;+"delete center node");  
				prev.next = curr.next;  
				b = true;  
				return;  
			}  
         }  
		 prev = curr;  
		 curr = curr.next;   
		}

		if(b == false){  
		   System.out.println("没有这个数据" + data);  
		}     

	}  

	void solve(int n,int m){
		Node<T> preNext = head;
		//T[] ans = new T[n + 1];
		int ansnum = 0;
		while (preNext.next != preNext){
			int cnt = 1;
			while (cnt < m){
				preNext = preNext.next;
				cnt ++;
			}
			System.out.print(preNext.data + " ");
			//ans[ansnum ++] = preNext.data;
			delete(preNext.data);
			preNext = preNext.next;
		}
		//for (int i = 0; i < ansnum; i ++){
		//	System.out.print(ans[i] + " ");
		//}
		System.out.println(preNext.data);
	}
}

public class ex1{
	public static void main(String[] args){
		LinkList<Integer> mylist = new LinkList<Integer>();
		Scanner in = new Scanner(System.in);
		while (in.hasNext()){
			Integer n = in.nextInt();
			Integer m = in.nextInt();
			mylist.addHead(1);
			for (int i = 2; i <= n; i ++){
				mylist.insert(i);
			}
			System.out.println("原顺序");
			mylist.show();
			System.out.println("出列顺序");
			mylist.solve(n,m);
		}

	}
}
/* 显示结果
 * 30 6
 * 原顺序
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 
 * 21 22 23 24 25 26 27 28 29 30 
 * 出列顺序
 * 6 12 18 24 30 7 14 21 28 5 15 23 2 11 22 3 16 27 10 
 * 26 13 1 20 17 9 19 29 25 8 4
 * 10 6
 * 原顺序
 * 1 2 3 4 5 6 7 8 9 10 
 * 出列顺序
 * 6 2 9 7 5 8 1 10 4 3
 * 8 2
 * 原顺序
 * 1 2 3 4 5 6 7 8 
 * 出列顺序
 * 2 4 6 8 3 7 5 1
 * 40 9
 * 原顺序
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 
 * 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 
 * 出列顺序
 * 9 18 27 36 5 15 25 35 6 17 29 40 12 24 38 11 26 1 
 * 16 32 8 28 4 23 7 31 14 39 30 20 13 10 19 22 37 33 34 21 2 3
 * */
</pre>

	 