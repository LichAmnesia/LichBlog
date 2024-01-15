---
title: vagrant windows 配置开发环境
date: 2015-06-21 11:45:49
tags:
---

目前所选用的是当前的最新版本Vagrant 1.7.2，VirtualBox 使用的是 VirtualBox 4.3.28。记录一下自己在windows配置时的情况

## 准备工作

1.  首先下载[Vagrant](http://www.vagrantup.com/)和[virtual box](https://www.virtualbox.org/)，安装vagrant需要重启系统。然后就可以在cmd下使用vagrant的命令了。
2.  准备下载box（有两种主要下载方法）

*   [Vagrant cloud](https://atlas.hashicorp.com/boxes/search?utm_source=vagrantcloud.com&vagrantcloud=1) 这里面是hashicorp的一个在线box平台。如果你需要使用这上面的box进行下载配置，找到下面任意一个box进行选择，比如[Ubuntu trusty64](https://atlas.hashicorp.com/ubuntu/boxes/trusty64)这是下载最多的。把cmd进入到你的工作目录。运行下面的命令：

<pre class="lang:sh decode:true " >vagrant init ubuntu/trusty64
vagrant up --provider virtualbox</pre>

*   [Vagrant.es](http://www.vagrantbox.es/)，这里面的box你可以通过下载然后把box文件放在你的当前工作目录，执行以下命令：

<pre class="lang:sh decode:true " >vagrant box add base *.box
vagrant init
</pre>

*   base 表示指定默认的box，也可以为box指定名称，比如 Ubuntu ，使用base时，之后可以直接使用 vagrant init 进行初始化，如果自行指定名称，则初始化的时候需要指定box的名称。*.box 是box对应的文件名，这里可以是本地保存box的路径（未加则是当前目录），也可以是可以下载box的网址，如果是网址的话，Vagrant会自动启动下载。
*   最后一步，运行Vagrant中的虚拟机。

<pre class="lang:sh decode:true " >vagrant up</pre>

* * *

## 注意事项

1.  如果你目前用户名是中文用户名的话（也就是User/用户名），由于vagrant会调用用户目录下的文件，所以这个用户名必须是英文的否则init过程中会出现编码错误。
2.  如果仍然出现问题，需要在Vagrant安装目录下的bin的配置文件里面修改编码。
3.  启动之后可以使用127.0.0.1:2222通过ssh连上虚拟机，没必要使用vagrant ssh。
4.  登录过程中账号密码都是vagrant，包括su。

* * *

## 配置工作

#### Vagrant网络基本有三种模式

都在此虚拟机的Vagrantfile进行修改就行，配置文件还是写的很详细的。
* 端口映射：就是将虚拟机中的端口映射到宿主机对应的端口直接使用。guest: 80 表示虚拟机中的80端口，host: 8080 表示映射到宿主机的8080端口。

<pre class="lang:ruby decode:true " >config.vm.network :forwarded_port, guest: 80, host: 8080
</pre>

*   private模式：如果需要自己自由的访问虚拟机，但是别人不需要访问虚拟机，可以使用private_network，并为虚拟机设置IP。192.168.1.111 表示虚拟机的IP，多台虚拟机的话需要互相访问的话，设置在相同网段即可。

<pre class="lang:ruby decode:true " >config.vm.network :private_network, ip: "192.168.1.111"</pre>

*   public模式：如果需要将虚拟机作为当前局域网中的一台计算机。这个配置和上面的配置主要是用来多个虚拟机然后搭建分布式网络系统，模拟网络上多台设备，具体也有教程，[参考教程](https://github.com/astaxie/Go-in-Action/blob/master/ebook/zh/01.3.md)。

<pre class="lang:ruby decode:true " >config.vm.network :public_network
</pre>

#### 文件映射

本地开发，虚拟机运行。所以这里就需要使用文件映射功能，将本地的目录文件映射到虚拟机的对应目录。
默认情况下，当前的工作目录，会被映射到虚拟机的 /vagrant 目录，当前目录下的文件可以直接在 /vagrant 下进行访问。
主要两种方法，一个软链接（每次开机都要输一遍），一个修改配置文件一步到位。
* 每次ssh到虚拟机输入：

<pre class="lang:ruby decode:true " >ln -fs /vagrant/wwwroot /var/www
</pre>

*   找到配置文件的相应部分，进行修改。前面参数本地路径，可以相对也可以绝对比如修改为：“d:/data”。后面参数表示虚拟机对应映射目录

<pre class="lang:ruby decode:true " >config.vm.synced_folder "data/", "/var/data"</pre>

## Vagrant 主要命令

<pre class="lang:sh decode:true " >vagrant box add 添加box的操作
vagrant init 初始化box的操作
vagrant up 启动虚拟机的操作
vagrant ssh 登录拟机的操作
vagrant box list 显示当前已经添加的box列表
vagrant box remove 删除相应的box
vagrant destroy 停止当前正在运行的虚拟机并销毁所有创建的资源
vagrant halt 关机
vagrant package 打包命令，可以把当前的运行的虚拟机环境进行打包
vagrant plugin 用于安装卸载插件
vagrant provision 通常情况下Box只做最基本的设置，而不是设置好所有的环境，因此Vagrant通常使用Chef或者Puppet来做进一步的环境搭建。那么Chef或者Puppet称为provisioning，而该命令就是指定开启相应的provisioning。按照Vagrant作者的说法，所谓的provisioning就是"The problem of installing software on a booted system"的意思。除了Chef和Puppet这些主流的配置管理工具之外，我们还可以使用Shell来编写安装脚本。例如： vagrant provision --provision-with chef
vagrant reload 重新启动虚拟机，主要用于重新载入配置文件
vagrant resume 恢复前面被挂起的状态
vagrant ssh-config 输出用于ssh连接的一些信息
vagrant status 获取当前虚拟机的状态</pre>

更多参考信息[docs](http://docs.vagrantup.com/v2/)