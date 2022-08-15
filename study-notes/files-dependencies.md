## 开发过程中遇到依赖包报错的请看, 检查看依赖的文件的包的版本是否冲突
可以去github上找到相应包的地址，在查看这个依赖包的tag记录包的各个版本信息
！！！那怎么知道自己装的包合不合适，有没有冲突，应该对应哪些版本的包呢？
原因：版本不兼容

解决：合适的版本如下

css-loader@5 和 webpack@4
查看package.json文件，查看依赖的包版本信息
sass-loader@10 和 node-sass@4以及webpack@4
----https://www.cnblogs.com/leah-blogs/articles/15700299.html


## 使用一些webpack包中的插件less覆盖为scss全局覆盖的解决插件 这样也减少了包的代码体积
Customize Ant Design's Theme
With the project configured, you can customize Ant Design's theme by specifying Ant Design theme variables in your SCSS theme file (e.g., theme.scss). For example, if theme.scss has the following contents

----https://github.com/intoli/antd-scss-theme-plugin


## 构建scss样式打包工具, 可以借鉴elementul 中用rulp进行css压缩

可以看出如何发布一个标准的文件


https://github.com/ElementUI/theme-chalk/blob/master/gulpfile.js