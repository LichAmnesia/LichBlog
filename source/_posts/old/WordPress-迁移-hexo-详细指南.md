---
title: WordPress 迁移 hexo 详细指南
date: 2016-03-04 11:18:27
tags: hexo
---


之前一直用WordPress建博客，但是现在发现这个太重了，所以考虑迁移到hexo，一个静态的建站工具。下面是我的配置的指南

## 在本地简历建立hexo博客
### 安装 Hexo
```shell
npm install -g hexo-cli
```
### 配置 Hexo
到想要放博客的文件夹
```shell
hexo init
npm install
```
生成目录如下
```
.
├── _config.yml        #配置文件
├── package.json    #应用程序数据
├── scaffolds
├── source            #网站内容
|   ├── _drafts        #草稿
|   └── _posts        #文章
└── themes            #主题
```
### 下载设置主题

我使用的hexo主题是[litten](https://github.com/litten/hexo-theme-yilia)。

下载主题：git clone https://github.com/litten/hexo-theme-yilia.git yilia

启用主题：clone完成后，打开 站点配置文件_config.yml，找到 theme 字段，并将其值更改为下载的主题的文件夹名字。不是主题的名字，是你下载下来的文件夹名字。文件夹要放在theme下面。
然后发布一下就可以了。

## hexo常用命令
如下是经常使用的命令
```shell
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
hexo clean #清除database和public文件夹
```
发布命令
```shell
hexo d -g #发布到public，并生成github pages
```



## WordPress导出文章
WordPress里面有个工具，然后导出。我当时导出的时候防止出问题，只导出了文章，变成一个xml文件。
### 安装插件导入
首先安装 hexo-migrator-wordpress 插件：
```shell
npm install hexo-migrator-wordpress --save
hexo migrate wordpress <source>
```
source 是 Wordpress 导出文件的存放路径。之后就导入到_posts 目录了！
### 解决导出的各种问题
这样导出出来的md，中文显示是有问题的，然后还有各种格式不匹配根本没办法用，一直会报错。
具体可以参考[hexo--wordpress-import](https://github.com/LichAmnesia/hexo-wordpress-import)的代码，我是用Windows的生成文章的。所以用这个来格式化了一下，然后再生成文章。


## 插件
### 多说 评论插件
这个在litten的主题里是已经集成了，但是需要你在多说创建账号和网站，需要修改配置文件。
themes/yilia/layout/_partial/post/duoshuo.ejs这个文件，主要是要theme.duoshuo这个改成你在多说的名字。具体是什么参考多说上面的介绍。
```javascript
<div class="duoshuo">
 <!-- 多说评论框 start -->
 <div class="ds-thread" data-thread-key="<%=key%>" data-title="<%=title%>" data-url="<%=url%>"></div>
 <!-- 多说评论框 end -->
 <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
 <script type="text/javascript">
 var duoshuoQuery = {short_name:"<%=theme.duoshuo%>"};
 (function() {
  var ds = document.createElement('script');
  ds.type = 'text/javascript';ds.async = true;
  ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
  ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0]
   || document.getElementsByTagName('body')[0]).appendChild(ds);
 })();
 </script>
 <!-- 多说公共JS代码 end -->
</div>
```
这个配置文件的地址在themes/yilia/_config.yml这个里面的duoshuo: 变成你的多说工具里面的short_name就可以了。

```javascript
<!-- 多说评论框 start -->
 <div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"lichblog"};
 (function() {
  var ds = document.createElement('script');
  ds.type = 'text/javascript';ds.async = true;
  ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
  ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0]
   || document.getElementsByTagName('body')[0]).appendChild(ds);
 })();
 </script>
<!-- 多说公共JS代码 end -->
```


## git同步文章
因为我使用的hostker，可以直接通过git发布。
所以把在hexo主目录下直接git clone 你的git的地址 public。
这样会创建public文件夹为同步目录，注意在这之前要hexo clean一下。
然后再hexo d -g在public里面生成相应的文件

## 静态页面的设置
如果有静态页面比如CV，或者一些简单的页面的话是不能直接放到public文件夹下面的，每次发布会被删掉。
解决策略就是放到source文件夹。
1. 如果你需要hexo当前主题的渲染，那就当在主目录的source文件夹下面。
2. 如果是纯粹的静态页面，放在themes/你的主题名称/source文件夹下面。

这样做之后放在source下面的文件会在生成的时候直接放到public里面。访问路径就是以public目录为域名。
比如你的静态页面放在themes/你的主题名称/source/abc/index.html那访问路径就是:域名/abc/index.html这样的。


## 域名和 DNS 解析
主机是在hostker上买的，一个应用貌似一天只要1分钱，如果是用git进行同步的静态页面，超级便宜。
域名是在万网上早买好的，然后万网里有地方可以设置解析的地方，我的是cname，在hostker上设置添加域名然后把地址贴到万网上就可以等待生效了，一般一两分钟就可以解析成功。

## CDN设置
使用的是七牛的云存储服务。主要是为了图片考虑，图片不放在服务器上，因为挺占用大小的，每次同步都需要很大的空间。
直接在七牛上建立账号，添加应用，然后使用公开的链接放图片，写md的时候直接加进去就可以了。
