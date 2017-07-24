---
title: Ubuntu 配置
date: 2017-02-05 17:54:19
tags:
  - Ubuntu
---

我的Ubuntu配置指南。

<!-- more -->

# 安装chrome
http://askubuntu.com/questions/510056/how-to-install-google-chrome


# 安装sublime
http://askubuntu.com/questions/172698/how-do-i-install-sublime-text-2-3



# 安装cmd markdown
First install the cmd markdown. Unzip the tar.gz file to a fold.
And add the command to the shell.
>sudo ln -s ~/App/cmd/Cmd\ Markdown /usr/bin/CmdMarkdown
>CmdMarkdown

# 安装Java
https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04
安装Idea
http://stackoverflow.com/questions/31215452/intellij-idea-importing-gradle-project-getting-java-home-not-defined-yet

# 安装node
https://nodejs.org/en/download/package-manager/


# 安装 mysql, mysql-workbench
sudo apt-get install mysql-server mysql-workbench

# 安装python3.5
sudo apt-get install python3.5
sudo apt-get install python3-pip    
pip3 install ipython jupyter
pip3 install --upgrade pip

# 安装zsh 和 oh my zsh
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

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
