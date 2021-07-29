<template>
	<view style="margin-top: -43rpx;">
		<skeleton v-if="loading" />
		<view v-else>
			<view class="course-swiper">
				<u-swiper :list="top_banner" name="img" height="380" />
			</view>
			<view v-for="(type, index) in type_list" :key="index" class="course">
				<!-- 标题 -->
				<view v-if="type.course_list && type.course_list.length > 0" class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="course-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						{{ type.name }}
					</view>
					<view class="course-ico" @click="goto_couse_list(type.id)">
						查看更多
						<u-icon name="arrow-right" />
					</view>
				</view>
				<view v-if="type.id === 1" class="course-public">
					<view
						class="course-public-box flex_column flex_around"
						v-for="(course, idx) in four_com(type.course_list)"
						:key="idx"
						@click="goto_course_info(course.id)"
						:style="`background: url(${is_tools.format_url(course.cover_image)});background-size: 100%;`"
					>
						<view class="course-elite-box-title text-cut ml40">{{ course.name }}</view>
						<view class="course-elite-box-time ml40">{{ course.period_explain }}</view>
						<view class="text-price red_round ml40">{{ price_com(course.price) }} 起</view>
					</view>
				</view>
				<view v-if="type.id === 2" class="course-elite flex justify-between flex-wrap">
					<view class="course-elite-box" v-for="(course, idx) in type.course_list" :key="idx" @click="goto_course_info(course.id)">
						<view class="course-elite-box-img">
							<image :src="course.cover_image || ''" mode="aspectFill" />
						</view>
						<view class="course-elite-box-title text-cut">{{ course.name }}</view>
						<view class="course-elite-box-time">{{ course.period_explain }}</view>
						<view class="course-elite-box-price text-price">{{ price_com(course.price) }} 起</view>
					</view>
				</view>
				
				<view v-if="lazy_load && type.id === 3 && type.course_list" class="course-1V1">
					<up-down-list
						v-for="(course, idx) in type.course_list" :key="idx"
						:topTitle="{ title: type.name }"
						:bottomTitle="course"
						@to="goto_course_info"
					/>
				</view>
				<view v-if="lazy_load && type.id === 4" class="course-adult">
					<scroll-view scroll-x style="height: 185rpx; border-radius: 11rpx; overflow: hidden;">
						<view style="height: 100%;" :style="'width:' + (type.course_list ? type.course_list.length : 1) * 646 + 'rpx;'">
							<view class="course-1V1-box" v-for="(course, idx) in type.course_list" :key="idx" @click="goto_course_info(course.id)">
								<view class="course-1V1-box-img">
									<image :src="course.cover_image || ''" mode="aspectFill" />
								</view>
								<view class="course-1V1-box-text">
									<view class="course-1V1-box-text-title1 text-cut">{{ course.name }}</view>
									<view class="course-1V1-box-text-title2 text-cut">{{ course.period_explain }}</view>
									<view class="course-1V1-box-text-title3 text-price">{{ price_com(course.price) }} 起</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import upDownList from '@/components/courseList/upDownList.vue'

