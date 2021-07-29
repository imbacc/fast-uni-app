<template>
	<view>
		<skeleton v-if="loading" />
		<view v-if="!loading && sales_info">
			<view class="banner"></view>
			<view class="center">
				<view class="center-avatar">
					<u-avatar :src="sales_info.avatar_image && sales_info.avatar_image[0]" size="170" />
				</view>
				<view class="center-name">{{ sales_info.name }}</view>
				<view class="center-title" v-html="sales_info.honor_content"></view>
				<view class="center-brief">
					<u-parse :html="sales_info.desc_content" />
				</view>
				<view class="center-text">邮箱: {{ sales_info.email }}</view>
				<view class="center-text">电话：{{ sales_info.phone }}</view>
				<view class="center-text">微信：{{ sales_info.wechat }}</view>
				<view class="center-text">所属门店：{{ sales_info.store && sales_info.store.name }}</view>
				<view class="center-text">课程范畴：{{ sales_info.course_range && sales_info.course_range.join('/') }}</view>
				<view class="center-erweima">
					<image :src="sales_info.qrcode_image && sales_info.qrcode_image[0]" mode="aspectFill" />
				</view>
				<view class="center-but" @click="call_tel">马上报名/咨询</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sales_info: false,
			loading: true
		}
	},
	onLoad() {
		this.init()
	},
	methods: {
		init() {
			this.loading = true
			this.is_api('adviser_api/sales_info').then((res) => {
				if (res) {
					this.sales_info = res
				} else {
					this.is_tools.to_msg('暂未绑定课程顾问!')
				}
				this.loading = false
			})
		},
		call_tel() {
			uni.makePhoneCall({
				phoneNumber: this.sales_info.phone
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.banner {
	background: url('/static/images/my/counselor/banner.png') no-repeat;
	background-size: cover;
	height: 360rpx;
}

.center {
	background-color: #fff;
	border-radius: 35rpx;
	padding: 85rpx 30rpx 30rpx;
	position: relative;
	border-bottom: 1px solid #e6e6e6;
	top: -72rpx;

	&-avatar {
		position: absolute;
		width: 170rpx;
		height: 170rpx;
		top: -85rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	&-name {
		text-align: center;
		color: #333;
		font-size: 34rpx;
		margin-bottom: 10rpx;
	}

	&-title {
		text-align: center;
		font-size: 26rpx;
		color: #555;
		line-height: 1.5;
	}

	&-brief {
		margin-top: 20rpx;
		padding: 16rpx 0;
		border-top: 1px solid #e6e6e6;
		font-size: 26rpx;
		color: #999999;
	}
	&-text {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #555555;
	}
	&-erweima {
		width: 257rpx;
		height: 257rpx;
		margin: 20rpx auto 0;
	}
	&-but {
		height: 90rpx;
		line-height: 90rpx;
		background-color: #e62234;
		border-radius: 42rpx;
		text-align: center;
		font-size: 36rpx;
		color: #fff;
		margin-top: 20rpx;
	}
}
</style>
