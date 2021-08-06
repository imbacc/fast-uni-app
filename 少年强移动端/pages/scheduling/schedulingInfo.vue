<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else style="padding-top: 30rpx;">
			<view class="flex_center">
				<view class="studentInfo flex_align flex_between">
					<view class="flex_align">
						<image class="student_head" :src="student.avatar" mode="scaleToFill" />
						<view class="student_lab m24">{{ student.name }}</view>
						<view class="student_lab gray">{{ student.sex }}</view>
						<view class="student_hr"></view>
						<view class="student_lab gray">{{ student.age || 0 }}岁</view>
					</view>
					<view class="student_lab" :class="status_class[status]">{{ student.status_text }}</view>
				</view>
			</view>
			<!-- <view class="flex_column flex_align">
				<view class="scheduling_list mt20 flex_between">
					<view class="scheduling_lab">拒绝理由</view>
				</view>
			</view> -->
			<view class="downDeteil mt20">
				<up-down-list style="padding: 20rpx 0 0 20rpx;" :noLeft="true" :topTitle="{ title: course.name }" :topTitleStyle="{ 'padding': '0', 'margin-right': '0' }" :bottomTitle="course" />
				<vip :card="card" :scheduling="true" :showDetail="false" @to="toCourseParticulars" />
			</view>
			<view v-if="plan && plan.length > 0" class="scheduling_div">
				<view class="scheduling_title">当前排课计划为：</view>
				<view class="scheduling_list_pack">
					<view v-for="(item, index) in plan" :key="index" class="scheduling_list flex_align flex_between">
						<view class="scheduling_lab">{{ week_com[item.index] }}</view>
						<view class="scheduling_lab c000 f26">{{ item.data.name }}</view>
						<view class="scheduling_lab c555 f26">{{ item.key }}</view>
					</view>
				</view>
			</view>
			<view v-if="status !== 'approval'">
				<view class="but flex align-center justify-between">
					<view class="button_bule mr20" :class="status === 'pending' ? 'w100b' : ''" @click="goto_sales">联系顾问</view>
					<view v-if="status === 'waiting'" class="button_red" @click="show_msg = true">确认</view>
					<view v-if="status === 'refuse'" class="button_red" @click="repeat">重新调课</view>
				</view>
			</view>
		</view>
		
		<alertMsg v-if="show_msg" upDiy @confirm="confirm" @cancel="show_msg = false">
			<view class="flex_column flex_warp flex_align">
				<view class="title_msg">您是否确认</view>
				<view class="title_msg">按当前排课计划上课</view>
			</view>
		</alertMsg>
	</view>
</template>

<script>
import studentInfo from '@/components/studentInfo.vue'

import { mapState } from 'vuex'

export default {
	components: {
		studentInfo,
		alertMsg: () => import('@/components/alert-msg/alert-msg.vue'),
		upDownList: () => import('@/components/courseList/upDownList.vue'),
		vip: () => import('@/components/vip.vue'),
	},
	data() {
		return {
			course: {},
			card: {},
			plan: {},
			student: {},
			loading: true,
			rid: 0,
			record_id: 0,
			adjustment: 0,
			show_msg: false,
			sales_phone: '',
			status: '',
			status_class: {
				approval: 'gray',
				pending: 'blue',
				refuse: 'red',
			},
		}
	},
	computed: {
		...mapState('course_vuex', {
			week_com: (state) => state.week,
		}),
	},
	onLoad({ rid, adjustment }) {
		if (rid, adjustment) this.init_info(rid, adjustment)
	},
	onPullDownRefresh() {
		this.init_info(this.rid, this.adjustment)
	},
	methods: {
		init_info(rid, adjustment) {
			this.rid = rid
			this.adjustment = adjustment
			this.loading = true
			this.is_api('user_api/schedule_info', { rid, adjustment }).then((res) => {
				uni.stopPullDownRefresh()
				if (res) {
					for (let key in res) {
						this[key] = res[key]
					}
					this.loading = false
				}
			})
		},
		makeCourse() {
			this.is_vuex.commit('leave_vuex/set_vuex', ['make_course', this.course])
			this.is_goto('/pages/course/makeCourse')
		},
		goto_coach() {
			this.is_goto('/pages/coachDetail/coachDetail', `?id=${this.coach.id}`)
		},
		goto_sales() {
			uni.makePhoneCall({
				phoneNumber: this.sales_phone
			})
		},
		repeat() {
			this.is_goto('/pages/changeCourse/changeCourse', `?rid=${this.record_id}`)
		},
		confirm() {
			this.show_msg = false
			uni.showLoading()
			this.is_api('user_api/schedule_confirm', {}, { rid: this.rid }).then((res) => {
				uni.hideLoading()
				this.is_tools.to_msg(res ? '已确认排课安排!' : '确认排课安排失败!')
				if (res) this.init_info(this.rid, this.adjustment)
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.studentInfo {
	width: 690rpx;
	height: 108rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
	padding: 0 37rpx 0 22rpx;
}

.student_head {
	height: 76rpx;
	width: 80rpx;
	border-radius: 50%;
}

.student_lab {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}

.m24 {
	margin: 0 24rpx;
}

.student_hr {
	width: 1rpx;
	height: 24rpx;
	border-right: 1rpx solid rgba(220, 220, 220, 0.5);
	margin: 0 14rpx 0 10rpx;
}

.gray {
	color: #999999;
}

.blue {
	color: #003893;
}

.red {
	color: #FF2020;
}

.downDeteil {
	// padding: 20rpx 20rpx 0;
	margin: 0 30rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
}

.box {
	padding: 0 32rpx 20rpx;
	margin-bottom: 6rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}
}

.time {
	margin-bottom: 20rpx;

	&-box {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
		font-size: 26rpx;
	}
}

.but {
	padding: 0 30rpx;
	margin-bottom: 55rpx;

	view {
		width: 332rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 36rpx;
		border-radius: 42rpx;
	}
}

.vip_head {
	width: 690rpx;
	height: 62rpx;
	background: #F3F3F3;
}

.coach_div {
	height: 133rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
}

.coach_img {
	height: 97rpx;
	width: 97rpx;
	margin-left: 16rpx;
	border-radius: 50%;
}

.coach_info {
	margin: 0 19rpx 0 12rpx;
}

.coach_name {
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
}

.coach_job {
	@extend .coach_name;
	font-size: 24rpx;
	color: #999999;
}

.coach_tel {
	height: 39rpx;
	width: 41rpx;
	margin-right: 24rpx;
}

.button_orange {
	background: #FF8F20;
}

.button_bule {
	background: #023A98;
}

.button_red {
	background: #E62234;
}

.mr20 {
	margin-right: 20rpx;
}

.scheduling_div {
	margin: 0 30rpx;
}

.scheduling_title {
	font-size: 30rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #333333;
}

.scheduling_list_pack {
	margin-top: 20rpx;
}

.scheduling_list {
	width: 689rpx;
	height: 111rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	padding: 0 29rpx 0 31rpx;
	margin-bottom: 20rpx;
}

.scheduling_lab {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
}

.c000 {
	color: #000000;
}

.c555 {
	color: #555555;
}

.f26 {
	font-size: 26rpx;
}

.w100b {
	width: 100% !important;
}

.mt20 {
	margin-top: 20rpx;
}

.title_msg {
	font-size: 32rpx;
	font-family: PingFangSC-Bold, PingFang SC;
	font-weight: bold;
	color: #333333;
}
</style>
