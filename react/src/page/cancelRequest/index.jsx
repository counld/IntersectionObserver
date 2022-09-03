import React, { useState, useRef, useEffect } from "react";
import { Button } from 'antd';
import { request, cancelFn } from '@/api'
import './index.less';

export default function CancelRequest() {
	const [title, setTitle] = useState('初始化的内容...qing请打开node服务')
	const requestState = useRef(false);
	const [isCancal, setIsCancal] = useState(false);

	useEffect(() => {
		window.sessionStorage.setItem('storage', "setItem")
		window.localStorage.setItem('storage', "setItem")
		request({ 
			url: "http://localhost:8000/login",
			withCredentials: true,
		}).then((res) => {
        console.log(res,'请求服务端跨域设置请求头');
      });
      
		})
		
		// 发送同域请求
	const handleSite = () => {
		request({ url: "http://localhost:8000/user" }).then((res) => {
			console.log(res, '发送跨域请求，服务器允许跨域');
		});
	}

	// 发送跨域请求 
	const handleBute = () => {
		request({ url: "http://localhost:8003/anotherService" }).then((res) => {
			console.log(res);
		});
	}

	requestState.current = isCancal;
	 const getTab1Context = async () => {
		setIsCancal(!isCancal);
		const status = requestState.current;
		if(status) {
			console.log(status,'status',cancelFn)
			console.log('quexoao')
			cancelFn('取消了tab1的请求')
			return;
		} 

		const { data } = await request({
			url: '/tab1',
		})
		setTitle(data)
	}

	
	const getTab2Context = async () => {
		const { data } = await request({
			url: '/tab2',
		})
		setTitle(data)
	}
	const cancalRequest = () => {
		cancelFn('取消了tab1的请求')
	}
	
	const getTab3Context = async () => {
		// cancelFn('取消了tab2的请求')
		const { data } = await request({
			url: '/tab3',
		})
		setTitle(data)
	}
	console.log(title,'tt')
	return (
		<div className="container">
			<div className="context">{title}
				<div>
					<Button onClick={handleSite}>同源请求</Button>
					<Button onClick={handleBute}>跨源请求</Button>
				</div>
			</div>
			<div className="btns">
				<button onClick={getTab1Context}>tab1</button>
				<button onClick={getTab2Context}>tab2</button>
				<button onClick={getTab3Context}>tab3</button>
				<button onClick={cancalRequest}>取消请求</button>
			</div>
		</div>
	)
}