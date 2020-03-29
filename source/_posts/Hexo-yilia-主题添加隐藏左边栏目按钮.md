---
title: Hexo yilia 主题添加隐藏左边栏目按钮
toc: true
date: 2020-03-28 22:16:43
tags:
  - hexo
  - JavaScript
---

## 1. 前言

实现了一下隐藏左边侧边栏目的效果。点击按钮时，缩进左侧边栏，再次点击再弹出来

<!-- more -->

## 2. 制作按钮样式
在 `source-src/css` 下面增加一个文件 `left-menu.scss` 然后引入到 `main.scss`
```css
@import "./left-menu";
```

```css
// 折叠按钮脚本 CSS
.hamburger {
  left: 260px;
  position: fixed;
  top: 0;
  // left: 0;
  cursor: pointer;
  width:35px;
  height:35px;
	z-index:9999;
  display:block;
}

.bar {
  display: block;
  
  width:35px;
	height:3px;
  margin:6px 0;

  background: white;
  
  transition:0.25s;
  -webkit-transition:0.25s;
  -webkit-user-select: none;
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;          
}

.bar:nth-child(1) {
  transform:translate(-2px,10px) rotate(135deg);
  // -webkit-transform: rotate(135deg) translate(-2px, 10px);
}

.bar:nth-child(2) {
  opacity: 0;
}

.bar:nth-child(3) {
  transform:translate(-2px,-8px) rotate(-135deg);
  // -webkit-transform: rotate(-135deg) translate(-2px, -8px);

}

.animate .bar:nth-child(1) {
  transform:translate(0px,0px) rotate(0deg);
  // -webkit-transform: rotate(0deg) translate(0px, 0px);
  background: #4d4d4d;
}

.animate .bar:nth-child(2) {
  opacity: 1;
  background: #4d4d4d;
}

.animate .bar:nth-child(3) {
  transform:translate(0px,0px) rotate(0deg);
  // -webkit-transform: rotate(0deg) translate(0px, 0px);
  background: #4d4d4d;
}
```

打开 `\themes\yilia\layout\layout.ejs` 文件, 找到 `<div class="left-col"`,在其上面添加如下代码:
```html
<!-- Memu icon -->
<div class="hamburger" onclick="animateMenu(this)">
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</div>
```
在 `</body>` 之后, `</html>` 前添加如下 JS 代码:
```html
<!-- 添加折叠按钮脚本 -->
<script>
	var hide = false;
	function animateMenu(x) {
			x.classList.toggle("animate");
			if(hide == false){
					$(".left-col").css('display', 'none');
          $(".mid-col").css("left", '10px');
          $(".hamburger").css('left', '4px');
					hide = true;
			}else{
					$(".left-col").css('display', '');
          $(".mid-col").css("left", '300px');
          $(".hamburger").css('left', '260px');
					hide = false;
			}
	}
</script>
<!-- 添加折叠按钮脚本 -->
```
通过
```
npm run dev
```
得到新的显示效果。



## 3. Mobile 隐藏左边栏目
在 `source-src/css` 的 `mobile.scss` 增加
```css
.left-col,.hamburger {
    display:none
}
```

## 4. 参考
- [添加隐藏左边栏目按钮](https://cqh-i.github.io/2019/08/07/hexo-yilia%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E9%9A%90%E8%97%8F%E5%B7%A6%E8%BE%B9%E6%A0%8F%E7%9B%AE%E6%8C%89%E9%92%AE/)

---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info