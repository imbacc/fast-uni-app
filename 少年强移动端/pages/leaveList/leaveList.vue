<template>
	<view class="list">
		<view class="list-box flex justify-between align-center" v-for="(info, idx) in leave_page.list" :key="idx" @click="toDetail(info)">
			<view class="list-box-title">
				<view>{{ format_data(info.createtime) }}</view>
				<view>学员: {{ info.nickname }}</view>
				<view v-if="info.check_status === 1">您的请假已通过，查看详情</view>
			</view>
			<view class="list-box-img">
				<image src="/static/images/my/leave/await.png" v-if="info.check_status === 0" />
				<image src="/static/images/my/leave/pass.png" v-if="info.check_status === 1" />
				<image src="/static/images/my/leave/notPass.png" v-if="info.check_status === 2" />
			</view>
		</view>
	</view>
</template>

<script>
import appendData from '@/common/class/append_data.js'

export default {
	data() {
		return {
			leave_page: null
		}
	},
	computed: {
		format_data() {
			return (time) => this.$u.timeFormat(time, 'yyyy-mm-dd hh:MM:ss')
		}
	},
	onLoad() {
		this.init()
	},
	onPullDownRefresh() {
		this.init()
	},
	methods: {
		init(page = 1, append = false) {
			if (!this.leave_page) {
				const _page = new appendData()
				_page.name = 'leave_api/leave_list'
				_page.method = 'GET'
				this.leave_page = _page
			}
			this.leave_page.fun(page, append).then(() => uni.stopPullDownRefresh())
		},
		toDetail(info) {
			this.is_goto('/pages/leaveDetail/leaveDetail', `?id=${info.id}&sid=${info.student_id}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.list {
	padding: 20rpx 30rpx;

	&-box {
		height: 160rpx;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
		&-title {
			line-height: 1.5;

			view:nth-child(1) {
				color: #999999;
				font-size: 26rpx;
			}

			view:nth-child(2) {
				color: #333;
				font-size: 30rpx;
			}
		}

		&-img {
			width: 98rpx;
			height: 98rpx;
			border-radius: 50%;
			overflow: hidden;
		}
	}
}
</style>
