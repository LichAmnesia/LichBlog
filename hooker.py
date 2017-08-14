# -*- coding: utf-8 -*-
# @Author: lich
# @Date:   2017-08-13 17:21:11
# @Email: alwaysxiaop@gmail.com
# @Last Modified by:   lich
# @Last Modified time: 2017-08-13 17:21:36
# schedule a job to be run in a process pool on 24 hours intervals.

from datetime import datetime
import os

from apscheduler.schedulers.blocking import BlockingScheduler


def pull_job():
    print('The time is: %s' % datetime.now())
    os.system("git pull")
    os.system("hexo g")

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_executor('processpool')
    scheduler.add_job(pull_job, 'interval', seconds=20)
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass