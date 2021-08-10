<template>
	<view style="padding: 30rpx;">
		<view v-for="(info, index) in up_course_list" :key="index" class="up_div flex_align" @click="goto_detail(info.id)">
			<image class="up_img" :src="info.extra_image" mode="scaleToFill" />
			<view class="up_info">
				<view class="mt16 flex_align">
					<view class="up_tag flex_center_align">{{ info.type_name }}</view>
					<view class="up_title">{{ info.name }}</view>
				</view>
				<view class="up_user">上课人 : {{ info.student }}</view>
				<view class="mt9 flex_between flex_align">
					<view class="up_num">{{ info.period_explain }}</view>
					<view class="up_time">{{ info.time_format && info.time_format.substring(5, info.time_format.length) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			up_course_list: []
		}
	},
	onLoad() {
		this.init()
	},
	methods: {
		init() {
			this.is_api('user_api/up_course_list').then((res) => {
				if (res) this.up_course_list = res.course
			})
		},
		goto_detail(id) {
			this.is_goto('/pages/courseUpcomingDetail/courseUpcomingDetail', `?rid=${id}`)
		}
	}
}
</script>

<style lang="scss" scoped>
	.up_div {
		width: 683rpx;
		height: 171rpx;
		background: #FFFFFF;
		border-radius: 17rpx;
		margin-bottom: 20rpx;
	}
	
	.up_img {
		width: 231rpx;
		height: 171rpx;
		border-radius: 8rpx 0 0 8rpx;
	}
	
	.up_info {
		height: 100%;
		margin-left: 24rpx;
	}
	
	.mt16 {
		margin-top: 16rpx;
	}
	
	.mt9 {
		margin-top: 9rpx;
	}
	
	.up_font {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	
	.up_tag {
		@extend .up_font;
		width: 191rpx;
		height: 45rpx;
		background: #E62234;
		border-radius: 23rpx;
		margin-right: 13rpx;
	}
	
	.up_title {
		@extend .up_font;
		font-size: 28rpx;
		color: #333333;
	}
	
	.up_user {
		@extend .up_title;
		font-weight: 400;
		color: #555555;
		margin-top: 19rpx;
	}
	
	.up_num {
		@extend .up_user;
		font-size: 26rpx;
		color: #999999;
		margin-top: 0;
		white-space: nowrap;
	}
	
	.up_time {
		@extend .up_num;
		font-weight: 500;
		margin-right: 10rpx;
		white-space: nowrap;
	}
</style>
