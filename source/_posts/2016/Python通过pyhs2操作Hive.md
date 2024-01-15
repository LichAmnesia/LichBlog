---
title: Python通过pyhs2操作Hive
date: 2016-03-09 16:43:17
tags: 
    - Python
    - Hive
---

# 1. 安装pyhs2
### 1.1 pip安装
```
yum install gcc-c++ cyrus-sasl-devel
pip install pyhs2
```
如果pip没有安装去Github上找到pyhs2和sasl的项目，已安装成功则不用考虑下面。
### 1.2 pyhs2安装
```
unzip pyhs2-master.zip 
cd pyhs2-master
python setup.py install
```
### 1.3 sasl安装
```
unzip python-sasl-master.zip 
cd python-sasl-master
python setup.py install
```

# 2. 测试Hive连接

```python
# -*- coding: utf-8 -*-
# require hive server2
# --------------------------------------------
# Author: Lich_Amnesia <alwaysxiaop@gmail.com>
# Date: 2016-03-09
# --------------------------------------------

import pyhs2

class HiveClient:
    # create connection to hive server2
    def __init__(self, db_host, user, password, database, port=10000, authMechanism="PLAIN"):
        self.conn = pyhs2.connect(host=db_host,
                                  port=port,
                                  authMechanism=authMechanism,
                                  user=user,
                                  password=password,
                                  database=database,
                                  )

    def query(self, sql):
        with self.conn.cursor() as cursor:
            cursor.execute(sql)
            return cursor.fetch()

    def close(self):
        self.conn.close()


def main():
    # 注意authMechanism初始的时候是PLAIN，最好的解决方案是加上认证模块
    hive_client = HiveClient(db_host='127.0.0.1', port=10000, user='root', password='root123456', database='default', authMechanism='PLAIN')
    # 测试select语句
    result = hive_client.query('select * from test limit 10')
    print result
    hive_client.close()


if __name__ == '__main__':
    main()

```