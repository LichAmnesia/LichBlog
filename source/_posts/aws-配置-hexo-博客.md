---
title: aws 配置 hexo 博客
date: 2017-08-17 10:41:53
tags:
    - Python
    - hexo
    - Node
    - Linux
---

# 1. 介绍
本文主要介绍在`aws`的`ec2`下配置`hexo`博客。系统版本为`Amazon Linux`。

<!-- more -->

# 2. 安装 Nginx
在 Amazon linux 也是基于red hat的linux系统。
```
yum install nginx
```
### 2.1 修改 nginx 文件路径
默认是
```
/usr/share/nginx/html
```
可以进入`/etc/nginx/`查看`nginx.conf`文件配置。具体可以查看如下：
```
server {
        listen 80 default_server;  # 服务器配置端口
        listen [::]:80 default_server;
        root /var/www/html;  # 文件路径
        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;
        server_name _;  # 域名配置，如有还需要配置域名解析
        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            try_files $uri $uri/ =404;
        }
}
```
修改目录为自己所想要的目录。

### 2.3 查看 Nginx 的log
log的路径是`/var/log/nginx`，如果没有权限。

```
sudo su
cd directory
```

错误`log`：
```
017/07/31 05:21:05 [error] 11201#0: *17 "/usr/share/nginx/hexo/index.html" is forbidden (13: Permission denied), client: 205.175.97.37, server: localhost, request: "GET / HTTP/1.1", host: "ec2-34-229-141-142.compute-1.amazonaws.com"
```
转换用户，看能不能进入web所在的那个文件夹。
```
su -s /bin/bash nginx
```
如果不行的话，修改`nginx`里面的配置文件为：
```
user ec2-user
```
然后重启service
```
sudo service nginx restart
```
### 2.4 修改 nginx 不允许正向代理 (Not required)
本来就是不允许正向代理的。就算配好正向代理也是无法走https通道的。

正向代理配置文件如下，主要是`proxy_pass`：
```
server {
    resolver 8.8.8.8;
    resolver_timeout 5s;
 
    listen 0.0.0.0:8080;
 
    access_log  /home/reistlin/logs/proxy.access.log;
    error_log   /home/reistlin/logs/proxy.error.log;
 
    location / {
        proxy_pass $scheme://$host$request_uri;
        proxy_set_header Host $http_host;
 
        proxy_buffers 256 4k;
        proxy_max_temp_file_size 0;
 
        proxy_connect_timeout 30;
 
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 301 1h;
        proxy_cache_valid any 1m;
    }
}
```

# 3. 配置 hexo 
首先需要安装`node`，版本号大于`8.0.0`。

首先是`clone`本身的`hexo`的repository，然后在themes里面把相关theme也clone下来。
```
git clone https://github.com/LichAmnesia/LichBlog.git
cd themes/
git clone https://github.com/LichAmnesia/hexo-theme-yilia.git
```

# 5. Install python3 on AMI linux
[Install guide](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-centos-7)

```
sudo yum list | grep python3
sudo yum install python35
sudo yum install python35-pip
pip-3.5
```

解决办法: **sudo: pip3: command not found**

Install locate [Link](https://www.liquidweb.com/kb/how-to-install-mlocate-locate-and-updatedb-commands-on-centos-7/)
```
sudo yum -y install mlocate
sudo updatedb
```

Find pip3 location, and then make a symbolic link to where your pip3 is located.
```
locate pip3
```
Result
```
/usr/local/bin/pip3
/usr/local/bin/pip3.5
```
Run
```
sudo ln -s /<path>/pip3.x /usr/local/bin/pip3
```
Alternatively, we can use the following command to run pip.
```
python3 -m pip
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
