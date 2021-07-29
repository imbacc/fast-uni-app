<template>
	<view class="pack flex_center_align">
		<view class="body_div">
			<image class="body_head_img" src="/static/images/promotion/top.png" mode="aspectFill" />
			<view class="body_content flex_center_align">
				<image class="body_content_img" src="/static/images/promotion/head.png" mode="aspectFill" />
			</view>
			<view class="body_foot">
				<view class="input_div flex_align">
					<image class="phone_ico" src="/static/images/promotion/phone_ico.png" mode="aspectFill" />
					<input v-model="phone" class="input_text" maxlength="13" type="text" placeholder="输入手机号" placeholder-class="input_plc" />
				</view>
				<view class="input_div flex_align flex_between">
					<view class="flex_align">
						<image class="code_ico" src="/static/images/promotion/code_ico.png" mode="aspectFill" />
						<input v-model="code" class="input_text" maxlength="6" type="text" clearable placeholder="请输入验证码" placeholder-class="input_plc" />
					</view>
					<view class="code_div">
						<u-verification-code :seconds="seconds" ref="uCode" @change="(e) => tips = e" start-text="获取" />
						<view class="form_code flex_center_align" @click="getCode">
							{{tips}}
						</view>
					</view>
				</view>
				
				<view class="button_div flex_center_align" @click="submit">
					<image class="button_ico" src="/static/images/promotion/click_ico.png" mode="aspectFill" />
					立即领取
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				tips: '',
				seconds: 120,
			};
		},
		methods: {
			getCode() {
				let phone = this.phone
				if (!phone || !this.$u.test.mobile(phone)) {
					this.is_tools.to_msg('不是有效的手机号!')
					return
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({ title: '正在获取验证码' })
					this.is_api('send_sms', {}, { phone }).then((res) => {
						uni.hideLoading()
						if (res) {
							this.$refs.uCode.start()
							this.is_tools.to_msg('验证码已发送')
						}
					})
				} else {
					this.$u.toast('请勿重复发送!')
				}
			},
			submit() {
				console.log('submit');
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pack {
		min-height: 100vh;
		width: 101%;
		background: url('/static/images/promotion/bg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		border: 0;
	}
	
	.body_div {
		width: 653rpx;
		height: 907rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
	}
	
	.body_head_img {
		height: 288rpx;
		width: 100%;
	}
	
	.body_content {
		height: 276rpx;
		width: 100%;
	}
	
	.body_content_img {
		height: 239rpx;
		width: 467rpx;
	}
	
	.body_foot {
		padding: 0 38rpx;
	}
	
	.input_div {
		width: 577rpx;
		height: 80rpx;
		border-radius: 12rpx;
		border: 1rpx solid #CDCDCD;
		margin-bottom: 25rpx;
	}
	
	.code_ico {
		height: 26rpx;
		width: 26rpx;
		margin: 0 9rpx 0 17rpx;
	}
	
	.input_text {
		
	}
	
	.input_plc {
		font-size: 28rpx;
		font-family: PingFangSC-Bold, PingFang SC;
		font-weight: bold;
		color: #999999;
	}
	
	.phone_ico {
		height: 26rpx;
		width: 17rpx;
		margin: 0 9rpx 0 19rpx;
	}
	
	.ff_font {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	
	.code_div {
		height: 38rpx;
		background: #E42133;
		border-radius: 18rpx;
		padding: 1rpx 10rpx;
		font-size: 28rpx;
		@extend .ff_font;
		line-height: 36rpx;
		margin-right: 21rpx;
	}
	
	.button_div {
		width: 577rpx;
		height: 80rpx;
		background: #E42133;
		border-radius: 12rpx;
		font-size: 30rpx;
		@extend .ff_font;
		font-weight: bold;
	}
	
	.button_ico {
		height: 32rpx;
		width: 21rpx;
		margin-right: 9rpx;
	}
</style>
