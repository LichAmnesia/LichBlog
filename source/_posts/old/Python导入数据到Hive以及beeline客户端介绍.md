---
title: Python导入数据到Hive以及beeline客户端介绍
date: 2016-03-10 09:54:22
tags:
    - Python
    - Hive
---



# 1. Python 和hive连接
主要是要实现一个导入json文件的脚本，数据是从11月到12月的数据。可以直接在hive里面运行：
>load data local inpath '/home/bi/ap_stalogs_20151101.json' into table bi.stalogs partition (logdate='20151101');

python的实现如下，**注意load命令是没有输出的，也就是说不能fetch**

```python
# -*- coding: utf-8 -*-
# require hive server2
# --------------------------------------------
# Author: Lich_Amnesia <alwaysxiaop@gmail.com>
# Date: 2016-03-10
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

    def loaddata(self, sql):
        with self.conn.cursor() as cursor:
            cursor.execute(sql)

    def close(self):
        self.conn.close()



def main():
    # 注意authMechanism初始的时候是PLAIN，最好的解决方案是加上认证模块
    hive_client = HiveClient(db_host='127.0.0.1', port=10000, user='root', password='root', database='default', authMechanism='PLAIN')
    # 测试select语句
    for log_date in range(3,6):
        sql = 'load data local inpath \'/home/bi/ap_stalogs_2015110' + str(log_date) + '.json\' into table bi.stalogs partition (logdate=\'2015110' + str(log_date) + '\')'
        print sql
        try:
            hive_client.loaddata(sql)
        except Exception as e:
            print e
    hive_client.close()


if __name__ == '__main__':
    main()

```

# 2. pyhs2主要接口
具体可以看官方的代码：[Github](https://github.com/BradRuderman/pyhs2/blob/master/pyhs2/cursor.py)
如果没什么特别要求execute可以执行，fetch能够获取返回结果，无返回结果的无法fetch。


# 3. 使用beeline连接hive
现在直接运行hive会给warning，说要用beeline，下面用beeline进行测试
### 2.1 beeline连接
命令行运行beeline进入beeline

>!connect jdbc:hive2://node1:10000/;auth=PLAIN root root org.apache.hive.jdbc.HiveDriver

这个的root分别是账号和密码，因为auth默认是plain也就是无密码的那种认证方式，随便输什么都可以
### 2.2 运行指令
>CREATE TABLE bi.stalogs(param string) PARTITIONED BY(logdate STRING) ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE;

载入原始数据文件并分区
>LOAD DATA LOCAL INPATH '/root/tmp/ap_stalogs_20151123.json' INTO TABLE bi.stalogs PARTITION (logdate = '20151123')