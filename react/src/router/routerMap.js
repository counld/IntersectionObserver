import CancelRequest from "../page/cancelRequest";
import Echarts from "../page/echarts";
import Home from "../page/home";
import List from "../page/list";
import MyAntd from "../page/antd";

const routerMap = [
	{
		path: "/home",
		title: "首页",
		componet: Home,
	},
	{
		path: "/antd",
		title: "组件",
		componet: MyAntd,
	},
	{
		path: "/List",
		title: "列表",
		componet: List,
	},
	{
		path: "/echarts",
		title: "图形",
		componet: Echarts
	}
	,
	{
		path: "/cancle",
		title: "取消",
		componet: CancelRequest,
	}
]

export default routerMap;