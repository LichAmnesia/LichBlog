---
title: JavaScript 时间格式和Java timestamp时间格式
date: 2016-11-26 06:52:38
tags:
  - JavaScript
  - Java
---

# 1. 介绍
本文主要介绍`Javascript`时间格式，以及如何传送这种时间格式数据到`Java`后台。`Java`端时间格式为`timestamp`。

<!--more-->

# 2. JS 时间戳
```javascript
var date = new Date(时间戳); //获取一个时间对象,也可以直接new Date();这样就是当前时间。

date.getFullYear();  // 获取完整的年份(4位,1970)
date.getMonth();  // 获取月份(0-11,0代表1月,进行显示的时候要加一)
date.getDate();  // 获取日(1-31)
date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
date.getHours();  // 获取小时数(0-23)，
date.getMinutes();  // 获取分钟数(0-59)
date.getSeconds();  // 获取秒数(0-59)
```

### 2.1 获取Date方式
```javascript
new Date("month dd,yyyy hh:mm:ss");
new Date("month dd,yyyy");
new Date("yyyy/MM/dd hh:mm:ss");
new Date("yyyy/MM/dd");
new Date(yyyy,mth,dd,hh,mm,ss);
new Date(yyyy,mth,dd);
new Date(ms);
```
### 2.2 显示时间
```javascript
var d = new Date()
console.log(d.toString()))
```
这样就可以得到时间的具体格式。

### 2.3 JS端获取服务器的时间格式
如果是使用`Java`后台并且传回来的数据格式是`timestamp`那么JS得到的就是一个时间戳。
```javascript
var d = new Date(data) //data 表示的是timestamp的时间戳
console.log(d.toString()))
```

# 3. timestamp 时间
`Timestamp`时间格式可以直接存到`mysql`里。

### 3.1 JS 端Date格式转换timestamp并进行传输
因为JS端数据格式和`Java`后台的数据格式不一样。所以需要进行一轮转化操作。`Java`端采用`Spring MVC`来得到数据。
```java
@RequestMapping("/example")
public String example(@RequestParam Timestamp starttime, @RequestParam Timestamp endtime){
    //do here
}
```
下面是把JS Date时间戳转化为`Java`后台所需要的`timestamp`数据格式。直接调用然后传回就可以。
```javascript
getTimeStamp(now) {
    return (now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate())  + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())));
}
```


# 参考
[1] JavaScript Date 对象: http://www.w3school.com.cn/jsref/jsref_obj_date.asp


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
