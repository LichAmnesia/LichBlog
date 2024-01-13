---
title: PhotoSwipe 教程
date: 2017-11-12 22:25:36
tags:
    - Material Design
    - Front-end
toc: true
---

## 0. 前言
PhotoSwipe 是一个前端显示图片的一个框架，不依赖其他额外框架便可以单独运行。此文大部分翻译自官方[文档](http://photoswipe.com/documentation/getting-started.html)。自己写的[demo Github](https://github.com/LichAmnesia/PhotoSwipeGalleryExample)，图片文件存储在`firebase`上。

<!-- more -->

## 1. 安装
在 [Github](https://github.com/dimsemenov/photoswipe) 页面下载整个`zip`。有关的代码在`dist`文件夹下面。把相应的文件添加进你的`HTML`页面。如下面代码所示，把`path/to`这里修改为你自己相应路径。

```
<!-- Core CSS file -->
<link rel="stylesheet" href="path/to/photoswipe.css"> 

<!-- Skin CSS file (styling of UI - buttons, caption, etc.)
     In the folder of skin CSS file there are also:
     - .png and .svg icons sprite, 
     - preloader.gif (for browsers that do not support CSS animations) -->
<link rel="stylesheet" href="path/to/default-skin/default-skin.css"> 

<!-- Core JS file -->
<script src="path/to/photoswipe.min.js"></script> 

<!-- UI JS file -->
<script src="path/to/photoswipe-ui-default.min.js"></script> 
```

你在哪里引入这些`JS`和`CSS`文件并不影响。重要的代码只会在你运行`new PhotoSwipe()`的时候运行。

## 2. 引入 PhotoSwipe

```
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
     It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
        <!-- Container that holds slides. 
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <!--  Controls are self-explanatory. Order can be changed. -->
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Share"></button>
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>
```

这里要注意，一定得在一个`class="pswp"`的`DOM`里面。而且`pswp__bg`，` pswp__scroll-wrap`， `pswp__container`和`pswp__item`的顺序是不能改变的。

## 3. JS 运行 PhotoSwipe
`PhotoSwipe`接受4个参数：

- `.pswp`元素，这个已经在第二个阶段加进了`DOM`，需要进行选择一下就行。
- `PhotoSwipe UI`的类。如果你已经引入了默认的`photoswipe-ui-default.js`（在第一步的时候引入的），那么值就是`PhotoSwipeUI_Default`。这个值可以是`false`。
- 一个`Array`类型的数据，包括图片文件以及图片大小的`objects`（slides）。
- 选项设置，更多可以参考[文档](http://photoswipe.com/documentation/options.html)。

```
var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [
    {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
];

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
gallery.init();
```


对于`items`主要有几个选项，可以参考如下代码：
```
var items = [
    // item 1
    {
        src: 'path/to/image1.jpg', // path to image
        w: 1024, // image width
        h: 768, // image height
        msrc: 'path/to/small-image.jpg', // small image placeholder,
        // main (large) image loads on top of it,
        // if you skip this parameter - grey rectangle will be displayed,
        // try to define this property only when small image was loaded before

        title: 'Image Caption' // used by Default PhotoSwipe UI
        // if you skip it, there won't be any caption

        // You may add more properties here and use them.
        // For example, demo gallery uses "author" property, which is used in the caption.
        // author: 'John Doe'

    },

    // item 2
    {
        src: 'path/to/image2.jpg',
        w: 600,
        h: 600
        // etc.
    }
    // etc.
];
```



## 4. 引用网页里面图片
这需要在网页`HTML`里面预先定义好图片源和格式，然后在`JS`里面定义好`.pswp`元素就行。
```
<div class="wrapper">
    <div class="demo-content cf">
        <div id="photo-gallery" class="picture three cf">
            <figure itemprop="associatedMedia">
                <a href="img/office-1-thumb.jpg" itemprop="contentUrl" data-size="1000x667">
                <img src="img/office-1-thumb.jpg" height="400" width="600" itemprop="thumbnail" alt="Beach">
                </a>
            </figure>
        </div>
    </div>
</div>
```
如下是一个接受上面`HTML`的`figure`并进行显示的的`js`代码。
```
function openPhotoSwipe() {
    var $pswp = $('.pswp')[0];
    var image = [];
    $('.picture').each(function() {
        var $pic = $(this),
            getItems = function() {
                var items = [];
                $pic.find('a').each(function() {
                    var $href = $(this).attr('href'),
                        $size = $(this).data('size').split('x'),
                        $width = $size[0],
                        $height = $size[1];

                    var item = {
                        src: $href,
                        w: $width,
                        h: $height
                    }

                    items.push(item);
                });
                return items;
            }

        var items = getItems();
        console.log(items);

        $.each(items, function(index, value) {
            image[index] = new Image();
            image[index].src = value['src'];
        });

        $pic.on('click', 'figure', function(event) {
            event.preventDefault();

            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
            }

            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    });
};
```


**注意：**如果是`jQuery`或者请求过来的网络资源，一定要资源载完以后再运行`new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options)`否则会出现资源加载不完全的情况。

## 5. Firebase 配置
图片存在`Firebase Storage`里面。按照文档教程，先在代码里进行`config`。
```
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmZAYedNvi2RATsx20WYb29OvyUCH-FVw",
    authDomain: "lichamnesia.firebaseapp.com",
    databaseURL: "https://lichamnesia.firebaseio.com",
    projectId: "lichamnesia",
    storageBucket: "lichamnesia.appspot.com",
    messagingSenderId: "997536981175"
};
firebase.initializeApp(config);
```

```
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
var starsRef = storageRef.child('images/Photo_' + _imgid + '.JPG');
// Get the download URL
starsRef.getDownloadURL().then(function(url) {
    // download url
    console.log(url);
}
        
```

## 参考
[1] [the perfect lightbox using photoswipe](https://webdesign.tutsplus.com/tutorials/the-perfect-lightbox-using-photoswipe-with-jquery--cms-23587)
[2] [photoswipe document](http://photoswipe.com/documentation/getting-started.html)
