<template>
	<view class="pack">
		<view class="body_div flex_column flex_align">
			<view class="input_div flex_align">
				<image class="input_ico" src="/static/img/login/username_ico.png" mode="aspectFill" />
				<view class="input_title">账号</view>
				<input v-model="username" maxlength="15" type="text" class="input_text" placeholder-class="input_plc" placeholder="请输入登录账号" />
			</view>
			<view class="input_div mt40 flex_align">
				<image class="input_ico" src="/static/img/login/password_ico.png" mode="aspectFill" />
				<view class="input_title">密码</view>
				<input v-model="password" maxlength="20" type="password" class="input_text" placeholder-class="input_plc" placeholder="请输入登录密码" @confirm="submit" />
			</view>
			
			<view class="button_div flex_center_align" @click="submit">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			submit() {
				const { username, password } = this
				if (username === '' || password === '') {
					this.is_tools.to_msg('请填写完整!')
					return
				}
				this.is_api('user_login', {}, { _noToken: true, account: username, password: password }).then((res) => {
					if (res) {
						this.is_vuex.commit('user_vuex/set_user_info', res.userinfo)
						this.is_vuex.commit('user_vuex/set_token', res.userinfo.token)
						this.is_goto('index', '', 3)
					} else {
						this.is_tools.to_msg('登陆失败!')
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		@extend .h100b;
	}
	
	.pack {
		@extend .hw100b;
		@extend .min_h100vh;
		background: url('/static/img/login/bg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.body_div {
		@extend .w100b;
		padding-top: calc(100vh - 70vh);
	}
	
	.input_div {
		width: 690rpx;
		height: 90rpx;
		@extend .bg_white;
		border-radius: 42rpx;
	}
	
	.input_ico {
		height: 28rpx;
		width: 24rpx;
		margin-left: 53rpx;
		margin-right: 8rpx;
	}
	
	.input_title {
		font-size: 30rpx;
		@extend .font;
		@extend .fbold;
		@extend .c333333;
		height: 42rpx;
	}
	
	.input_text {
		margin-left: 47rpx;
	}
	
	.input_plc {
		font-size: 28rpx;
		@extend .font;
		@extend .f500;
		@extend .c999999;
		line-height: 40px;
	}
	
	.button_div {
		@extend .input_div;
		@extend .font;
		@extend .f500;
		background: $theme-color;
		margin-top: 110rpx;
		font-size: 36rpx;
		color: #FFFFFF;
	}
</style>
