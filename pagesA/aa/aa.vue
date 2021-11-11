<template>
	<view class="">
		aa子页面
		 <view class="">
			 option: {{ option }}
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
		}
	}
</script>

<style>
</style>
