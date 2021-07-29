<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else>
			<!-- 头部模块 -->
			<detail-head :courseDetail="course_info" />
			<view class="box">
				<view class="box-title">
					<image src="/static/images/course-ico.png" />
					<text>课程教练</text>
				</view>
				<coach-detail :courseDetail="course_info.coach" :id="course_info.coach_id" />
			</view>
			<view v-if="course_info.plan_json && course_info.plan_json.length > 0" class="box">
				<view class="box-title">
					<image src="/static/images/course-ico.png" />
					<text>课程时间</text>
				</view>
				<view class="courseTime">
					<courseTable ref="table" />
				</view>
			</view>
			<view v-if="course_info.elegant_images && course_info.elegant_images.length > 0" class="box" style="padding-left: 0; padding-right: 0;">
				<view class="box-title" style="padding-left:24rpx;padding-right: 24rpx;">
					<image src="@/static/images/course-ico.png" />
					<text>课堂风采</text>
				</view>
				<view class="mien">
					<u-image 
						v-for="(img, idx) in course_info.elegant_images"
						:key="idx"
						:src="img"
						height="1130"
						mode="aspectFill"
						@click="look_img(idx, course_info.elegant_images)"
					/>
				</view>
			</view>
			<view class="phone flex_center_align" @click="call_tel">
				电话咨询
				<view class="phone_lab">（营业时间:{{ course_info.store_business_time }}）</view>
			</view>
		</view>
	</view>
</template>

<script>
import courseTable from '@/components/course-table/course-table.vue'

export default {
	components: {
		detailHead: () => import('@/pages/courseDetail/components/detailHead.vue'),
		coachDetail: () => import('@/components/coachDetail.vue'),
		courseTable
	},
	data() {
		return {
			loading: true,
			course_info: {},
		}
	},
	computed: {
		course_render_com() {
			return (plan, head, idx) => {
				let { key } = head, day = plan[key]
				return day && day.show === false ? false : true
			}
		},
		course_style_com() {
			return (plan, head, idx) => {
				let { key } = head, day = plan[key],
					result = `background:url('/static/images/courseDetail/df_ico.png');`
				if (day.num && parseInt(day.num) > 1) result += `height: ${day.num * 104}rpx;`
				if (day.id === '') return result
				return result
			}
		},
		plan_style_com() {
			return (plan, head, idx) => {
				let { key } = head, day = plan[key],
					result = `background: #D81C30;border-radius: 22rpx;color: #FFFFFF;font-size: 18rpx;`
				if (day.id === '') return ''
				if (day.name.indexOf('混龄') !== -1) result += 'background: #81348F;'
				if (day.num && parseInt(day.num) > 1) result += `height: ${day.num * 97}rpx;`
				return result
			}
		},
		plan_info_com() {
			return (plan, head) => {
				let { key } = head, day = plan[key]
				if (day.id === '') return ''
				if (day.id !== '' && day.time === '') return plan.timePicker
				return day.time && day.time.join(' - ')
			}
		},
		plan_info_name_com() {
			return (plan, head) => {
				let { key } = head, info = plan[key]
				if (info.id !== '') return `${info.name}`
			}
		}
	},
	onLoad(option) {
		if (option.id) this.init_course(option.id)
	},
	methods: {
		init_course(id) {
			this.is_api('course_api/course_info', { id }).then(res => {
				if (res) {
					uni.setNavigationBarTitle({ title: res.name || '课程详情' })
					this.course_info = res
					this.loading = false
					this.$nextTick(() => {
						if (res.plan_json === '') return
						if (this.$refs.table) {
							this.$refs.table.set_plan(res.plan_json)
						} else {
							let time = setTimeout(() => {
								clearTimeout(time)
								this.$refs.table.set_plan(res.plan_json)
							}, 300)
						}
					})
				} else {
					this.loading = false
				}
			})
		},
		call_tel() {
			uni.makePhoneCall({
				phoneNumber: this.course_info.phone
			})
		},
		look_img(idx, imgs = []) {
			this.is_tools.look_img(idx, imgs, 'number')
		}
	}
}
</script>

<style lang="scss" scoped>
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

.courseTime {
	// overflow: hidden;
	// border-radius: 20rpx;
}
.mien {
	height: 1134rpx;
}
.phone {
	width: 690rpx;
	height: 90rpx;
	line-height: 90rpx;
	color: #fff;
	background-color: #e62234;
	border-radius: 42rpx;
	font-size: 32rpx;
	text-align: center;
	margin: 20rpx auto 50rpx;
}

.phone_lab {
	font-size: 28rpx;
}
</style>