export default {
	components: {
		upDownList
	},
	data() {
		return {
			loading: true,
			top_banner: [],
			type_list: [],
			course_list: [],
			lazy_load: false,
			pull_refresh: false
		}
	},
	computed: {
		refresh_course_com() {
			return this.is_vuex.state.user_vuex.refresh_course
		},
		price_com() {
			return (price) => price ? parseFloat(price) : 0
		},
		four_com() {
			return (list) => list && list.length > 3 ? list.slice(0, 3) : list
		}
	},
	onShow() {
		if (this.refresh_course_com) {
			this.is_vuex.commit('user_vuex/set_vuex', ['refresh_course', false])
			this.init()
		}
	},
	onPullDownRefresh() {
		this.pull_refresh = true
		this.init()
	},
	onLoad() {
		this.init()
	},
	onUnload() {
		this.pull_refresh = false
	},
	onPageScroll({ scrollTop }) {
		if (!this.lazy_load && scrollTop >= 60) {
			this.lazy_load = true
			this.type_list.slice(2, this.type_list.length).forEach(({ id }, idx) => this.ge_course(id, idx))
		}
	},
	methods: {
		init() {
			this.init_banner()
			this.course_type().then(() => {
				if (this.$el.clientHeight < 700) {
					this.lazy_load = true
					this.type_list.slice(2, this.type_list.length).forEach(({ id }, idx) => this.ge_course(id, idx))
				}
			})
		},
		async init_banner() {
			let param = { q: 'course', _page: [1, 3] }
			if (this.pull_refresh) param._cache = 0
			this.is_api('home_api/banner_list', param, { _noToken: true }).then(res => {
				if (res) {
					let arr = []
					res.data.forEach(({ source }) => arr.push({ img: source ? source[0] : '' }))
					this.top_banner = arr
				}
			})
		},
		async course_type() {
			return new Promise((resovle) => {
				let param = { _page: [1, 5] }
				if (this.pull_refresh) param._cache = 0
				this.is_api('course_api/course_type_list', param).then(res => {
					if (res) {
						this.type_list = res.data
						this.is_vuex.commit('course_vuex/set_vuex', ['type_list', this.type_list])
						this.type_list.slice(0, 2).forEach(({ id }, idx) => this.ge_course(id, idx))
					}
					this.loading = false
					if (this.pull_refresh) uni.stopPullDownRefresh()
					resovle()
				})
			})
		},
		async ge_course(id, idx) {
			let param = { q: id, _page: [1, 4] }
			if (this.pull_refresh) param._cache = 0
			this.is_api('course_api/course_list', param).then(res => {
				if (res) {
					let idx = Array.from(this.type_list, ({ id }) => id).indexOf(id)
					this.$set(this.type_list[idx], 'course_list', idx !== -1 ? res.data : [])
				}
			})
		},
		// 查看全部课程列表
		goto_couse_list(id) {
			this.is_goto('/pages/courseList/courseList', `?id=${id}`)
		},
		// 查看课程详情
		goto_course_info(id) {
			this.is_goto('/pages/courseDetail/courseDetail', `?id=${id}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.ml40 {
	margin-left: 40rpx;
}

.red_round {
	background: red;
	height: 40rpx;
	width: 170rpx;
	border-radius: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	font-weight: bold;
}

.course {
	padding: 0 35rpx;

	&-title {
		font-size: 32rpx;
		font-family: PingFangSC-Bold, PingFang SC;
		font-weight: bold;
		color: #000000;
	}

	&-ico {
		color: #999999;
		font-size: 26rpx;
	}

	//公共集体课
	&-public {
		&-box {
			width: 690rpx;
			height: 170rpx;
			background-color: #1cbbb4;
			border-radius: 11rpx;
			margin-bottom: 20rpx;
		}
	}

	//小班精英课
	&-elite {
		&-box {
			width: 335rpx;
			height: 392rpx;
			background-color: #fff;
			border-radius: 8px;
			overflow: hidden;
			line-height: 1.5;
			margin-bottom: 20rpx;

			&-img {
				width: 100%;
				height: 237rpx;
			}

			&-title {
				font-size: 30rpx;
				color: #000;
				margin-top: 20rpx;
				padding-left: 10rpx;
				width: 310rpx;
				font-weight: bold;
			}

			&-time {
				font-size: 24rpx;
				color: #6c6c6c;
				padding-left: 10rpx;
			}

			&-price {
				font-size: 32rpx;
				color: #e62234;
				padding-left: 10rpx;
				font-weight: bold;
			}
		}
	}

	// 一对一私教课
	&-1V1 {
		width: 100%;
		margin: 40rpx 0;

		&-box {
			width: 606rpx;
			height: 185rpx;
			box-shadow: 0px 2px 2px 1px rgba(226, 226, 226, 0.5);
			border-radius: 11rpx;
			overflow: hidden;
			padding-right: 45rpx;
			margin-right: 40rpx;
			display: inline-block;
			background-color: #fff;

			&-img {
				position: relative;
				width: 218rpx;
				height: 100%;
				border-radius: 11rpx;
				display: inline-block;
				overflow: hidden;
			}

			&-text {
				width: 310rpx;
				margin-left: 20rpx;
				display: inline-block;
				vertical-align: top;
				line-height: 2;

				&-title1 {
					font-size: 30rpx;
					color: #333;
					font-weight: bold;
				}

				&-title2 {
					margin-top: 5rpx;
					font-size: 28rpx;
					color: #999;
				}

				&-title3 {
					font-size: 32rpx;
					color: #e62234;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
