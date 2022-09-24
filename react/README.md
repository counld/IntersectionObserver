## 基础配置
首先配置 webpack webpack-cli 使用webpack4版本系列的对后期依赖包会友好些
在不同的依赖包中会有很多依赖问题，需要根据官网进行慢慢配置
```javascript
html-webpack-plugin //配置html文件的

```

在这里使用css模块化的时候，首先安装一个插件：mini-css-extract-plugin：npm install --save-dev mini-css-extract-plugin这个插件主要是其他样式格式转成css ，抽离css用的

​ 然后我们实例化一下这个插件；filename是我们要输出的css文件地址;

### react react-dom 这个需要@babel/preset-react 预设库来解析react语法 注意这个预设能解决兼容性问题

presets: [ // 预设，一组babel扩展插件  还有@babel/preset-typescript 编译typescript语法预设
							require.resolve('@babel/preset-react'), // 用来编译react.jsx语法的预设
这样就可以自己配置react这个库了

### postcss-loader 是来加载移动端适配的扩展器
postcss-px2rem 包是来转换px->rem 进行适配的
px2rem({remUnit: 75})//设计稿根据750px(iphone6)

### postcss-preset-env 这个适配预设要配置 在package.json 中配置browserslist 浏览器的版本大小，才能起作用 


### clean-webpack-plugin 插件 清除上一次的打包文件,
我们的需求是当源代码变化的时候，可以自动的感知到这种变化然后自动的编译和加载展示。目前webpack为我们提供了三种方案来自动编译打包：

webpack watch mode
webpack-dev-server
webpack-dev-middleware
```
这个插件可以在webpack版本output这个配置的clear:true,设置不上的时候
使用了这个就可以解决打包文件不需要手动删除打包的文件，只需在执行打包文件就行

### HMR 热更新是什么，有什么好处
从webpack-dev-server v4.0.0 开始，HMR是默认就开启的
在应用程序运行的过程中，模块的添加、替换和删除都不会重新刷新整个页面，而只是刷新发生变化的那一个模块
不用HMR--- Live Reloading只要编译打包之后的依赖图中的代码发生变化都会实时的刷新浏览器页面

HMR有以下几个好处：

开启HMR不会重新加载整个页面，可以保留应用程序在运行时候的某些状态不丢失。因为浏览器重新刷新页面意味着要重新发起新的HTTP请求，服务器需要对请求作出响应，浏览器拿到资源之后还需要重新加载一遍代码，有的时候还需要重新跑一遍渲染流水线，这对于提高开发的效率是不好的。

在修改了js和css代码的时候，HMR会立即在浏览器中更新，相当于在浏览器的devTools里面调试一样快速，可以大大的提高开发效率

https://www.cnblogs.com/gaokai/p/15971141.html

```


### MiniCssExtractPlugin 插件基于 webpack v5 的新特性构建
```
会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
```

### webpack -> 构建速度优化-开发体验和效率

```javascript
// 1.优化babel-loader
// 开启babel-loader缓存。babel-loader后加?cacheDirectory如果es6代码没有改，不会重新编译
// 控制babel编译范围。用include确定包含的范围，或者exclude确定不包括的范围
{
			test: /.\js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				cacheDirectory:true,
			},
},

// 2.IgnorePlugin避免引入无用模块
// 如引入moment,js，只需要中文和英文的模块
// 业务代码中手动引入中文和英文的语言包，webpack配置中
new webpack.IgnorePlugin(/\.\/locale/, /moment/),//忽略掉moment里的locale语言包，可以减少无用模块引入

// 3.happyPack多进程打包 是plugin
// js是单线程，webpack实际也是单线程打包。
// 比如要将babel的解析放在新进程中，那么module.rule中对js的解析需要改成：
        {
            test: /\.js$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
            use: ['happypack/loader?id=babel'],
            include: srcPath,
            // exclude: /node_modules/
        },
然后需要在plugin中配置babel的happyPack实例：
    new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: ['babel-loader?cacheDirectory']
    }),

// 4.ParallelUglifyPlugin多进程压缩JS

// webpack本身内置了uglify压缩JS，压缩JS本身成本较高，可以多进程开启，直接plugin实例化。
// 根据需要开启多进程，不一定需要。如果项目较大，打包较慢，开启多进程可提高速度。但开启多进程本身就需要成本时间，小项目没必要，打包时间反而会增加

//5.热更新HotModuleReplacementPlugin
自动刷新和热更新区别：
自动刷新速度较慢，状态会丢失
热更新不会刷新，状态不丢失，新代码可立刻生效

webpack.config.dev.js文件 webpack本地环境中配置
plugin中实例化，devSever中设置hot为true
devServer: {
      host: '0.0.0.0',
      port,
      openPage: `http://${ip}:${port}/${publicPath}`,
      hot: true,
      inline: true,
      liveReload: true,
      historyApiFallback: {
        rewrites: [
          {
            from: /.*/g,
            to: `/${publicPath}`,
          },
        ],
      },
},
plugins: [
      // Only update what has changed on hot reload
      new webpack.HotModuleReplacementPlugin(),
      new UrlLogPlugin(),
],


