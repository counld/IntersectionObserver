const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	mode: "production", //生产环境
	entry: "./index.js", //入口文件
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, '../dist'),//出口文件，
	},
	devtool: "source-map",
	//模块配置规则
	module: {
		//第三方匹配规则(多个loader的话要写成数组)
		rules: [{
			oneOf: [
				{
					test: /\.(js|jsx)$/,
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
								cacheDirectory: true, // 开启babel缓存 这是因为build需要很长时间
								cacheCompression: false  //关闭缓存文件压缩,因为压缩需要时间
							}
						}]
				},//在配置babel-loader的时候一定要加上exclude，否则项目会报错跑不起来
				//css、less和模块化相关配置
				{
					test: /\.(css|less)$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
							}
						},
						'less-loader']
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
	optimization: {
		minimizer: [
			// 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
			// `...`,
			new CssMinimizerPlugin({
				parallel: true, //使用多进程并发执行，提升构建速度。 运行时默认的并发数：os.cpus().length - 1。
			}),
		],
	},
	plugins: [
		new CleanWebpackPlugin(),//每次打包前清除上一次的
		new MiniCssExtractPlugin({
			linkType: "text/css", // 此选项运行使用自定义链接类型加载异步 chunk，例如 <link type="text/css" ...>。
		}), // 分别打包css文件

		new ESLintPlugin({
			context: path.resolve(__dirname, "src"),
			fix: true,
			exclude: "node_modules",//排除这个文件，不检查
			cache: true, //开启eslint缓存
			cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"), //文件缓存在node_modules 下的.cache文件夹内,
		}),//使用eslint
		new HtmlWebpackPlugin({
			title: 'My App',
			chunks: ['app'],
			filename: 'index.[contenthash:10].html',
			// Load a custom template (lodash by default)
			template: path.resolve(__dirname, "../public/index.html"),
			favicon: path.resolve(__dirname, "../public/favicon.ico"),
			'base': {
				'href': 'http://example.com/some/page.html',
				'target': '_blank'
			}
		})
	]
}