<template>
	<view class="login_index">
		<view class="is_lab">我是登陆界面</view>

		<view class="is_lab" @tap="is_init">back</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: 'admin',
			password: 'admin'
		}
	},
	onLoad() {
		// this.is_init()
	},
	methods: {
		is_init() {
			this.is_tools.to_showModal('back?', '系统提示', () => {
				this.is_gopage(this.is_router.index, 3)
			})
		}
	}
}
</script>

<style scoped>
.is_lab {
	margin-bottom: 50upx;
	color: red;
}
</style>
