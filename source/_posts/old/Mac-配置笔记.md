---
title: Mac 配置笔记
date: 2017-08-17 11:14:25
tags:
    - Mac
toc: true
---

本文主要写配置`Mac`各种配置过程。

<!-- more -->

# 1. 软件
```
网易云音乐
搜狗输入法
kepass replaced by mac pass
```

# 2. Code
### 2.0 brew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
### 2.1 sublime text
```
sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
```

[Install package](https://packagecontrol.io/installation)
使用 `ctrl+~` 或者使用 `View > Show Console` 输入下面的命令。

```
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

需要重新启动 sublime

User settings
```
// Settings in here override those in "Default/Preferences.sublime-settings",
// and are overridden in turn by syntax-specific settings.
{
    "detect_indentation": true,
    "tab_size": 4,
    "translate_tabs_to_spaces": true,
    "word_wrap": true
}

```

Package need to be installed:

- **FileHeader**, remeber to set seperate file template.
```
"email": "xxxxxx@gmail.com"
```
- **JsFormat**：javascript格式化，包括Json。切换Syntax后按 Ctrl+Alt+F 格式化。
- [wakatime](https://wakatime.com/editors)：自动记录code时间，支持多种编辑器和IDE。 
先到官网注册，登录后在右上角点用户名，选择Setting，左侧选Account，复制Api Key。Sublime中安装此插件会用到。以后就可以登录网站查看自己的code时间统计图。
- **Git**
- [Modific](https://github.com/gornostal/Modific) 检测 `git` 修改之后的代码进行高亮。
- [anaconda](http://damnwidget.github.io/anaconda/)，带 `python` 自动补全和 PEP8。
- Python PEP8 Autoformat

### 2.2 Oh my zsh
首先安装 `iTerm 2`。 **安装[iTerm2](https://www.iterm2.com/)**。

然后跟着这个教程安装 [Install oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)。

接来下按照如下修改 `zsh` 字体主题。
1. 首先安装[powerline](https://github.com/powerline/fonts)字体。
```
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```
2. 参考：https://github.com/agnoster/agnoster-zsh-theme
3. 看显示效果对不对，对的话继续。
4. 根据如下命令看字体有没有安装完成。
```
echo "\ue0b0 \u00b1 \ue0a0 \u27a6 \u2718 \u26a1 \u2699"
```

5. 开始安装 [`powerlevel9k` ](https://github.com/bhilburn/powerlevel9k)主题，可以参考别人的个性化[主题](https://github.com/bhilburn/powerlevel9k/wiki/Show-Off-Your-Config#natemccurdys-configuration)。
```
git clone https://github.com/bhilburn/powerlevel9k.git  ~/.oh-my-zsh/custom/themes/powerlevel9k
```
6. 在`~/.zshrc`选择你所需要的主题:
```
ZSH_THEME=”powerlevel9k/powerlevel9k”
```

7. **配置.zshrc文件**
```
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(time dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(virtualenv status rbenv)
POWERLEVEL9K_STATUS_VERBOSE=false
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=1
```
更短
```
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(time dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(virtualenv status rbenv)
POWERLEVEL9K_STATUS_VERBOSE=false
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=0
POWERLEVEL9K_SHORTEN_DELIMITER="…"
```


8. 配置 iTerm 2 字体和颜色。`iTerm → preferences → profiles → colors → load presets`

字体是 `14pt Iconsolata for Powerline`, color 是[Solarized Dark](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/Solarized%20Dark.itermcolors)。


[参考教程](https://gist.github.com/kevin-smets/8568070)

### 2.2 Node install for blog
Install Node.js in mac

Install hexo
```
npm install hexo-cli -g
cd LichBlog
npm install
npm i hexo-generator-json-content --save
hexo server
```


### 2.3 Install python
```
brew install python3
pip3 install jupyter IPython
pip3 install urllib3 requests scrapy numpy matplotlib scipy keras sklearn pandas seaborn 
pip3 install pprint virtualenv
```


### 2.4 Install Latex

[Document](http://economistry.com/2013/01/installing-and-using-latex-for-mac/)

1. Install maclatex
2. Install LatexTools
3. Install SKIM PDF viewer, set   Preferences > Sync,  Uncheck “Check for file changes” option, Preset as "Sublime Text"

### 2.5 Install Mysql
进入 mysql 官网下载，安装完成之后需要到系统偏好设置里面打开 mysql 服务。

然后进入`/usr/local/mysql/bin`，看是否有 mysql。然后添加以下到`.zshrc`文件：
```
# Add mysql bin to the PATH
PATH=$PATH:/usr/local/mysql/bin
```
然后`source ~/.zshrc`即可。
```
mysql -u root -p
```

### 2.6 Install mongo

```
brew update
brew install mongodb
mkdir -p /data/db
chmod 777 /data/*
mongod # Default is /data/db
mongod --dbpath <path to data directory>
mongo --host 127.0.0.1:27017
```
[docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info

