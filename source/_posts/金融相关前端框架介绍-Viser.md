---
title: 金融相关前端框架介绍  Viser
toc: true
date: 2019-10-14 01:55:23
tags:
  - 量化
  - Front-end
---

# 1. 写在前面
金融相关的需要折线图之类，然后发现很多所谓的 material 框架根本就一个 button， table 之类的，根本没有所谓成熟的解决方案。

有一篇 Google design 团队写的文章：[Robinhood: Investing in Material](https://design.google/library/robinhood-investing-material/)。 大体就是说 Robinhood 使用 material design 重写他们的 App，更加好用了。但是也没有公开相应的 UI tookit 在 Github 上。

对于 sketch files，如果需要模板的话，这个列表有很多觉得还不错的：[13 BEST FINANCE APP UI KITS](https://csform.com/13-best-finance-app-ui-kits/)。

对于可视化方面，这边有个很好的总结：https://github.com/TingGe/data-visualization

因为 React/Vue/Angular 对应的环境都不一样，我这里主要讨论的使用以下：

- Vue
- Typescript

发现就只有 `Ant design` 有成熟的文档有比较还可以的金融相关的 charts 可以做。

对于其他的调查的过的框架，比如谷歌自己的框架，没有任何画图工具。而且其他可以画图的框架，都是需要很贵的购买授权费。这么看来还是阿里给力啊。

<!-- more -->

# 2. Ant design G2
## 2.1 如果你想使用 Angular

如果你只想看 `Vue` 的，直接看下一节。

对应的 `Angular` 实现方案：
1. https://ng.ant.design/docs/introduce/en
2. https://github.com/viserjs/viser/tree/master/packages/viser-ng
3. https://viserjs.github.io/

使用 AntV 实现的折线图形式
![](https://storage.googleapis.com/lichamnesia.appspot.com/images/antV_%E6%8A%98%E7%BA%BF%E5%9B%BE.png)

```bash
npm i typescript -g
npm install -g @angular/cli
ng new my-first-project
cd my-first-project
ng serve
```

然后打开浏览器就可以看到你的 App：`http://localhost:4200/`。这个指令可以持续编译源代码的任何修改。

安装 material，G2库
```bash
ng add @angular/material
npm install viser-ng
npm install rxjs 
npm install reflect-metadata
npm i @types/node
```

至此，你所有需要的依赖基本已经安装完成，因为 `viser-ng` 基本目前无人维护，所以你需要修改源代码来满足 `Angular` 的各种新 requirements。因为谷歌发布了新的 `Angular` 版本，然后不支持旧版本，但是 `viser-ng` 却依赖旧版本。完全不能兼容，所以不推荐使用。


# 3. 使用 Vue

使用 `vuecli`
```bash
npm install -g @vue/cli
npm install -g typescript
npm install -g @vue/cli-service-global
vue create . # 当前目录创建项目
npm install @antv/data-set
npm install viser-vue
```

在config同级，开发时可以一直编译运行：

```
vue serve
```


# 4. viser 折线图
直接在 `App.vue` 中引入下面文件 `Profit.vue`
```html
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Profit />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Profit from './components/Profit.vue';

@Component({
  components: {
    HelloWorld,
    Profit,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

`Profit.vue` 文件：
```html
<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-line position="date*value" color="people" />
      <v-point position="date*value" color="people" :size="4" :v-style="style" :shape="'circle'" />
    </v-chart>
  </div>
</template>


<script lang="ts">
const DataSet = require("@antv/data-set");

const sourceData = [
  {
    date: "2019-07-01",
    totalValue: 42058.00,
    Alwa: 26307.00,
  },
  {
    date: "2019-08-01",
    totalValue: 42178.00,
    Alwa: 26427.00,
  },
  {
    date: "2019-09-01",
    totalValue: 42862.56,
    Alwa: 26862.56,
  },
  {
    date: "2019-10-01",
    totalValue: 43401.01,
    Alwa: 27320.84,
  }
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: "fold",
  fields: ["totalValue", "Alwa"],
  key: "people",
  value: "value"
});
const data = dv.rows;

const scale = [
  {
    dataKey: "date",
  }
];

export default {
  data() {
    return {
      data,
      scale,
      height: 800,
      style: { stroke: "#fff", lineWidth: 1 }
    };
  }
};
</script>

```

# 5. 编译发布
生成发布版本静态文件，运行：
```bash
vue build
```

这里文件会被打包到默认的 `dist` 目录下面，大体如下：

```
- dist
-- js
--- xx.js
--- xx.js.map
-- css
--- xxx.css
-- favicon.ico
-- index.html
```

这里发布了之后是以根目录为 path 的，比如发布到`alwa.info`那么 url path 就是 `alwa.info/index.html`。

如果需要修改编译的目录和文件，创建 `vue.config.js` 则可以修改这些配置：

```javascript
module.exports = {
    publicPath: '/projects/xxx-xxx/',
    outputDir: 'xxx-xxx'
}
```

这样 url path 就是 `alwa.info/projects/xxx-xxx/index.html`。并且打包的文件也会写到 `xxx-xxx` 目录。


---

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info