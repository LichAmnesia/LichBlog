---
title: HDU 3723 Delta Wave (2010 天津赛区 D)
tags:
  - ACM
date: 2013-07-30 13:49:53
---

这题也是比赛的时候过得，用java的大数写的，推出之间的递推的一个关系式，然后``就是java了

	 

```java
import java.io.*;
import java.util.*;
import java.math.*;

public class Main {
	public static void main(String[] args) {
		Scanner in = new Scanner (new BufferedInputStream(System.in));
		BigInteger ans,tmp;
		BigInteger mod = BigInteger.valueOf(10).pow(100);
		int N;
		while(in.hasNext())
		{
			N = in.nextInt();
			tmp = BigInteger.valueOf(1);
			ans = BigInteger.valueOf(1);
			for(int i = 1; i<=N/2;i++)
			{
				BigInteger s=BigInteger.valueOf(N-2*i+1);
				BigInteger t=BigInteger.valueOf(i);
				tmp=tmp.multiply(s).multiply(s.add(BigInteger.valueOf(1)))
				.divide(t).divide(t.add(BigInteger.valueOf(1)));
				ans=ans.add(tmp);				
			} 			
			System.out.println(ans.mod(mod));
		} 	
	}

}
```
	 