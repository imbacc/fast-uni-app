<template>
	<!-- 手机绑定弹框 -->
	<u-modal v-model="phoneModal" width="690" title="" :show-confirm-button="false">
		<view class="title flex_center_align">
			请填写手机号码
			<image class="title_ico" src="/static/images/my/close_ico.png" mode="aspectFill" @click="phoneModal = false" />
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item label="手机" :label-width="100" label-align="left">
					<u-input v-model="form.phone" focus :maxlength="14" clearable placeholder="请输入您报名的手机号码" />
				</u-form-item>
				<u-form-item label="验证码" :label-width="100" label-align="left">
					<u-input v-model="form.code" :maxlength="4" clearable placeholder="请输入验证码" />
					<view slot="right">
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange" />
						<view class="form_code flex_center_align" @click="getCode">
							{{tips}}
						</view>
					</view>
				</u-form-item>
				<u-form-item>
					<view class="deal" @click="form.deal= !form.deal">
						<view class="deal-ico">
							<u-icon name="checkbox-mark" top="-20" color="#E62234" v-show="form.deal" />
						</view>
						<view class="deal-text">
							我已阅读并同意会员卡信息使用声明
						</view>
					</view>
				</u-form-item>
				<u-form-item>
					<u-button class="input_button" :loading="loading" :hair-line="false" ripple shape="circle" @click="submit">提交</u-button>
				</u-form-item>
			</u-form>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				phoneModal: false,
				form: {
					phone: '',
					code: '',
					deal: false
				},
				tips: '',
				seconds: 120,
				loading: false
			}
		},
		computed: {
			user_com() {
				return this.is_vuex.state.user_vuex.user_info
			}
		},
		methods: {
			set_val(key, val) {
				this[key] = val
			},
			submit() {
				const { phone, code, deal } = this.form
				if (!phone || !this.$u.test.mobile(phone)) {
					this.is_tools.to_msg('不是有效的手机号!')
					return
				}
				if (!code || code.length < 4) {
					this.is_tools.to_msg('请输入正确的验证码!')
					return
				}
				if (!deal) {
					this.is_tools.to_msg('请勾选协议!')
					return
				}
				this.loading = true
				this.is_api('user_api/edit_phone', { }, { phone: parseInt(phone), captcha: parseInt(code) }).then((res) => {
					this.loading = false
					if (res) {
						const user = this.user_com
						user.phone = phone
						user.is_reg = 1
						this.is_vuex.commit('user_vuex/set_user_info', user)
					}
					this.is_tools.to_msg(res ? '绑定成功!' : '绑定失败!')
					this.phoneModal = false
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				const { phone } = this.form
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
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		margin-bottom: 20rpx;
		position: relative;
	}
	
	.title_ico {
		height: 27rpx;
		width: 27rpx;
		position: absolute;
		right: 42rpx;
		top: 10rpx;
	}
	
	.form {
		padding: 0 35rpx;

		.deal {
			display: flex;
			align-items: center;

			&-ico {
				width: 30rpx;
				height: 30rpx;
				border: 1px solid #BBBBBB;
				margin-right: 10rpx;
			}

			&-text {
				font-size: 24rpx;
				color: #999990;
			}
		}

		.but {
			width: 100%;
			height: 70rpx;
			background-color: #E62234;
			border-radius: 42rpx;
			margin: 0 20rpx;
			color: #fff;
			font-size: 36rpx;
			text-align: center;
		}
	}
	
	.form_code {
		padding: 2rpx 8rpx;
		height: 38rpx;
		background: #E62234;
		border-radius: 42rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 20rpx;
	}
	
	.input_button {
		width: 620rpx;
		height: 90rpx;
		background: #e62234;
		border-radius: 42rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
		border: 0;
		margin-bottom: 30rpx;
	}
</style>
