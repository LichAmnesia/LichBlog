---
title: APScheduler 使用指南
toc: true
date: 2020-05-25 16:11:13
tags:
 - Python
---

# 1. 简介

APScheduler 是一个轻量级的 Python 定时任务调度框架。

它支持三种调度任务：
- 固定时间间隔
- 固定时间点（日期）
- Linux 下的 Crontab 命令。

同时，它还支持异步执行、后台执行调度任务。

<!-- more -->

APScheduler 由四个组件构成： 
- 触发器（triggers）：描述调度任务被触发的条件。不过触发器完全是无状态的。
- 任务仓库（job stores） ： 任务持久化仓库，默认保存任务在内存中，也可将任务保存都各种数据库中，任务中的数据序列化后保存到持久化数据库，从数据库加载后又反序列化。
- 执行器（executors） ： 负责处理作业的运行，它们通常通过在作业中提交指定的可调用对象到一个线程或者进城池来进行。当作业完成时，执行器将会通知调度器。
- 调度器（schedulers）： 它是任务调度器，属于控制器角色。它配置作业存储器和执行器可以在调度器中完成，例如添加、修改和移除作业。


调度器总共有 7 种：
1. BlockingScheduler : 调度器在当前进程的主线程中运行，也就是会阻塞当前线程。
2. BackgroundScheduler : 调度器在后台线程中运行，不会阻塞当前线程。
3. AsyncIOScheduler : 结合 asyncio 模块一起使用。
4. GeventScheduler : 程序中使用 gevent（高性能的Python并发框架）作为IO模型，和 GeventExecutor 配合使用。
5. TornadoScheduler : 程序中使用 Tornado 的IO模型，用 ioloop.add_timeout 完成定时唤醒。
6. TwistedScheduler : 配合 TwistedExecutor，用 reactor.callLater 完成定时唤醒。
7. QtScheduler : 你的应用是一个 Qt 应用，需使用QTimer完成定时唤醒。


附上 cron 的参数列表：

- year (int 或 str) ： 年，4位数字
- month (int 或 str) ： 月 (范围1-12)
- day (int 或 str) ： 日 (范围1-31
- week (int 或 str) ：周 (范围1-53)
- day_of_week (int 或 str) ： 周内第几天或者星期几 (范围0-6 或者mon,tue,wed,thu,fri,sat,sun)
- hour (int 或 str) ： 时 (范围0-23)
- minute (int 或 str) ：分 (范围0-59)
- second (int 或 str) ： 秒 (范围0-59)
- start_date (datetime 或 str) ： 最早开始日期(包含)
- end_date (datetime 或 str) ：最晚结束时间(包含)
- timezone (datetime.tzinfo 或str) ： 指定时区

## 2. 使用

```
pip3 install apscheduler
```



### 2.1 一个定时每天跑一次的程序模板
```python
# -*- coding: utf-8 -*-
# @Author: Alwa
# @Date:   2018-02-20 11:15:48
# @Last Modified by:   Alwa
# @Last Modified time: 2018-02-20 13:55:35


from pymongo import MongoClient
import pytz
import datetime

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.jobstores.mongodb import MongoDBJobStore
from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor

tz = pytz.timezone('America/Los_Angeles')
print(datetime.datetime.now(tz))

def my_job():
	print(datetime.datetime.now(tz))
	print("hello world")

host = '127.0.0.1'
port = 27017
client = MongoClient(host, port)

jobstores = {
    'mongo': MongoDBJobStore(collection='job', database='test', client=client),
    'default': MongoDBJobStore(collection='job', database='test', client=client)
    # 'default': MemoryJobStore()
}
executors = {
    'default': ThreadPoolExecutor(10),
    'processpool': ProcessPoolExecutor(3)
}
job_defaults = {
    'coalesce': False,
    'max_instances': 3
}
scheduler = BlockingScheduler(jobstores=jobstores, executors=executors, job_defaults=job_defaults)
scheduler.add_job(my_job, trigger='cron', day_of_week='0-6', hour=13, minute=56, second=0, timezone=tz)

try:
    scheduler.start()
except SystemExit:
    client.close()
```



---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info