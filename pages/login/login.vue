<template>
	<view class="login_index">
		<view class="is_lab">我是登陆界面</view>
		
		<view class="is_lab" @tap="ddd">回回回</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'admin',
				password:'admin'
			}
		},
		methods: {
			ddd(){
				this.is_gopage('/pages/index/index', 3)
			}
		}
	}
</script>

<style scoped>
	.is_lab{
		margin-bottom: 50upx;
		color: red;
	}
</style>
