---
title: Python 的时间格式介绍
toc: true
date: 2020-05-25 16:30:56
tags:
 - Python
---

本文主要理清 Python 的 datetime 和 date 各种操作。

<!-- more -->

## 1. Datetime — 日期和时间值操作



### 1.1 time 操作
```python
import datetime

t = datetime.time(1, 2, 3)
print(t)
print('hour       :', t.hour)
print('minute     :', t.minute)
print('second     :', t.second)
print('microsecond:', t.microsecond)
print('tzinfo     :', t.tzinfo)
```

输出

```
01:02:03
hour       : 1
minute     : 2
second     : 3
microsecond: 0
tzinfo     : None
```

### 1.2 Dates(日期操作)

日历日期值用日期类表示。 实例具有年、月和日的属性。 使用today方法很容易创建一个表示当前日期的日期。

```python
import datetime

today = datetime.date.today()
print(today)
print('ctime  :', today.ctime())
tt = today.timetuple()
print('tuple  : tm_year  =', tt.tm_year)
print('         tm_mon   =', tt.tm_mon)
print('         tm_mday  =', tt.tm_mday)
print('         tm_hour  =', tt.tm_hour)
print('         tm_min   =', tt.tm_min)
print('         tm_sec   =', tt.tm_sec)
print('         tm_wday  =', tt.tm_wday)
print('         tm_yday  =', tt.tm_yday)
print('         tm_isdst =', tt.tm_isdst)
print('ordinal:', today.toordinal())
print('Year   :', today.year)
print('Mon    :', today.month)
print('Day    :', today.day)
```

输出
```python
2020-05-25
ctime  : Mon May 25 00:00:00 2020
tuple  : tm_year  = 2020
         tm_mon   = 5
         tm_mday  = 25
         tm_hour  = 0
         tm_min   = 0
         tm_sec   = 0
Year   : 2020
Mon    : 5
Day    : 25
```

### 1.3 timedeltas

可以使用两个datetime对象上的基本算术，或者将datetime与timedelta组合来计算未来和过去日期。对日期进行减法计算会产生timedelta，并且可以从日期添加或减去timedelta以产生另一个日期。imedelta的内部值以天，秒和微秒存储。


计算两个时间的差值

```python
import time  
import datetime  

d1 = datetime.datetime(2018, 10, 18)  
d2 = datetime.datetime(2017, 12, 31)  

print ( (d1 - d2).days)

## 当前日期
curdate = datetime.date.today()
print ("curdate = ", curdate)


```

执行代码的输出

```
291
curdate =  2018-10-21
```

## 2. 应用


### 2.1 计算程序运行时间
```python

import time  
import datetime  

starttime = datetime.datetime.now()  

time.sleep(5)  
# 运行代码

endtime = datetime.datetime.now()  
print ((endtime - starttime).seconds )
```
### 2.2 获取当前时间

```python
>>> from datetime import datetime
>>> now = datetime.now() # 获取当前datetime
>>> print(now)
2020-05-25 16:28:07.198690
>>> print(type(now))
<class 'datetime.datetime'>
```

### 2.3 指定时间

```python
>>> from datetime import datetime
>>> dt = datetime(2015, 4, 19, 12, 20) # 用指定日期时间创建datetime
>>> print(dt)
2015-04-19 12:20:00
```

### 2.4 timestamp转换为datetime
要把timestamp转换为datetime，使用datetime提供的fromtimestamp()方法：

```python
>>> from datetime import datetime
>>> t = 1429417200.0
>>> print(datetime.fromtimestamp(t))
2015-04-19 12:20:00
```

注意到timestamp是一个浮点数，它没有时区的概念，而datetime是有时区的。上述转换是在timestamp和本地时间做转换。

本地时间是指当前操作系统设定的时区。可以进行时区转换。

```python
>>> from datetime import datetime
>>> t = 1429417200.0
>>> print(datetime.fromtimestamp(t)) # 本地时间
2015-04-19 12:20:00
>>> print(datetime.utcfromtimestamp(t)) # UTC时间
2015-04-19 04:20:00
```

### 2.5 str 转换为 datetime
很多时候，用户输入的日期和时间是字符串，要处理日期和时间，首先必须把str转换为datetime。转换方法是通过datetime.strptime()实现，需要一个日期和时间的格式化字符串：

