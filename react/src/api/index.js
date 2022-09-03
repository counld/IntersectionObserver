import axios, { AxiosRequestConfig } from 'axios'
const CancelToken = axios.CancelToken

let baseURL = "/";
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://localhost:3000/';
}
const ins = axios.create({
	baseURL,
	// timeout: 5000,
})
// 新建一个取消请求函数并导出
export let cancelFn = (cancel) => {
	console.log(cancel)
}


// 创建一个请求拦截器，来处理请求发起前的工作
ins.interceptors.request.use(
	config => {
		// 在准备发请求之前，取消未完成的请求
		if (typeof cancelFn === 'function') {
			cancelFn()
		}
		// 添加一个cancelToken的配置
		config.cancelToken = new CancelToken(function executor(c) {  //c是用于取消当前请求的函数
			// 保存取消函数，用于之后可能需要取消当前请求  ---所以此时cancel是一个函数，可以被调用
			cancelFn = c
		})
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
export function request(Args) {
	return ins.request(Args)
}