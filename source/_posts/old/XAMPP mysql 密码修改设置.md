---
title: XAMPP mysql 密码修改设置
tags:
  - Mysql
date: 2015-12-13 00:31:22
---

 

 

安装完XAMPP后，MySQL的默认账号为root，密码为空。
如果要连接数据库，记得

<pre class="lang:default decode:true ">user = 'root';
password = '';</pre>

 

如果需要修改，可以直接在phpmyadmin里面修改：
1\. 游览器打开 http://localhost/phpmyadmin，进入后点击'用户账户'
2\. 点击用户为root，主机为localhost的修改权限，在上面会有一个修改密码点击。
3\. 输入新的密码。点击执行。

这样mysql密码已经更新，但是phpmyadmin的并没有。需要修改它的配置。在XAMPP上点击explore，进去XAMPP\phpMyAdmin\config.inc.php。修改

<pre class="lang:php decode:true ">$cfg['Servers'][$i]['password'] = '<相应密码>';
</pre>

 