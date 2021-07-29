<template>
	<view class="studentInfo flex align-center justify-around">
		<view class="studentInfo-avatar">
			<!-- <u-image :src="student_com.images" height="76" border-radius="50%" /> -->
			<u-avatar :src="student_com.images" size="76" />
		</view>
		<view class="studentInfo-name">{{ student_com.name || '未选择学员' }}</view>
		<view class="studentInfo-sex">{{ student_com.sex }}</view>
		<view class="studentInfo-age">{{ student_com.age || 0 }}岁</view>
		<view v-if="student_com.name" class="studentInfo-state flex_row flex_align">
			<image class="min_ico" :src="state_com ? '/static/images/leave_ico.png' : '/static/images/up_ico.png'" mode="scaleToFill" />
			<view class="state_lab" :class="state_com ? 'state_blue' : 'state_red'">{{ student_com.state }}</view>
		</view>
		<view v-if="!hideSel" class="studentInfo-cut" @click="to">切换学员</view>
	</view>
</template>

<script>
export default {
	name: 'studentInfo',
	props: {
		selShow: {
			type: Boolean,
			default: false
		},
		hideSel: {
			type: Boolean,
			default: false
		},
		selGoto: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		student_com() {
			return this.is_vuex.state.course_vuex[this.selShow ? 'sel_student' : 'cur_student']
		},
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
		state_com() {
			return this.student_com.state && this.student_com.state.indexOf('上课') !== -1
		}
	},
	created() {
		if (this.user_info_com && !this.student_com.id) this.is_tools.to_msg('请先选择学员!')
	},
	methods: {
		to() {
			if (this.selShow && this.selGoto) {
				this.is_goto('/pages/selectStudent/selectStudent', `?select=true`)
				return
			}
			uni.showLoading({ title: '切换中...' })
			this.is_api('user_api/cur_student', {}, { stu_id: this.student_com.id }).then((res) => {
				uni.hideLoading()
				if (res) {
					this.$emit('to')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.studentInfo {
	height: 108rpx;
	background-color: #fff;
	border-radius: 12rpx;

	&-avatar {
		width: 76rpx;
		height: 76rpx;
	}

	&-name {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
	}

	&-sex {
		font-size: 28rpx;
		color: #999;
	}

	&-age {
		font-size: 28rpx;
		color: #999;
	}

	&-state {
		font-size: 26rpx;
		color: #023a98;
		min-width: 60rpx;
		white-space: nowrap;
	}

	&-cut {
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #555;
		border: 1px solid #dcdcdc;
		border-radius: 24rpx;
	}
}

.min_ico {
	height: 28rpx;
	width: 28rpx;
}

.state_lab {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}

.state_blue {
	color: #023A98;
}

.state_red {
	color: #E62234;
}
</style>
