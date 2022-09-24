const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	mode: "development", //开发环境
	entry: "./index.js", //入口文件
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, 'dist'),//出口文件
	},
	devtool: "eval-source-map",
	//模块配置规则
	module: {
		//第三方匹配规则(多个loader的话要写成数组)
		rules: [
			{
				oneOf: [

					{
						test: /\.(js|jsx)$/,
						// include: path.resolve(__dirname,'../src'),//只处理src下的文件，和exclude只能写一个
						exclude: /node_modules/, // 排除node_modules中js|jsx文件的检测, 提升编译效率
						use: [
							{
								loader: 'babel-loader',
								options: { //配置了这里跟创建.babelrc文件配置是一样的
									babelrc: false,
									presets: [ // 预设，一组babel扩展插件  还有@babel/preset-typescript 编译typescript语法预设
										require.resolve('@babel/preset-react'), // 用来编译react.jsx语法的预设
										[require.resolve('@babel/preset-env'), { // 智能预设，允许提前使用最新javascript es6语法
											"useBuiltIns": "usage",
											"corejs": 3,
											modules: false
										}]
									],
									cacheDirectory: true, // 开启babel缓存
									cacheCompression: false  //关闭缓存文件压缩,因为压缩需要时间
								}
							}]
					},//在配置babel-loader的时候一定要加上exclude，否则项目会报错跑不起来
					//css、less和模块化相关配置
					{
						test: /\.modules\.less$/,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									modules: {
										localIdentName: '[local]_[hash:base64:5]'
									}
								},
							},
							{
								loader: require.resolve('less-loader')
							}
						]
					},
					{
						test: /\.(css|less)$/,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve('less-loader'),
								options: {
									implementation: require('less'),
								}
							}
						]
					},
				]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".css", ".less", ".json"], //省略后缀缩写
		alias: {
			"@": path.resolve("./src"), // 配置别名,
		}
	},
	plugins: [
		new webpack.BannerPlugin('This file is created by jxy'),   // 生成文件时加上注释
		new CleanWebpackPlugin(),//每次打包前清除上一次的
		new ESLintPlugin({
			context: path.resolve(__dirname, "src"),
			fix: true,
			exclude: "node_modules",//排除这个文件，不检查
			cache: true, //开启eslint缓存
			cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"), //文件缓存在node_modules 下的.cache文件夹内,
		}),//使用eslint
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
		open: true, //是否打开浏览器
		hot: true,   //在版本4以上可以开启hMR热更新
		historyApiFallback: true, // 返回404的时候返回index文件进行路由匹配
		compress: true, // 设置为true代表在浏览器请求本地服务器上静态文件的时候开启gzip压缩，可以提高开发时的效率
		overlay: {
			warnings: true,
			errors: true
		},
		proxy: { //代理
			// 'http://106.53.151.120:8888/user-info/
			'/user-info': {
				target: 'http://132.232.223.165:8888/',
				changeOrigin: true,
				secure: false,
				pathRewrite: { '^/user-info': '' }
			},
			'/upload': {
				target: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
				changeOrigin: true,
				pathRewrite: { '^/upload': '' }
			},
			// '/assets': {
			// 	target: 'https://github.githubassets.com/',
			// 	changeOrigin: true, // 请求时修改host的域名
			// 	secure: false,
			// 	// pathRewrite: { '^/assets': '' } // 把前缀/assets使用js的replace成''
			// }
		}
	}
}