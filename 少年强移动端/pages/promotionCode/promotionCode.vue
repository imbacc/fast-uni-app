<template>
	<view class="main">
		<view class="heder">
			<view class="heder-avatar">
				<u-avatar :src="user_com.avatar_image" size="117"></u-avatar>
				<view class="head_name">无忧无虑</view>
			</view>
			<view class="heder-erweima flex_column flex_center_align" @longpress="touchou_save">
				<!-- <canvas canvas-id="qrcode" style="width: 434rpx;height: 422rpx;margin-left: 25rpx;" /> -->
				<image style="width: 434rpx;height: 422rpx;" :src="code_com" mode="aspectFill" />
				<!-- <image class="head_ico" :src="user_com.avatar_image" mode="aspectFill" /> -->
				<view class="flex_center">长按扫码注册</view>
			</view>
		</view>
	</view>
</template>

<script>
import uqCode from '@/common/libs/uqrcode.js'

export default {
	data() {
		return {
			time: null,
			uqurl: ''
		}
	},
	computed: {
		user_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
		code_com() {
			return this.is_vuex.state.user_vuex.invite_code
		},
	},
	onReady() {
		// this.make()
	},
	methods: {
		async make() {
			// 回调方式
			let _this = this
			uqCode.make({
				canvasId: 'qrcode',
				componentInstance: this,
				text: 'http://www.baidu.com/s?wd=uqCode',
				size: 200,
				margin: 0,
				backgroundColor: '#ffffff',
				foregroundColor: '#000000',
				fileType: 'jpg',
				correctLevel: uqCode.errorCorrectLevel.H,
				success: (res) => {
					_this.uqurl = res
				}
			})
		},
		touchou_save() {
			clearTimeout(this.time)
			this.time = setTimeout(() => {
				clearTimeout(this.time)
				if (this.code_com) {
					// wx jssdk
				} else {
					this.is_tools.to_msg('保存失败!')
				}
			}, 350)
		}
	}
}
</script>

<style lang="scss" scoped>
.heder {
	height: 745rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin-top: 90rpx;
	position: relative;

	&-avatar {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) translateY(-30%);
		border-radius: 50%;
		view {
			font-size: 32rpx;
			text-align: center;
			color: #333;
		}
	}

	&-erweima {
		position: relative;
		padding-top: 200rpx;
	}
}

.canvas-hide {
	/* 1 */
	position: fixed;
	right: 100vw;
	bottom: 100vh;
	/* 2 */
	z-index: -9999;
	/* 3 */
	opacity: 0;
}

.head_name {
	font-size: 32rpx;
	font-family: PingFangSC-Bold, PingFang SC;
	font-weight: bold;
	color: #333333;
}

.head_ico {
	height: 120rpx;
	width: 120rpx;
	position: absolute;
	top: 46%;
	left: 41%;
	background: #FFFFFF;
	border-radius: 10rpx;
}
</style>
