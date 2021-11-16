<template>
	<view class="">
		bb22子页面
		 <view class="">
			 option: {{ option }}
		 </view>
		 
		 <button @click="test_redirectTo">测试redirectTo</button>
		 <button @click="test_reLaunch">测试reLaunch</button>
		 <button @click="test_switchTab">测试switchTab</button>
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
			console.log('bb22 option=', option)
			this.option = option
		},
		methods: {
			test_redirectTo() {
				this.is_router.gotoRouter('pagesA/aa22', { test: 'test_redirectTo' }, 2)
			},
			test_reLaunch() {
				this.is_router.gotoRouter('pagesA/aa22', { test: 'test_reLaunch' }, 3)
			},
			test_switchTab() {
				this.is_router.gotoRouter('user', { test: 'test_switchTab' }, 4)
			},
		},
	}
</script>

<style>
</style>
