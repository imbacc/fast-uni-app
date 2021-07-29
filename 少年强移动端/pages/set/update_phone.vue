<template>
	<view class="pack flex_column flex_between flex_align">
		<view class="form_div">
			<view class="form_row flex_align flex_between">
				<view class="form_title">旧手机号码</view>
				<view class="form_lab">{{ user_com.phone }}</view>
			</view>
			<view class="form_row flex_align flex_between">
				<view class="form_title">新手机号码</view>
				<view class="form_lab form_input">
					<u-input v-model="form.phone" height="100%" input-align="right" maxlength="13" placeholder="请输入新手机号码" />
				</view>
			</view>
			<view class="form_row flex_align flex_between">
				<view class="form_title">短信验证码</view>
				<view class="form_lab form_input_code flex_align">
					<u-input v-model="form.code" height="100%" input-align="right" maxlength="6" clearable placeholder="请输入验证码" />
					<u-verification-code :seconds="seconds" ref="uCode" @change="(e) => tips = e" start-text="获取" />
					<view class="form_code flex_center_align" @click="getCode">
						{{tips}}
					</view>
				</view>
			</view>
		</view>

		<u-button class="input_button" :loading="loading" :hair-line="false" ripple shape="circle" @click="submit">确认修改</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phone: '',
				code: '',
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
		submit() {
			const { phone, code } = this.form
			if (!phone || !this.$u.test.mobile(phone)) {
				this.is_tools.to_msg('不是有效的手机号!')
				return
			}
			if (!code || code.length < 4) {
				this.is_tools.to_msg('请输入正确的验证码!')
				return
			}
			this.loading = true
			this.is_api('user_api/edit_phone', { }, { phone: parseInt(phone), captcha: parseInt(code) }).then((res) => {
				this.loading = false
				if (res) {
					const user = this.user_com
					user.phone = phone
					this.is_vuex.commit('user_vuex/set_user_info', user)
				}
				this.is_tools.to_msg(res ? '修改成功!' : '修改失败!')
			})
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
				this.$u.toast('请勿重复发送!')
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@import "./update.scss";

.form_div {
	width: 690rpx;
	height: 293rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
	margin-top: 20rpx;
}

.form_row {
	width: 100%;
	height: 95rpx;
	padding: 0 38rpx 0 20rpx;
	border-bottom: 1rpx solid rgba(230, 230, 230, 0.4);
}

.form_row:last-child {
	border-bottom: 0;
	height: 107rpx;
}

.form_title {
	width: 154rpx;
	height: 42rpx;
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: #333333;
}

.form_lab {
	@extend .form_title;
	font-size: 28rpx;
	font-weight: 400;
	color: #999999;
}

.form_input {
	width: 224rpx;
}

.form_input_code {
	width: 70%;
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
	border: 0;
	margin-left: 20rpx;
}
</style>
