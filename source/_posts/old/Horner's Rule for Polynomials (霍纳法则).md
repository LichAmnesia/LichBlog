---
title: "Horner's Rule for Polynomials (霍纳法则)"
tags:
  - 数学
  - 算法
date: 2013-08-28 23:04:08
---

<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> </span>

### 
	<a name="SECTION00010000000000000000" style="color: rgb(202, 0, 0);">Horner&#39;s Rule for Polynomials</a>

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">A general polynomial of degree </span>![$n$](http://www.physics.utah.edu/~detar/lessons/c++/array/img1.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> can be written as </span>

<div align="right" style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">
	<table align="center" width="100%">
		<tbody>
			<tr valign="center">
				<td align="middle" nowrap="nowrap">
					<a name="eq:polyP" style="color: rgb(202, 0, 0);"></a>![/begin{displaymath}
P(x) = a_0 + a_1 x + a_2 x^2 + ... + a_n x^n = /sum_{i=0}^n a_i x^i
/end{displaymath}](http://www.physics.utah.edu/~detar/lessons/c++/array/img2.gif)
				</td>
				<td align="right" width="10">
					(1)
				</td>
			</tr>
		</tbody>
	</table>
</div>

	 

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">If we use the Newton-Raphson method for finding roots of the polynomial we need to evaluate both </span>![$P(x)$](http://www.physics.utah.edu/~detar/lessons/c++/array/img3.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> and its derivative </span>![$P^/prime(x)$](http://www.physics.utah.edu/~detar/lessons/c++/array/img4.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> for any </span>![$x$](http://www.physics.utah.edu/~detar/lessons/c++/array/img5.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">.</span>

	It is often important to write efficient algorithms to complete a project in a timely manner. So let us try to design the algorithm for evaluating a polynomial so it takes the fewest flops (floating point operations, counting both additions and multiplications). For concreteness, consider the polynomial 

	 

<div align="center" style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">
	![/begin{displaymath}
7x^3 + 5x^2 - 4x + 2.
/end{displaymath}](http://www.physics.utah.edu/~detar/lessons/c++/array/img6.gif)
</div>

	 

	 

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">The most direct evaluation computes each monomial </span>![$a_i x^i$](http://www.physics.utah.edu/~detar/lessons/c++/array/img7.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> one by one. It takes </span>![$i$](http://www.physics.utah.edu/~detar/lessons/c++/array/img8.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> multiplications for each monomial and </span>![$n$](http://www.physics.utah.edu/~detar/lessons/c++/array/img1.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">additions, resulting in </span>![$n(n+3)/2$](http://www.physics.utah.edu/~detar/lessons/c++/array/img9.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> flops for a polynomial of degree </span>![$n$](http://www.physics.utah.edu/~detar/lessons/c++/array/img1.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">. That is, the example polynomial takes three flops for the first term, two for the second, one for the third, and three to add them together, for a total of nine. If we reuse </span>![$x^i$](http://www.physics.utah.edu/~detar/lessons/c++/array/img10.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">from monomial to monomial we can reduce the effort. In the above example, working backwards, we can save </span>![$x^2$](http://www.physics.utah.edu/~detar/lessons/c++/array/img11.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> from the second term and get </span>![$x^3$](http://www.physics.utah.edu/~detar/lessons/c++/array/img12.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> for the first in one multiplication by </span>![$x$](http://www.physics.utah.edu/~detar/lessons/c++/array/img5.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">. This strategy reduces the work to </span>![$3n-1$](http://www.physics.utah.edu/~detar/lessons/c++/array/img13.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> flops overall or eight flops for the example polynomial. For short polynomials, the difference is trivial, but for high degree polynomials it is huge. A still more economical approach regroups and nests the terms as follows: </span>

	 

<div align="center" style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">
	![/begin{displaymath}
2 - 4x + 5x^2 + 7x^3 = 2 + x[-4 + x(5 + 7x)].
/end{displaymath}](http://www.physics.utah.edu/~detar/lessons/c++/array/img14.gif)
</div>

	 

	 

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">(Check the identity by multiplying it out.) This procedure can be generalized to an arbitrary polynomial. Computation starts with the innermost parentheses using the coefficients of the highest degree monomials and works outward, each time multiplying the previous result by </span>![$x$](http://www.physics.utah.edu/~detar/lessons/c++/array/img5.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;"> and adding the coefficient of the monomial of the next lower degree. Now it takes </span>![$2n$](http://www.physics.utah.edu/~detar/lessons/c++/array/img15.gif)<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">flops or six for the above example. This is the efficient </span>**Horner&#39;s algorithm**<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">.</span>

	 

	<span style="color: rgb(0, 0, 0); font-family: Arial; font-size: 14.399999618530273px; line-height: 26px;">还有一个网站：</span>[http://www.wutianqi.com/?p=1426](http://www.wutianqi.com/?p=1426)