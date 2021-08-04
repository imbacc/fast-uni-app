<template>
	<view style="margin-top: -43rpx;">
		<skeleton v-if="loading" />
		<view v-else class="home_index">
			<!-- 头部 -->
			<view class="home-heder">
				<image class="fade home_bg" :src="index_bg" mode="widthFix" />
				<view class="home-heder-swiper" style="margin-top: 30rpx;">
					<u-swiper :list="top_banner" effect3d bg-color="transparent" effect3d-previous-margin="20" name="img" :height="320" @click="goto_banner" />
				</view>
			</view>
			<!-- 店铺位置名称 -->
			<view class="home-shop">
				<!-- 店铺定位 -->
				<view class="home-shop-seat flex justify-between align-center" @click="toSeat">
					<view class="home-shop-seat-title">
						<view>
							<u-icon name="map" />
							当前场馆 : {{ cur_shop_com.name || '未选择' }}
						</view>
						<view style="text-indent:35rpx;font-size: 22rpx;">距离 : {{ cur_shop_com.km || 0 }}{{ cur_shop_com.unit || 'm' }}</view>
					</view>
					<view class="home-shop-seat-ico"><u-icon name="arrow-right" /></view>
				</view>
				<!-- 店铺轮播图 -->
				<view class="home-shop-swiper" @click.capture="toSeatDetail">
					<u-swiper :list="shop_list" name="img" :height="520" :current="current" />
					<text class="home-shop-swiper-current">{{ current + 1 }}/{{ shop_list.length }}</text>
				</view>
			</view>
		
			<template v-if="lazy_load">
				<!-- 最新活动 -->
				<view class="home-activity">
					<!-- 标题 -->
					<view class="flex justify-between align-center" style="padding: 22rpx 0;">
						<view class="home-activity-title">
							<image style="height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
							最新活动
						</view>
						<view class="home-activity-ico" @click="toActivity">
							查看更多
							<u-icon name="arrow-right" />
						</view>
					</view>
					<!-- 内容 -->
					<view class="home-activity-content">
						<scroll-view scroll-x scroll-anchoring scroll-with-animation :scroll-into-view="activity_id">
							<view class="flex_align">
								<view
									class="home-activity-content-box flex_row"
									v-for="(info, idx) in activity_top_list"
									:key="idx"
									@click="toActivityDetail(info.id)"
									:id="`activity_${idx}`"
								>
									<view class="home-activity-content-box-img">
										<u-image height="184" :src="info.images && info.images[0]" />
										<view class="home-activity-content-box-img-time text-center">{{ info.format_date && info.format_date.substring(5, info.format_date.length) }}</view>
									</view>
									<view class="home-activity-content-box-text">
										<view class="home-activity-content-box-text-title1 text-cut-2">{{ info.title }}</view>
										<view class="home-activity-content-box-text-title2 text-cut-2">
											{{ info.desc }}
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="home-introduce">
					<!-- <view class="home-introduce-title">
					<view>课程介绍</view>
					<view>Course Introduction</view>
				</view> -->
					<view style="margin-top: 60rpx;"></view>
					<view class="home-introduce-swiper">
						<u-swiper title :list="course_list_imgs" name="img" mode="none" :interval="5000" :height="520" effect3d @click="toCourseRecommend" />
					</view>
				</view>
				<!-- 最新赛事 -->
				<view class="home-event">
					<!-- 标题 -->
					<view class="flex justify-between align-center" style="padding: 22rpx 0;">
						<view class="home-event-title">
							<image style="height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
							最新赛事
						</view>
						<view class="home-event-ico" @click="toContest">
							查看更多
							<u-icon name="arrow-right" />
						</view>
					</view>
					<!-- 内容 -->
					<view class="home-event-content">
						<scroll-view scroll-x scroll-anchoring scroll-with-animation :scroll-into-view="match_id">
							<view class="flex_align">
								<view
									class="home-event-content-box"
									v-for="(item, idx) in match_list"
									:key="idx"
									:id="`match_${idx}`"
									@click="toContestDetail(item)"
								>
									<view class="home-event-content-box-img">
										<u-image height="184" :src="item.cover_image" />
									</view>
									<view class="home-event-content-box-title u-line-1">{{item.title}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 师资团队 -->
				<view class="home-team">
					<view class="home-team-title">
						<view>师资团队</view>
						<view class="home-team-lab">Faculty team</view>
					</view>
					<view class="home-team-bg">
						<u-image height="300" src="/static/images/home/home-team-bg.png" />
						<!-- <image src="/static/images/home/home-team-bg.png" /> -->
					</view>
					<view class="home-team-content">
						<scroll-view scroll-x scroll-anchoring scroll-with-animation :scroll-into-view="coach_id">
							<view class="flex_align">
								<teamList :list="coach_list" />
							</view>
						</scroll-view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	components: {
		teamList: () => import('@/components/team/teamList.vue')
	},
	data() {
		return {
			current: 0,
			top_banner: [],
			shop_list: [],
			activity_top_list_bak: [],
			activity_top_list_imgs: [],
			activity_top_list: [],
			course_list_imgs: [],
			course_list: [],
			match_list_bak: [],
			match_list: [],
			coach_list_bak: [],
			coach_list: [],
			lazy_load: false,
			lazy_load2: false,
			loading: true,
			pull_refresh: false,
			coach_current: 0,
			activity_id: '',
			activity_idx: 0,
			match_id: '',
			match_idx: 0,
			coach_id: '',
			coach_idx: 0,
			index_bg: ''
		}
	},
	computed: {
		...mapState('user_vuex',{
			cur_shop_com: (state) => state.cur_shop,
			refresh_home_com: (state) => state.refresh_home
		}),
	},
	onShow() {
		if (this.refresh_home_com) {
			this.is_vuex.commit('user_vuex/set_vuex', ['refresh_home', false])
			this.reload()
		}
	},
	onLoad() {
		this.init()
	},
	onPullDownRefresh() {
		this.pull_refresh = true
		this.reload()
	},
	onUnload() {
		this.pull_refresh = false
	},
	onPageScroll({ scrollTop }) {
		if (!this.lazy_load && scrollTop >= 110) {
			this.lazy_load = true
			this.lazy1(true)
		}
		
		if (!this.lazy_load2 && scrollTop >= 410) {
			this.lazy_load2 = true
			this.lazy2(true)
		}
	},
	methods: {
		async auto_scroll(name, vsName, timeNum = 2000) {
			let time = setTimeout(() => {
				clearTimeout(time)
				let len = this[vsName].length, list = this[`${vsName}_bak`]
				this[`${name}_id`] = `${name}_${this[`${name}_idx`]}`
				this[`${name}_idx`] += 1
				if (this[`${name}_idx`] >= (len > 3 ? len - 2 : len)) {
					if (len <= 3) return
					this[vsName].push(...list)
				}
				if (len === list.length * 3) this[vsName].splice(0, list.length)
				this.auto_scroll(name, vsName, timeNum)
			}, timeNum)
		},
		lazy1(auto = false) {
			this.init_activity('top', 'activity_top_list')
			this.init_course()
			if (auto) this.auto_scroll('activity', 'activity_top_list', 3000)
		},
		lazy2(auto = false) {
			this.init_list('match_list')
			this.init_list('coach_list')
			if (auto) {
				this.auto_scroll('match', 'match_list', 3500)
				this.auto_scroll('coach', 'coach_list', 4000)
			}
		},
		reload() {
			this.init()
			if (this.lazy_load) this.lazy1(true)
			if (this.lazy_load2) this.lazy2(true)
		},
		init() {
			this.init_bg()
			this.init_banner()
			this.init_shop()
		},
		async init_bg () {
			this.is_api('home_api/index_bg').then((res) => {
				if (res) this.index_bg = res.background_image
			})
		},
		async init_banner() {
			let param = { q: 'index', _page: [1, 3] }
			if (this.pull_refresh) param._cache = 0
			this.is_api('home_api/banner_list', param, { _noToken: true }).then(res => {
				if (res) {
					let list = []
					res.data.forEach(info => {
						const { name, url } = info.urls
						info.source.forEach(img => list.push({ img, url, name }))
					})
					this.top_banner = list
				}
				this.loading = false
			})
		},
		async init_shop() {
			this.is_vuex.dispatch('user_vuex/user_location', this.pull_refresh).then((res) => {
				if (res) {
					let arr = []
					res.cover_images.forEach((img, idx) => arr.push({ img }))
					this.shop_list = arr
				}
				if (this.pull_refresh) uni.stopPullDownRefresh()
			})
		},
		async init_activity(q, key) {
			let param = { q, _page: [1, 3] }
			if (this.pull_refresh) param._cache = 0
			this.is_api('home_api/activity_list', param).then(res => {
				if (res) {
					this[`${key}_bak`] = res.data
					this[key] = res.data
					let list = []
					res.data.forEach(({ images, title, id }) => list.push({ img: images ? images[0] : '', title, id }))
					this[`${key}_imgs`] = list
				}
			})
		},
		async init_course() {
			let param = { _page: [1, 5] }
			if (this.pull_refresh) param._cache = 0
			this.is_api('course_api/course_type_list', param).then(res => {
				let list = []
				res.data.forEach(({ primary_images, name, id }) => list.push({ img: Array.isArray(primary_images) ? primary_images[0] : primary_images, title:name , id }))
				this.course_list_imgs = list
				this.course_list = res.data
			})
		},
		async init_list(key) {
			let param = { _page: [1, 3] }
			if (this.pull_refresh) param._cache = 0
			this.is_api(`home_api/${key}`, ).then(res => {
				if (res) {
					this[`${key}_bak`] = res.data
					this[`${key}`] = res.data
				}
			})
		},
		// 点击轮播图详情
		goto_banner(idx) {
			const { url } = this.top_banner[idx]
			if (url.indexOf('http') !== -1) {
				this.is_goto('/pages/webview/webview', `?src=${url}`)
				return
			}
			this.is_goto(url)
		},
		// x选择店铺
		toSeat() {
			this.is_goto('/pages/seat/seat')
		},
		// 位置场馆详情
		toSeatDetail() {
			this.is_goto('/pages/seatDetail/seatDetail')
		},
		//最新活动
		toActivity() {
			this.is_goto('/pages/activity/activity')
		},
		// 活动详情
		toActivityDetail(id) {
			this.is_goto('/pages/activityDetail/activityDetail', `?id=${id}`)
		},
		// 课程介绍
		toCourseRecommend(e) {
			let { id } = this.course_list_imgs[e]
			this.is_goto('/pages/courseRecommend/courseRecommend', `?id=${id}`)
		},
		//赛事
		toContest() {
			this.is_goto('/pages/contest/contest')
		},
		// 赛事详情
		toContestDetail(e) {
			this.is_goto('/pages/contestDetail/contestDetail', `?id=${e.id}`)
		},
	}
}
</script>

