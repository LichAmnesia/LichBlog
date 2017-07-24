---
title: Flappy Bird
date: 2014-05-29 09:31:48
tags:
---

```cpp
#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
#include<time.h>
#include<Windows.h>
/********函数变量声明********/
#define PR_Box printf("■")
#define PR_Gold printf("★")
#define PR_Ag printf("☆")
#define PR_FBird printf("Ю")
#define PR_DBird printf("Ф")
#define PR_Land printf("┳┳┯")
#define PR_Bg_TL printf("╔")
#define PR_Bg_TR printf("╗")
#define PR_Bg_DL printf("╚")
#define PR_Bg_DR printf("╝")
#define PR_Bg_X printf("═")
#define PR_Bg_Y printf("║")
#define PR_Blank printf("  ");
int Grade = 1, C_Gold = 0, C_Ag = 0, Score = 0, Delay_time = 1000,Max_blank=9,Distance=18;
//Grade 游戏等级 
//Score 分数 
//Max_blank 上下两个烟囱之间的最大距离   
//Distance  左右两个烟囱之间的距离
struct Birds//小鸟的结构体
{
	int x, y;//小鸟的位置
	int condition;//此变量未用
};
Birds *Bird = (Birds*)malloc(sizeof(Birds));//给小鸟指针分配空间
struct Bg//烟囱的结构体--循环双向链表
{
	int x, y;//上烟囱的左下角砖块的坐标
	int l_blank;//上相两个烟囱之间的距离
	int reward[9];
	Bg *pri;//前指针-指向前一个结点
	Bg *next;//后指针-指向后一个结点
};
Bg *Bg1 = new Bg[sizeof(Bg)];//将一个烟囱结点设置成全局变量
void Position(int x, int y)//将光标移动到X,Y坐标处
{
	COORD pos = { x - 1, y - 1 };
	HANDLE Out = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleCursorPosition(Out, pos);
}
void CreatBird()//创建小鸟
{
	Bird->x=41;//小鸟的坐标
	Bird->y=10;
	Bird->condition =0;
}
void CreatBg()//创建数据结构为循环双向链表的烟囱
{
	Bg *Bg2 = (Bg*)malloc(sizeof(Bg));

	Bg1->x=90;Bg1->y =8;
	Bg2->x=Bg1->x+Distance;Bg2->y =9;

	Bg1->l_blank =Max_blank-Grade;
	Bg2->l_blank =Max_blank-Grade;

    Bg1->next=Bg2;
	Bg1->pri=Bg2;
	Bg2->next=Bg1;
	Bg2->pri=Bg1;
}
void InsertBg(Bg *p)//创建一个结点插入到传入结点之前。循环双向链表的插入
{int temp;
Bg *Bgs = (Bg*)malloc(sizeof(Bg));
Bgs->x=p->pri->x+Distance;
Bgs->l_blank =Max_blank-Grade;
srand((int)time(0));//将系统时间作为产生随机数的种子
temp=rand();//产生随机数
if(temp%2==0)//当随机数%==2时，烟囱口向下移动
{  if((temp%4+p->pri->y+Max_blank-Grade)<21)//检测是否存在向下移动的可行性
Bgs->y=p->pri->y+temp%4;//若有则向下移动temp%4个单位
else
Bgs->y=p->pri->y;//若无，则不动
}
else//反之亦然
{
	if((p->pri->y-temp%4)>2)
		Bgs->y=p->pri->y-temp%4;
	else
		Bgs->y=p->pri->y;
}

Bgs->pri=p->pri;//循环链表指向
Bgs->next =p;
p->pri->next=Bgs;
p->pri =Bgs;
}
void Check_Bg(Bg *q)//检查是否有烟囱超出屏幕，若有超出，则移动到屏幕右侧。
{ Bg *p=q;int i=0,temp;
while(++i<=5)//注意烟囱只有5个，时来回循环移动的
{  if(p->x>-4)//若有烟囱超出
p=p->next;
else
{   srand((int)time(0));
temp=rand();
if(temp%2==0)//++
{  if((temp%4+p->y+Max_blank-Grade)<21)
p->y=p->y+temp%4;
else
p->y=p->y;
p->x=p->pri->x+Distance;//将烟囱移动到前一结点的右侧+Distance的单位
p->l_blank=Max_blank-Grade;//计算上下两个烟囱的距离
}
else//反之亦然
{
	if((p->y-temp%4)>2)
		p->y=p->y-temp%4;
	else
		p->y=p->y;
	p->x=p->pri->x+Distance;
	p->l_blank=Max_blank-Grade;
}
}

}

}
void Loop_Bg(Bg *q)//烟囱单向循环移动
{
	Bg *p=q;int i=0;
	while(++i<=5)
	{p->x=p->x-1;
	p=p->next ;
	if(Bird->x==p->x)//每经过一个烟囱，加一分
	{Score+=1;
    if(Score%4==0&&Grade<4)//烟囱
		Grade++;
	}
	}
}
void Prt_Bg(Bg *q)//画烟囱----较冗余的代码
{  Bg *p=q;int i=0,k,j;
while(++i<=5)
{  if(p->x>0&&p->x<=78)
{ for(k=2;k<p->y;k++)//画出上烟囱上半部分
{   Position(p->x+1,k);
PR_Box;PR_Box;PR_Blank;//输出两个格子，输出空格，清除原来余影
}
Position(p->x,p->y);//画出上烟囱下半部分
PR_Box;PR_Box;PR_Box;PR_Blank;//输出三个格子，输出空格，清除原来余影
Position(p->x,p->y+p->l_blank);//画出下烟囱上半部分
PR_Box;PR_Box;PR_Box;PR_Blank;//输出三个格子，输出空格，清除原来余影
k=k+p->l_blank+1;
for(k;k<=22;k++)//画出下烟囱下半部分
{Position(p->x+1,k);
PR_Box;PR_Box;PR_Blank;//输出两个格子，输出空格，清除原来余影
}
Position(p->x,23);//输出地下的线
for(k=1;k<Distance/3-2;k++)
PR_Land;

}
p=p->next;
if(p->x==0)
{  for(j=2;j<p->y;j++)
{  Position(p->x+1,j);
PR_Blank;PR_Blank;
}
Position(p->x+1,p->y);
PR_Blank;PR_Blank;PR_Blank;
Position(p->x+1,p->y+Max_blank-Grade);
PR_Blank;PR_Blank;PR_Blank;
j=j+Max_blank-Grade+1;
for(j;j<=22;j++)
{Position(p->x+1,j);
PR_Blank;PR_Blank;
}
}
}

}

void PrtBg()//画上下两条线
{ int i;
Position(1,1);PR_Bg_TL;
Position(79,1);PR_Bg_TR;
Position(1,24);PR_Bg_DL;
Position(79,24);PR_Bg_DR;
for(i=3;i<=78;i+=2)
{ Position(i,1);PR_Bg_X;
Position(i,24);PR_Bg_X;
}
/*for(i=2;i<=23;i++)
{ Position(1,i);PR_Bg_Y;printf("%d",i-1);
Position(79,i);PR_Bg_Y;
}*/
}
void PrtBird()//画鸟
{ Position(Bird->x,Bird->y-1);//清除原来屏幕上面的鸟
PR_Blank;
Position(Bird->x,Bird->y);//画新鸟
PR_FBird;
Position(38,2);
printf("Score:%d",Score);//输出得分
}
int CheckYN(Bg *q)//检查是否撞壁
{ Bg *p=q;int i=0;
while(++i<=5)
{ if(Bird->y>23)//鸟是否落地
return 0;
if(Bird->x==p->x&&Bird->y<=p->y)//是否撞到上烟囱左侧
return 0;
if((Bird->x==p->x||Bird->x==p->x+1||Bird->x==p->x+2)&&Bird->y==p->y)//是否撞到上烟囱下侧
return 0;
if(Bird->x==p->x&&Bird->y>p->y+p->l_blank)//是否撞到下烟囱左侧
return 0;
if((Bird->x==p->x||Bird->x==p->x+1||Bird->x==p->x+2)&&Bird->y==p->y+p->l_blank)//是否撞到上烟囱上侧
return 0;
p=p->next;
}
return 1;
}

void Prtfirst()
{
	system("pause");
	Position(1,1);
	int i=0;
	while(i++<40*25)
		PR_Blank;
}
int main()
{
	int i=0;char ch;
	Prtfirst();//开始屏幕

	PrtBg();//画上下两边的框框
	CreatBg();//创建循环双向链表烟囱
	InsertBg(Bg1);//给循环双向链表中插入一个烟囱结点
	InsertBg(Bg1);//给循环双向链表中插入一个烟囱结点
	InsertBg(Bg1);//给循环双向链表中插入一个烟囱结点
	CreatBird();//创造小鸟
	while(1)
	{
		if(!CheckYN(Bg1))//检查鸟是否碰壁
			break;//若碰壁，则退出
		Check_Bg(Bg1);//检查是否有烟囱X坐标<0
		Prt_Bg(Bg1);//画背景烟囱
		PrtBird();//画小鸟
		Loop_Bg(Bg1);//背景烟囱单项循环
		Bird->y=Bird->y+1;
		if(GetAsyncKeyState(VK_UP))//检测是否有按键
		{   
			Position(Bird->x,Bird->y-1);
			PR_Blank;//在屏幕上清除原小鸟
			Bird->y=Bird->y-4;//鸟的位置上升4个长度
		}
		while(i++<500);
		{ Sleep(100);
		}
		i=0;
    }
	Position(38,10);
	printf("You Lost!");
    Position(1,25);
	system("pause");

}
// 1 2 3 4 5 6 7 8  10        15        20        25        30        35    38
//══════════════════════════════════════
//1    ■■            ■■
//2    ■■            ■■
//3    ■■            ■■
//4    ■■            ■■
//5    ■■            ■■
//6    ■■            ■■
//7   ■■■           ■■
//8                    ■■
//9                    ■■
//10    Ю            ■■■
//11
//12  ■■■
//13   ■■
//14   ■■
//15   ■■           ■■■
//16   ■■            ■■
//17   ■■    Ф      ■■
//18   ■■            ■■
//19   ■■            ■■
//20   ■■            ■■
//21   ■■            ■■
//22┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳┳┯┳
//══════════════════════════════════════

```

	 