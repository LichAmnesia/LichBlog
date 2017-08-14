# -*- coding: utf-8 -*-
# @Author: lich
# @Date:   2017-08-13 17:21:11
# @Email: alwaysxiaop@gmail.com
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