```

###  产出速度优化 webpack优化产出代码-产品性能提高
核心：代码体积更小，合理分包，不重复加载，速度更快，内存使用更少
```javascript
//小图片用base64编码
url-loader 设置limit值控制图片大小，（小于该文件大小的图片转为base64格式）将处理后的图片引入项目，减少http请求
{
    test: /\.(png|svg|jpg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 3*1024 // 3k
        }
    }
}

配置热更新 在devServer里面配置不生效，在package.json 可以 --hot --open
"dev": "webpack-dev-server --open --hot --mode development --config build/webpack.dev.js",

// 2 懒加载 webpack支持异步加载模块的特性。
按需加载：如一个应用有3个页面，首页加载时只加载首页的逻辑，其他两个页面跳转到页面后在异步加载。

原理：动态向页面找那个插入script标签。

// 3.提取公共代码
抽离一些通用代码和第三方的。

webpack 3.x前版本用CommonsChunkPlugin做代码分离，4.x把相关功能包在optimization里的splitChunks

// 4.IngorePlugin减少打包内容

//5. cdn加速 内容分发网络
原理：优化物理链路层传输过程中的网速有限，丢包等问题提升网速。通过在各地部署服务器，形成cdn集群，提高访问速度，把资源部署到各地，用户访问是就近原则向离用户最近的服务器获取资源。

//6. tree-shaking移除没用的js代码
打包过程中移除js上下文没引用的代码。依赖于es6的import和export语句，用来检测代码模块是否被导入，导出，被 js文件引用。

es6 Module的模块依赖解析在代码静态分析过程中进行，可在编译阶段就获取到整个依赖树（不是运行时）这一点webpack提供tree-shaking功能进行代码静态分析层面的优化。
webpack.config.js里Module为production自动开启tree-shaking。但只有用es6 Module才可生效，不能用commonjs。
原因：commonjs动态引入，执行时引入。es6 Module静态引入，编译时引入。
file-where-here //https://blog.csdn.net/cecoal/article/details/124571586

```

### 图片压缩工具是对本地静态图片资源比较多的使用引入压缩插件


### 对多入口文件的引入模块有共工的模块资源引入时，可以考虑资源分块splitchunk，在webpack的optimization压缩
主要是针对多入口----这里压缩配置比较多，建议查资料

### 多路口按需加载可以使用import函数进行动态加载，这个引入的文件会被单独的加载成一个文件，实现按需加载

### 使用core.js实现垫片进行拓展新的兼容出来，但文件会更大，可以实现按需加载，可以找到这个node_modules下的引入的文件名
···使用智能预设实现es6语法的兼容低版本浏览器


### PWA离线缓存，使用了worker-serve插件, 运行是使用了serve的库进行开启服务器

--- serve dist 开启文件资源，进行离线缓存

### aixos的请求取消示例 --- cancelRequest
```javascript
这里主要是请求拦截，使得请求还没会来之前，取消这次操作

```


### axios发送请求后 的过程
首先浏览器会查找当前页面是否有域名文件缓存，没有就去本地磁盘查找，没有找到就会进行dns查找文件ip
然后进行服务器的tcp连接，等待服务器响应返回数据，然后浏览器解析下载文件、

配合客户端写的网页；客户端需求是无网络的情况下要使用缓存的网页；但是发现服务端更新完文件后并且ETag值发生了更改但是前端页面并没有更新；废话不说；先走代码；该代码是让客户端在有网络的情况下每次校验服务端是否发生更改

```javascript
<meta http-equiv="Cache-control" content="no-cache,max-age=0, must-revalidate,no-store">
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Cache" content="no-cache">

```
data\small-demo\react\src\assets\images\request-duration.jpg


### 网络请求缓存是前端和后端的缓存意见
前端也可以设置（在meta里），后端也可以设置（在响应头里），看具体的业务需求了。比如几个移动端H5展示页，那么我觉得可以在服务端统一设置下就好；但如果是官网或者具有复合功能的页面呢，那么在前端设置或者在后端，都是可以的。这个不要求你一定要写到代码里，但是懂还是要懂的（最好学下HTTP，大致基础流程要明白。去看《图解HTTP》就行了），对理解业务和整体架构上会有帮助
https://www.jianshu.com/p/8691f4e3f96e

### webpack配置文件可以参考这官网
https://webpack.docschina.org/plugins/html-webpack-plugin/

·····
https://blog.csdn.net/weixin_43090018/article/details/113579896