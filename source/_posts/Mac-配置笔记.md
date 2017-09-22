---
title: Mac 配置笔记
date: 2017-08-17 11:14:25
tags:
    - Mac
---

本文主要写配置`Mac`各种配置过程。

<!-- more -->

# 1. 软件
网易云
搜狗输入法
kepass replaced by mac pass
Dropbox

# 2. Code

### 2.1 sublime text
```
ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
```

Install package
```
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

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

- FileHeader, remeber to set seperate file template.
```
"email": "xxxxxx@gmail.com"
```
- Python PEP8 Autoformat

### 2.2 Oh my zsh
[Install oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

1. 首先install https://github.com/powerline/fonts
2. 这个里面的fonts，然后看里面的 https://github.com/robbyrussell/oh-my-zsh
3. 参考：https://github.com/agnoster/agnoster-zsh-theme
4. 看显示效果对不对，对的话继续。
4. 配置主题`powerlevel9k`，克隆下面的包到自己`Oh-My-Zsh`的`custom/themes`目录。

```
git clone https://github.com/bhilburn/powerlevel9k.git  ~/.oh-my-zsh/custom/themes/powerlevel9k
```
在`~/.zshrc`选择你所需要的主题:
```
ZSH_THEME=”powerlevel9k/powerlevel9k”
```



[教程](https://gist.github.com/kevin-smets/8568070)

**需要安装iTerm2**

[powerlevel9k Configuration](https://github.com/bhilburn/powerlevel9k/wiki/Show-Off-Your-Config#natemccurdys-configuration)

Font is 14pt Iconsolata for Powerline with [Solarized Dark](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/Solarized%20Dark.itermcolors) iterm2 colors.

**配置.zshrc文件**
```
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(time dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(virtualenv status rbenv)
POWERLEVEL9K_STATUS_VERBOSE=false
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=1
```

### 2.2 Node install for blog
Install node in mac

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
pip3 install jupyter 
pip3 install requests keras sklearn pandas seaborn
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


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info

