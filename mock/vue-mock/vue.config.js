// vue.config.js 
const path = require('path');

const MockServicePlugin = require('mock-service-plugin');
module.exports = {
	configureWebpack: {
		plugins: [
			// 初始化插件
	        new MockServicePlugin({
	          path: path.join(__dirname, './mocks'), // mock数据存放在 mocks 文件夹中
	          port: 9090 // 服务端口号
	        })
    	]	
    },
		  // 配置代理
			devServer: {
				// 应用端口，避免与mock服务端口冲突
				port: 3000,
				proxy: {
					'/api': {
						target: 'http://localhost:9090/',
						pathRewrite: {
							// 设置url的重写, 实际过程如下：
							// http://localhost:5001/api/getData -> http://localhost:3000/getData
							'^/api': ''
						}
					}
				}
			}
		
}
