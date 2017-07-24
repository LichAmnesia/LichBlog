---
title: 解决 Windows Git 出现 Permission denied 问题
date: 2016-03-09 16:57:37
tags:
    - Git
---


# 1. 问题情况
由于之前已经使用过别的账号登陆过git，占用了id_rsa的文件因为用户名不一样，再生成另一个的公匙和私匙文件之后怎么用都不行
```git
ssh -T git@github.com
Permission denied (publickey).
```

clone也不行
```git
$ git clone git@github.com:LichAmnesia/***.git
Cloning into '***h'...
Permission denied (publickey).
fatal: Could not read from remote repository.
```

# 2. 解决方法

先生成另一个名字的公私匙
```git
ssh-keygen -t rsa -C "YOUR_EMAIL@YOUREMAIL.COM" -f ~/.ssh/github_rsa
```

然后在git bash下进入~/.ssh/文件夹，其实~对应了C:/用户/用户名/.ssh/文件夹
```git
eval "$(ssh-agent -s)" #有可能是这个命令：eval $(ssh-agent)

```


这个命令打开ssh-agent。然后进入相应目录
```git
ssh-add ~/.ssh/github_rsa
```
把这个加进去。
最后运行。
```git
ssh -T git@github.com
Hi LichAmnesia! You've successfully authenticated, but GitHub does not provide shell access.
```


# 3. 修改配置文件
在.ssh/文件夹下面新建文件config加入
```
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/Github
```