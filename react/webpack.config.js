const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: "development", //开发环境
	entry: "./index.js", //入口文件
	output: {
		filename: "bundle.js",
		path: path.join(__dirname,'dist'),//出口文件
	},
	//模块配置规则
	module: {
		//第三方匹配规则(多个loader的话要写成数组)
		rules: [
				{ 
				test: /\.js|jsx$/, 
				exclude: /node_modules/,
				use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              require.resolve('@babel/preset-react'),
              [require.resolve('@babel/preset-env'), {
                "useBuiltIns": "usage",
                "corejs": 3,
                modules: false
              }]
            ],
            cacheDirectory: true
          }
        }] 
			},//在配置babel-loader的时候一定要加上exclude，否则项目会报错跑不起来
					//css、scss和模块化相关配置
					{
						test: /\.(css|less)$/,
						use: ['style-loader', {
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
							}
						}, 'less-loader']
					},
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".css", ".less", "json"], //省略后缀缩写
		alias: {
			"@": path.resolve("./src"), // 配置别名,
		}
	},
	plugins: [
		new CleanWebpackPlugin(),//每次打包前清除上一次的
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
			template: "./public/index.html"
    })
  ],
	// 服务器代理配置
  devServer: {
    host: "localhost",
    port: "3000",
    historyApiFallback: true,
 	   proxy: { //代理
          // 'http://106.53.151.120:8888/user-info/
          '/user-info' : {
            target: 'http://132.232.223.165:8888/',
            changeOrigin:true,
            secure:false,
            pathRewrite: { '^/user-info': '' }
          }
        }
  }
}