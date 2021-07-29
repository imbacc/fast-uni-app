<template>
	<view>
		<!-- 轮播图 -->
		<view class="main-swiper">
			<!-- <image :src="courseDetail.banner_source" mode="aspectFill" /> -->
			<u-image height="380" :src="courseDetail.banner_source" mode="aspectFill" />
			<!-- <u-swiper :list="swiper_com" name="img" height="380" mode="none"></u-swiper> -->
		</view>
		<!-- 简介 -->
		<view class="main-brief">
			<view class="main-brief-title flex align-center">
				<view class="main-brief-title-type">{{ courseDetail.type_name }}</view>
				<view class="main-brief-title-text">{{ courseDetail.name }}</view>
			</view>
			<view class="main-brief-content" v-html="courseDetail.content"></view>
			<view class="main-brief-apply flex justify-between" v-if="courseDetail.enroll_user">
				<view class="main-brief-apply-avatar">
					<image
						v-for="(user, index) in courseDetail.enroll_user"
						:key="index"
						:src="user.avatar"
						:style="'left:' + -(20 * index) + 'rpx;'"
					/>
					<image
						v-if="courseDetail.enroll_user.length >= 3"
						src="/static/images/details/apply-default.png"
						:style="'left:' + -(20 * courseDetail.enroll_user.length) + 'rpx;'"
					/>
				</view>
				<view class="main-brief-apply-count">
					<u-icon name="account-fill" />
					已有
					<text>{{ courseDetail.enroll_count }}人</text>
					报名
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		courseDetail: {
			type: Object
		}
	},
}
</script>

<style lang="scss" scoped>
// 轮播图
.main-swiper {
	width: 750rpx;
	height: 380rpx;
	
	image {
		height: 100%;
		width: 100%;
	}
}

// 简介
.main-brief {
	width: 750rpx;
	background-color: #fff;
	padding: 25rpx 30rpx;

	&-title {
		font-size: 30rpx;
		margin-bottom: 10rpx;

		&-type {
			padding: 8rpx 12rpx;
			color: #fff;
			margin-right: 16rpx;
			background: #e62234;
			border-radius: 45rpx;
		}

		&-text {
			font-weight: 700;
		}
	}

	&-content {
		font-size: 26rpx;
		color: #999;
	}

	&-apply {
		margin-top: 20rpx;

		&-avatar {
			position: relative;
			flex-grow: 1;
			height: 55rpx;

			image {
				margin-right: 10rpx;
				top: 0;
				width: 55rpx;
				height: 55rpx;
				border-radius: 50%;
			}
		}

		&-count {
			color: #999999;
			font-size: 26rpx;

			text {
				color: #e62234;
			}
		}
	}
}
</style>
