<template>
	<view>
		<view class="main">
			<view v-if="leave_info.check_status === 2" class="opinion">
				<view class="flex justify-between">
					<view>请假意见：</view>
					<view style="color: #E62234;">{{ status[leave_info.check_status] }}</view>
				</view>
				<view class="opinion-text" :class="!leave_info.refuse_reaso ? 'gray_text' : ''">{{ leave_info.refuse_reason || '未留言' }}</view>
			</view>
			<view class="detail">
				<view class="detail-tlite">请假详情：</view>
				<view class="flex justify-between align-center">
					<view>申请时间 : {{ format_data(leave_info.createtime) }}</view>
					<view>请假类型： {{ leave_info.leave_type === 0 ? '单节请假' : '特殊请假' }}</view>
				</view>
			</view>
			<view class="detail">
				<view class="detail-tlite">请假时间：</view>
				<view class="flex align-center text-center justify-between">
					<view v-if="leave_info.leave_type === 0">
						<view style="font-size: 28rpx;">{{ leave_info.week_day > 0 ? format_data(leave_info.week_day, 'mm.dd') : '' }}</view>
						<view v-if="leave_info.leave_time !== ''" style="font-size: 22rpx;">({{ leave_info.leave_time }})</view>
					</view>
					<view v-if="leave_info.leave_type === 1">
						<view style="font-size: 28rpx;">{{ format_data(leave_info.leave_starttime, 'mm.dd') }} - {{ format_data(leave_info.leave_endtime, 'mm.dd') }}</view>
					</view>
					<view>{{ leave_info.course_name }}</view>
					<view>{{ format_week(leave_info.week_day) }}</view>
				</view>
			</view>
			<view v-if="leave_info.make_up_day && leave_info.make_up_day > 0" class="detail">
				<view class="detail-tlite flex justify-between">
					<view>预约补课（{{ date_com(leave_info.make_up_day) }}月）</view>
					<view style="font-size: 28rpx;color: #999999;">
						待补课时
						<text style="color: #E62234;">{{ count }}节</text>
					</view>
				</view>
				<view class="flex align-center text-center justify-between">
					<view>
						<view style="font-size: 28rpx;">{{ format_data(leave_info.make_up_day, 'mm.dd') }}</view>
						<view v-if="leave_info.make_up_time" style="font-size: 22rpx;">({{ leave_info.make_up_time }})</view>
					</view>
					<view>{{ leave_info.course_name }}</view>
					<view>{{ format_week(leave_info.make_up_day) }}</view>
				</view>
			</view>
			<view class="opinion">
				<view class="flex justify-between"><view>请假事由：</view></view>
				<view class="opinion-text">{{ leave_info.reason }}</view>
			</view>
			<view v-if="leave_info.prove_images && leave_info.prove_images.length > 0 && leave_info.prove_images[0] !== ''" class="opinion">
				<view class="flex justify-between"><view>相关证明：</view></view>
				<view class="opinion-img">
					<image
						class="opinion-img-box"
						v-for="(img, idx) in leave_info.prove_images"
						:key="idx"
						:src="img"
						@click="look_img(idx)"
					/>
				</view>
			</view>
		</view>
		<view v-if="leave_info.check_status === 2" class="but" @click="toLeave">重新申请</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			leave_info: {},
			sid: 0,
			status: ['未审批','已通过','未通过'],
			count: 0
		}
	},
	computed: {
		date_com() {
			return (date) => {
				return date && new Date(parseInt(`${date}000`)).getMonth() + 1
			}
		},
		format_data() {
			return (time, format = 'yyyy-mm-dd') => time && this.$u.timeFormat(time, format)
		},
		format_week() {
			return (time) => new Date(parseInt(`${time}000`)).toLocaleDateString('zh-CN', {  weekday: 'long' })
		},
		student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		}
	},
	onLoad({ id, sid }) {
		if (id && sid) {
			this.init(id, sid)
		}
	},
	methods: {
		async init(id, student_id) {
			this.sid = student_id
			this.is_api('leave_api/leave_info', { id, student_id }).then((res) => {
				if (res) {
					this.leave_info = res
					this.init_count()
				}
			})
		},
		async init_count() {
			this.is_api('leave_api/student_leave_data', { stu_id: this.sid, cid: this.leave_info.course_id }).then((res) => {
				if (res) {
					this.count = res.await_supplement_count
				}
			})
		},
		toLeave() {
			const { leave_type, course_id } = this.leave_info
			this.is_vuex.commit('leave_vuex/set_vuex', ['leave_info', this.leave_info])
			this.is_vuex.commit('leave_vuex/set_vuex', ['course_student', { cid: this.leave_info.course_id, sid: this.sid }])
			this.is_goto('/pages/leave/leave', `?ovo=${leave_type !== 0}&cid=${course_id}&update=true`, 2)
		},
		look_img(idx) {
			this.is_tools.look_img(idx, this.leave_info.prove_images)
		},
	}
}
</script>

<style lang="scss" scoped>
.opinion {
	font-size: 30rpx;
	color: #333;

	&-text {
		padding: 14rpx 20rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		height: 256rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
	}

	&-img {
		margin-top: 20rpx;

		&-box {
			height: 160rpx;
			width: 160rpx;
			border-radius: 12rpx;
			margin-right: 12rpx;
			margin-bottom: 12rpx;
		}
	}
}

.detail {
	background-color: #fff;
	margin-top: 20rpx;
	// height: 150rpx;
	padding: 10rpx 20rpx 20rpx;
	font-size: 28rpx;
	color: #999;
	margin-bottom: 20rpx;
	border-radius: 12rpx;

	&-tlite {
		color: #333;
		font-size: 30rpx;
		margin-bottom: 26rpx;
	}
}

.but {
	margin: 0 auto 30rpx;
	width: 690rpx;
	height: 90rpx;
	background-color: #e62234;
	font-size: 36rpx;
	color: #fff;
	line-height: 90rpx;
	text-align: center;
	border-radius: 42rpx;
}

.gray_text {
	color: #CCCCCC !important;
}
</style>
