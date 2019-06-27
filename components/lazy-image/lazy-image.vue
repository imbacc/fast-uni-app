<template>
	<view class="lazy-image">
		<image class="real-image" @load="onLoaded" :src="realSrc" :mode="img_mode"></image>
		<view @tap="click" :class="loaded?'loaded':''">
			<image :src="placeholdSrc"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placeholdSrc:{
				type:String,
				default:""
			},
			realSrc:{
				type:String,
				default:""
			},
			time_num:{
				type:Number,
				default:0
			},
			img_mode:{
				type:String,
				default:"scaleToFill"
			}
		},
		data(){
			return {
				loaded:false
			}
		},
		methods:{
			onLoaded(){
				let _this = this
				if(_this.time_num == 0){
					_this.loaded = true
				}else{
					let time = setTimeout(()=>{
						_this.loaded = true
						clearTimeout(time)
					},_this.time_num)
				}
			},
			click(){
				if(this.loaded) this.$emit('imgClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lazy-image{
		height: 100%;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		image{
			width: 100%;
			will-change: transform, opacity;
		}
		view{
			background-color: white;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			transition: opacity 0.5s linear;
			image{
				width: 100%;
				will-change: transform, opacity;
			}
		}
		.loaded{
			opacity: 0;
		}
	}
</style>