```python
>>> from datetime import datetime
>>> cday = datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S')
>>> print(cday)
2015-06-01 18:19:59
```

字符串 `%Y-%m-%d %H:%M:%S` 规定了日期和时间部分的格式。详细的说明请参考Python文档。

注意转换后的datetime是没有时区信息的。

### 2.6 datetime 转换为 str

如果已经有了datetime对象，要把它格式化为字符串显示给用户，就需要转换为str，转换方法是通过strftime()实现的，同样需要一个日期和时间的格式化字符串：

```python
>>> from datetime import datetime
>>> now = datetime.now()
>>> print(now.strftime('%a, %b %d %H:%M'))
Mon, May 05 16:28
```

### 2.7 本地时间转换为UTC时间
本地时间是指系统设定时区的时间，例如北京时间是UTC+8:00时区的时间，而UTC时间指UTC+0:00时区的时间。

一个datetime类型有一个时区属性tzinfo，但是默认为None，所以无法区分这个datetime到底是哪个时区，除非强行给datetime设置一个时区：

```python
>>> from datetime import datetime, timedelta, timezone
>>> tz_utc_8 = timezone(timedelta(hours=8)) # 创建时区UTC+8:00
>>> now = datetime.now()
>>> now
datetime.datetime(2015, 5, 18, 17, 2, 10, 871012)
>>> dt = now.replace(tzinfo=tz_utc_8) # 强制设置为UTC+8:00
>>> dt
datetime.datetime(2015, 5, 18, 17, 2, 10, 871012, tzinfo=datetime.timezone(datetime.timedelta(0, 28800)))
```
如果系统时区恰好是UTC+8:00，那么上述代码就是正确的，否则，不能强制设置为UTC+8:00时区。

### 2.8 时区转换
我们可以先通过utcnow()拿到当前的UTC时间，再转换为任意时区的时间：

拿到UTC时间，并强制设置时区为UTC+0:00:
```python
>>> utc_dt = datetime.utcnow().replace(tzinfo=timezone.utc)
>>> print(utc_dt)
2015-05-18 09:05:12.377316+00:00
# astimezone()将转换时区为北京时间:
>>> bj_dt = utc_dt.astimezone(timezone(timedelta(hours=8)))
>>> print(bj_dt)
2015-05-18 17:05:12.377316+08:00
# astimezone()将转换时区为东京时间:
>>> tokyo_dt = utc_dt.astimezone(timezone(timedelta(hours=9)))
>>> print(tokyo_dt)
2015-05-18 18:05:12.377316+09:00
# astimezone()将bj_dt转换时区为东京时间:
>>> tokyo_dt2 = bj_dt.astimezone(timezone(timedelta(hours=9)))
>>> print(tokyo_dt2)
2015-05-18 18:05:12.377316+09:00

```

时区转换的关键在于，拿到一个datetime时，要获知其正确的时区，然后强制设置时区，作为基准时间。

利用带时区的datetime，通过astimezone()方法，可以转换到任意时区。

注：不是必须从UTC+0:00时区转换到其他时区，任何带时区的datetime都可以正确转换，例如上述bj_dt到tokyo_dt的转换。


## 3. 日期格式

python中时间日期格式化符号：

```
%y 两位数的年份表示（00-99）
%Y 四位数的年份表示（000-9999）
%m 月份（01-12）
%d 月内中的一天（0-31）
%H 24小时制小时数（0-23）
%I 12小时制小时数（01-12）
%M 分钟数（00=59）
%S 秒（00-59）
%a 本地简化星期名称
%A 本地完整星期名称
%b 本地简化的月份名称
%B 本地完整的月份名称
%c 本地相应的日期表示和时间表示
%j 年内的一天（001-366）
%p 本地A.M.或P.M.的等价符
%U 一年中的星期数（00-53）星期天为星期的开始
%w 星期（0-6），星期天为星期的开始
%W 一年中的星期数（00-53）星期一为星期的开始
%x 本地相应的日期表示
%X 本地相应的时间表示
%Z 当前时区的名称
%% %号本身
```

## 参考
主要参考：https://www.yiibai.com/python/python_date_time.html


---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info