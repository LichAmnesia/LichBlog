---
title: Gantt图 解释抢先式SJF调度算法
tags:
  - 操作系统
date: 2014-03-17 10:44:37
---

这是操作系统课上的作业，SJF的那个调度要计算的实在太多就写了个程序帮我跑了。

题目如下：


<div align="left" style="margin-left: 10.5pt;">
	**进程         到达时间              执行时间**
</div>

<div align="left" style="margin-left: 27pt;">
	   **P1               0                    10**
</div>

<div align="left" style="margin-left: 27pt;">
	**   P2               1                     8**
</div>

<div align="left" style="margin-left: 27pt;">
	**   P3               2                     2**
</div>

<div align="left" style="margin-left: 27pt;">
	**   P4               3                     4**
</div>

<div align="left" style="margin-left: 27pt;">
	**   P5               4                     8**
</div>

<div align="left">
	**画****Gantt****图说明使用****FCFS****、非抢先式****SJF****、抢先式****SJF****、****RR****（时间片＝****3****）调度算法进程调度情况。并分别求四种算法的平均周转时间，平均等待时间。平均权周转时间。**
</div>

<div align="left">
	用程序模拟了下实践过程
</div>

```cpp
#include <iostream>
using namespace std;
int main(int argc, char const *argv[])
{
	int wait[6] = {0};
	int p[6] = {0,10,8,2,4,8};
	int use[6] = {0};
	int arrive[6] = {0,0,1,2,3,4};
	int end[6] = {0};
	int flag = 1;
	for (int t = 0; ; t ++){

		//判断进程是否都执行完
		for (int cnt = 0,i = 1; i <= 5; i ++){
			if (use[i] == p[i]) cnt ++;
			if (use[i] == p[i] && end[i] == 0) end[i] = t;
			if (cnt == 5) flag = 0;
		}
		if (!flag) break;

		//判定这一秒该分配给哪一个进行调度
		//vali表示哪一个进程，val指的最大响应比
		int vali;double val = -1;
		for (int i = 1; i <= 5; i ++){
			if (arrive[i] <= t && use[i] < p[i]){
				//算响应比
				double tmp = (0.0 + wait[i] + p[i] - use[i]) / (p[i] - use[i]);
				//安排调度时先看哪个
				//>表示继续做先出现的 >=表示做继续做最后出现的那个进程
				if (tmp >= val){
					val = tmp;
					vali = i;
				}
			}	
		}

		use[vali] ++;
		for (int i = 1; i <= 5; i ++){
			if (arrive[i] <= t && use[i] < p[i] && vali != i)
				wait[i] ++;
		}

		cout << "Time:" << t << " P" << vali << endl;  
	}

	for (int i = 1; i <= 5; i ++){
		cout << "P" << i << " wait_time: " << wait[i] << endl;
	}
	for (int i = 1; i <= 5; i ++){
		cout << "P" << i << " cycling_time: " << end[i] - arrive[i] << endl;
	}
	return 0;
}
```


结果如下，有可能出现两种调度，具体怎样还不清楚是哪种

<table border="0" cellpadding="0" cellspacing="0" style="width:347px;" width="347">
	<colgroup>
		<col />
		<col />
	</colgroup>
	<tbody>
		<tr height="19">
			<td height="19" style="height:19px;width:168px;">
				Time:0 P1
			</td>
			<td style="width:179px;">
				Time:0 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:1 P1
			</td>
			<td>
				Time:1 P2
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:2 P2
			</td>
			<td>
				Time:2 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:3 P3
			</td>
			<td>
				Time:3 P3
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:4 P3
			</td>
			<td>
				Time:4 P3
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:5 P4
			</td>
			<td>
				Time:5 P4
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:6 P4
			</td>
			<td>
				Time:6 P4
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:7 P4
			</td>
			<td>
				Time:7 P4
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:8 P4
			</td>
			<td>
				Time:8 P4
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:9 P2
			</td>
			<td>
				Time:9 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:10 P2
			</td>
			<td>
				Time:10 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:11 P2
			</td>
			<td>
				Time:11 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:12 P2
			</td>
			<td>
				Time:12 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:13 P2
			</td>
			<td>
				Time:13 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:14 P2
			</td>
			<td>
				Time:14 P2
			</td>
		</tr>
		<tr height="19">
			<td height="19" style="height:19px;">
				Time:15 P2
			</td>
			<td>
				Time:15 P2
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:16 P1
			</td>
			<td>
				Time:16 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:17 P1
			</td>
			<td>
				Time:17 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:18 P1
			</td>
			<td>
				Time:18 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:19 P1
			</td>
			<td>
				Time:19 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:20 P1
			</td>
			<td>
				Time:20 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:21 P1
			</td>
			<td>
				Time:21 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:22 P1
			</td>
			<td>
				Time:22 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:23 P1
			</td>
			<td>
				Time:23 P1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:24 P5
			</td>
			<td>
				Time:24 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:25 P5
			</td>
			<td>
				Time:25 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:26 P5
			</td>
			<td>
				Time:26 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:27 P5
			</td>
			<td>
				Time:27 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:28 P5
			</td>
			<td>
				Time:28 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:29 P5
			</td>
			<td>
				Time:29 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:30 P5
			</td>
			<td>
				Time:30 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				Time:31 P5
			</td>
			<td>
				Time:31 P5
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P1 wait_time: 14
			</td>
			<td>
				P1 wait_time: 14
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P2 wait_time: 7
			</td>
			<td>
				P2 wait_time: 7
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P3 wait_time: 1
			</td>
			<td>
				P3 wait_time: 1
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P4 wait_time: 2
			</td>
			<td>
				P4 wait_time: 2
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P5 wait_time: 20
			</td>
			<td>
				P5 wait_time: 20
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P1 cycling_time: 24
			</td>
			<td>
				P1 cycling_time: 24
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P2 cycling_time: 15
			</td>
			<td>
				P2 cycling_time: 15
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P3 cycling_time: 3
			</td>
			<td>
				P3 cycling_time: 3
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P4 cycling_time: 6
			</td>
			<td>
				P4 cycling_time: 6
			</td>
		</tr>
		<tr height="18">
			<td height="18" style="height:18px;">
				P5 cycling_time: 28
			</td>
			<td>
				P5 cycling_time: 28
			</td>
		</tr>
	</tbody>
</table>

	 

	 

	 