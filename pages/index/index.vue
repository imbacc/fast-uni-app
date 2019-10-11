<template>
	<view class="index_content">
		<view v-if="show_loading">
			<mht-loader loadingType="circle" :iconMarginRight="-65"></mht-loader>
		</view>
		<view v-else class="index_body">
			默认懒加载
			<lazy-image @imgClick="look_img(0)" :placeholdSrc="placeholdSrc" :realSrc="realSrc[0]"></lazy-image>
			延迟懒加载
			<lazy-image @imgClick="look_img(1)" :placeholdSrc="placeholdSrc" :realSrc="realSrc[1]" :time_num="2000" img_mode="aspectFill"></lazy-image>
			<!-- img_mode 参考 http://uniapp.dcloud.io/component/image -->
			
			<view @tap="get_size" id="size" class="test_size">
				{{lab}}点我时间
				{{time_format_com(time)}}
			</view>
			
			<view @tap="check_login">点我 手动检测登陆</view>
			
			是否检测登陆:{{is_vuex.state.is_check_login}}
		</view>
	</view>
</template>

<script>
	import mhtLoader from '@/components/mht-loader/mht-loader.vue';
	
	export default {
		components: {
			mhtLoader
		},
		data() {
			return {
				placeholdSrc:'/static/img/loading.png', //加载图片
				realSrc:[],
				show_loading:true,
				time:'',
				img_mode_doc:false,
				lab:''
			}
		},
		onLoad() {
			this.is_init()
		},
		computed: {
			time_format_com(){
				return (time) => this.time_format(time)
			}
		},
		methods: {
			time_format(time){
				return this.is_fun_tools.time_format(time)
			},
			is_init(){
				// this.is_vuex.dispatch('api_action',['app_index',{}]) app_index 为 /config/api.js 里命名名称
				
				//false 不分页, 30缓存时间/分钟 请求方式get 默认是post
				this.is_vuex.dispatch('api_action',['app_index',{},{},false,30,'get']).then((res)=>{
					console.log(res)
					this.realSrc = res.data.img
					this.lab = res.data.lab
					this.show_loading = false
				})
				
				// 4秒后检测登陆
				// let _this = this
				// setTimeout(()=>{
				// 	_this.check_login()
				// },4000)
			},
			check_login(){
				const msg = (msg) => {this.is_fun_tools.to_msg(msg)}
				if(this.is_vuex.state.is_check_login){
					this.is_fun_tools.to_showModal('是否检测登陆','系统提示',()=>{
						msg('检测到没有登陆')
						this.is_vuex.dispatch("check_login")
					})
				}else{
					msg('已经关闭检测登陆')
				}
			},
			look_img(index){
				this.is_fun_tools.look_img(index,this.realSrc)
			},
			get_size(){
				this.is_fun_tools.getElment('#size').then((res)=>{
					console.log(res)
					this.time = '2019-05-05 05:05:05'
				})
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