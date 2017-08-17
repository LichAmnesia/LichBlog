---
title: hexo 自动部署远程脚本
date: 2017-08-13 21:09:04
tags:
    - Python
    - hexo
---


# 1. 介绍
本文主要介绍自动部署远程的博客（基于hexo）的`python`脚本。

本地有的是自己写的`hexo`文件夹，整个同步到`github`上。远程的`aws`需要做的就是把`github`的项目整个`pull`最新的下来，然后运行`hexo g`就可以。因为使用的`nginx`，直接把`public`文件夹作为`nginx`端口80的主文件夹。

<!-- more -->

# 2. 脚本
整个思路比较简单，本地我自己写完博客。直接同步到`github`。远程`aws`就每天检查一下`github`直接`git pull`。然后就可以直接`hexo`生成新的博客。最后一步`nginx`会自动更新成最新的博客。

`apscheduler`是一个`python`任务调度框架，能够设置固定时间新运行一个任务（线程级还是进程级并没有注意）。

运行脚本的时候，使用`screen`命令，保证后台一直运行脚本。

[Code Link](https://github.com/LichAmnesia/LichBlog/blob/master/hooker.py)
```
# -*- coding: utf-8 -*-
# @Author: lich
# @Date:   2017-08-13 17:21:11
# @Last Modified by:   Lich_Amnesia
# @Last Modified time: 2017-08-13 20:14:03
# schedule a job to be run in a process pool on 24 hours intervals.

from datetime import datetime
import os

from apscheduler.schedulers.blocking import BlockingScheduler

from pytz import timezone
# Use America/Denver time as default time.
mountain_time = timezone("America/Denver")


def pull_job():
    print('The time is: %s' % datetime.now())
    os.system("git checkout -- db.json")
    os.system("git pull")
    os.system("hexo g")

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_executor('processpool')
    scheduler.add_job(pull_job, 'cron',
                      day_of_week='mon-sun', hour=21, minute=30, timezone=mountain_time)
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass

```
# 3. To do
1. 最好有个打`log`，把所有输出打到文件里。这样方便查错误。
2. 能不能把这个加到服务里，这样可以少开一个`screen`，而且可以开机就运行。


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
