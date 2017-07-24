---
title: POJ 1205 Water Treatment Plants (DP+高精度)
tags:
  - ACM
date: 2013-11-12 10:20:32
---

大意是，在一条线上有`N个城市，它们由一个污水处理系统连接着，每个城市有三个选择：

1.把自己的污水排到河里V

2.把自己的污水送到右边>

3.把自己的污水送到左边<

至少要有一个城市排水。要求给N个城市，方案种数。

最左边只有两种选择：V，>

令 dp[i][0]:V

dp[i][1]:>

dp[i][2]:<

则：dp[i][0]=dp[i-1][0]+dp[i-1][1]+dp[i-1][2]

dp[i][1]=dp[i-1][0]+dp[i-1][1]+dp[i-1][2]

dp[i][2]=dp[i-1][0]+dp[i-1][2]//刚开始总是很但是会不会有没有城市排水的问题，但是这个方程保证了不会出现><的情况

但是这三个方程不能保证不会出现一排全是>>>>>的情况，所以在算最后一个的时候，只能算dp[n][0]+dp[n][2]

注意到dp[i][0]     dp[i][1]总是相等，所以可以少列一个状态转移方程

dp[i][0]=2*dp[i-1][0]+dp[i-1][2]

dp[i][2]=dp[i-1][0]+dp[i-1][2]

即dp[i]=3*dp[i-1]-dp[i-2]

到此为止，整个状态转移方程就列出来了。

由于dp的值可能会很大，所以就要用到java里面的BigInteger

 

```java
import java.io.*;
import java.math.*;
import java.util.*;
import java.text.*;

public class Main{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		BigInteger dp[] = new BigInteger[110];
		dp[1] = BigInteger.valueOf(1);
		dp[2] = BigInteger.valueOf(3);
		for (int i = 3; i <= 100; i ++){
			dp[i] = dp[i-1].multiply(BigInteger.valueOf(3))
				.subtract(dp[i-2]);
		}
		while (in.hasNext()){
			int n = in.nextInt();
			System.out.println(dp[n]);
		}
	}
}
```