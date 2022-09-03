import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { request } from '@/api';
import styles from "./index.modules.less";

echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);


export default function Echarts() {

	const echartDom = useRef(null);

	useEffect(() => {
		function setCookie(name, value, day) {
			var date = new Date();
			date.setDate(date.getDate() + day);
			document.cookie = name + '=' + value + ';expires=' + date;
	};
	setCookie('echart','hello',3);
		request({
			url: 'https://github.githubassets.com/assets/vendors-node_modules_manuelpuyol_turbo_dist_turbo_es2017-esm_js-8af9baefab9e.js'
		}).then((res) => {
			console.log(res,'请求js文件')
		})
	},[])


	useEffect(() => {
		let myChart = echarts.init(echartDom.current);
		let option;

		const data = [];
		for (let i = 0; i <= 100; i++) {
			let theta = (i / 100) * 360;
			let r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
			data.push([r, theta]);
		}
		option = {
			title: {
				text: 'Two Value-Axes in Polar'
			},
			legend: {
				data: ['line']
			},
			polar: {},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			angleAxis: {
				type: 'value',
				startAngle: 0
			},
			radiusAxis: {},
			series: [
				{
					coordinateSystem: 'polar',
					name: 'line',
					type: 'line',
					data: data
				}
			]
		};
		console.log('select',option,echartDom.current)

		option && myChart.setOption(option);
	})


	return <div >
		这是一个头部的图形新装
		<div className={styles.echartsEle} ref={echartDom}></div>
	</div>
}