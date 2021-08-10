<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else style="padding-top: 30rpx;">
			<view class="studentInfo">
				<student-info selShow :selGoto="false" @to="toSelectStudent" />
			</view>
			<view class="downDeteil">
				<up-down-list style="padding: 20rpx 0 0 20rpx;" :topTitle="{ title: course.name }" :topTitleStyle="{ 'padding': ' 0 18rpx', 'margin-right': '6rpx' }" :bottomTitle="course" @to="goto_course_info" />
				<vip scheduling :card="card" @to="toCourseParticulars" />
			</view>
			<!--教练团队 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						教练团队
					</view>
				</view>
				<view>
					<scroll-view scroll-x>
						<view class="flex_align">
							<view class="coach_div flex_align" @click="goto_coach">
								<image class="coach_img" :src="coach.avatar" mode="aspectFill" />
								<view class="coach_info flex_column">
									<view class="coach_name">{{ coach.name }}</view>
									<view class="coach_job">{{ coach.desc }}</view>
								</view>
								<image class="coach_tel" src="/static/images/phone.png" mode="aspectFill" @click="call_phone(coach.phone)" />
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!--上课时间 -->
			<view v-if="plan && plan.length > 0" class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						上课时间
					</view>
				</view>
				<template v-if="plan_type === 'other' || is_table_com">
					<courseTable ref="table" />
				</template>
				<template v-if="!is_table_com && plan && plan !== '' && plan.length > 0 && plan[0].index">
					<view class="time" v-for="(info, idx) in plan" :key="idx">
						<view class="time-box flex justify-between align-center">
							<view>{{ week_com[info.index] }}</view>
							<view style="text-align: center;">
								<view>{{ course.type_name }}</view>
								<view v-if="1 === 2" style="color: #E62234;">（补课）</view>
							</view>
							<view style="color: #999999;text-align: center;">
								<view v-if="1 === 2" style="font-size: 24rpx;">2021-05-12</view>
								<view style="font-size: 20rpx;">{{ info.key }}</view>
							</view>
						</view>
					</view>
				</template>
				<template v-if="course.is_special && plan && plan !== '' && plan.length > 0">
					<view class="time" v-for="(info, idx) in plan" :key="idx">
						<view class="time-box flex justify-between align-center">
							<view>{{ info.week }}</view>
							<view style="text-align: center;">
								<view>{{ course.type_name }}</view>
								<view v-if="1 === 2" style="color: #E62234;">（补课）</view>
							</view>
							<view style="color: #999999;text-align: center;">
								<view style="font-size: 24rpx;">{{ info.date }}</view>
								<view style="font-size: 24rpx;">{{ info.time }}</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			<view v-else style="height: 100rpx;">
				
			</view>
			<view v-if="plan_type === 'other'" class="but flex align-center justify-between">
				<view class="button_bule" style="width: 100%;" @click="toLeave(true)">请假</view>
			</view>
			<view v-else class="but flex align-center justify-between">
				<view v-if="plan_type === 'common'" class="button_orange mr20" @click="gotoChange">申请调课</view>
				<view class="button_bule mr20" @click="toLeave(false)">请假</view>
				<view v-if="plan_type === 'private'" class="button_red " @click="makeCourse">预约上课</view>
				<view v-else class="button_red" @click="toCowrseRepair">补课</view>
			</view>
		</view>
	</view>
</template>

<script>
import studentInfo from '@/components/studentInfo.vue'

import { mapState } from 'vuex'

export default {
	components: {
		studentInfo,
		upDownList: () => import('@/components/courseList/upDownList.vue'),
		vip: () => import('@/components/vip.vue'),
		teamList: () => import('@/components/team/teamList.vue'),
		courseTable: () => import('@/components/course-table/course-table.vue')
	},
	data() {
		return {
			course: {},
			coach: {},
			card: {},
			plan: {},
			student: {},
			plan_type: '',
			loading: true,
			rid: 0,
			need_reserve: false,
			adjustment_allowed: false
		}
	},
	computed: {
		...mapState('course_vuex', {
			week_com: (state) => state.week,
			sel_student_com: (state) => state.sel_student,
		}),
		is_table_com() {
			return this.plan && this.plan !== '' && this.plan.length > 0 && this.plan[0].timeRange
		}
	},
	onLoad(option) {
		if (option.rid) this.init(option.rid)
	},
	methods: {
		init(rid) {
			this.rid = rid
			this.loading = true
			this.is_api('user_api/my_course_detail', { rid }).then((res) => {
				if (res) {
					for (let key in res) {
						this[key] = res[key]
					}
					if (this.plan_type === 'other' || this.is_table_com) {
						this.$nextTick(() => {
							if (this.plan === '' || (this.plan && this.plan.length === 0)) return
							if (this.$refs.table) {
								this.$refs.table.set_plan(this.plan)
							} else {
								let time = setTimeout(() => {
									clearTimeout(time)
									this.$refs.table.set_plan(this.plan)
								}, 100)
							}
						})
					}
				}
				this.loading = false
			})
		},
		// 切换学员
		toSelectStudent() {
			uni.navigateBack({ delta: 2 })
		},
		//明细
		toCourseParticulars() {
			this.is_goto('/pages/courseParticulars/courseParticulars', `?rid=${this.rid}`)
		},
		// 请假
		toLeave(ovo = false) {
			const { id, is_special } = this.course
			if (!this.plan && !is_special) {
				this.is_tools.to_msg('暂无课程可请假!')
				return
			}
			// 不是1对1
			if (!is_special) this.is_vuex.commit('leave_vuex/set_vuex', ['course_student', { cid: this.course.id, sid: this.student.id }])
			this.is_goto('/pages/leave/leave', `?ovo=${ovo ? ovo : is_special}&cid=${id}&type=${this.plan_type}`)
		},
		// 补课
		toCowrseRepair() {
			if (!this.need_reserve) {
				this.is_tools.to_msg('暂不需要补课!')
				return
			}
			this.is_goto('/pages/cowrseRepair/cowrseRepair', `?sid=${this.student.id}&cid=${this.course.id}`)
		},
		goto_course_info(id) {
			this.is_goto('/pages/courseDetail/courseDetail', `?id=${id}`)
		},
		makeCourse() {
			this.is_vuex.commit('leave_vuex/set_vuex', ['make_course', this.course])
			this.is_goto('/pages/course/makeCourse')
		},
		call_phone(phone) {
			uni.makePhoneCall({ phoneNumber: phone })
		},
		goto_coach() {
			this.is_goto('/pages/coachDetail/coachDetail', `?id=${this.coach.id}`)
		},
		gotoChange() {
			if (!this.adjustment_allowed) {
				this.is_tools.to_msg('不支持调课或未选课!')
				return
			}
			this.is_goto('/pages/changeCourse/changeCourse', `?rid=${this.rid}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.studentInfo {
	padding: 0 30rpx;
}

.downDeteil {
	// padding: 20rpx 20rpx 0;
	margin: 0 30rpx;
	background-color: #fff;
	margin-top: 20rpx;
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
</style>
