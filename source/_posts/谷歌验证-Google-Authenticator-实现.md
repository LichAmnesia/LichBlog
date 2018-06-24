---
title: 谷歌验证 (Google Authenticator) 实现
date: 2018-06-24 00:49:17
tags:
    - Python
toc: true
---


# 1. 介绍 
本文主要介绍 Google Authenticator 的实现，以及背后的算法 TOTP

实现Google Authenticator功能需要服务器端和客户端的支持。服务器端负责密钥的生成、验证一次性密码是否正确。客户端记录密钥后生成一次性密码。

`otpauth://TYPE/LABEL?PARAMETERS`

实现的原理大概是：
1. 服务器生成一个类似`HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ`的密匙，以下称作密匙A，并且保存在数据库中。
2. 页面上显示一个二维码，内容是一个URI地址`otpauth://totp/账号?secret=密钥`，比如`otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30`
3. 客户端扫描二维码，把密匙`HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ`保存在客户端。

当用户需要登录时：
1. 客户端每30秒通过密匙A和时间戳通过算法生成一个6位数字的一次密码。比如`123456`。
2. 用户输入密码，服务端通过数据库密匙和时间戳通过同一种算法生成一个6位数字的一次性密码。那么就能得到相同结果。验证成功。

<!-- more -->

# 2. 使用
下载安装[PyOTP](https://pyotp.readthedocs.io/en/latest/)。
```
pip install pyotp
```

## 2.1 使用 Time-based OTPs

```
import pyotp
import hashlib

totp = pyotp.TOTP('JBSWY3DPEHPK3PXP')
totp.now() # => '492039'

# OTP verified for current time
totp.verify('492039') # => True
time.sleep(30)
totp.verify('492039') # => False
```

## 2.2 使用 Google Authenticator
先生成一个密匙
```
pyotp.random_base32() # returns a 16 character base32 secret. Compatible with Google Authenticator and other OTP apps
```

然后通过生成 Google QC code
```
pyotp.totp.TOTP('JBSWY3DPEHPK3PXP').provisioning_uri("alice@google.com", issuer_name="Secure App")
```
这里默认是`period=30` `digits=6`, `algorithm=SHA1`

这里加密算法可以是别的

```
SHA1
SHA256
SHA512
```
但是文档上说目前 Google Authenticator APP 只有 `SHA1`。经过测试已经支持了。

```
pyotp.totp.TOTP('RDSNLUX4KS5LNMMQ', digest=hashlib.sha256).provisioning_uri("admin@example.com", issuer_name="Wonder Futures")
totp = pyotp.TOTP('RDSNLUX4KS5LNMMQ', digest=hashlib.sha256)
totp.verify('222222')
```
[测试在线生成 QR code](https://www.qr-code-generator.com/)


# 3. 生成 QR code 并使用 Google Authenticator APP
安装[python-qrcode](https://github.com/lincolnloop/python-qrcode)

```
pip3 install Pillow qrcode
```
```
qr "otpauth://totp/Wonder%20Futures:admin%40wonderfutures.com?secret=RDSNLUX4KS5LNMMQ&issuer=Wonder%20Futures&algorithm=SHA256" > test.png
```


# 参考
[HOTP和TOTP算法图解](https://www.jianshu.com/p/a7b900e8e50a)

[TOTP](https://tools.ietf.org/id/draft-mraihi-totp-timebased-06.html)

[pyotp docs](https://pyotp.readthedocs.io/en/latest/)

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
