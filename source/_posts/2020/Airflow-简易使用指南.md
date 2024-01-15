---
title: Airflow 简易使用指南
toc: true
date: 2020-05-25 16:16:59
tags:
 - Python
 - Airflow
---

## 1. 安装
```bash
pip install airflow
```

<!-- more -->

```bash
# airflow needs a home, ~/airflow is the default,
# but you can lay foundation somewhere else if you prefer
# (optional)
export AIRFLOW_HOME=~/airflow

# install from pypi using pip
pip install apache-airflow

# initialize the database
airflow initdb

# start the web server, default port is 8080
airflow webserver -p 8080

# start the scheduler
airflow scheduler

# visit localhost:8080 in the browser and enable the example dag in the home page
```


启动
首先打开 airflow 守护进程
```
airflow scheduler
```


## 2. 使用Airflow的大致步骤:

1. 写任务脚本(.py)
2. 测试任务脚本(command)
3. WebUI 自查

测试任务脚本
```python

# -*- coding: utf-8 -*-

import airflow
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from airflow.operators.python_operator import PythonOperator
from airflow.operators.dummy_operator import DummyOperator
from datetime import timedelta

# -------------------------------------------------------------------------------
# these args will get passed on to each operator
# you can override them on a per-task basis during operator initialization

default_args = {
    'owner': 'shehuang',
    'depends_on_past': False,
    'start_date': airflow.utils.dates.days_ago(2),
    # 'email': ['@qq.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
    # 'wait_for_downstream': False,
    # 'dag': dag,
    # 'adhoc':False,
    # 'sla': timedelta(hours=2),
    # 'execution_timeout': timedelta(seconds=300),
    # 'on_failure_callback': some_function,
    # 'on_success_callback': some_other_function,
    # 'on_retry_callback': another_function,
    # 'trigger_rule': u'all_success'
}

# -------------------------------------------------------------------------------
# dag

dag = DAG(
    'example_hello_world_dag',
    default_args=default_args,
    description='my first DAG',
    schedule_interval=timedelta(days=1))

# -------------------------------------------------------------------------------
# first operator

date_operator = BashOperator(
    task_id='date_task',
    bash_command='date',
    dag=dag)

# -------------------------------------------------------------------------------
# second operator

sleep_operator = BashOperator(
    task_id='sleep_task',
    depends_on_past=False,
    bash_command='sleep 5',
    dag=dag)

# -------------------------------------------------------------------------------
# third operator


def print_hello():
    return 'Hello world!'


hello_operator = PythonOperator(
    task_id='hello_task',
    python_callable=print_hello,
    dag=dag)

# -------------------------------------------------------------------------------
# dependencies

sleep_operator.set_upstream(date_operator)
hello_operator.set_upstream(date_operator)

```

## 3. 测试
测试代码有没有语法错误。
```python
python3 test.py
```

查看任务有没有生成
```shell 
>airflow list_dags
```

List tasks
```shell
>airflow list_tasks example_hello_world_dag
date_task
hello_task
sleep_task
```

测试 task 能不能跑成功
```shell
airflow test example_hello_world_dag date_task 20190424
```


---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info