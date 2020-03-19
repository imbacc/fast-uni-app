<template>
	<view class="index_content">
		<view v-if="show_loading">
			<mht-loader loadingType="circle" :iconMarginRight="-65"></mht-loader>
		</view>
		<view v-else class="index_body">
			加载完毕
			
			<!-- 路由配置 => common/router/index -->
			<view @tap="is_goto('login')">点我登录</view>
		</view>
	</view>
</template>

<script>
	import mhtLoader from '@/components/mht-loader/mht-loader.vue';
	import md5 from '../../common/lib/md5.min.js';
	
	//导入Minix
	import {load_append,load_info,update_data} from '@/common/minix/index.js';
	
	export default {
		components: {
			mhtLoader
		},
		mixins:[load_append,load_info,update_data],
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
			
			console.log(md5('123456'))
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
				// (name,query = '',type = 1,acg = 'pop-in',fun,last = true) 
				this.is_goto('名字','?id=参数',1,'pop-in',()=>{
					//跳转后执行方法,可以在 goto_router 设置全局拦截 设置跳转前 或自定设置 跳转后
				})
				//参数同上
				this.is_gopage('路径跳转')
			},
			//加载分页数据
			init_data_page(){
				//  common/config/index.js 配置接口
				//详情看 common/minix/index => load_append 函数
				this.init_append_obj.api_action = '接口名称'
				this.init_append_obj.api_param = {}	//param参数
				this.init_append_obj.api_body = {}	//body参数
				this.init_append_obj.api_fun = (res) => {
					//运行回调
				}
				this.init_append_obj.me_type = 'POST' //post or get
				//执行单个对象fun
				this.init_append_obj.fun(1,0,false)	// 1当前页,0缓存时间分钟单位,false 是否追加list 分页时用到
				console.log(this.init_append_obj.page_list)	//默认返回到data数据
				this.init_append_obj.loadMoreText = '设置的加载字符'
				
				//复用 minix init_append_obj 不冲突 ↓
				const obj = this.get_load_append_class() //重新获取对象
				obj.api_action = '接口名称'
				//... 以上相同步骤 => obj.fun()
				this.load_append_fun(1,0,false)// 1当前页,0缓存时间分钟单位,false 是否追加list 分页时用到
				console.log(this.load_append_obj.page_list)	//默认返回到data数据
			},
			//加载数据
			init_data(){
				//函数参数顺序 接口名称,parm参数,body参数,缓存时间,回调,post or get
				this.load_info_obj.fun('接口名称',{},{},0,(res)=>{'回调'},'post')
				console.log(this.load_info_obj.is_obj)	//默认返回到data数据
				this.load_info_obj.is_update = false //是否更新替换 默认data数据 用于第二次 使用 this.load_byid()函数 时保留 this.byid_obj 数据
				
				const obj = this.get_load_info_class()
				//... 以上相同步骤 => obj.fun()
			},
			//修改数据
			update_data(){
				//用法跟 load_info 相同 只是少了 缓存参数 必须在回调里获取执行结果
				this.update_info('接口名称',{},{},(res)=>{'回调'},'post')
			},
			action_fun(){
				/**
				 * @param {api}		请求API地址
				 * @param {param}	追加参数
				 * @param {body}	表单数据
				 * @param {page}	是否分页
				 * @param {cache}   缓存时间 默认为0 不缓存 分钟单位
				 * @param {type}	默认请求类型type为是post请求
				 */
				this.is_action('API名称',{body:'body'},false,0,'post')
				
				//代理进入manifest.json h5 注释部分代理
			},
			//工具集合
			tools_fun(){
				this.is_tools.to_msg('dddd')
				this.is_cdn
				//... 同上
			},
			//vuex用法
			vuex_fun(){
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