<template>
	<view class="form">
		<view class="form_title">选择调课后您想上课的时间</view>
			<scroll-view style="height: 382rpx;width: 100%;" scroll-x>
				<view class="form-leaveTime">
					<view class="form_view flex_column flex_warp">
						<view
							class="form-leaveTime-box mt20"
							@click="cur_time = idx"
							:class="cur_time === idx ? 'active' : ''"
							v-for="(info, idx) in week_list"
							:key="idx"
						>
							<!-- <view style="font-size: 22rpx;">{{ info.date }}</view> -->
							<view style="font-size: 30rpx;">{{ info.week }}</view>
							<view style="font-size: 18rpx;">（{{ info.time }}）</view>
							<view class="u-line-2" style="font-size: 28rpx;">{{ info.name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		<view class="flex_column flex_center">
			当前选择
			<view class="course_div flex_align mt20">
				<view class="course_lab" style="margin: 0 150rpx 0 31rpx;">周一</view>
				<view class="course_lab" style="font-size: 26rpx;">公共团队课</view>
			</view>
		</view>
		<view class="form-cause">
			<view class="form-cause-title">调课事由（必填）</view>
			<view class="form-cause-inpt">
				<u-input
					ref="input"
					style="height: 100%;width: 100%;"
					v-model="explain"
					:maxlength="60"
					type="textarea"
					height="256"
					:clearable="false"
					placeholder="请输入您的调课事由"
					placeholder-style="color:#999999;"
				/>
				<view class="form-cause-inpt-textCount">{{ explain.length }}/60</view>
			</view>
		</view>
		<view class="form-image">
			<view class="form-image-title">相关证明</view>
			<view class="form-image-up flex_row flex_warp">
				<uploadImg ref="upload" />
			</view>
		</view>
		<view class="form-but" @click="submit">确认申请</view>
	</view>
</template>

<script>
import uploadImg from '@/components/upload-img/upload-img.vue'

export default {
	components: {
		uploadImg,
	},
	props: {
		planType: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			cur_time: 0,
			explain: '',
			week_list: [
				{
					week: '周一',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周二',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周三',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周四',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周五',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周一',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周二',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周三',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周四',
					time: '（09:00~10:00）',
					name: '公共团队课'
				},
				{
					week: '周五',
					time: '（09:00~10:00）',
					name: '公共团队课'
				}
			],
		}
	},
	created() {
		// if (this.type === 1) {
		// 	const { sid, cid } = this.is_vuex.state.leave_vuex.course_student
		// 	this.is_api('leave_api/student_leave_data', { stu_id: sid, cid: cid }).then((res) => {
		// 		if (res) {
		// 			let a_week = []
		// 			res.class_of_a_week.forEach(({ date, course }) => {
		// 				course.forEach((min) => a_week.push({ date, ...min }))
		// 			})
		// 			this.week_list = a_week
		// 			this.append_list = res.class_allowed_supplement
		// 			this.await_count = res.await_supplement_count
		// 		}
		// 	})
		// }
		// if (this.update) this.init()
	},
	methods: {
		init() {
			const leave_info = Object.assign({}, this.is_vuex.state.leave_vuex.leave_info)
			this.explain = leave_info.reason
			if (leave_info.leave_type === 1) this.initTime = [leave_info.leave_starttime, leave_info.leave_endtime]
			if (leave_info.prove_images && leave_info.prove_images.length > 0 && leave_info.prove_images[0] !== '') {
				this.$nextTick(() => {
					this.$refs.upload.set_list(leave_info.prove_images)
				})
			}
		},
		submit() {
			if (this.planType === 'common' && this.week_list.length === 0) {
				this.is_tools.to_msg('没有可选课程!')
				return
			}
			
			if (this.explain === '') {
				this.is_tools.to_msg('请填写请假事由!')
				return
			}
			
			let file_list = this.$refs.upload.get_list()
			let leave, recovery, prove_images;
			let body = {
				week_day: '',
				leave_time: '',
				leave_starttime: 0,
				leave_endtime: 0,
				reason: this.explain,
				prove_images: file_list,
				make_up_day: '',
				make_up_time: ''
			}
			
			if (this.type === 1) {
				leave = this.week_list[this.cur_time]
				recovery = this.append_list[this.repairTime]
				body.week_day =  leave.date.replace(/\s*/g, '') || ''
				body.leave_time = leave.time.replace(/\s*/g, '') || ''
				body.make_up_day = ''
				body.make_up_time = ''
			}
			
			if (this.type === 2) {
				this.submit2(body)
				return
			}
			
			if (this.checked === 2) {
				body.make_up_day = recovery.date.replace(/\s*/g, '') || ''
				body.make_up_time = recovery.time.replace(/\s*/g, '') || ''
				if (body.week_day === body.make_up_day && body.leave_time === body.make_up_time) {
					this.is_tools.to_msg('请假时间和补课时间冲突!')
					return
				}
			}
			
			this.$emit('submit', body)
		},
		submit2(body) {
			const [start, end] = this.pick_time
			body.leave_time = '00:00 - 24:00'
			body.leave_starttime = Number(`${new Date(start).getTime()}000`)
			body.leave_endtime = Number(`${new Date(end).getTime()}000`)
			this.$emit('submit', body)
		}
	}
}
</script>

<style lang="scss" scoped>
	.form_title {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #555555;
		margin-left: 20rpx;
	}
	
.form {
	padding: 30rpx;

	&-leaveTime {
		height: 382rpx;
		// background-color: #fff;
		padding: 15rpx;

		&-box {
			width: 200rpx;
			// height: 181rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			text-align: center;
			line-height: 1.5;
			color: #000;
			padding: 15rpx 15rpx;
			transition: 0.3s;
			margin-right: 20rpx;
		}
	}
	
	&-repairTime {
		font-size: 28rpx;
		padding: 20rpx 25rpx;
		color: 28rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-top: 20rpx;

		&-select {
			border-radius: 50%;
			border: 1px solid #d2d2d2;
			margin-right: 12rpx;
		}
	}

	&-repairTimeBox {
		margin-top: 20rpx;

		&-box {
			width: 213rpx;
			// height: 201rpx;
			margin-right: 15rpx;
			background-color: #fff;
			border-radius: 12rpx;
			text-align: center;
			padding: 20rpx 20rpx 20rpx;
			color: #333;
			transition: 0.3s;
			margin-bottom: 25rpx;
		}
	}

	&-cause {
		margin-top: 30rpx;

		&-title {
			font-size: 30rpx;
			color: #333;
		}

		&-inpt {
			position: relative;
			background-color: #fff;
			padding: 0rpx 20rpx;
			margin-top: 20rpx;

			&-textCount {
				font-size: 26rpx;
				color: #999;
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
	}

	&-image {
		margin-top: 30rpx;

		&-title {
			font-size: 30rpx;
			color: #333;
		}

		&-up {
			margin-top: 26rpx;

			&-but {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
				background-color: #fff;
				text-align: center;
				font-size: 28rpx;
				color: #999999;
				padding-top: 30rpx;
			}
		}
	}
	&-but {
		height: 90rpx;
		background-color: #e62234;
		font-size: 36rpx;
		color: #fff;
		line-height: 90rpx;
		text-align: center;
		margin-top: 80rpx;
		border-radius: 42rpx;
	}
}

.form-text {
	margin-top: 27rpx;
	font-size: 26rpx;
	color: #999;
}

.active {
	background-color: #e62234;
	color: #fff;
}

.mt20 {
	margin-top: 20rpx;
}

.red_lab {
	color: #e62234;
	font-size: 28rpx;
	font-weight: 600;
}

.gray_lab {
	color: #CCCCCC;
}

.cur_box {
	background-color: #023A98;
	color: #fff;
	
	.gray_lab {
		color: white;
	}
}

.form_view {
	height: 100%;
}

.form_view:after{
	content: '';
	width: 200rpx;
}

.course_div {
	width: 690rpx;
	height: 111rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	margin-bottom: 20rpx;
}

.course_lab {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
}
</style>
