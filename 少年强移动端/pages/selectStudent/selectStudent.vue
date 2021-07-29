<template>
	<view>
		<skeleton v-if="!student_page" />
		<view v-else>
			<view v-for="(info, index) in student_page.list" :key="index" class="student">
				<view class="student-box flex align-center" :class="select && info.id === sel_student_com.id ? 'gray_filter' : ''">
					<view class="student-box-avatar">
						<!-- <u-avatar :src="info.images" size="130" /> -->
						<image class="hw100b" :src="info.images" mode="aspectFill" />
					</view>
					<view class="student-box-title" @click="sel_student(info)">
						<view>
							<text>{{ info.name }}</text>
							<text style="color: #999; font-size: 28rpx;margin-left: 20rpx;">{{ info.sex === 1 ? '男' : '女' }}</text>
							<text style="color: #999;font-size: 28rpx;margin-left: 20rpx;">{{ info.age }}岁</text>
						</view>
						<view style="color: #999;font-size: 28rpx;">
							<u-icon name="phone" />
							{{ info.phone }}
						</view>
					</view>
					<view v-if="!select" class="student-box-but" @click="toCourseQuery(info)">查看课程</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import appendData from '@/common/class/append_data.js'

export default {
	data() {
		return {
			student_page: null,
			jump: false,
			select: false
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		}
	},
	onLoad({ jump, select }) {
		if (jump) this.jump = Boolean(jump)
		if (select) this.select = Boolean(select)
		this.init()
	},
	onReachBottom() {
		if (this.student_page) this.student_page.next_fun(this, '没有更多学员了...')
	},
	methods: {
		init(page = 1, append = false) {
			if (!this.student_page) {
				const _page = new appendData()
				_page.name = 'user_api/my_student_list'
				_page.method = 'GET'
				this.student_page = _page
			}
			this.student_page.fun(page, append)
		},
		sel_student(info) {
			if (this.jump) return
			if (this.is_vuex.state.course_vuex.cur_student.id === info.id) return
			uni.showLoading({ title: '切换中...' })
			this.is_api('user_api/cur_student', {}, { stu_id: info.id }).then((res) => {
				uni.hideLoading()
				if (res) {
					this.is_vuex.commit('course_vuex/set_vuex', ['cur_student', info])
					this.is_vuex.commit('course_vuex/set_vuex', ['sel_student', info])
					uni.navigateBack()
				}
			})
		},
		toCourseQuery(info) {
			this.is_vuex.commit('course_vuex/set_vuex', ['sel_student', info])
			this.is_goto('/pages/courseQuery/courseQuery')
		}
	}
}
</script>

<style lang="scss" scoped>
.student {
	padding: 0 30rpx;
	margin-top: 20rpx;

	&-box {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx 30rpx;

		&-avatar {
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		&-title {
			margin-left: 22rpx;
			flex-grow: 1;
			line-height: 1.5;
			font-size: 32rpx;
			color: #333;
		}

		&-but {
			padding: 0 18rpx;
			color: #555;
			border: 1px solid #dcdcdc;
			border-radius: 24rpx;
		}
	}
}
</style>
