---
title: Three.js 学习笔记
date: 2017-11-12 22:19:32
tags:
    - Material Design
    - Front-end
toc: true
---

## 0. 前言
文本主要介绍使用`Three.js`导入 Objects 并模仿 [paperplanes](https://paperplanes.world/) 设计一个网页应用。

![](http://storage.googleapis.com/lichamnesia.appspot.com/images/threejs-paperplanes.png)

[Demo - Paper planes](http://alwa.info/projects/paperplane)。 应用数据部分放在 `firebase database` 里面，可能需要翻墙才能访问。

主要设计是这样，先导入球和纸飞机模型，然后让纸飞机可以绕着球随便飞，当然要有一个路径，但是保证路径上每一个点，飞机都是朝自己所飞的方向就行。用户主要操作是这样，左边可以放飞一个纸飞机，右边是随机抓取一个纸飞机。

<!-- more -->

## 1. 添加 blender 的 3d 模型
`Three.js` 是一个 `WebGL`的包，在这里我主要用
### 1.1 对 blender 添加插件
首先需要到 `Github` 上下载一个导出插件：[ Blender to Three.js exporter](https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender)。这个插件可以把 `Blender` 的模型导出成 `Three.js` 可以识别的 `JSON` 格式。

首先下载这个软件，并且把解压出来的 `io_three` 文件夹放到你的`~/.config/blender/2.69/scripts/addons/`（windows 和 linux 同理，可以看 Readme）。接下来，打开 `File > User preferences > Addons tab` 然后搜索`Three.js`并且 enable 那个插件。现在应该能看到 ·File > Export > Three.js` 选项。

需要 blender 重新启动才有 export 选项。而且进行导出的时候如果用 JSONLoad 需要把 type 从 buffergeometry to Geometry (Blender 2.76)。然后把导出的 mesh 通过 `Three.js` 导入。

但是实践证明这种方法并不好，比较好的解决策略是：是使用导出的 `JSON` 或者 `Objects` 文件，然后放到[threejs editor](https://threejs.org/editor/)，在这里面可以直接导出一个 `JSON` 这个文件是 `Three.js` 一定能够使用的模型。

## 2. 基本操作
导入 `Three.js` 操作，以及把 `Three.js` 的 `canvas` 加到整个网页里面。然后初始化相机位置。`Three.js` 有三个基本元素，`scene` `camera` 和 `renderer`。

```javascript
// -------------
// Add three js
// Three basic elements to add, scene, camera, renderer
var scene, camera, renderer;
// set width and length as window size
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// init funciton
function init() {
    scene = new THREE.Scene();
    initCamera();
    initRenderer();

    // Append to the document
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping pane
        1000 // Far clipping pane
    );

    // Reposition the camera
    camera.position.set(5, 7, 5);

    // Point the camera at a given coordinate
    // camera.lookAt(new THREE.Vector3(0, 15, 0));
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Size should be the same as the window
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set a near white clear color (default is black)
    renderer.setClearColor(0xeeeeee);
}

init();
// ------------------------------- End of init functions

```
然后加上对鼠标操控以及光线。
```javascript
// Controls for mouse
var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function() { renderer.render(scene, camera); });

// Set light
// var spotLight = new THREE.SpotLight(0xffffff);
var spotLight = new THREE.AmbientLight(0x1ab6ff);
spotLight.position.set(25, 50, 25);
spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

var spotLight = new THREE.PointLight(0xffffff);
spotLight.position.set(-40, 60, -10);
//  spotLight.castShadow = true;
scene.add(spotLight);

// ---------
// set shadow
var shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee });
shadowMaterial.opacity = 0.5;

```
最后的 render 方法和 animate 方法，需要运行  `animate()`。。
```javascript
// Render the scene/camera combination
function render() {
    rotateEarth();
    createPlane();
    flyPath();
    renderer.render(scene, camera);

}

function animate() {
    time = Date.now();
    requestAnimationFrame(animate);
    if (time - lastTime > FRAME_PERIOD) {
        render();
        return;
    }

}

```

## 3. 导入 object
使用 `ObjectLoader()` 获取 obj 的信息。
```javascript
var earth;

