<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else>
			<view class="swiper">
				<u-swiper v-if="course_info.imgs" :list="course_info.imgs" name="img" height="380" />
			</view>
			<view class="box">
				<view class="box-title">
					<image src="@/static/images/course-ico.png" />
					<text>{{ course_info.name }}</text>
				</view>
				<view class="courseCost">
					<view class="courseCost-hint">
						<u-parse :html="course_info.content" />
					</view>
				</view>
			</view>
			<view class="box" style="background-color:transparent;">
				<view class="box-title">
					<image src="@/static/images/course-ico.png" />
					<text>王牌教练</text>
				</view>
				<view v-if="course_info.coach" class="courseTeam">
					<swiper
						style="height: 360rpx;"
						:current="coach_current"
						autoplay
						circular
						indicator-dots
						skip-hidden-item-layout
						indicator-color="#BFBFBF"
						indicator-active-color="#E62234"
						@change="(e) => swiper_change(e, 'coach')"
					>
						<swiper-item v-for="(ewList, index) in ew_list_com(course_info.coach)" :key="index">
							<view class="flex_align" :class="coach_swiper_class">
								<team-list :list="ewList" :cardStyle="{ height: '276rpx' }" />
							</view>
						</swiper-item>
					</swiper>
					<!-- <scroll-view scroll-x>
						<view class="flex_align">
							<team-list :list="course_info.coach" :cardStyle="{ height: '276rpx' }" />
						</view>
					</scroll-view> -->
				</view>
			</view>
			<view class="box">
				<view class="box-title">
					<image src="@/static/images/course-ico.png" />
					<text>优秀学员</text>
				</view>
				<view class="courseTeam">
					<swiper
						style="height: 350rpx;"
						:current="course_current"
						circular
						autoplay
						indicator-dots
						skip-hidden-item-layout
						indicator-color="#BFBFBF"
						indicator-active-color="#E62234"
						@change="(e) => swiper_change(e, 'course')"
					>
						<swiper-item v-for="(ewList, index) in ew_list_com(course_info.student)" :key="index">
							<view :class="course_swiper_class" class="flex_align">
								<view v-for="(item, idx) in ewList" :key="idx" class="student_div" @click="goto_student(item)">
									<image class="student_img" :src="item.images && item.images[0]" mode="aspectFill" />
									<view class="student_info flex_column flex_center_align">
										<view class="student_name">{{ item.name }}</view>
										<view class="student_age">{{ item.age }}岁</view>
									</view>
								</view>
								<!-- <team-list :list="course_info.student" :to="false" @toClick="toClick" /> -->
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view v-if="course_info.course && course_info.course.length > 0" class="box">
				<view class="box-title">
					<image src="@/static/images/course-ico.png" />
					<text>课程风采</text>
				</view>
				<view class="courseMien">
					<scroll-view scroll-x>
						<view :style="'width:' + course_info.elegant_images.length * 300 + 'rpx;'" class="flex_row">
							<u-image
								 v-for="(image, index) in course_info.elegant_images"
								 :key="index"
								 :src="image"
								 height="200"
								 width="280"
								 border-radius="5"
								 mode="aspectFill"
								 style="margin-right: 20rpx;"
								 @click="look_img(index)"
							 />
						</view>
					</scroll-view>
				</view>
			</view>
			<view v-if="course_info.course && course_info.course.length > 0" class="box">
				<view class="box-title">
					<image src="@/static/images/course-ico.png" />
					<text>优选课程</text>
				</view>
				<view class="courseList">
					<up-down-list
						v-for="(course, index) in course_info.course"
						:key="index"
						:topTitle="{ title: '公开课', text: '课程名称' }"
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
		teamList: () => import('@/components/team/teamList.vue'),
		upDownList: () => import('@/components/courseList/upDownList.vue')
	},
	data() {
		return {
			course_current: 0,
			course_swiper_class: '',
			coach_current: 0,
			coach_swiper_class: '',
			headers: [
				{
					label: '卡种',
					key: 'name',
					width: 137
				},
				{
					label: '课时(节数)',
					key: 'age',
					width: 142
				},
				{
					label: '费用(元)',
					key: 'collage',
					width: 137
				},
				{
					label: '有效期',
					key: 'score',
					width: 137
				},
				{
					label: '请假权益',
					key: 'url',
					width: 137
				}
			],
			contents: [
				{
					name: '半年卡',
					age: '65节',
					collage: '20000元',
					score: '24个月',
					url: '三个月'
				}
			],
			course_info: {},
			loading: true
		}
	},
	computed: {
		ew_list_com() {
			return (list) => this.ew_list(list)
		}
	},
	onLoad(option) {
		if (option.id) this.init(option.id)
	},
	methods: {
		init(id) {
			this.is_api('course_api/course_type_info', { id }).then((res) => {
				if (res) {
					let list = []
					res.primary_images.forEach((img) => list.push({ img }))
					res.imgs = list
					this.course_info = res
				} else {
					this.is_tools.to_msg('不是有效的数据!')
					let time = setTimeout(() => {
						clearTimeout(time)
						uni.navigateBack()
					}, 1000)
				}
				this.loading= false
			})
		},
		ew_list(list) {
			const reduce = list.reduce((t, v, i) => {
				let e_i = t.length - 1
				if (e_i < 0) e_i = 0
				if (!t[e_i]) t[e_i] = []
				if (t[e_i].length < 3) t[e_i].push(v)
				if (t[e_i].length === 3 && i < list.length - 1) t[e_i + 1] = []
				return t
			}, [])
			return reduce
		},
		// 查看详情
		toDetail(id) {
			this.is_goto('/pages/courseDetail/courseDetail', `?id=${id}`)
		},
		look_img(idx) {
			this.is_tools.look_img(idx, this.course_info.elegant_images)
		},
		goto_student(info) {
			this.is_vuex.commit('student_vuex/set_vuex', ['student_info', info])
			this.is_goto('/pages/studentInfo/studentInfo', `?id=${info.id}`)
		},
		swiper_change(e, key) {
			let current = e.detail.current
			this[`${key}_current`] = current
			this[`${key}_swiper_class`] = current > this[`${key}_current`] ? 'swiper_right' : 'swiper_left'
		},
	}
}
</script>

<style lang="scss">
.swiper {
	position: relative;
	width: 750rpx;
	height: 380rpx;
}

.box {
	margin-top: 10rpx;
	background-color: #fff;
	padding: 20rpx 30rpx;

	&-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 700;
		margin-bottom: 20rpx;

		image {
			width: 30rpx;
			height: 50rpx;
		}
	}
}

.courseCost {
	&-hint {
		font-size: 26rpx;
		color: #999;
		margin-top: 20rpx;
	}
}

.courseMien {
	image {
		width: 290rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}
}

.student_div {
	width: 219rpx;
	height: 252rpx;
	background: #F3F3F3;
	border-radius: 8rpx;
	margin-right: 18rpx;
}

.student_img {
	width: 219rpx;
	height: 156rpx;
	border-radius: 8rpx 8rpx 0rpx 0rpx;
}

.student_info {
	height: 96rpx;
	width: 100%;
	background: #F3F3F3;
	border-radius: 0 0 8rpx 8rpx;
}

.student_name {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}

.student_age {
	@extend .student_name;
	font-size: 22rpx;
	color: #999999;
}

.swiper_right {
	margin-right: 18rpx;
}

.swiper_left {
	margin-left: 18rpx;
}
</style>
