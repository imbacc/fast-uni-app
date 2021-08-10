<template>
	<skeleton v-if="loading" />
	<view v-else style="margin-top: -43rpx;">
		<view class="my">
			<view class="my-bg"><image src="@/static/images/my/my-bg.png" /></view>
			<!-- 用户信息 -->
			<myInfo @login="login" @bind="bind" @signup="signup" />
			<!-- 定位 -->
			<view class="my-location flex align-center justify-between" @click="toSeat">
				<view class="my-location-l">
					<view>
						<u-icon name="map" />
						当前场馆 : {{ cur_shop_com.name || '未定位' }}
					</view>
					<view>距离 : {{ cur_shop_com.km || 0 }}{{ cur_shop_com.unit || 'm' }}</view>
				</view>
				<view><u-icon name="arrow-right" color="#B6B6B6" /></view>
			</view>
			<!-- //banner图 -->
			<view v-if="bg" class="my-banner">
				<image :src="bg" mode="aspectFill" @click="goto_bg" />
			</view>
			<!-- 更多服务 -->
			<my-serve @bind="bind" @signup="signup" />
		</view>
		<!-- 手机绑定弹框 -->
		<phone-modal ref="modal" @submit="submitPhone" />
		
		<alertMsg v-if="show_msg" upDiy buttonLab="立即更换" @confirm="msg_confirm" @cancel="show_msg = false">
			<view class="flex_column flex_center_align">
				<view class="alert_title">未查询到您的报名信息</view>
				<view class="alert_lab" style="margin-bottom: 14rpx;">请确认您的报名电话</view>
				<view class="alert_lab" style="color: #555555;">{{ tel }}</view>
			</view>
		</alertMsg>
		
		<view v-if="user_info_com && show_feedback" class="feedback_div" @click="goto_feedback">
			<image class="feedback_close" src="/static/images/my/feed_close_ico.png" mode="aspectFill" @click="show_feedback = false" />
		</view>
	</view>
</template>

<script>
import myInfo from './components/myInfo.vue'
import myServe from './components/my-serve.vue'
import phoneModal from '@/components/phone-modal.vue'
import alertMsg from '@/components/alert-msg/alert-msg.vue'

export default {
	components: {
		phoneModal,
		myInfo,
		myServe,
		alertMsg
	},
	data() {
		return {
			loading: true,
			bg: '',
			url: '',
			init_bool: false,
			init_login: false,
			show_msg: false,
			tel: '',
			show_feedback: true,
		}
	},
	computed: {
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
		cur_shop_com() {
			return this.is_vuex.state.user_vuex.cur_shop
		},
		exit_state_com() {
			return this.is_vuex.state.user_vuex.exit_state
		},
	},
	watch: {
		exit_state_com(newValue, oldValue) {
			if (newValue !== oldValue) {
				uni.showLoading()
				let time = setTimeout(() => {
					uni.hideLoading()
					location.reload()
				}, 300)
			}
		}
	},
	onLoad({ token, uuid }) {
		if (uuid) this.login(uuid)
		if (token) {
			this.is_vuex.commit('user_vuex/set_token', token)
			this.is_vuex.dispatch('user_vuex/get_userInfo')
			this.init_location()
			this.init_banner()
			this.init_student()
			this.init_singup()
			this.loading = false
			return
		}
		this.init_location()
		this.init_banner()
		if (this.user_info_com) {
			this.init_singup()
			this.init_student()
		}
		this.loading = false
	},
	methods: {
		async init_student() {
			if (this.init_bool) return
			this.init_bool = true
			this.is_api('user_api/my_student_list', { page: 1 }).then((res) => {
				this.init_bool = false
				if (res) {
					let list = res.data
					if (Array.isArray(list) && list.length > 0) {
						let info = list[0]
						this.is_vuex.commit('course_vuex/set_vuex', ['cur_student', info])
						this.is_vuex.commit('course_vuex/set_vuex', ['sel_student', info])
						uni.showLoading()
						this.is_api('user_api/cur_student', {}, { stu_id: info.id }).then((res) => {
							uni.hideLoading()
						})
					}
				}
			})
		},
		async init_location() {
			if (!this.cur_shop_com.id) this.is_vuex.dispatch('user_vuex/user_location')
		},
		async init_banner() {
			let param = { q: 'extra', _page: [1, 1] }
			this.is_api('home_api/banner_list', param).then((res) => {
				if (res) {
					if (res.data && res.data.length > 0 && res.data[0].source) {
						this.bg = res.data[0].source[0]
						this.url = res.data[0].urls.url
					}
				}
			})
		},
		async init_singup() {
			this.is_api('user_api/user_check_signup').then((res) => {
				if (res) {
					this.show_msg = !res.signup
					this.tel = res.phone
					this.is_vuex.commit('user_vuex/set_vuex', ['signup', res.signup])
				}
			})
		},
		// 绑定手机
		submitPhone() {
			this.$refs.modal.set_val('phoneModal', false)
		},
		// 选择绑定门店
		toSeat() {
			this.is_goto('/pages/seat/seat')
		},
		//登录
		async login(uuid) {
			if (this.init_login) return
			this.init_login = true
			if (!this.user_info_com) {
				this.is_api('auth_login', { uuid }).then((res) => {
					if (res) {
						window.location.href = res
					} else {
						this.is_tools.to_showModal('是否重新授权登录?', '系统提示', () => {
							this.is_vuex.commit('user_vuex/set_logout')
							this.is_vuex.commit('user_vuex/set_refresh')
							window.location.href = '/#/pages/my/my'
						})
					}
				})
			}
		},
		bind() {
			this.$refs.modal.set_val('phoneModal', true)
		},
		goto_bg() {
			this.is_goto(this.url)
		},
		msg_confirm() {
			this.show_msg = false
			this.bind()
		},
		signup() {
			this.show_msg = true
		},
		goto_feedback() {
			if (!this.show_feedback) return
			this.is_goto('/pages/feedback/feedback')
		}
	}
}
</script>

<style lang="scss" scoped>
.my {
	position: relative;
	height: 753rpx;

	&-bg {
		width: 750rpx;
		height: 300rpx;
	}

	// 定位
	&-location {
		width: 690rpx;
		height: 120rpx;
		background-color: #fff;
		margin: 110rpx auto 25rpx;
		border-radius: 12rpx;
		box-shadow: 0px 2px 4px 0px rgba(238, 238, 238, 0.5);
		padding: 0 24rpx;

		&-l {
			view:nth-child(1) {
				font-size: 28rpx;
				color: #333;
			}

			view:nth-child(2) {
				font-size: 22rpx;
				color: #999;
				text-indent: 30rpx;
			}
		}
	}

	//banner图
	&-banner {
		width: 690rpx;
		height: 180rpx;
		margin: 0 auto 25rpx;
		border-radius: 15rpx;
		
		image {
			border-radius: 10rpx;
		}
	}
}

.alert_title {
	font-size: 32rpx;
	font-family: PingFangSC-Bold, PingFang SC;
	font-weight: bold;
	color: #E62234;
	margin-bottom: 7rpx;
}

.alert_lab {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333330;
}

.feedback_div {
	height: 198rpx;
	width: 124rpx;
	position: absolute;
	right: 30rpx;
	bottom: 30rpx;
	background: url('/static/images/my/feed_bg.png');
	background-size: 100%;
	background-repeat: no-repeat;
	display: flex;
	justify-content: flex-end;
}

.feedback_close {
	height: 32rpx;
	width: 32rpx;
	position: absolute;
	right: -8rpx;
	top: 40rpx;
}
</style>
