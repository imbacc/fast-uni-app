<template>
	<div class="pack min_h100vh flex_center_align">
		<div class="body_div flex_align">
			<img class="left_img" src="src/assets/images/login/bg.png" />
			<div class="right_div flex_column flex_align">
				<img class="logo_img" src="src/assets/images/login/logo_ico.png" />
				<div class="input_div flex_align">
					<img class="input_ico" src="src/assets/images/login/user_ico.png" />
					<input class="input_model" v-model="account" :readonly="loading" :maxlength="20" type="text" placeholder="用户名" />
				</div>
				<div class="input_div flex_align">
					<img class="input_ico" src="src/assets/images/login/pass_ico.png" />
					<input class="input_model" v-model="password" :readonly="loading" :maxlength="20" type="password" placeholder="密码" />
				</div>
				<div class="input_div flex_align">
					<img class="input_ico" src="src/assets/images/login/code_ico.png" />
					<input class="input_model" v-model="code" :readonly="loading" :maxlength="4" type="text" placeholder="验证码" @keydown.enter="submit_login" />
					<img class="input_code" :src="code_img" @click="reload_code" />
				</div>
				<div class="check_div flex_align">
					<img v-if="check" class="check_ico" src="src/assets/images/login/check_ico.png" @click="check_switch" />
					<div v-else class="check_box" @click="check_switch"></div>
					<text class="check_lab">记住我的用户名</text>
				</div>
				<div class="button_div flex_center_align" :class="loading ? 'button_loading' : ''" @click="submit_login">
					<img v-if="loading" class="loading_ico" src="src/assets/images/login/loading_ico.png" />
					登录
				</div>
			</div>
		</div>

		<alert v-if="show_alert" :type="5" :msg="msg" @cancel="close_alert" />
	</div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { mutations } from '@/common/compose/user_store.js'
import api from '@/common/config/api.js'
import { env } from '@/common/config/cfg.js'

import alert from '@/components/alert/alert.vue'

export default {
	components: {
		alert
	},
	setup() {
		// init
		const router = useRouter()
		const { VITE_CODE_URL } = env

		onMounted(() => {
			const account = localStorage.getItem('account') || false
			if (account) data.account = account
		})

		// reactive
		const data = reactive({
			account: 'mrchen',
			password: '123456',
			code: '',
			loading: false,
			check: true,
			msg: '登陆失败',
			show_alert: false,
			code_img: VITE_CODE_URL
		})

		// function
		const submit_login = () => {
			const { account, password, code } = data
			if (account === '' || password === '' || code === '') {
				data.msg = '请输入完整!'
				data.show_alert = true
				let time = setTimeout(() => {
					clearTimeout(time)
					data.show_alert = false
				}, 1000)
				return
			}
			data.loading = true
			api('user_login', {}, { account, password, captcha: code.toLocaleLowerCase() }).then((res) => {
				if (res) {
					mutations.set_cache('user_info', res.userinfo)
					mutations.set_cache('token', res.userinfo.token)
					localStorage.setItem('account', account)
					router.push('/')
				} else {
					data.msg = '登陆失败'
					data.show_alert = true
					let time = setTimeout(() => {
						clearTimeout(time)
						data.show_alert = false
						data.loading = false
						data.code = ''
						reload_code()
					}, 1200)
				}
			})
		}

		const check_switch = () => {
			if (data.loading) return
			data.check = !data.check
		}

		const reload_code = () => {
			if (data.loading) return
			data.code_img = `${VITE_CODE_URL}&r=${Math.random()}`
			console.log('reload code...')
		}

		const close_alert = () => {
			data.show_alert = false
			data.loading = false
		}

		return {
			// reactive
			...toRefs(data),
			// function
			submit_login,
			check_switch,
			reload_code,
			close_alert
		}
	}
}
</script>

<style lang="scss" scoped>
.pack {
	overflow: hidden;
	min-height: 100vh;
	width: 100%;
	background: url('/src/assets/images/login/bg.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.body_div {
	// width: calc(100% - (262px * 2));
	// height: 627px;
	width: 1400px;
	height: 627px;
	background: #ffffff;
	border-radius: 8px;
}
.left_img {
	// width: 45%;
	height: 100%;
	width: 677px;
	border-radius: 8px 0 0 8px;
}

.right_div {
	height: 100%;
	// width: 55%;
	width: 723px;
}

.logo_img {
	height: 82px;
	width: 274px;
	margin-top: 53px;
	margin-bottom: 30px;
}

.input_div {
	width: 427px;
	height: 58px;
	border: 1px solid #dedede;
	border-radius: 15px;
	margin-top: 20px;
	position: relative;
}

.input_ico {
	height: 16px;
	width: 13px;
	margin: 0 9px 0 13px;
}

.input_lab {
	font-size: 16px;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
}

.input_model {
	height: 96%;
	width: 200px;
	outline: none;
	border: 0;
	border-color: #ffffff;
	@extend .input_lab;
}

.input_code {
	height: 40px;
	width: 130px;
	position: absolute;
	right: 10px;
	cursor: pointer;
}

.check_div {
	width: 427px;
	margin-top: 24px;
}

.check_ico {
	height: 14px;
	width: 14px;
	margin-right: 4px;
	user-select: none;
	cursor: pointer;
}

.check_box {
	@extend .check_ico;
	height: 12px;
	width: 12px;
	border: 1px solid RGBA(203, 203, 203, 1);
	user-select: none;
	cursor: pointer;
}

.check_lab {
	@extend .input_lab;
	font-size: 14px;
	color: #999999;
	user-select: none;
}

.button_div {
	@extend .input_lab;
	height: 58px;
	width: 427px;
	background: url('/src/assets/images/login/button.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	font-size: 20px;
	color: #ffffff;
	margin-top: 44px;
	user-select: none;
	cursor: pointer;
	transition: 0.3s;
}

.button_div:hover {
	opacity: 0.7;
}

.button_loading {
	transition: none;
	opacity: 0.3;
	// background: #333333;
}

.button_loading:hover {
	opacity: 0.3;
}

.loading_ico {
	height: 18px;
	width: 18px;
	margin-right: 8px;
	animation: 0.9s rotate;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes rotate {
	to {
		transform: rotateZ(0deg);
	}

	from {
		transform: rotateZ(360deg);
	}
}
</style>
