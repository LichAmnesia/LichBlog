# -*- coding: utf-8 -*-
# @Author: lich
# @Date:   2017-08-13 17:21:11
# @Email: alwaysxiaop@gmail.com
# @Last Modified by:   Shen Huang
# @Last Modified time: 2019-04-19 13:39:39
# Push all the files under public to gcp.

from datetime import datetime
import os
# Imports the Google Cloud client library
from google.cloud import storage

from apscheduler.schedulers.blocking import BlockingScheduler

from pytz import timezone
# Use America/Denver time as default time.
mountain_time = timezone("America/Denver")

# Instantiates a client
# Please set GOOGLE_APPLICATION_CREDENTIALS or explicitly create credentials and re-run the application. 
# credentials = '/Users/lich/Google Drive/Stock/lichamnesia-gcp-stockproject.json'
credentials = 'C:/Users/Lich/Google 云端硬盘/Stock/lichamnesia-gcp-stockproject.json'
storage_client = storage.Client.from_service_account_json(credentials)
bucket_name = 'www.alwa.info'
bucket = storage_client.get_bucket(bucket_name)

IGNORE_LIST = [
    '.DS_Store',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2022',
    '2023'
]

def pull_job():
    print('The time is: %s' % datetime.now())
    # os.system("git checkout -- db.json")
    # os.system("git checkout -- package.json")
    # os.system("npm i")
    # os.system("git pull")
    os.system("hexo g")
    print('The time is: %s' % datetime.now())


def schedule():
    scheduler = BlockingScheduler()
    scheduler.add_executor('processpool')
    scheduler.add_job(pull_job, 'cron',
                      day_of_week='mon-sun', hour=21, minute=30, timezone=mountain_time)
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass


def upload_blob(source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # For windows only
    destination_blob_name = destination_blob_name.replace('\\','/')
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print('File {} uploaded to {}.'.format(
        source_file_name,
        destination_blob_name))


def download_blob(source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print('Blob {} downloaded to {}.'.format(
        source_blob_name,
        destination_file_name))


def find_all_files_with_prefix(local_prefix='public', prefix=''):
    name_list = os.listdir(os.path.join(local_prefix, prefix))
    ans_list = []
    for name in name_list:
        if name in IGNORE_LIST:
            continue
        if os.path.isdir(os.path.join(local_prefix, os.path.join(prefix, name))):
            ans_list.extend(find_all_files_with_prefix(local_prefix, os.path.join(prefix, name)))
        else:
            ans_list.append(os.path.join(prefix, name))
    return ans_list


def main():
    pull_job()
    local_prefix = 'public'
    file_names = find_all_files_with_prefix(local_prefix)
    for file_name in file_names:
        upload_blob(os.path.join(local_prefix, file_name), file_name)
    return


if __name__ == '__main__':
    # schedule()
    main()
