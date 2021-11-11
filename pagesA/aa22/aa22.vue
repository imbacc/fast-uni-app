<template>
	<view class="">
		aa22子页面
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
			console.log('aa22 option=', option)
			this.option = option
		}
	}
</script>

<style>
</style>
