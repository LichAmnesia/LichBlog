---
title: muttrc linux 发送邮件
date: 2017-08-17 12:21:45
tags:
    - Linux
---

本文介绍如何使用`muttrc`发送邮件。

<!-- more -->

安装
```
sudo apt-get install mutt msmtp
```

在配置文件 /etc/Muttrc 或是 ~/.muttrc 中添加
```
set sendmail="/usr/bin/msmtp" 
set use_from=yes 
set envelope_from=yes 
set realname="Boulder Weather Report" 
set from=xxx@126.com
```



在配置文件 ~/.msmtprc 添加
```
account default 
host smtp.126.com 
auth plain 
user xxx@126.com
password xxxxxx
```

```
echo hello world | mutt -s "test mail"  –- xx@xx.edu
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info