---
title: Opencv Python 熊猫人头像生成 第二波
date: 2016-04-28 18:48:24
tags:
    - Opencv
    - Python
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=27580073&auto=0&height=66"></iframe>

# 1. 介绍
　　之前看到有人发了一个Matlab程序，可以根据照片上的人脸抠出相应的眼睛鼻子嘴巴，然后放到熊猫人上。生成头像。我已经实现了一个原型，[博客地址](http://alwa.info/2016/03/09/Opencv-Python-%E7%86%8A%E7%8C%AB%E4%BA%BA%E5%A4%B4%E5%83%8F%E7%94%9F%E6%88%90/)。

　　熊猫人原型如下：
　　
![熊猫人](http://7xrh75.com1.z0.glb.clouddn.com/python_base.jpg)
　　
　　写出来的程序放在[Github](https://github.com/LichAmnesia/Pandamen-Generator)了。
　　说一下修改的部分。

<!-- more -->
# 2. 高斯滤波
　　与均值滤波类似，高斯滤波也是用周围像素点的加权来估计中心点的值，只不过高斯滤波中，中心点的值不再是周围点的均值，而是加权(这个加权的系数是通过高斯核函数计算出来的)。需要注意的是，高斯滤波的窗口大小必须为奇数。高斯滤波对去除图像中的高斯噪声非常有效。

　　把原来的中值滤波修改成这个，并修改sigma值。有两个地方可以调，一个是滤波大小(5,5)，需要是奇数。还有一个是sigma值，越大获得图像越深。
　　
```python
gaussian_result = cv2.GaussianBlur(inverse_color_result,(5,5),120)
```

# 3. 颜色减淡操作
　　这个操作是以前程序里没有的，实验效果证明还不错。下面是过程和代码。
　　
1、去色；
2、复制去色图层，并且反色；反色为Y(i,j)=255-X(i,j)
3、对反色图像进行高斯模糊；
4、模糊后的图像叠加模式选择颜色减淡效果。

　　减淡公式：C =MIN( A +（A×B）/（255-B）,255)，其中C为混合结果，A为去色后的像素点，B为高斯模糊后的像素点。
　　
```python
# 颜色减淡操作
# C =MIN( A +（A×B）/（255-B）,255)，其中C为混合结果，A为去色后的像素点，B为高斯模糊后的像素点。
def dodge(A, B):
    C = copy.deepcopy(A)
    for i in range(C.shape[0]):
        for j in range(C.shape[1]):
            C[i][j] = min( A[i][j] + (int(int(A[i][j]) * B[i][j])/(255 - B[i][j])),255)
    return C
```

　　这是效果图：

![淡化效果](http://7xrh75.com1.z0.glb.clouddn.com/%E7%86%8A%E7%8C%AB%E4%BA%BA-lyf%E6%B7%A1%E5%8C%96%E6%95%88%E6%9E%9C.png)

# 4. 二值化
　　输入是颜色减淡之后的图像，调整Canny算法的阈值，得到边缘信息，然后根据人脸的比例，去掉不相关部分（下巴，脸部边缘，头发之类信息）。
　　然后再使用高斯滤波，最后通过自适应二值化操作cvAdaptiveThreshold，可以得到一个把颜色减淡的图像二值化。
　　
```python
result = cv2.GaussianBlur(result,(5,5),1.5)     
result = cv2.adaptiveThreshold(result,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)

```

# 5. 最终结果

![熊猫人](http://7xrh75.com1.z0.glb.clouddn.com/%E7%86%8A%E7%8C%AB%E4%BA%BA-merge_output_lyf_1.jpg)


# 参考文献
[1] 高斯滤波：http://blog.csdn.net/l_inyi/article/details/8915116

[2] OpenCV二值化cvThreshold和自适应二值化cvAdaptiveThreshold及Otsu：http://blog.csdn.net/lsh_2013/article/details/44853393


----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info