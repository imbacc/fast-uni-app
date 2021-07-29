<template>
	<view class="main">
		<student-info selShow />
		<skeleton v-if="loading" />
		<template v-if="!loading && !in_class"></template>
		<template v-else>
			<view class="banner" @click="toUpgradeHistory"></view>
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						当前所在班级
					</view>
					<view class="box-ico u-line-3">{{ in_class_com }}</view>
				</view>
				<view class="upList">
					<view class="upList-title">升班申请</view>
					<view
						class="upList-li flex justify-between align-center"
						v-for="(info, idx) in upclass_list"
						:key="idx"
						@click="toUpgradeDetail(info.id)"
					>
						<view class="flex_align">
							<view class="upList-li-img">
								<image src="/static/images/up_class_ico.png" mode="aspectFill" />
							</view>
							<view class="upList-li-title">
								<view style="color: #999;">升班至</view>
								<view>{{ info.class_name }}</view>
							</view>
						</view>
						<view class="upList-li-state">
							{{ status_list[info.status] }}
						</view>
					</view>
				</view>
			</view>
			<view class="but" @click="toUpgradeDetail()">升班申请</view>
		</template>
	</view>
</template>

<script>
import studentInfo from '@/components/studentInfo.vue'

export default {
	components: {
		studentInfo
	},
	data() {
		return {
			status_list: ['申请中', '已审核', '已拒绝'],
			upclass_list: [],
			loading: true,
			in_class: false
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		},
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
		in_class_com() {
			return this.in_class ? Array.from(this.in_class, ({ class_name }) => class_name).join(',') : ''
		}
	},
	watch: {
		sel_student_com(newValue, oldValue) {
			if (newValue && newValue !== oldValue) {
				this.init(newValue.id)
			}
		}
	},
	onLoad() {
		if (!this.user_info_com) {
			this.is_tools.to_msg('请登录后操作!')
			let time = setTimeout(() => {
				clearTimeout(time)
				uni.navigateBack()
			}, 100)
			return
		}
		if (!this.sel_student_com.id) {
			this.loading = false
		}
	},
	onShow() {
		if (this.sel_student_com.id) {
			this.init(this.sel_student_com.id)
			this.init_class(this.sel_student_com.id)
		}
		
	},
	methods: {
		async init(student_id, page) {
			this.loading = true
			this.is_api('upclass_api/select_applylist', { student_id, page, size: 10 }).then((res) => {
				if (res) this.upclass_list = res.data
				this.loading = false
			})
		},
		async init_class(student_id) {
			this.is_api('upclass_api/in_class', { id: student_id }).then((res) => {
				if (res) this.in_class = res
			})
		},
		toUpgradeHistory() {
			this.is_goto('/pages/upgradeHistory/upgradeHistory')
		},
		toUpgradeDetail(id) {
			if (!this.in_class) {
				this.is_tools.to_msg('没有可升班级!')
				return
			}
			let query = id ? `?id=${id}` : ''
			this.is_goto('/pages/upgradeDetail/upgradeDetail', query)
		},
	}
}
</script>

<style lang="scss" scoped>
.banner {
	height: 220rpx;
	margin-top: 20rpx;
	background: url(@/static/images/my/upgrade/banner-bg.png) no-repeat;
	background-size: cover;
}

.box {
	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-ico {
		font-size: 28rpx;
		text-align: right;
		background: #FFFFFF;
		border-radius: 23rpx;
		padding: 6rpx 12rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
}

.upList {
	&-title {
		color: #333;
		font-size: 30rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}

	&-li {
		padding: 0 20rpx;
		height: 120rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;

		&-img {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 29rpx;
		}

		&-title {
			font-size: 28rpx;
			color: #333;
		}

		&-state {
			padding: 0 20rpx;
			border-radius: 42rpx;
			border: 1px solid #c5c5c5;
			color: #999;
		}
	}
}

.but {
	height: 90rpx;
	line-height: 90rpx;
	background-color: #e62234;
	border-radius: 42rpx;
	font-size: 36rpx;
	color: #fff;
	text-align: center;
}
</style>
