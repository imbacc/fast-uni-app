<template>
	<view class="index_content">
		<view v-if="show_loading">
			<mht-loader loadingType="circle" :iconMarginRight="-65"></mht-loader>
		</view>
		<view v-else class="index_body">
			加载完毕
		</view>
	</view>
</template>

<script>
	import mhtLoader from '@/components/mht-loader/mht-loader.vue';
	
	//导入Minix
	import {init_append,load_by_id,update_data} from '@/common/minix/index.js';
	
	export default {
		components: {
			mhtLoader
		},
		mixins:[init_append,load_by_id,update_data],
		data() {
			return {
				show_loading:true,
			}
		},
		onLoad() {
			let time = setTimeout(()=>{
				clearTimeout(time)
				this.show_loading = false
			},800)
		},
		methods: {
			//跳转路由
			goto_router(){
				// common/router/index.js 配置路由
				//1 uni.navigateTo	保留当前页面，跳转到应用内的某个页面
				//2 uni.redirectTo	关闭当前页面，跳转到应用内的某个页面。
				//3 uni.reLaunch		关闭所有页面，打开到应用内的某个页面。
				//4 uni.switchTab		跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
				//5 uni.navigateBack	关闭当前页面，返回上一页面或多级页面。
				//pop-in 为动画效果 具体参考uni文档
				this.goto_router('名字','?id=参数',1,'pop-in',()=>{
					//跳转后执行方法,可以在 is_fun_tools 设置全局拦截 设置跳转前 或自定设置 跳转后
				})
			},
			//加载分页数据
			init_data_is_page(){
				//  common/config/index.js 配置接口
				//详情看 common/minix/index => init_append 函数
				this.api_action = '接口名称'
				this.api_param = {}	//param参数
				this.api_body = {}	//body参数
				this.api_fun = (res) => {
					//运行回调
				}
				this.me_type = 'POST' //post or get
				this.is_init(1,0,false)	// 1当前页,0缓存时间分钟单位,false 是否追加list 分页时用到
				console.log(this.page_list)	//默认返回到data数据
				this.loadMoreText = '设置的加载字符'
			},
			//加载数据
			init_data(){
				//函数参数顺序 接口名称,parm参数,body参数,缓存时间,回调,post or get
				this.load_byid('接口名称',{},{},0,(res)=>{'回调'},'post')
				console.log(this.byid_obj)	//默认返回到data数据
				this.is_update = false //是否更新替换 默认data数据 用于第二次 使用 this.load_byid()函数 时保留 this.byid_obj 数据
			},
			//修改数据
			update_data(){
				//用法跟 load_byid 相同 只是少了 缓存参数 必须在回调里获取执行结果
				this.update_info('接口名称',{},{},(res)=>{'回调'},'post')
			},
			//vuex用法
			vuex_fff(){
				this.is_vuex.commit('set_vuex',['名称','值'])		//set_vuex 是主模块 mutations
				this.is_vuex.commit('set_vuex_user',['名称','值']) 	//set_vuex_user 是子模块user_module mutations
				
				this.is_vuex.dispatch('action名称')	//全局名称
				
				this.is_vuex.app_version			//主模块state
				this.is_vuex.user_module.userInfo	//user_module模块state
			}
		}
	}
</script>

<style scoped>
	.test_size{
		height: 200upx;
		width: 400upx;
		border: 1upx solid red;
	}
</style>