<template>
	<view class="pack">
		<view class="head_div flex_align">
			<image class="head_img" :src="make_course_com.cover_image" mode="aspectFill" />
			<view class="head_info">
				<view class="head_name_div flex_align">
					<view class="head_tag flex_center_align">{{ make_course_com.type_name }}</view>
					<view class="head_name">{{ make_course_com.name }}</view>
				</view>
				<view class="head_student">上课人 : {{ sel_student_com.name }}</view>
				<view class="head_time">{{ make_course_com.period_explain }}</view>
			</view>
		</view>

		<view class="week_div flex_align flex_around">
			<view
				v-for="(info, idx) of week_list"
				:key="idx"
				class="min_week flex_column flex_center_align"
				:class="idx === cur ? 'cur_week' : ''"
				@click="sel_cur(idx)"
			>
				<view class="min_lab">{{ info.week }}</view>
				<view class="min_lab min_gray">{{ info.day }}</view>
			</view>
		</view>
		
		<view class="time_list flex_column">
			<view v-for="(info, idx) of time_com" :key="idx" class="time_div flex_align flex_between">
				<view class="time_lab">{{ info.start }}-{{ info.end }}</view>
				<view v-if="info.full" class="time_lab disabled flex_center_align">已满</view>
				<view v-else-if="!info.reserve && !info.full" class="time_button flex_center_align" @click="of_submit(idx)">预约</view>
				<view v-else-if="info.reserve" class="time_button flex_center_align cancel" @click="submit(idx, true)">取消预约</view>
			</view>
		</view>
		
		<alertMsg v-if="alert_show" upClass @confirm="alert_confirm" @cancel="alert_cancel" />
	</view>
</template>

<script>
	import alertMsg from '@/components/alert-msg/alert-msg.vue'
	
	export default {
		components: {
			alertMsg
		},
		data() {
			return {
				cur: 0,
				cid: 0,
				week_list: [],
				week_bak: [],
				week_str: [],
				last_time: '3小时20分',
				alert_show: false,
				mark_idx: 0
			}
		},
		computed: {
			make_course_com() {
				return this.is_vuex.state.leave_vuex.make_course
			},
			sel_student_com() {
				return this.is_vuex.state.course_vuex.sel_student
			},
			time_com() {
				return this.week_bak[this.cur] ? this.week_bak[this.cur] : []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.is_api('course_api/course_reserve', { cid: this.make_course_com.id, stu_id: this.sel_student_com.id }).then((res) => {
					if (res) {
						const week_str = ['周一', '周二', '周三', '周四', '周五', '周六']
						
						//今天的时间
						let day = new Date()
						day.setTime(day.getTime())
						let jt_day = day.getMonth()+1 < 10 ? `0${day.getMonth()+1}` : day.getMonth()+1
						let jt_date = day.getFullYear()+"-" + jt_day + "-" + day.getDate()
						
						//明天的时间
						day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
						let mt_day = day.getMonth()+1 < 10 ? `0${day.getMonth()+1}` : day.getMonth()+1
						let mt_date = day.getFullYear()+"-" + mt_day + "-" + day.getDate()
						
						let list = [], bak = [], str = []
						res.forEach((week) => {
							for (let key in week) {
								str.push(key)
								bak.push(week[key])
								let d = new Date(key)
								list.push({
									week: key === jt_date ? '今天' : (key === mt_date ? '明天' : week_str[d.getDay() - 1] || '周日'),
									day: key.split('-')[2]
								})
							}
						})
						
						this.week_str = str
						this.week_bak = bak
						this.week_list = list
					}
				})
			},
			sel_cur(idx) {
				this.cur = idx
			},
			of_submit(idx) {
				this.mark_idx = idx
				this.alert_show = true
				// this.is_tools.to_showModal('是否预约课程?', '系统提示', () => this.submit(idx))
			},
			submit(idx, cancel = false) {
				let date, time = ''
				let cur = this.week_bak[this.cur],min_time = cur[idx], min_date = this.week_str[this.cur]
				date = min_date
				time = `${min_time.start}-${min_time.end}`
				let str = cancel ? '取消' : ''
				let body = { stu_id: this.sel_student_com.id, cid: this.make_course_com.id, date, time }
				if (cancel) body.cancel = 1
				uni.showLoading()
				this.is_api('course_api/submit_reserve', {}, body).then((res) => {
					uni.hideLoading()
					this.is_tools.to_msg(res ? `${str}预约成功!` : `${str}预约失败!`)
					if (res) {
						this.init()
					}
				})
			},
			alert_confirm() {
				this.submit(this.mark_idx)
				this.alert_cancel()
			},
			alert_cancel() {
				this.alert_show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.pack {
	width: 100%;
	min-height: 100vh;
	background: #f3f3f3;
	padding: 30rpx;
}

.head_div {
	width: 690rpx;
	height: 225rpx;
	background: #ffffff;
	border-radius: 12rpx;
	padding: 0 20rpx 0 20rpx;
}

.head_img {
	width: 207rpx;
	height: 172rpx;
}

.head_info {
	margin-left: 31rpx;
}

.head_name_div {
	width: 100%;
}

.head_tag {
	height: 45rpx;
	background: #e62234;
	border-radius: 23rpx;
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	padding: 1rpx 10rpx;
}

.head_name {
	height: 40rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	margin-left: 13rpx;
}

.head_student {
	@extend .head_name;
	font-weight: 400;
	color: #555555;
	margin-left: 0;
	margin-top: 24rpx;
}

.head_time {
	@extend .head_student;
	color: #999999;
	margin-left: 0;
}

.week_div {
	@extend .head_div;
	height: 100rpx;
	border-radius: 12rpx;
	margin-top: 30rpx;
}

.min_week {
	width: 78rpx;
	height: 78rpx;
	border-radius: 43rpx;
	transition: 0.3s;
}

.cur_week {
	background: #e62234;

	.min_lab {
		color: #ffffff;
	}
}

.min_lab {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	line-height: 30rpx;
}

.min_gray {
	@extend .min_lab;
	color: #999999;
}

.time_list {
	width: 100%;
}

.time_div {
	width: 690rpx;
	height: 100rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
	margin-top: 20rpx;
	padding: 0 20rpx;
}

.time_lab {
	@extend .min_lab;
}

.time_button {
	width: 145rpx;
	height: 52rpx;
	background: #E62234;
	border-radius: 42rpx;
	@extend .min_lab;
	font-size: 30rpx;
	color: #FFFFFF;
	padding: 0 10rpx;
}

.cancel {
	background: #023A98;
}

.disabled {
	background: #ffff;
	color: #999999;
}
</style>
