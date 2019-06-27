<template>
	<view class="index_content">
		<view v-if="show_loading">
			<mht-loader loadingType="circle" :iconMarginRight="-65"></mht-loader>
		</view>
		<view v-else class="index_body">
			<lazy-image @imgClick="look_img(0)" :placeholdSrc="placeholdSrc" :realSrc="realSrc[0]"></lazy-image>
			<lazy-image @imgClick="look_img(1)" :placeholdSrc="placeholdSrc" :realSrc="realSrc[1]" :time_num="2000" img_mode="aspectFill"></lazy-image>
			img_mode 参考 http://uniapp.dcloud.io/component/image 
			
			
			
			<view @tap="get_size" id="size" class="test_size">
				{{time_format(time)}}
			</view>
			
			<view @tap="check_login">手动检测登陆</view>
			
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
				placeholdSrc:'http://p6.qhimg.com/dmfd/160_90_/t015ce7193a5ed634ef.jpg', //加载图片
				realSrc:['http://p8.qhimg.com/dmfd/160_90_/t01efba9fd4f9b3fb38.jpg','http://p9.qhimg.com/dmfd/160_90_/t0139ca449fda80e3df.jpg'],
				show_loading:true,
				time:''
			}
		},
		onLoad() {
			this.is_init()
		},
		computed: {
			time_format(){
				return (time) => {
					return this.is_fun_tools.time_format(time)
				}
			}
		},
		methods: {
			is_init(){
				let _this = this
				
				//模拟加载
				setTimeout(()=>{
					_this.show_loading = false
				},1000)
				
				setTimeout(()=>{
					_this.check_login()
				},4000)
			},
			check_login(){
				let _this = this
				const msg = (msg) => { this.is_fun_tools.to_msg(msg)}
				if(this.is_vuex.state.is_check_login){
					_this.is_fun_tools.to_showModal('是否检测登陆','系统提示',()=>{
						msg('检测到没有登陆')
						_this.is_vuex.dispatch("check_login")
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