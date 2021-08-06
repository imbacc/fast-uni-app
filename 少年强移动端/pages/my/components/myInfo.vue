<template>
	<view class="my-info">
		<view class="my-info-heder flex">
			<view class="my-info-heder-avatar" @click="login"><u-avatar size="130" :src="user_info_com.avatar_image"></u-avatar></view>
			<view v-if="user_info_com" class="my-info-heder-li flex justify-around flex-direction">
				<view class="my-info-heder-li-name">{{ user_info_com ? user_info_com.name : '您尚未登录' }}</view>
				<view class="my-info-heder-li-ico">
					<image src="/static/images/my/my-vip0.png" v-if="!user_info_com.is_reg"></image>
					<image src="/static/images/my/my-vip1.png" v-if="user_info_com.is_reg"></image>
				</view>
				<view v-if="user_info_com.phone && user_info_com.phone !== ''" class="my-info-heder-li-phone">{{ user_info_com.phone }}</view>
				<view v-else class="no_bind flex_align" @click="bind">
					未绑定
					<view class="no_bind">
						<u-icon name="arrow-right" color="#E62234" size="20" />
					</view>
				</view>
			</view>
			<view v-else class="my-info-heder-li flex justify-around flex-direction" @click="login">
				<view class="my-info-heder-li-name">{{ user_info_com ? user_info_com.name : '您尚未登录' }}</view>
				<view class="my-info-heder-li-phone">立即登录 &gt;</view>
			</view>
			<view v-if="user_info_com" class="my-info-heder-set" @click="toSet"><u-icon name="setting-fill" size="34"></u-icon></view>
		</view>
		<view class="my-info-operation flex justify-around align-center">
			<view class="my-info-operation-school" @click="toCourseNotice">
				<image src="/static/images/my/scheduling_ico.png"></image>
				<view>排课通知</view>
				<u-badge v-if="schedule" type="error" :offset="[-5, 30]" is-dot />
			</view>
			<view style="width: 1px; height: 80rpx; background-color: #E6E6E6;"></view>
			<view class="my-info-operation-school" @click="toCourseUpcoming">
				<image src="@/static/images/my/my-school.png"></image>
				<view>即将上课</view>
				<u-badge v-if="upcoming" type="error" :offset="[-5, 30]" is-dot />
			</view>
			<view style="width: 1px; height: 80rpx; background-color: #E6E6E6;"></view>
			<view class="my-info-operation-school" @click="toLeaveList">
				<image src="@/static/images/my/my-leave.png"></image>
				<view>请假记录</view>
				<u-badge v-if="leave" type="error" :offset="[-5, 35]" is-dot />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			leave: false,
			schedule: false,
			upcoming: false
		}
	},
	computed: {
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
		signup_com() {
			return this.is_vuex.state.user_vuex.signup
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			this.is_api('user_api/schedule_point').then((res) => {
				if (res) {
					for (let key in res) {
						this[key] = res[key]
					}
				}
			})
		},
		toSet() {
			this.is_goto('/pages/set/set')
		},
		toCourseNotice() {
			this.is_goto('/pages/scheduling/scheduling')
		},
		toCourseUpcoming() {
			this.goto_page('/pages/courseUpcoming/courseUpcoming')
		},
		toLeaveList() {
			this.goto_page('/pages/leaveList/leaveList')
		},
		goto_page(url) {
			if (this.user_info_com) {
				if (!this.user_info_com.phone || this.user_info_com.phone === '') {
					this.$emit('bind')
					return
				}
				if (!this.signup_com) {
					this.$emit('signup')
					return
				}
			}
			
			this.is_goto(url)
		},
		login() {
			this.$emit('login')
		},
		bind() {
			this.$emit('bind')
		}
	}
}
</script>

<style lang="scss" scoped>
.my-info {
	position: absolute;
	top: 70rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 690rpx;
	height: 322rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;

	&-heder {
		margin-bottom: 50rpx;

		&-avatar {
			width: 130rpx;
			height: 130rpx;
			margin-right: 28rpx;
		}

		&-li {
			&-name {
				font-size: 30rpx;
				color: #000;
			}

			&-ico {
				// width: 114rpx;
				height: 33rpx;

				image {
					width: 114rpx;
				}
			}

			&-phone {
				font-size: 26rpx;
				color: #999;
			}
		}

		&-set {
			position: absolute;
			right: 30rpx;
			top: 37rpx;
			color: #a8a8a8;
		}
	}

	&-operation {
		text-align: center;
		font-size: 30rpx;
		color: #333;

		image {
			width: 37rpx;
			height: 37rpx;
		}

		&-school {
			position: relative;
		}
	}
}

.no_bind {
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #E62234;
}
</style>
