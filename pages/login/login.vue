<template>
	<view class="login_index">
		<view class="is_lab" @click="login_submit">我是登陆界面 登陆吧</view>

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
				this.is_router
				.hook(() => console.log('test hook1'))
				.gotoRouter('index', { test: 'test index' })
				.hook(() => console.log('test hook2'))
			})
		},
		login_submit() {
			this.is_vuex.commit('user_vuex/set_user_role', ['user'])
			this.is_tools.to_showModal('登陆成功', '系统提示', () => this.is_init())
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
