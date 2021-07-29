<template>
	<view class="coach-detail flex" @click="goto_info">
		<view class="coach-detail-avatar">
			<u-avatar size="140" :src="courseDetail && courseDetail.avatar" />
		</view>
		<view class="coach-detail-brief">
			<view class="coach-detail-brief-name">{{ courseDetail && courseDetail.name }}</view>
			<view class="coach-detail-brief-text">
				<u-parse :html="courseDetail && courseDetail.honor" lazy-load />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		courseDetail: Object,
		id: Number
	},
	methods: {
		goto_info() {
			this.is_goto('/pages/coachDetail/coachDetail', `?id=${this.id}`)
		}
	},
}
</script>

<style lang="scss" scoped>
.coach-detail {
	width: 690rpx;
	padding: 35rpx 18rpx;
	background-color: #f3f3f3;
	border-radius: 12rpx;

	&-avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}

	&-brief {
		margin-left: 30rpx;

		&-name {
			font-size: 32rpx;
			color: #000;
			font-weight: 700;
		}

		&-text {
			font-size: 24rpx;
			color: #999999;
		}
	}
}
</style>
