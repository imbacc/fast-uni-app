<template>
	<view class="login_index">
		<view class="login_body">登陆界面</view>
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js"
	
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.is_init()
		}, 
		methods: {
			is_init(){
				this.is_fun_tools.to_showModal('关闭检测登陆?并且返回到主页!','系统提示',()=>{
					this.is_vuex.commit('is_check_login',false)
					this.is_fun_tools.goto_page(this.is_router.index,5)
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
