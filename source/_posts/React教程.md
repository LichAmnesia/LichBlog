---
title: React教程
date: 2017-02-05 17:56:56
tags:
  - React
---

之前学习`React`的一些总结。

<!-- more -->

# Dom.Render
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。
```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```
上面代码将一个 h1 标题，插入 example 节点

# JSX 语法
JSX语法，像是在Javascript代码里直接写XML的语法，实质上这只是一个语法糖，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，React 官方推荐使用JSX， 当然你想直接使用纯Javascript代码写也是可以的，只是使用JSX，组件的结构和组件之间的关系看上去更加清晰。

### JSX转化器
使用JSX语法后，你必须要引入babel的JSX解析器，把JSX转化成JS语法，这个工作会由babel自动完成。同时引入babel后，你就可以使用新的es6语法，babel会帮你把es6语法转化成es5语法，兼容更多的浏览器。
要把带有JSX语法的代码转化为纯Javascript代码，有多种方式，对于内联与HTML中的代码或者是未经过转化的外部文件，在script标签中要加上type="text/jsx"，并引入JSXTransformer.js文件即可，不过这种方式并不建议在生产环境使用，建议的方法是在代码上线前就将代码转换好，可以使用npm全局安装react-tools
```
npm install -g react-tools
```
并使用命令行工具转化即可（具体用法可以参考jsx -h）：
```
jsx src/ build/
```
>将 JSX 语法转为 JavaScript 语法，这一步很消耗时间。现在前端项目，都会使用前端工程化，不会直接在html页面中直接写js代码，写好的js代码都会使用工具进行编译压缩等。这样的话，我们的jsx也会通过编译直接转化成js语法，让浏览器直接使用。
### 规则
JSX本身就和XML语法类似，可以定义属性以及子元素。唯一特殊的是可以用大括号来加入JavaScript表达式。遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则


JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。
```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
```

上面代码中，变量 HelloMessage 就是一个组件类。模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例（下文的"组件"都指组件类的实例）。所有组件类都必须有自己的 render 方法，用于输出组件。
注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。


```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1><p>
      some text
    </p>;
  }
});
```
这样会报错，因为出现两个顶层标签

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。上面代码的运行结果如下。

### Child
this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点（查
```
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body

```
上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，运行结果如下。

这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

# PropTypes
组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。
组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求（查看 demo06）
```
var data = "123";

      var MyTitle = React.createClass({
        propTypes: {
          title: React.PropTypes.string.isRequired,
        },

        render: function() {
          return <h1> {this.props.title} </h1>;
        }
      });

      ReactDOM.render(
        <MyTitle title={data} />,
        document.getElementById('example')
      );
```
上面的Mytitle组件有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。现在，我们设置 title 属性的值是一个数值。

此外，getDefaultProps 方法可以用来设置组件属性的默认值。



# Dom
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现

# this.state
上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

# 表单
用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取（查看 demo9 ）。
```

var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```
上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况

# 声明周期
Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM

# Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI （查看 demo11 ）。
```

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
)
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
