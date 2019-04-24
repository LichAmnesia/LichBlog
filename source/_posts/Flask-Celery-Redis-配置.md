---
title: Flask Celery Redis 配置
toc: true
date: 2019-04-24 15:06:51
tags:
  - Python
  - Celery
---


# 1. 安装
```
brew install redis
pip3 install redis celery
```
```
>redis-cli PING
PONG
```
返回`PONG`表示启动 `redis` 成功

<!-- more -->

# 2. 介绍
Celery 用来进行分布式任务管理。通常用来实现异步任务(async task)和定时任务(crontab)。


![](https://ooo.0o0.ooo/2016/12/10/584bbf78e1783.png)


Celery 包含以下几个模块：
- 任务模块

包含异步任务和定时任务。其中，异步任务通常在业务逻辑中被触发并发往任务队列，而定时任务由 Celery Beat 进程周期性地将任务发往任务队列。当与 Flask 一起工作的时候，客户端与 Flask 应用一起运行。

- 消息中间件 Broker

Broker，即为任务调度队列，接收任务生产者发来的消息（即任务），将任务存入队列。Celery 本身不提供队列服务，官方推荐使用 RabbitMQ 和 Redis 等。

- 任务执行单元 Worker

Worker 是执行任务的处理单元，它实时监控消息队列，获取队列中调度的任务，并执行它。 Flask 服务器上启动一个单独的 worker，并且随着你的应用需求来增加更多 workers。

- 任务结果存储 Backend

Backend 用于存储任务的执行结果，以供查询。同消息中间件一样，存储也可使用 RabbitMQ, Redis 和 MongoDB 等。


# 3. 使用
```
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)


@celery.task
def my_background_task(arg1, arg2):
    # some long running task here
    # print(arg1, arg2)
    for i in range(1, arg1):
        for j in range(1, arg2):
            print(i, j)
    return arg1 + arg2


@app.route('/hello', methods=['GET'])
def helloworld():
    task = my_background_task.delay(1000, 2000)
    print(task.ready())
    return 's'


if __name__ == '__main__':
    app.run(debug=True)
```

运行 celery, -c 表示多少进程，默认4个
```
celery worker -l INFO -c 6 -A flask_celery.celery
```


# 参考
- 教程[根据返回结果，执行不同操作](http://python.jobbole.com/87238/)
- http://www.pythondoc.com/flask-celery/first.html
- https://www.jianshu.com/p/bebb4b239791

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info