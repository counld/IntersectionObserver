import React from "react";
import {  Button, Dropdown, Menu } from "antd";
import LinkBtn from "@/page/common/routerLink";
import routerMap from "@/router/routerMap";
import "./index.less";

export default function Header() {

	const routerCom = () => {
		return routerMap.map(item =>  
		<LinkBtn key={item.path} url={item.path} title={item.title} />)
	}

	const userSetting = () => {
		const menu = (
			<Menu
				items={[
					{
						key: '1',
						label: (
							<a target="_blank" rel="noopener noreferrer" href="#">
								我的主页
							</a>
						),
					},
					{
						key: '2',
						label: (
							<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
								个人信息
							</a>
						),
					},
					{
						key: '3',
						label: (
							<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
								编辑财富
							</a>
						),
					},
				]}
			/>
		);
		return (<Dropdown overlay={menu} placement="" arrow>
		<Button ghost type="primary">用户中心</Button>
	</Dropdown>)
	}

	return (<header>
			<div className="logo">
				<div>这是头像logo eara</div>
			</div>
			<div className="nav-link">{ routerCom() }</div>
			<div className="user-select">{userSetting()}</div>
		</header>)
}