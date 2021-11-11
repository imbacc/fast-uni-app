<template>
	<view class="">
		aa子页面
		 <view class="">
			 option: {{ option }}
		 </view>
		 <view class="mt20">
			  pages.json 定义信息嵌入当前路由-> {{ is_goto.curRouter }}
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {}
			}
		},
		onLoad(option) {
			console.log('aa option=', option)
			this.option = JSON.stringify(option)
			console.log(this.is_tools.loca_get(this.option));
			console.log(this.is_goto.curRouter)
		}
	}
</script>

<style>
</style>
