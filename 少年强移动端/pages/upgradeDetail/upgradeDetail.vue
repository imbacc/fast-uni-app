<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else class="main">
			<view class="info">
				<view class="info-title">
					<image src="/static/images/course-ico.png" />
					学员基础信息
				</view>
				<view class="info-box">
					<view class="info-box-li flex justify-between">
						<text>姓名</text>
						<text>{{ student_info.name }}</text>
					</view>
					<view class="info-box-li flex justify-between">
						<text>性别</text>
						<text>{{ student_info.sex_text }}</text>
					</view>
					<view class="info-box-li flex justify-between">
						<text>年龄</text>
						<text>{{ student_info.age }}</text>
					</view>
					<view class="info-box-li flex justify-between">
						<text>联系方式</text>
						<text>{{ student_info.member && student_info.member[0].phone }}</text>
					</view>
					<view class="info-box-li flex justify-between">
						<text>当前所属班级</text>
						<text>{{ student_info.courseclass && student_info.courseclass.class_name }} {{ student_info.courseclass && student_info.courseclass.type }}</text>
					</view>
				</view>
			</view>
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style="vertical-align:middle;height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						升班选择
					</view>
				</view>
				<view class="goal flex align-center">
					<image :src="next_info.class_images && next_info.class_images[0]" />
					<text style="flex-grow:1;">升班至</text>
					<text>{{ next_info.class_name }} {{ next_info.type }}</text>
				</view>
				<view class="condition flex justify-between" :class="upclass_id === 0 ? 'border_red' : ''">
					<view class="condition-l flex_column flex_center_align">
						<image :src="next_info.class_images && next_info.class_images[0]" mode="aspectFill" />
						<view>{{ next_info.class_name }}</view>
						<view style="font-size: 28rpx;">{{ next_info.type }}</view>
					</view>
					<view class="condition-r">
						<view>升班标准：</view>
						<view style="height: 100%; font-size: 26rpx; color: #999;">{{ next_info.apply_details }}</view>
					</view>
				</view>
				<view v-if="upclass_id > 0" class="result flex justify-between align-center">
					<text>申请结果</text>
					<text style="color: #555;">{{ status_list[upclass_info.status] }}</text>
				</view>
				<view v-if="upclass_id > 0 && upclass_info && upclass_info.status === 1" class="result flex justify-between align-center">
					<text>成功升班至</text>
					<text style="color: #555;">{{ upclass_info.class_name }} {{ next_info.type }}</text>
				</view>
			</view>
			<view v-if="upclass_id === 0" class="but" @click="submit_apply">确认提交申请</view>
			<view v-if="upclass_id > 0 && upclass_info && upclass_info.status !== 1 && upclass_info.status !== 2" class="but" style="background: #B9B9B9;">等待审核中</view>
			<view v-if="upclass_id > 0 && upclass_info && upclass_info.status === 1" class="but" @click="history_apply">我的升班历程</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status_list: ['已申请', '已通过', '已拒绝'], 
			student_info: false,
			next_info: false,
			upclass_id: 0,
			upclass_info: false,
			loading: true
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		}
	},
	onLoad({ id }) {
		this.loading = true
		if (id) {
			this.upclass_id = id
			this.init_info(id)
		}
		if (this.sel_student_com.id && !this.student_info) {
			this.init(this.sel_student_com.id)
		}
	},
	methods: {
		init_info(apply_id) {
			this.is_api('upclass_api/upclass_info', { apply_id }).then((res) => {
				if (res) this.upclass_info = res
			})
		},
		init(student_id) {
			this.is_api('upclass_api/apply_ready', { student_id }).then((res) => {
				if (res) {
					this.student_info = res.student
					this.next_info = res.next_courseclass
				}
				this.loading = false
			})
		},
		submit_apply() {
			const student_id = this.student_info.id
			const courseclass_id = this.next_info.id
			uni.showLoading()
			this.is_api('upclass_api/apply_upclass', {}, { student_id, courseclass_id, _formData: true }).then((res) => {
				uni.hideLoading()
				if (res) {
					this.is_tools.to_msg('申请成功!')
					let tiem = setTimeout(() => {
						clearTimeout(tiem)
						uni.navigateBack()
					}, 400)
				}
			})
		},
		history_apply() {
			this.is_goto('/pages/upgradeHistory/upgradeHistory')
		}
	}
}
</script>

<style lang="scss" scoped>
.info {
	padding: 20rpx;
	background-color: #fff;
	border-radius: 12rpx;

	&-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 20rpx;

		image {
			width: 30rpx;
			height: 50rpx;
		}
	}

	&-box {
		border-top: 1px solid #e6e6e6;

		&-li {
			padding: 10rpx 20rpx;
			font-size: 28rpx;
			color: #555;
		}
	}
}

.box {
	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}
}

.goal {
	height: 90rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 0 20rpx;
	margin-bottom: 20rpx;

	image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
}

.border_red {
	border: 4rpx solid #E62234;
}

.condition {
	height: 284rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 0 20rpx;

	&-l {
		width: 258rpx;
		text-align: center;
		font-size: 32rpx;
		color: #333;

		image {
			width: 120rpx;
			height: 83rpx;
		}
	}

	&-r {
		font-size: 28rpx;
		width: 368rpx;
		margin-top: 30rpx;
		font-weight: 500;
		color: #333333;
	}
}

.result {
	height: 90rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin-top: 20rpx;
	font-size: 30rpx;
	color: #333;
	padding: 0 20rpx;
}
.but {
	height: 90rpx;
	border-radius: 42rpx;
	background-color: #e62234;
	line-height: 90rpx;
	font-size: 34rpx;
	text-align: center;
	color: #fff;
	margin-top: 30rpx;
}
</style>
