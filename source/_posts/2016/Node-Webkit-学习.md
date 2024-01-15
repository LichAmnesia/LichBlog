---
title: Node-Webkit 学习
date: 2016-08-26 09:26:01
tags:
    - Node
---


# 1. 介绍
通过Node-Webkit你可以轻松使用HTML5+JS开发跨平台的桌面应用。

<!--more-->

# 2. 安装以及运行
下载最新版本NW.js,在 Windows 和 linux 下，直接找到 nw 可执行文件所在目录。windows 下需要加入 Path，然后直接命令行下
```
nw .
```
就可以编译整个项目并进行运行。
项目文件夹下必须要有` package.json `文件。下面是一个简单的示例：
`package.json `里的内容：
{
  "name": "helloworld",
  "main": "index.html"
}
`index.html `里的内容：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Context Menu</title>
  </head>
  <body style="width: 100%; height: 100%;">
    <p>'Right Click' to show context menu.</p>
    <h1>Hello World!</h1>
    <script>
        var menu = new nw.Menu();

        menu.append(new nw.MenuItem({
            label: 'Item A',
            click: function(){
                alert('You have clicked at "Item A"');
            }
        }));
        menu.append(new nw.MenuItem({ label: 'Item B'}));
        menu.append(new nw.MenuItem({ type: 'separator'}));
        menu.append(new nw.MenuItem({ label: 'Item C'}));

        document.body.addEventListener('contextmenu', function(ev){
            ev.preventDefault();
            menu.popup(ev.x, ev.y);
            return false;
            }, false);

        var os = require('os');
        document.write('you are running on ', os.platform());

        // Get the current window
        var win = nw.Window.get();
        win.showDevTools()
    </script>
    
  </body>
</html>
```

在当前文件夹下运行：
```
nw .
```
可以运行整个项目

# 2. 打包项目

# 引入框架
superagent：发起http请求
cheerio：解析http返回的html内容
async：多线程并发控制
安装命令 npm install --save PACKAGE_NAME，执行以下三条命令后，工程目录下多了一个node_modules目录，该目录就是引入的框架内容。
```
$npm install --save superagent
$npm install --save cheerio
$npm install --save async
```

# 正则表达式
http://www.cnblogs.com/rubylouvre/archive/2010/03/09/1681222.html
http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
RegExp 对象方法
支持正则表达式的 String 对象的方法

使用构造函数构成正则： http://www.cnblogs.com/season-huang/p/3544873.html

# js 回调
[教程](http://www.cnblogs.com/moltboy/archive/2013/04/24/3040213.html)
[教程](http://www.html-js.com/article/Sexy-Javascript-understand-the-callback-function-with-the-use-of-Javascript-in)


# node sql连接 sqlit使用
[一个连接sql的开源框架](https://github.com/kripken/sql.js)
sql.js is hosted on npm. To install it, you can simply run npm install sql.js. Alternatively, you can simply download the file sql.js, from the download link below.


# 数据库格式
ID 日期 地址 价格 规格型号 牌号 与上一天涨跌情况
ID datetime city price product_model model status
[日期转换](http://www.cnblogs.com/highend/archive/2010/03/06/1679618.html)

# 获取module 使用


# js自动生成table
[网址](http://www.cnblogs.com/thehappyyouth/p/3183584.html)

# 参考
[开始 NODE-WEBKIT 前，你应该知道的](http://yedingding.com/2014/07/28/node-webkit-intro.html)

# echarts 的使用指南
[入门教程](http://echarts.baidu.com/echarts2/doc/start.html)


# bat文件撰写
[编写教程](https://wsgzao.github.io/post/windows-batch/)


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info