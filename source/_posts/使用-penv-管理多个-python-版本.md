---
title: 使用 penv 管理多个 python 版本
toc: true
date: 2020-01-12 17:16:27
tags:
  - Python
---

## 1. 基本原理
如果要讲解 pyenv 的工作原理，基本上采用一句话就可以概括，那就是：修改系统环境变量 PATH。

对于系统环境变量 PATH，相信大家都不陌生，里面包含了一串由冒号分隔的路径，例如 `/usr/local/bin:/usr/bin:/bin`。每当在系统中执行一个命令时，例如 python 或 pip，操作系统就会在 PATH 的所有路径中从左至右依次寻找对应的命令。因为是依次寻找，因此排在左边的路径具有更高的优先级。

而 pyenv 做的，就是在 PATH 最前面插入一个 `$(pyenv root)/shims` 目录。这样，pyenv 就可以通过控制 shims 目录中的 Python 版本号，来灵活地切换至我们所需的 Python 版本。

如果还想了解更多细节，可以查看 pyenv 的文档介绍及其源码实现。

<!-- more -->

## 2. 自动安装
```
curl https://pyenv.run | bash
```


```
# Load pyenv automatically by adding
# the following to ~/.bashrc:

export PATH="/Users/xxx/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```


完成之后记得
```
source ~/.bashrc
```


## 3. pyenv 常用命令


查看可供安装的 Python 版本
```
pyenv install -l

pyenv install 3.8.1 
```

```
$ pyenv global 2.7.3  # 设置全局的 Python 版本，通过将版本号写入 ~/.pyenv/version 文件的方式。
$ pyenv local 2.7.3 # 设置 Python 本地版本，通过将版本号写入当前目录下的 .python-version 文件的方式。通过这种方式设置的 Python 版本优先级较 global 高。
```

Python 执行优先级
shell > local > global


```
$ pyenv shell 2.7.3 # 设置面向 shell 的 Python 版本，通过设置当前 shell 的 PYENV_VERSION 环境变量的方式。这个版本的优先级比 local 和 global 都要高。–unset 参数可以用于取消当前 shell 设定的版本。
$ pyenv shell --unset

$ pyenv rehash  # 创建垫片路径（为所有已安装的可执行文件创建 shims，如：~/.pyenv/versions/*/bin/*，因此，每当你增删了 Python 版本或带有可执行文件的包（如 pip）以后，都应该执行一次本命令）
```

设置 golbal python 版本
```
pyenv global 3.8.1

```

## 4. pyenv 插件：pyenv-virtualenv

### 4.1 创建相应的虚拟环境

```
pyenv virtualenv 3.8.1 py3.8
```

### 4.2 列出当前虚拟环境
```
pyenv virtualenvs
pyenv activate py3.8  # 激活虚拟环境 (py3.8 为我自己设置的环境名)
pyenv deactivate #退出虚拟环境，回到系统环境
```


```
pip -V
```

## 5. 使用多个 kernel 跑在不同的环境于 jupyterlab

进入虚拟环境

```
pyenv activate py3.8
```
```
pip install --user ipykernel
python -m ipykernel install --user --name=py3.8
```

然后 jupyterlab 里面就会多一个 py3.8 kernal 这个就是那个虚拟环境

## 参考
1. https://github.com/pyenv/pyenv-installer

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info