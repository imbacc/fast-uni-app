<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else style="padding: 30rpx;">
			<view v-if="list.length > 0" class="swiper">
				<u-swiper :list="list" name="img" :height="520" :current="current" />
				<text class="swiper-current">{{ current + 1 }}/{{ list.length }}</text>
			</view>
			<view class="seatCard">
				<seat-card :shop="shop_info" :isSel="false" :imgShow="false" height="170rpx" />
			</view>
			<view class="seatTeam">
				<scroll-view scroll-x>
					<view class="flex_align">
						<team-list :list="shop_info.coach" />
					</view>
				</scroll-view>
			</view>
			<view v-if="shop_info.course && shop_info.course.length > 0" class="course">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="course-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						课程列表
					</view>
				</view>
				<view class="course-adult">
					<up-down-list
						v-for="(course, idx) in shop_info.course"
						:key="idx"
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
		seatCard: () => import('@/components/seat/seatCard.vue'),
		teamList: () => import('@/components/team/teamList.vue'),
		upDownList: () => import('@/components/courseList/upDownList.vue')
	},
	data() {
		return {
			current: 0,
			list: [],
			shop_info: {},
			loading: true
		}
	},
	computed: {
		location_com() {
			return this.is_vuex.state.user_vuex.location
		}
	},
	onLoad() {
		this.init()
	},
	methods: {
		init() {
			const { longitude, latitude } = this.location_com
			 // _header: { 'x-address': `${longitude},${latitude}`}
			this.is_api('shop_api/shop_info', {}).then((res) => {
				if (res) {
					let arr = []
					res.cover_images.forEach(img => arr.push({ img }))
					this.list = arr
					this.shop_info = res
				}
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
.swiper {
	position: relative;
	width: 100%;
	height: 520rpx;

	&-current {
		font-size: 28rpx;
		color: #fff;
		position: absolute;
		bottom: 10rpx;
		right: 16rpx;
	}
}

.seatCard {
	margin-top: 30rpx;
}

.seatTeam {
	margin-bottom: 30rpx;
}

.course {
	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}
}
</style>
