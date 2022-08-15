<template>
  <el-space direction="vertical">
		<el-button @click="handleData">请求数据</el-button>
  </el-space>
</template>

<script>
import login from '../../utils/Api';
export default {
	methods: {
		handleData() {
			login({uid: 124}).then(res => {
				console.log(res,'数字键')

			})
		}

	}
	
}</script>
 
<style >
</style>