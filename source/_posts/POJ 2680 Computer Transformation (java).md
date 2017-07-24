---
title: POJ 2680 Computer Transformation (java)
tags:
  - ACM
date: 2014-01-28 23:08:00
---

一个序列，开始时为1，接下来每步，该序列中的1变为01,0变为10，求第n步时序列中连续的0有多少对？

 

令Sn表示第n个序列，~Sn表示第n个序列的反，An表示第n步时序列中连续的0的对数。

	0 ： 1
	1 ： 01
	2 ： 1001
	3 ： 01101001
	4 ： 1001011001101001
	5 ： 01101001100101101001011001101001


观察可得，Sn=~S(n-1)+S(n-1);

(1)当n为奇数时,Sn中连续的1和0的数相同

~Sn的末位和Sn的首位都是0，

A(n+1)=An+An +1;

(2)当n为偶数时,Sn中连续的1比0的少1

~Sn的末位是0，Sn的首位都是0，

A(n+1)=An+An - 1;

 

然后根据这个以及高中数学找出一个关系式子,求出An的表达式

```java
import java.io.*;
import java.util.*;
import java.math.*;

public class Main{
	public static void main(String[] args){
		int n;
		BigInteger two,ans;
		Scanner in = new Scanner(System.in);
		while (in.hasNext()){
			n = in.nextInt();
			two = BigInteger.valueOf(2);
			ans = two;
			if(n % 2 == 0)
            {
                ans = ans.pow(n-1).subtract(two).divide(BigInteger.valueOf(3)).add(BigInteger.ONE);
            }
            else
            {
                ans = ans.pow(n-1).subtract(BigInteger.ONE).divide(BigInteger.valueOf(3));
            }
            System.out.println(ans);
		}
	}
} 
```


另外的写法:

```java
import java.util.*;
import java.math.*;

 public class Main{
    public static void main(String[] args){
     int n;
      BigInteger  a[]=new  BigInteger[1001];
     a[1]=BigInteger.ZERO;
     for(int i=2;i<=1000;i++){
           if(i%2==0) a[i]=a[i-1].multiply(BigInteger.valueOf(2)).add(BigInteger.ONE);
           else       a[i]=a[i-1].multiply(BigInteger.valueOf(2)).subtract(BigInteger.ONE);
        }
     Scanner cin = new Scanner(System.in);
     while(cin.hasNext())
        {
       n = cin.nextInt();
       System.out.println(a[n]);
     }
   }
}
```

	 