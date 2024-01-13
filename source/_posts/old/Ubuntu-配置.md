---
title: Ubuntu 配置
date: 2017-02-05 17:54:19
tags:
  - Ubuntu
toc: true
---

我的Ubuntu配置指南。

<!-- more -->

# 1. 制作 U盘启动器
下载 `unetbootin` 然后根据下载好的 `Ubuntu*.ios` 制作 U 盘启动。


# 2. 根据如下文档下载必备软件
## 2.1 安装 chrome
[参考](http://askubuntu.com/questions/510056/how-to-install-google-chrome)


## 2.2 安装 Sublime
[参考](http://askubuntu.com/questions/172698/how-do-i-install-sublime-text-2-3)

## 2.3 安装 Java
[安装 Java 参考](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)

[安装Idea](http://stackoverflow.com/questions/31215452/intellij-idea-importing-gradle-project-getting-java-home-not-defined-yet)

## 2.4 安装 Node.js
[安装地址](https://nodejs.org/en/download/package-manager/)


## 2.5 安装 Mysql mysql-workbench
```
sudo apt-get install mysql-server mysql-workbench
```

## 2.6 安装 python3.6
```
sudo apt-get install python3.6
sudo apt-get install python3-pip    
pip3 install ipython jupyter
pip3 install --upgrade pip
pip3 install urllib3 requests scrapy numpy matplotlib scipy keras sklearn pandas seaborn 
pip3 install pipenv --user
```

## 2.7 安装zsh 和 oh my zsh
首先install https://github.com/powerline/fonts
这个里面的fonts，然后看里面的
https://github.com/robbyrussell/oh-my-zsh
参考：https://github.com/agnoster/agnoster-zsh-theme
看显示效果对不对，对的话继续。

配置主题powerlevel9k
Option 2: Install for Oh-My-ZSH

To install this theme for use in Oh-My-Zsh, clone this repository into your OMZ custom/themes directory.

$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
You then need to select this theme in your ~/.zshrc:

ZSH_THEME="powerlevel9k/powerlevel9k"


# 3. Optional 软件安装

## 3.1 [Optional] 安装 shadowsocks

通过PPA源安装，仅支持Ubuntu 14.04或更高版本。
```
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```

**PS**(适用于 Debian 系统): 可以尝试安装Ubuntu PPA源的deb包，如果不行，请自行编译（ `dpkg-buildpackage -uc -us -b` ），在上级目录中将会生成shadowsocks-qt5的deb包，通过 `sudo dpkg -i` 来安装。

注意：你可能需要安装好的依赖关系：
```
sudo apt-get install qt5-qmake qtbase5-dev libqrencode-dev libqtshadowsocks-dev libappindicator-dev libzbar-dev libbotan1.10-dev
```

## 3.2 [Optional] 安装 sklearn
[安装指南](http://scikit-learn.org/stable/install.html)
```
pip3 install -U scikit-learn
```
先决条件

    Python (>= 2.6 or >= 3.3),
    NumPy (>= 1.6.1),
    SciPy (>= 0.9).

## 3.3 [Optional] 安装 xgboost
先装sklearn
先clone下来
主目录运行./build.sh
进入python目录，python setup.py install



## 3.4 [Optional] 安装 mendeley
[mendeley 安装指南](https://www.mendeley.com/download-mendeley-desktop/ubuntu/instructions/)
直接按照提示安装
```
sudo dpkg -i <path-to-downloaded-package>
```
操作提示:
```
mendeleydesktop
```

## 3.5 [Optional] 安装cmd markdown
First install the cmd markdown. Unzip the tar.gz file to a fold.
And add the command to the shell.
>sudo ln -s ~/App/cmd/Cmd\ Markdown /usr/bin/CmdMarkdown
>CmdMarkdown


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
