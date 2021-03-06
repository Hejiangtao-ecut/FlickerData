# 闪视数据 FlickerData
一款免费便捷数据可视化微信小程序

## 脚本编译

### 前置条件
将整个小程序作为一个 npm 项目的一部分进行包裹，最后只需要关心 dist 的输出，而不需要去关心源码

微信开发者工具则只需要去编译生成的 dist 里面产物

### 原因
- 自己平时在公司直接使用配制`gulp`进行便捷开发，那么在微信小程序应该也是可以实现的。
- 解决
    - 首先查了一下`gulp`的插件发现支持 `HTML`转`wxml`,那么编译视图模板就 OK 了
    - 但是发现并没有支持直接`less/sass`转`wxss`的插件。那么是不是可以曲线救国？
        - 首先可以很清晰发现，`wxss`和`css`内容是一模一样的，只是名字不同，那么我们分两步实现
        - 第一步将`less/sass`编译成 `css`,然后再将`css`文件使用`renameFile`将其在`dist`目录里面将 `css`文件改名成`wxss`即可。

- 模板和样式表都解决了，剩下的 `js`文件和`json`就更简单了，`js`可以自己使用 `ts` 开发，然后直接在`dist`目录里面转译成`js`即可。`json`则无需处理

- 同时需要解决的是新增页面和组件的空白模板问题，这个可以自己存一套空白模板，然后用命令行增加即可，这样子即可以解决增加东西需要去微信开发者增加还要文件内容的问题，而且可以加快自己的速度，让操作更加便捷起来。

## 操作指南

- install
    - 安装依赖

- build
    - 进行代码编译

- add
    - 添加模板文件(pages, component, cloudFunction)

## 项目架构

1. 首页
    - 数据录入模块
        - 手动录入
        - 表格导入
        - 拍照导入
2. 分类
    - 包含所有数据模型的示例
3. 我的
    - 包含个人信息，分享记录，数据记录等信息

## 性能优化
### 1. 图片资源
所有图片资源挂载到微信云上，减小包体积，同时图片资源进行压缩处理，减小图片加载压力

## 踩坑记录

### 1. 编译失败问题
云开发的微信小程序 miniprogramRoot 默认是 miniprogram，但是我讲该文件夹和根目录打平，导致编译的时候找不到miniprogram目录编译失败，做对应的修改即可修复

### 2. 云开发异步问题
微信云开发提供了增删改查一系列功能，支持使用callBack 回调或者 promise 风格

个人推荐使用 promise 风格，异步回调虽然更方便，但是需要考虑回调触发时间等一系列问题，容易导致因为异步控制错误而产生 bug

### 3. 云开发访问环境问题
云开发获取数据和官方文档有出入

官方文档提示使用 `DYNAMIC_CURRENT_ENV` 会走到当前环境

实际会走到最开始默认的环境，论坛也有多次反馈该问题

解决：自己手动指定环境地址解决该问题

## 图片资源加载缓慢并且闪动

- 原因：微信云存储给图片资源提供了 fileId 和 https 路径，使用 fileId 导致图片加载肉眼可见缓慢和因为加载缓慢导致先空白再一闪

- 解决：改成使用 https 加载资源
- 因为使用微信 fileId 有解析加载延时问题大致如下
    - 1. 异步获取图片地址数据
    - 2. 图片请求 fileId
        - 云端解析 fileId(耗时)
        - 获取对应的静态资源
        - 返回数据
        - 请求到图片资源
    - 在这个过程图片资源被额外请求一次且转了一手才返回，导致耗时在肉眼可见的缓慢

## echarts 组件修改
- 原因
    - 官方示例是推荐大家在在全局定义一个变量和一个初始化数据函数，在初始化的时候将操纵实例存储到全局变量里面，再在 page 实例里面操作
- 问题点
    - 在Page外部声明var变量时，当用户退出该页面时，只要该页面还驻留在内存中未被销毁，则当再次加载此页面时，变量的值不会改变。
- 改进
    - 修改组件源码，当 chart 实例初始化的时候使用 triggerEvent 将实例上传到引用组件的地方，再进行数据操纵
- 优点
    - 不会存在内存泄露
    - 安全，是上传到引用组件的实例，在其他地方不会获取到这个实例