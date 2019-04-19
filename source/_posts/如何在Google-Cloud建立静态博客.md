---
title: 如何在Google Cloud建立静态博客
date: 2019-04-19 13:40:21
tags:
  - Google
toc: true
---

## 1. 在谷歌 domain 申请域名
如果有域名则不需要，比如我的域名`alwa.info`已经转到了google domain上。

然后把WWW前缀的链接修改CNAME记录为`c.storage.googleapis.com.` 注意有最后的点。

再加上子域名转向，把`alwa.info` 转到 `www.alwa.info`。

至此域名已经配置成功。

## 2. 建立Google Cloud存储区域
创建新的存储分区，叫做`www.alwa.info`即你自己的域名。修改存储分区权限，点击增加新成员`allUsers`，权限是环境用户和存储对象查看者。

点击新建的存储区域，上传静态网页文件。这个静态文件就是`hexo g`生成的`public`文件夹下所有内容。

修改存储分区的网页配置，增加`index`页面为`index.html`。

## 3. 建立图片存储区域
继续在 Google Cloud Storage 上建立一个新的存储区域，这个无所谓域名。修改存储分区权限，点击增加新成员`allUsers`，权限是环境用户和存储对象查看者。

这样在这个里面上传文件，然后通过`public link`所有人都能访问到。

## 4. 上传文件到Google Cloud
Google Cloud Storage 直接直接上传文件夹到相应目录。当然你也可以自己写一个脚本自动上传文件。但如果你写脚本帮助上传静态文件。则需要制定已经引入权限文件。

## 5. 上传博客代码
```python
def upload_blob(source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
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
    local_prefix = 'public'
    file_names = find_all_files_with_prefix(local_prefix)
    for file_name in file_names:
        upload_blob(os.path.join(local_prefix, file_name), file_name)
    return

if __name__ == '__main__':
    main()
```


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info