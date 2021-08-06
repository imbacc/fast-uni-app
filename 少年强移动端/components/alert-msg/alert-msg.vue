<template>
	<view class="alert_pack flex_center_align" @touchmove.stop.prevent="stop">
		<view class="alert_div flex_column flex_center_align">
			<view v-if="upClass" class="alert_title">您确定要预约该课程吗？</view>
			<view v-if="upClass" class="alert_lab flex_align">
				距离上课时间还要
				<view class="alert_red">{{ lastTime }}</view>
			</view>
			<view v-if="upDiy" class="alert_lab flex_align">
				<slot></slot>
			</view>
			<view class="flex_align alert_button_pack flex_around" style="width: 90%;">
				<view class="alert_button flex_center_align" @click="alert_confirm">{{ buttonLab }}</view>
				<view class="alert_button alert_white flex_center_align" @click="alert_cancel">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			lastTime: {
				type: String,
				default: ''
			},
			upClass: {
				type: Boolean,
				default: false
			},
			upDiy: {
				type: Boolean,
				default: false
			},
			buttonLab: {
				type: String,
				default: '确定'
			}
		},
	    data() {
	        return {
	            
	        };
	    },
		created() {
			uni.pageScrollTo({
				duration: 0,
				scrollTop: 0
			})
		},
	    methods: {
			stop() {
				return false
			},
	        alert_confirm() {
	            this.$emit('confirm')
	        },
			alert_cancel() {
				this.$emit('cancel')
			}
	    },
	}
</script>

<style lang="scss" scoped>
	
	.alert_pack {
		min-height: 100vh;
		width: 100%;
		background: rgba(0, 0, 0, 0.54);
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.alert_div {
		width: 540rpx;
		height: 323rpx;
		background: #FFFFFF;
		border-radius: 25rpx;
		margin-top: -200rpx;
	}
	
	.alert_title {
		font-size: 32rpx;
		font-family: PingFangSC-Bold, PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	
	.alert_lab {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 24rpx;
		margin-bottom: 32rpx;
	}
	
	.alert_red {
		color: #E62234;
	}
	
	.alert_button_pack {
		margin-top: 20rpx;
	}
	
	.alert_button {
		width: 223rpx;
		height: 72rpx;
		background: #E62234;
		font-size: 32rpx;
		border-radius: 42rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	
	.alert_white {
		border: 1rpx solid #ADADAD;
		background: #FFFFFF;
		color: #555555;
	}
</style>
