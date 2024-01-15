---
title: POJ 1001 Exponentiation (Java大数)
tags:
  - ACM
date: 2013-11-12 10:42:53
---

```java
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Scanner;
import java.io.*;  
public class Main {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		/*读入：
		 * 用Scanner 类定义的对象进行控制台读入，Scanner类在java.util.*包中
		 * Scanner input = new Scanner(System.in);
		 * int n = input.nextInt();
		 * BigInteger nn = input.nextBigInteger();
		 * ......................................
		 */
		while (input.hasNext())   //等同于!= EOF
		{
			int n;
			BigDecimal a = input.nextBigDecimal(); //读入一个BigDecimal
			n = input.nextInt();
			a = a.pow(n);  // 返回其值为 (thisn) 的 BigDecimal，准确计算该幂，使其具有无限精度。
			//pow(int n, MathContext mc)   返回其值为 (thisn) 的 BigDecimal。
			a = a.stripTrailingZeros();
			/*public BigDecimal stripTrailingZeros  (strip 脱去剥夺，trailing(拖尾，后面的))
			 * 返回数值上等于此小数，但表示形式溢出所有尾部0的BigDecimal
			 * 1.22222300000   用过之后为1.222223 类型还是BigDeciaml类型
			 */
			String str = a.toPlainString();
			/*
			 * 注意toPlainString()和toString()的区别
			 * 对于:BigDecimal s; s = (0.4321^20)
			 * String str = s.toPlainString();
			 * System.out.println(str);
			 * 输出:0.0000000514855464107。。。。。01
			 * 
			 *若String str = s.toString();
			 *输出为： 5.14855464107。。。。01E-8
			 */
			if (str.startsWith("0.")) //以什么开始
			{
				str = str.substring(1);
				/*substring是java中截取字符串的一个方法
				 * 有两种传参方式
				 * 一种是：public String substring(int deginindex)
				 * 返回一个新的字符串，它是此字符串的一个子串，该字串从指定索引处的字符开始直到字符串末尾
				 * 另一种是public String substring(int deginindex,int endindex)
				 * 返回一个新字符串，也是它的一个子串。该字串从beginindex处开始
				 * 直到索引到endindex-1处的字符。因此该字符串的长度为endindex-beginindex
				 * 
				 * 
				 * substr
				 * 该方法用于返回一个从指定位置开始的指定长度的子字符串
				 *substr(start,length);
				 */
			}
			System.out.println(str);
		}
	}
}
```

	 