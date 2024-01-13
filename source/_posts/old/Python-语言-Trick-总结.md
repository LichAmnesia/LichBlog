---
title: Python 语言 Trick 总结
date: 2017-08-17 11:51:19
tags:
    - Python
---

本文主要讲`Python`语言的一些方便用法，以及一些数据结构的调用。

<!-- more -->

### join
```
''.join(List[str])
```
可以得到一个把list中元素合并的str

### re.sub
对于输入的一个字符串，利用正则表达式（的强大的字符串处理功能），去实现（相对复杂的）字符串替换处理，然后返回被替换后的字符串。比如下面把123 456 都替换成222
```
inputStr = "hello 123 world 456"
replacedStr = re.sub("\d+", "222", inputStr)
```
### Int max
```
sys.maxint
```
### ord(c)
获得char的ascii码
相反过程chr(97)将会得到`'a'`

### dictionary
```
d.get(mask, 0)
```
如果没有mask返回0

dic = collections.defaultdict(list)
可以存储u'MUYC'值
```python
for key, value in dic.iteritems():
    print key, value
```
### Bool 值为假
在Python中所有的对象都可以进行真值测试，下面罗列一下判断为假的情况：

- None
- False
- 数值中的零，包括0，0.0，0j（虚数）
- 空序列，包括空字符串(”)，空元组(())，空列表([])
- 空的字典{}
- 自定义的对象的实例，该对象的bool方法返回False或者len方法返回0

### permutations 操作
```
permutations([i for i in nums if i != n])
```
### enumerate
nums 是一个数组
```
for i, n in enumerate(self.nums):
    print i, n
``` 
遍历index 和value
### Map函数：
原型：map(function, sequence)，作用是将一个列表映射到另一个列表，
使用方法：
```
def f(x):
    return x**2
    
l = range(1,10)
map(f,l)
```
```
Out: [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### Set 里 discard
```
s.discard(x)  
```  
如果在 set “s”中存在元素 x, 则删除  

### 数学
对于一个非负数n，它的平方根不会小于大于（n/2+1）。在[0, n/2+1]这个范围内可以进行二分搜索，求出n的平方根。


### zip方法

```
name=('jack','beginman','sony','pcky')
 2 >>> age=(2001,2003,2005,2000)
 3 >>> for a,n in zip(name,age):
 4     print a,n
 5 
 6 输出：
 7 jack 2001
 8 beginman 2003
 9 sony 2005
10 pcky 200
```

### Python函数式编程之filter()

filter()
格式：
filter(func, seq)
该函数的目的是提取出seq中能使func为true的元素序列。func函数是一个布尔函数，filter()函数调用这个函数一次作用于seq中的每一个元素，筛选出符合条件的元素，并以列表的形式返回。
下面举一个列子说明，假如有个列表，列表中有几个数字，现在我想从这些数字中，选出即能被2整除又能被3整除的数。
```
nums = [2,3,6,12,15,18]
def nums_res (x):
  return x % 2 == 0 and x % 3 == 0
print filter(nums_res, nums)
```
执行结果：[6, 12, 18]

### Python Strip 方法

Python strip() 方法用于移除字符串头尾指定的字符（默认为空格）。

### , 使用
```
w = []
s = "sss"
w += s # w = ["s","s","s"]
w += s, # w = ["sss"

```

### collections.deque()
参考这篇[博客](http://xiaorui.cc/2014/11/02/python%E4%BD%BF%E7%94%A8deque%E5%AE%9E%E7%8E%B0%E9%AB%98%E6%80%A7%E8%83%BD%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97/)。


### iter 用法
```
vals = iter([1, 2, 3])
val = next(vals)
```

### Python startswith() 
startwith(方法用于检查字符串是否是以指定子字符串开头，如果是则返回 True，否则返回 False。如果参数 beg 和 end 指定值，则在指定范围内检查。
语法
startswith()方法语法：
```
str.startswith(str, beg=0,end=len(string))
```
参数
str -- 检测的字符串。
strbeg -- 可选参数用于设置字符串检测的起始位置。
strend -- 可选参数用于设置字符串检测的结束位置。

### ljust() 方法
Python ljust() 方法返回一个原字符串左对齐,并使用空格填充至指定长度的新字符串。如果指定的长度小于原字符串的长度则返回原字符串。
语法
ljust()方法语法：
```
str.ljust(width[, fillchar])
```
参数
width -- 指定字符串长度。
fillchar -- 填充字符，默认为空格。
```
str = "this is string example....wow!!!";

print str.ljust(50, '0');
```
>this is string example....wow!!!000000000000000000

### Python heap操作

heapq.heapify(x)
Transform list x into a heap, in-place, in linear time.
```

# Definition for an interval.
# class Interval(object):
#     def __init__(self, s=0, e=0):
#         self.start = s
#         self.end = e
import heapq

class Solution(object):
    def minMeetingRooms(self, intervals):
        """
        :type intervals: List[Interval]
        :rtype: int
        """
        heap, num = [], 0
        intervals.sort(lambda a, b: a.strat - b.start)
        for i in range(len(intervals)):
            if len(heap) < 1:
                heapq.headpush(heap, intervals[i].end)
                num += 1
            elif heap[0] < intervals[i].start:
                heapq.pop(heap)
                heapq.headpush(heap, intervals[i].end)
            else:
                heapq.headpush(heap, intervals[i].end)
                num += 1
        return num
```

How to delete an item in python heap
```
h[i] = h[-1]
h.pop()
heapq._siftup(h, i)
heapq._siftdown(h, 0, i)
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info