<style lang="scss" scoped>
.home_index {
	margin-top: 0;
}

.home_bg {
	padding-top: 20rpx;
	height: 100%;
	width: 100%;
}
	
// 头部
.home-heder {
	margin-top: 0;
	position: relative;
	min-height: 1030rpx;
	width: 750rpx;
	background: rgb(204, 57, 58);

	&-swiper {
		width: 100%;
		height: 320rpx;
		position: absolute;
		top: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 12rpx;
		overflow: hidden;
	}
}

// 店铺位置名称
.home-shop {
	padding: 0 35rpx;

	&-seat {
		padding: 22rpx 0;
		font-size: 33rpx;
	}

	&-swiper {
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
}

// 最新活动
.home-activity {
	padding: 0 35rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-ico {
		color: #999999;
		font-size: 26rpx;
	}

	&-content {
		width: 100%;
		margin: 40rpx 0;

		&-box {
			// width: 606rpx;
			height: 185rpx;
			box-shadow: 0px 2px 2px 1px rgba(226, 226, 226, 0.5);
			border-radius: 11rpx;
			overflow: hidden;
			padding-right: 45rpx;
			margin-right: 40rpx;
			// display: inline-block;
			background-color: #fff;
			display: flex;
			flex-shrink: 0;

			&-img {
				position: relative;
				width: 218rpx;
				height: 185rpx;
				border-radius: 11rpx;
				// display: inline-block;
				overflow: hidden;

				&-time {
					position: absolute;
					left: 0;
					top: 0;
					width: 100rpx;
					height: 40rpx;
					line-height: 40rpx;
					background-color: #e62234;
					border-radius: 0 20rpx 20rpx 0;
					font-size: 24rpx;
					color: #fff;
				}
			}

			&-text {
				height: 100%;
				width: 309rpx;
				// width: 388rpx;
				margin-left: 20rpx;
				// display: inline-block;
				// vertical-align: top;

				&-title1 {
					font-size: 30rpx;
					font-family: PingFangSC-Bold, PingFang SC;
					font-weight: bold;
					color: #333333;
					margin-left: 21rpx;
					margin-top: 20rpx;
				}

				&-title2 {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #999;
					margin-left: 20rpx;
				}
			}
		}
	}
}

// 课程介绍
.home-introduce {
	margin-bottom: 50rpx;

	&-title {
		font-size: 42rpx;
		font-weight: 700;
		text-align: center;
		margin-bottom: 30rpx;
	}

	&-swiper {
		height: 520rpx;
	}
}

//赛事
.home-event {
	padding: 0 35rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-ico {
		color: #999999;
		font-size: 26rpx;
	}

	&-content {
		width: 100%;
		margin: 30rpx 0;

		&-box {
			display: inline-block;
			margin-right: 20rpx;
			width: 215rpx;

			&-img {
				width: 215rpx;
				height: 185rpx;
				border-radius: 11rpx;
				overflow: hidden;
			}

			&-title {
				font-size: 30rpx;
				color: #333;
				font-weight: 700;
				text-align: center;
				margin-top: 10rpx;
			}
		}
	}
}

// 师资团队
.home-team {
	margin-bottom: 12rpx;
	background-image: url('/static/images/home/home-team-bg2.png');
	background-size: cover;
	padding-top: 30rpx;

	&-title {
		font-size: 42rpx;
		font-weight: 700;
		text-align: center;
		margin-bottom: 30rpx;
	}

	&-bg {
		width: 640rpx;
		height: 300rpx;
		margin: 10rpx auto 60rpx;
	}

	&-content {
		padding: 0 30rpx;
		height: 400rpx;
	}

	&-lab {
		margin-top: 5rpx;
		font-size: 24rpx;
		font-family: Helvetica;
		color: #555555;
	}
}

::v-deep .u-swiper-title {
	height: 74rpx;
	background: rgba(230, 34, 52, 0.8);
	border-radius: 0rpx 0rpx 12rpx 12rpx;
	display: flex;
	align-items: center;
}

::v-deep .u-swiper-title::after {
	content: '';
	height: 30rpx;
	width: 20rpx;
	position: absolute;
	right: 29rpx;
	top: 20rpx;
	background: url('/static/images/home/right_ico.png');
	background-size: 100%;
}
</style>
