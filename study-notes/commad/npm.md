### npm 查看命令
npm get registry  查看当前镜像
npm config set/get registry https://registry.npmjs.org 设置npm的配置或读取npm的配置
npm config get cache 查看npm缓存目录的位置，默认位于 /Users/shiqiang/.npm/_cacache
npm config get prefix 查看全局npm安装的路径，查到之后可以在 ${prefixUrl}/lib/node_modules/npm 下看到npm的源码，例如想要查看 npm install 的代码，可以在 /usr/local/lib/node_modules/npm/lib/install.js 中看到
npm config ls -l 查看npm的详细配置
npm ls -g 查看npm安装的全局包
npm outdated -g 查看需要更新的全局包，不加参数表示查看本地需要更新的包
npm uninstall -g hexo 卸载全局安装的包
npm update -g hexo 更新全局安装的包
npm install /local/plugin/path 可以本地安装npm包
npm install --save github:cocowool/hexo-renderer-sass --verbose 可以从github上安装相关的依赖包
npm install --verbose 可以看到安装过程的详细信息
npm cache clean --force 强制清理本地缓存

#### nrm的使用
npm install  nrm -g
npm install -g nrm
nrm ls  显示当前可使用的镜像源列表
nrm use taobao  切换为淘宝镜像源

#### nvm的使用切换node版本
修改输出nvm ls available以显示一个漂亮的表格，最多 20 个结果。显示当前、LTS、稳定和不稳定版本
nvm list :                  查看已安装node版本

nvm install vXX :      安装对应vXX版本的node

nvm uninstall vXX  : 卸载对应vXX版本的node

nvm use xxx :           选择使用XXX版本
`````
安装nvm   https://github.com/coreybutler/nvm-windows/releases