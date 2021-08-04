<template>
	<view class="my-serve">
		<view class="my-serve-title">
			更多服务
		</view>
		<view class="my-serve-box flex flex-wrap justify-between">
			<view class="my-serve-box-li" v-for="item in list" :key="item.name" @click="to(item.name)">
				<view class="my-serve-box-li-img">
					<image :src="item.ico"></image>
				</view>
				<view class="my-serve-box-li-text">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			user_info_com() {
				return this.is_vuex.state.user_vuex.user_info
			},
			signup_com() {
				return this.is_vuex.state.user_vuex.signup
			}
		},
		data() {
			return {
				list: [{
					name: '课程管理',
					ico: require('@/static/images/my/my-serve/ico-1.png')
				}, {
					name: '课程顾问',
					ico: require('@/static/images/my/my-serve/ico-2.png')
				}, {
					name: '我的积分',
					ico: require('@/static/images/my/my-serve/ico-3.png')
				}, {
					name: '成长之路',
					ico: require('@/static/images/my/my-serve/ico-4.png')
				}, {
					name: '家庭作业',
					ico: require('@/static/images/my/my-serve/ico-5.png')
				}, {
					name: '升班管理',
					ico: require('@/static/images/my/my-serve/ico-6.png')
				}, {
					name: '推广中心',
					ico: require('@/static/images/my/my-serve/ico-7.png')
				}, {
					name: '关于我们',
					ico: require('@/static/images/my/my-serve/ico-8.png')
				}]
			}
		},
		methods: {
			to(e) {
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
				if (e === '课程管理') this.is_goto('/pages/selectStudent/selectStudent', `?jump=false`)
				if (e === '课程顾问') this.is_goto('/pages/counselorDetail/counselorDetail')
				if (e === '我的积分') this.is_goto('/pages/integral/integral')
				if (e === '成长之路') this.is_goto('/pages/growth/growth')
				if (e === '家庭作业') this.is_goto('/pages/task/task')
				if (e === '升班管理') this.is_goto('/pages/upgrade/upgrade')
				if (e === '推广中心') this.is_goto('/pages/promotion/promotion')
				if (e === '关于我们') this.is_goto('/pages/about/about')
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 更多服务
	.my-serve {
		width: 690rpx;
		height: 345rpx;
		margin: 0 auto 200rpx;
		background-color: #fff;
		border-radius: 12rpx;
		box-shadow: 0px 2px 4px 0px rgba(238, 238, 238, 0.5);

		&-title {
			padding: 14rpx 20rpx;
			font-size: 28rpx;
			color: #555;
			border-bottom: 1px solid #EBEBEB;
			font-weight: 600;
		}

		&-box {
			padding: 0 20rpx;

			&-li {
				width: 132rpx;
				text-align: center;
				color: #333;
				font-size: 28rpx;
				margin-top: 20rpx;

				&-img {
					margin: 0 auto 5rpx;
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}
	}
</style>
