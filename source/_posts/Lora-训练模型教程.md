---
title: Lora 训练模型教程
toc: true
date: 2023-02-20 12:06:52
tags:
  - Generative AI
---

## 安装

Github：[https://github.com/Akegarasu/lora-scripts](https://github.com/Akegarasu/lora-scripts)


<!-- more -->


## 使用

在 sd-models 下放入你的基准模型，比如 Anything

创建 train 文件夹，并且创建新的你 lora 名字文件夹 example，然后在新文件夹里创建新文件夹 6_example 6是训练次数，可以 5-20 之间

然后在 webui train tab 下面预处理图片，打开 Use deepbooru for caption 和 Auto focal point crop。处理完的图片放入 train 文件夹

然后修改 train.ps1 我的一个例子：

```elixir
# LoRA train script by @Akegarasu

# Train data path | 设置训练用模型、图片
$pretrained_model = "./sd-models/anything-v4.5.ckpt" # base model path | 底模路径
$train_data_dir = "./train/summer" # train dataset path | 训练数据集路径

# Train related params | 训练相关参数
$resolution = "632,1000" # image resolution w,h. 图片分辨率，宽,高。支持非正方形，但必须是 64 倍数。
$batch_size = 3 # batch size
$max_train_epoches = 20 # max train epoches | 最大训练 epoch
$save_every_n_epochs = 2 # save every n epochs | 每 N 个 epoch 保存一次
$network_dim = 32 # network dim | 常用 4~128，不是越大越好
$network_alpha = 32 # network alpha | 常用与 network_dim 相同的值或者采用较小的值，如 network_dim的一半 防止下溢。默认值为 1，使用较小的 alpha 需要提升学习率。
$clip_skip = 2 # clip skip | 玄学 一般用 2
$train_unet_only = 0 # train U-Net only | 仅训练 U-Net，开启这个会牺牲效果大幅减少显存使用。6G显存可以开启
$train_text_encoder_only = 0 # train Text Encoder only | 仅训练 文本编码器

# Learning rate | 学习率
$lr = "1e-4"
$unet_lr = "1e-4"
$text_encoder_lr = "1e-5"
$lr_scheduler = "cosine_with_restarts" # "linear", "cosine", "cosine_with_restarts", "polynomial", "constant", "constant_with_warmup"
$lr_warmup_steps = 0 # warmup steps | 仅在 lr_scheduler 为 constant_with_warmup 时需要填写这个值

# Output settings | 输出设置
$output_name = "summer" # output model name | 模型保存名称
$save_model_as = "safetensors" # model save ext | 模型保存格式 ckpt, pt, safetensors

# 其他设置
$network_weights = "" # pretrained weights for LoRA network | 若需要从已有的 LoRA 模型上继续训练，请填写 LoRA 模型路径。
$min_bucket_reso = 256 # arb min resolution | arb 最小分辨率
$max_bucket_reso = 1024 # arb max resolution | arb 最大分辨率

# ============= DO NOT MODIFY CONTENTS BELOW | 请勿修改下方内容 =====================
# Activate python venv
.\venv\Scripts\activate

$Env:HF_HOME = "huggingface"
$ext_args = [System.Collections.ArrayList]::new()

if ($train_unet_only) {
  [void]$ext_args.Add("--network_train_unet_only")
}

if ($train_text_encoder_only) {
  [void]$ext_args.Add("--network_train_text_encoder_only")
}

if ($network_weights) {
  [void]$ext_args.Add("--network_weights=" + $network_weights)
}

# run train
accelerate launch --num_cpu_threads_per_process=8 "./sd-scripts/train_network.py" `
  --enable_bucket `
  --pretrained_model_name_or_path=$pretrained_model `
  --train_data_dir=$train_data_dir `
  --output_dir="./output" `
  --logging_dir="./logs" `
  --resolution=$resolution `
  --network_module=networks.lora `
  --max_train_epochs=$max_train_epoches `
  --learning_rate=$lr `
  --unet_lr=$unet_lr `
  --text_encoder_lr=$text_encoder_lr `
  --lr_scheduler=$lr_scheduler `
  --lr_warmup_steps=$lr_warmup_steps `
  --network_dim=$network_dim `
  --network_alpha=$network_alpha `
  --output_name=$output_name `
  --train_batch_size=$batch_size `
  --save_every_n_epochs=$save_every_n_epochs `
  --mixed_precision="fp16" `
  --save_precision="fp16" `
  --seed="1337" `
  --cache_latents `
  --clip_skip=$clip_skip `
  --prior_loss_weight=1 `
  --max_token_length=225 `
  --caption_extension=".txt" `
  --save_model_as=$save_model_as `
  --min_bucket_reso=$min_bucket_reso `
  --max_bucket_reso=$max_bucket_reso `
  --xformers --shuffle_caption --use_8bit_adam $ext_args

Write-Output "Train finished"
Read-Host | Out-Null ;
```

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：https://alwa.info