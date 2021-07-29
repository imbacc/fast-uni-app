<template>
	<view>
		<view class="time">
			<view class="time-title flex justify-between ">
				<view>
					<u-icon name="calendar" color="#E62234" />
					预约补课（{{ date_com }}月）
				</view>
				<view style="font-size: 28rpx;">
					待补课时
					<text style="color: #E62234;">{{ await_count }}节</text>
				</view>
			</view>
			<view class="time-box flex flex-wrap justify-between">
				<view
					class="time-box-li "
					v-for="(info, idx) in append_list"
					:key="idx"
					:class="cur === idx ? 'active' : ''"
					@click="cur = idx"
				>
					<view style="font-size: 28rpx;">{{ info.date }}</view>
					<view style="font-size: 18rpx;">{{ info.time }}</view>
					<view style="font-size: 28rpx;">{{ info.course }} {{ info.class }}</view>
				</view>
			</view>
		</view>
		<view class="flex_center_align">
			<view class="but" @click="submit">确认申请</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cur: 0,
			append_list: [],
			await_count: 0,
			sid: 0,
			cid: 0,
		}
	},
	computed: {
		date_com() {
			let next_week = new Date().getTime() + 7 * 1000 * 60 * 60 * 24
			return new Date(next_week).getMonth() + 1
		}
	},
	onLoad({ sid, cid }) {
		if (sid && cid) {
			this.sid = sid
			this.cid = cid
			this.init(sid, cid)
		}
	},
	methods: {
		init(sid, cid) {
			this.is_api('leave_api/student_leave_data', { stu_id: sid, cid: cid }).then((res) => {
				if (res) {
					this.append_list = res.class_allowed_supplement
					this.await_count = res.await_supplement_count
				}
			})
		},
		submit() {
			const { date, time, id } = this.append_list[this.cur]
			uni.showLoading()
			let body = { student_id: this.sid, cid: this.cid, courseclass_id: id, make_up_day: date, make_up_time: time }
			this.is_api('leave_api/student_appointment', {}, { ...body, _formData: true }).then((res) => {
				uni.hideLoading()
				if (res) {
					let time = setTimeout(() => {
						clearTimeout(time)
						this.is_tools.to_msg('提交作业成功!')
						uni.navigateBack()
					}, 400)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.time {
	padding: 20rpx 30rpx;

	&-title {
		padding: 20rpx 24rpx;
		font-size: 30rpx;
		color: #333;
		background-color: #fff;
		border-radius: 12rpx;
	}

	&-box {
		margin-top: 20rpx;
		
		&-li {
			width: 213rpx;
			// height: 200rpx;
			background-color: #fff;
			border-radius: 12rpx;
			text-align: center;
			padding: 20rpx 35rpx 20rpx;
			margin-bottom: 20rpx;
			color: #555;
			transition: 0.3s;
		}
	}
	
	&-box:after {
		content: "";
		width: 213rpx;
	}
}

.but {
	width: 690rpx;
	height: 90rpx;
	background-color: #e62234;
	font-size: 36rpx;
	color: #fff;
	line-height: 90rpx;
	text-align: center;
	border-radius: 42rpx;
	margin: 40rpx 0;
}

.active {
	background-color: #023a98;
	color: #fff;
}
</style>