function initEarth() {
    // instantiate a loader
    var loader = new THREE.ObjectLoader();

    var material = new THREE.MeshStandardMaterial({
        color: 0x80D8FF,
        flatShading: true, // default is THREE.SmoothShading
        metalness: 0,
        roughness: 1
    });

    // load a resource
    loader.load(
        // resource URL
        'objs/model.json',

        // Function when resource is loaded
        //Here it is assumed to be an object
        function(obj) {
            //add the loaded object to the scene
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.material = material;
            obj.scale.x = 0.5;
            obj.scale.y = 0.5;
            obj.scale.z = 0.5;
            earth = obj;
            scene.add(obj);
        },

        // Function called when download progresses
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // Function called when download errors
        function(xhr) {
            console.error('An error happened');
        }
    );
}

initEarth();
```

## 4. 导入 curve
引入这个文件来得到更多的路径。
[CurveExtras 文件](https://github.com/mrdoob/three.js/blob/master/examples/js/CurveExtras.js)。可以参考[网页的 Curve 形状](https://threejs.org/examples/?q=spli#webgl_geometry_extrude_splines)。

直接运行相应函数就可以得到一个 curve，然后根据时间 t 获得所在位置以及正方向。

```javascript
// Create the path for use.
var spline = [],
    line, spline_num = 2;

function createPath() {
    spline1 = new THREE.Curves.CinquefoilKnot(700);
    spline2 = new THREE.Curves.TorusKnot(700);

    var material = new THREE.LineBasicMaterial({ color: 0x2c2c2c });
    var geometryt1 = new THREE.Geometry();
    var geometryt2 = new THREE.Geometry();
    for (var i = 0; i < spline1.getPoints(100).length; i++) {
        geometryt1.vertices.push(spline1.getPoints(100)[i]);
        geometryt2.vertices.push(spline2.getPoints(100)[i]);
    }

    line1 = new THREE.Line(geometryt1, material);
    line1.scale.x = 0.005;
    line1.scale.y = 0.005;
    line1.scale.z = 0.005;

    line2 = new THREE.Line(geometryt2, material);
    line2.scale.x = 0.005;
    line2.scale.y = 0.005;
    line2.scale.z = 0.005;

    // scene.add(line1);
    // scene.add(line2);
    spline.push(spline1);
    spline.push(spline2);
}
createPath();
```
控制飞机的朝向，以及每次 t 所在的位置的函数。
```javascript
var scale_spine = 0.005;
// plane info 
var arr_length = [0, 0];
var plane_arr = [
    [],
    []
];
var pos_arr = [
    [],
    []
];
var pos_shift = [
    [],
    []
];
var spline_speed = [0.0009, 0.0007];
var axis = new THREE.Vector3();
var up = new THREE.Vector3(0, 1, 0);
var tangent, radians;

// Initial plane objects for using
function flyPath() {
    if (plane_arr != null && plane_arr[0].length != 0 && plane_arr[1].length != 0) {
        for (var _spline = 0; _spline < spline_num; _spline ++) {
            for (var _i = 0; _i < arr_length[_spline]; _i++) {
                pt = spline[_spline].getPoint(pos_arr[_spline][_i]);
                plane_arr[_spline][_i].position.set((pt.x + pos_shift[_spline][_i]) * scale_spine, (pt.y + +pos_shift[_spline][_i]) * scale_spine, (pt.z + +pos_shift[_spline][_i]) * scale_spine);

                tangent = spline[_spline].getTangent(pos_arr[_spline][_i]).normalize();
                axis.crossVectors(up, tangent).normalize();
                radians = Math.acos(up.dot(tangent));
                plane_arr[_spline][_i].quaternion.setFromAxisAngle(axis, radians);

                // change t to a new position
                pos_arr[_spline][_i] = (pos_arr[_spline][_i] >= 1) ? 0 : pos_arr[_spline][_i] += spline_speed[_spline];
            }
        }
    }

}
```



# 参考
[1] [贴球面纹理](http://jsfiddle.net/zD2rH/183/)
[2] [网的图标选择](http://www.iconfont.cn/search/index?searchType=icon&q=%E7%BD%91&page=2) 颜色选择为 `1a8cff`
[3] [Animating scenes with WebGL + Three.js.](https://www.august.com.au/blog/animating-scenes-with-webgl-three-js/)
[4] [Step three demo](https://codepen.io/agar/pen/dOqGWx)
[5] [three.js 光与影学习笔记](http://www.jianshu.com/p/4c6d7ab75991)





