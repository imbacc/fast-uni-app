<template>
	<view class="">
		bb子页面
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
			console.log('bb option=', option)
			this.option = option
		}
	}
</script>

<style>
</style>
