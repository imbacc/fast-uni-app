<template>
	<skeleton v-if="loading" />
	<view v-else style="margin-top: -43rpx;">
		<view class="my">
			<view class="my-bg"><image src="@/static/images/my/my-bg.png" /></view>
			<!-- 用户信息 -->
			<myInfo @login="login" @bind="bind" />
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
			<my-serve @bind="bind" />
		</view>
		<!-- 手机绑定弹框 -->
		<phone-modal ref="modal" @submit="submitPhone" />
	</view>
</template>

<script>
import phoneModal from '@/components/phone-modal.vue'
import myInfo from './components/myInfo.vue'
import myServe from './components/my-serve.vue'

export default {
	components: {
		phoneModal,
		myInfo,
		myServe
	},
	data() {
		return {
			loading: true,
			bg: '',
			url: '',
			show_modal: false,
			init_bool: false,
			init_login: false
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
	onLoad({ token }) {
		if (token) {
			this.is_vuex.commit('user_vuex/set_token', token)
			this.is_vuex.dispatch('user_vuex/get_userInfo')
			this.init_location()
			this.init_banner()
			this.init_student()
			this.loading = false
			return
		}
		this.login()
		this.init_location()
		this.init_banner()
		if (this.user_info_com) this.init_student()
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
		// 绑定手机
		submitPhone() {
			this.$refs.modal.set_val('phoneModal', false)
		},
		// 选择绑定门店
		toSeat() {
			this.is_goto('/pages/seat/seat')
		},
		//登录
		async login() {
			if (this.init_login) return
			this.init_login = true
			if (!this.user_info_com) {
				this.is_api('auth_login').then((res) => {
					if (res) window.location.href = res
				})
			}
		},
		bind() {
			this.$refs.modal.set_val('phoneModal', true)
		},
		goto_bg() {
			this.is_goto(this.url)
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
</style>
