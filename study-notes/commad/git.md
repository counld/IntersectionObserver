### git commit提交之前会执行 pre-commit
代码规范之 lint-staged
在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。

```javascript
npm install husky lint-staged --dev;

package.json //配置
{
  "name": "kkcc", //模块名称
  "version": "1.0.0", //模块版本号
  "description": "tools", //模块描述信息
  "author": "rainbow suger", //作者
  "keywords": [ //一个字符串数组，方便别人搜索到本模块
    "KKCC",
    "VUE"
  ],
  "main": "index.js", //入口文件
  "license": "ISC", //模块制定一个协议,限制用户权限ISC许可证
  "contributors": "rainbow suger", //其他贡献者
  "private": true, //是否私人项目，npm将拒绝发布它
  "scripts": { //运行命令简写 - npm run dev
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "build": "node build/build.js"，
   // --ext 参数就是用来指定需要检查的扩展名的文件，src 就是指定检查的目录。
    "lint": "eslint --fix --ext .js,.jsx,.vue src",  //自动修复
    "lint": "eslint --ext .js,.vue src"
  },
  "dependencies": { //项目运行所需模块 npm install xxx --save
    "axios": "^0.19.2"
  },
  "devDependencies": { //项目开发所需模块 npm install xxx --save -dev
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^8.2.1"
  },
  "peerDependencies": { //开发基础库会指定依赖包的版本范围，主项目（按照此依赖包的项目）安装此依赖的时候，如果主项目react、react-dom库不符合基础库版本要求 会报异常
      "react": ">=16.12.0", 
      "react-dom": ">=16.12.0"
  },
  "engines": { //npm node 版本管理
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "husky": { //git commmit 之前检查代码规范，按照eslint等
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {  //半自动提升代码质量，修复
    "./src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },
   //数组，需要的组件将自动匹配到并使用,也可以配置到具体的组件参数上，可以配合预设preset-env,来browserslist-->兼容版本浏览器版本的设置
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```
### 代码格式化

```javascript 
项目根目录新建 .prettierrc配置文件
{
    "tabWidth": 4, // 保存时为 4 个空格并以 tab 格式
    "singleQuote": true, // 保存时为单引号
}

//如果 src 目录存在着大量的 .js 文件，那么每次执行 eslint 时都会对所有文件检查&修复，很明显除了对性能有影响外，还会影响同事以前写过的代码格式
 "scripts": {
    ...
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "eslint --fix"
    ]
  },
	// 只检查&修复我们修改过的文件就好呢？ lint-staged 就可以做到。
  //  lint-staged 能让这些插件只扫描暂存区的文件而不是全盘扫描

  ```javascript
1. Select the type of change that you're committing
选择您要提交的更改类型

2. What is the scope of this change (e.g. component or file name): (press enter to skip)
更改的范围是什么（例如，组件或文件名）：（按Enter跳过）

3. Write a short, imperative tense description of the change (max 61 chars)
撰写简短的命令式时态描述（最多61个字符）

4. Provide a longer description of the change: (press enter to skip)
提供更改的详细说明：（按Enter跳过）

5. Are there any breaking changes?
有重大变化吗？

6. Does this change affect any open issues?
此更改会影响任何未解决的问题吗？

- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置
  ```
<!-- 查看git命令的说明  -->
<!-- https://www.cnblogs.com/hls-code/p/15428026.html -->