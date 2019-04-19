---
title: '14级集训队讨论会2--Stack&Queue'
tags:
  - 集训队
date: 2015-04-13 11:13:42
---

## 问题1

四月一日快到了，Vayko想了个愚人的好办法——送礼物。嘿嘿，不要想的太好，这礼物可没那么简单，Vayko为了愚人，准备了一堆盒子，其中有一个盒子里面装了礼物。盒子里面可以再放零个或者多个盒子。假设放礼物的盒子里不再放其他盒子。

### 输入

>((((B)()))())
>
>(B)


### 输出

>4

>1

```cpp
#include <iostream>
#include <cstdio>
#include <stack>
#include <cstring>
using namespace std;
int main(int argc, char const *argv[])
{
    char c[1111];
    while (~scanf("%s", c)){
        stack <int> st;
        while (!st.empty()) st.pop();
        for (int i = 0; i < strlen(c); i ++){
            if (c[i] == '('){
                st.push(1);
            }else if (c[i] == ')'){
                st.pop();
            }else {
                printf("%dn", st.size());
                break;
            }
        }
    }
    return 0;
}
```




* * *

## 栈的定义

<span class="token p">栈和队列一个先进后出，一个先进先出。</span> <span class="token p"> 堆栈（英语：stack），也可直接称栈。它的特殊之处在于只能允许在链结串列或阵列的一端（称为堆栈顶端指标，英语：top）进行加入资料（英语：push）和输出资料（英语：pop）的运算。另外堆叠也可以用一维阵列或连结串列的形式来完成。</span> <span class="token p">由于堆栈数据结构只允许在一端进行操作，因而按照后进先出（LIFO, Last In First Out）的原理运作。</span> <span class="token p">堆叠数据结构使用两种基本操作：推入（push）和弹出（pop）：</span> <span class="token p">推入：将数据放入堆栈的顶端（阵列形式或串列形式），堆栈顶端top指标加一。</span> <span class="token p">弹出：将顶端数据资料输出（回传），堆栈顶端资料减一。</span>

<span class="token li"><span class="token md md-li">- </span>stack<span class="token tag"><span class="token punctuation"><</span>INT<span class="token punctuation">></span></span> s；定义一个INT类型的栈s，也可以定义结构体的类型的。 </span>

<span class="token li"><span class="token md md-li">- </span>s.empty()判断栈是否是空的，是空的就返回真，不然就是假，所以这个是常常用在if和while里面。 </span>

<span class="token li"><span class="token md md-li">- </span>s.top()返回栈顶元素，a=s.top()的话那么a就被赋值成栈顶元素了，只是返回，但不改变栈里面的内容，也就是没有删除栈顶元素。</span>

<span class="token li"><span class="token md md-li">- </span>s.pop()用来删除栈顶元素的，没有返回值，不能对空栈使用。 </span><span class="token li"><span class="token md md-li">-</span></span>

<span class="token li"> s.size()返回栈里面有多少元素，就是用来确定栈里面的元素数量的。 </span>

<span class="token li"><span class="token md md-li">- </span>s.push()进栈的函数，s.push(a)。</span>

* * *



## 队列定义

<span class="token p">队列（queue），是先进先出（FIFO, First-In-First-Out）的线性表。在具体应用中通常用链表或者数组来实现。队列只允许在后端（称为rear）进行插入操作，在前端（称为front）进行删除操作。</span> <span class="token p">队列的操作方式和堆栈类似，唯一的区别在于队列只允许新数据在后端进行添加。</span>

<span class="token li"><span class="token md md-li">- </span>queue<span class="token tag"><span class="token punctuation"><</span>INT<span class="token punctuation">></span></span> q;这里的INT和栈一样的。</span>

<span class="token li"><span class="token md md-li">- </span> q.empty(); q.pop(); q.size(); q.push(); </span>

<span class="token li"><span class="token md md-li">- </span> q.back(); q.front();这两个是队列的的返回方式，back是返回的队尾的元素，front是返回的队首的元素。</span>



* * *

## 手动实现一下栈和队列（数组或者链表）

## 问题2

某部队进行新兵队列训练，将新兵从一开始按顺序依次编号，并排成一行横队，训练的规则如下：从头开始一至二报数，凡报到二的出列，剩下的向小序号方向靠拢，再从头开始进行一至三报数，凡报到三的出列，剩下的向小序号方向靠拢，继续从头开始进行一至二报数。。。，以后从头开始轮流进行一至二报数、一至三报数直到剩下的人数不超过三人为止。

### <span id="wmd-input-section-877" class="wmd-input-section"><span class="token h2 ace_markup ace_heading ace_constant ace_numeric">输入</span> </span>

>2

>20

>40


### <span id="wmd-input-section-878" class="wmd-input-section"><span class="token h2 ace_markup ace_heading ace_constant ace_numeric">输出</span> </span>

>1 7 19

>1 19 37
