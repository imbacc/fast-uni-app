<template>
	<view class="login_index">
		<view class="is_lab">我是登陆界面</view>
		
		<view class="is_lab" @tap="is_init">点我关闭检测</view>
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
		onLoad() {
			// this.is_init()
		}, 
		methods: {
			is_init(){
				this.is_fun_tools.to_showModal('关闭检测登陆?并且返回到主页!','系统提示',()=>{
					this.is_vuex.commit('set_vuex',['is_check_login',false])
					this.goto_page(this.is_router.index,5)
				})
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
