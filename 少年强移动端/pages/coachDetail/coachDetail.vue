<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else>
			<view class="heder" :style="`background: url(${coach_info.top_image});`">
				<!-- <view class="heder-avatar">
					<u-avatar :src="coach_info.avatar_image" size="170" />
				</view>
				<view class="heder-name">{{ coach_info.name }}</view>
				<view>
					<view v-for="(desc, index) in split_desc(coach_info.desc)" :key="index" class="heder-text">{{ desc }}</view>
				</view> -->
			</view>
			<!-- 教练简介 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						教练简历
					</view>
				</view>
				<view class="box-brief" v-html="coach_info.resume_content"></view>
			</view>
			<!-- 个人荣誉 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						个人荣誉
					</view>
				</view>
				<view class="box-honor" v-html="coach_info.honor_content">
					<!-- <view class="box-honor-li fixed align-center" v-for="item in 3" :key="item">2009年全国武术散打锦标赛65kg冠军</view> -->
				</view>
			</view>
			<!-- 正在开班的课程 -->
			<view v-if="coach_info.course && coach_info.course.length > 0" class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						正在开班的课程
					</view>
				</view>
				<view class="box-course">
					<up-down-list
						v-for="(course, idx) in coach_info.course"
						:key="idx"
						border
						:topTitle="{ title: course.name }"
						:topTitleStyle="{ 'padding': ' 0 18rpx', 'margin-right': '6rpx' }"
						:bottomTitle="course"
						@to="toDetail"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
		upDownList: () => import('@/components/courseList/upDownList.vue')
	},
	data() {
		return {
			coach_info: {},
			loading: true
		}
	},
	computed: {
		split_desc() {
			return (desc) => desc.split(' ')
		}
	},
	onLoad(option) {
		if (option.id) this.init(option.id)
	},
	methods: {
		init(id) {
			this.is_api('coach_api/coach_info', { id }).then((res) => {
				if (res) this.coach_info = res
				this.loading = false
			})
		},
		// 查看详情
		toDetail(id) {
			this.is_goto('/pages/courseDetail/courseDetail', `?id=${id}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.heder {
	width: 750rpx;
	height: 380rpx;
	padding-top: 32rpx;
	background-size: cover;

	&-avatar {
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
		margin: 0rpx auto 6rpx;
	}

	&-name {
		text-align: center;
		color: #fff;
		font-size: 32rpx;
		margin-bottom: 10rpx;
		font-weight: 500;
	}

	&-text {
		font-size: 24rpx;
		color: #fff;
		text-align: center;
	}
}

.box {
	padding: 0 35rpx 20rpx;
	background-color: #fff;
	margin-bottom: 6rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	// 简介
	&-brief {
		font-size: 26rpx;
		color: #999;
	}

	// 荣誉
	&-honor {
		&-li {
			color: #999;
			font-size: 26rpx;
		}

		&-li:before {
			content: '';
			display: inline-block;
			width: 10rpx;
			height: 10rpx;
			background-color: #e62234;
			border-radius: 50%;
			margin-right: 10rpx;
			transform: translateY(-4rpx);
		}
	}
}
</style>
