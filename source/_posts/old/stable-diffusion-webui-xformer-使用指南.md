---
title: stable-diffusion-webui + xformer 使用指南
toc: true
date: 2023-02-19 22:44:25
tags:
  - Generative AI
---

首先需要这些： 

你有独立显卡吗？你是N卡吗？你N卡是10系以后的吗？更新显卡驱动了吗？

<!-- more -->


## 安装 webui

Github: https://github.com/AUTOMATIC1111/stable-diffusion-webui

需要 Python 3.10，如果之前有 Python 版本的话可能需要重新下载，以及 CUDA 和 pytorch 版本都需要一致。不然会装不了。

```python
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

随后直接运行进行依赖文件的安装。

如果后面出现 Python 版本问题之类的，可以把文件夹下的 venv 文件夹删掉重来

### 启动

```python
python launch.py --disable-safe-unpickle --port=6006 --no-half-vae 
```

如果想直接默认参数就直接打开 bat 或者 sh 文件

```python
./webui-user.bat
```

## 模型结构

```python
./models
├── Lora  # 这个是添加 lora 模型的地方
├── Stable-diffusion # 放 stable-diffusion 模型以及 VAE
```

## 基本 prompt

Positive Prompt

```python
{masterpiece},{best quality}
```

Negative Prompt

```python
lowres,bad anatomy,bad hands,text,error,missing fingers,extra digit, fewer digits, cropped,worstquality,low quality,normal quality,jpeg artifacts,signature, watermark, username,blurryedited
```

### 模型

| 名稱 | 說明 | 下載 |
| --- | --- | --- |
| Stable Diffusion | 原始模型 | https://huggingface.co/stabilityai/stable-diffusion-2 |
| Chilloutmix | 2.5 次元真人于动漫 | https://huggingface.co/TASUKU2023/Chilloutmix |
| Anything | 动漫 | https://huggingface.co/andite/anything-v4.0 |
| Waifu Diffusion | 使用Danbooru，适合动漫 | https://huggingface.co/hakurei/waifu-diffusion-v1-4 |
| Hentai Diffusion | 适合动漫图 | https://www.cognitionai.org/hdhowtogetstarted |

### Tag 教程

1. 分隔：不同的关键词tag之间，需要使用英文逗号`,`分隔，逗号前后有空格或者换行是不碍事的ex：`1girl,loli,long hair,low twintails`（1个女孩，loli，长发，低双马尾）
2. 混合：WebUi 使用 `|` 分隔多个关键词，实现混合多个要素，注意混合是同等比例混合，同时混。ex: `1girl,red|blue hair, long hair`（1个女孩，红色与蓝色头发混合，长发）
3. 增强/减弱：有两种写法
    1. 第一种 (提示词:权重数值)：数值从0.1~100，默认状态是1,低于1就是减弱，大于1就是加强ex: `,(loli:1.21),(one girl:1.21),(cat ears:1.1),(flower hairpin:0.9)`
    2. 第二种 (((提示词)))，每套一层()括号增强1.1倍,每套一层[]减弱1.1倍。也就是套两层是1.1*1.1=1.21倍，套三层是1.331倍，套4层是1.4641倍。
    ex: `((loli)),((one girl)),(cat ears),[flower hairpin]`和第一种写法等价
4. 渐变：比较简单的理解时，先按某种关键词生成，然后再此基础上向某个方向变化。[关键词1:关键词2:数字]，数字大于1理解为第X步前为关键词1，第X步后变成关键词2，数字小于1理解为总步数的百分之X前为关键词1，之后变成关键词2
- ex：`a girl with very long [white:yellow:16] hair` 等价为 16 步骤之后变 yellow

### 迭代步骤

一般 50 步后意义不大

AI绘画的原理就是先随机出一个噪声图片然后一步步的调整图片，向你的 Prompt 靠拢

1. Euler a ：富有创造力，不同步数可以生产出不同的图片。 超过30~40步基本就没什么增益了。
2. Euler：最最常见基础的算法，最简单的，也是最快的。
3. DDIM：收敛快，一般20步就差不多了。
4. LMS：eular的延伸算法，相对更稳定一点，30步就比较稳定了
5. PLMS：再改进一点LMS
6. DPM2：DDIM的一种改进版，它的速度大约是 DDIM 的两倍

### ****提示词相关性 CFG Scale****

图像与你的提示的匹配程度。默认 7 

增加这个值将导致图像更接近你的提示,但过高会让图像色彩过于饱和

一般 5~15

### Inpaint 功能

将涂黑的区域让AI来填充，或者是让 AI 把图片空白的地方完成。

## xformers 安装

```python
git clone https://github.com/facebookresearch/xformers/
cd xformers
git submodule update --init --recursive
pip install --verbose --no-deps -e .
```

安装完成后直接打开

```python
python launch.py --disable-safe-unpickle --port=6006 --no-half-vae  --xformers 
```

如果报错 CUDA not supported 之类的问题可能可以试一下如下。

```elixir
python launch.py --disable-safe-unpickle --port=6006 --no-half-vae  --reinstall-xformers --xformers
```

## 常见问题

### 如果使用高分辨率可能会导致显存爆炸

1024 x 1024 我在 3090 下大概能跑到这样

如果能够加上 xformers 可以图片分辨率高很多。

据说可以把内存虚拟成显存，目前没有试过

### 出现浮点16或者32不匹配

Settings → Stable-Diffusion → Upcast cross attention layer to float32

这个取消选取。

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：https://alwa.info