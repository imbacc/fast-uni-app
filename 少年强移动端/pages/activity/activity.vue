<template>
	<view>
		<view class="heder">
			<view class="swiper"><u-swiper :list="activity_imgs" name="img" height="380" @click="swiper_click" /></view>
			<view v-if="activity_window_list.length > 0" class="heder-banner flex justify-between">
				<view class="heder-banner-l relative" @click="toDetail(activity_window_list[0].id)">
					<image :src="activity_window_list[0].images[0]" mode="aspectFill" />
					<view class="heder_div flex_center_align">
						<view class="heder_lab u-line-1">{{ activity_window_list[0].title }}</view>
					</view>
				</view>
				<view class="heder-banner-r flex flex-direction justify-between">
					<view class="heder-banner-r-t relative" @click="toDetail(activity_window_list[1].id)">
						<image :src="activity_window_list[1].images[0]" mode="aspectFill" />
						<view class="heder_div blue_bg flex_center_align">
							<view class="heder_lab u-line-1">{{ activity_window_list[1].title }}</view>
						</view>
					</view>
					<view class="heder-banner-r-b relative" @click="toDetail(activity_window_list[2].id)">
						<image :src="activity_window_list[2].images[0]" mode="aspectFill" />
						<view class="heder_div flex_center_align">
							<view class="heder_lab u-line-1">{{ activity_window_list[2].title }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="activity">
			<!-- 标题 -->
			<view class="flex justify-between align-center" style="padding: 22rpx 0;">
				<view class="activity-title">
					<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
					最新活动
				</view>
			</view>
			<view class="activity-list"><events-list :list="activity_page ? activity_page.list : []" @toDetail="toDetail" /></view>
		</view>
	</view>
</template>

<script>
import eventsList from '@/components/eventsList.vue'
import appendData from '@/common/class/append_data.js'

export default {
	components: {
		eventsList
	},
	data() {
		return {
			activity_page: null,
			activity_imgs: [],
			activity_top_list: [],
			activity_window_list: [],
		}
	},
	onLoad() {
		this.init('top')
		this.init('window')
		this.init('list', 1, 3)
	},
	onReachBottom() {
		if (this.activity_page) {
			console.log(this.activity_page);
			this.activity_page.next_fun(this, '没有更多活动了...')
		}
	},
	methods: {
		init(q, page = 1, size = 3, append = false) {
			if (q === 'list') {
				if (!this.activity_page) {
					const _page = new appendData()
					_page.name = 'home_api/activity_list'
					_page.method = 'GET'
					_page.size = size
					this.activity_page = _page
				}
				this.activity_page.fun(page, append)
			} else {
				this.is_api('home_api/activity_list', { q, _page: [page, size] }).then((res) => {
					if (res) {
						let list = []
						res.data.forEach(({ images }) => list.push({ img: images[0] }))
						if (q === 'top') this.activity_imgs = list
						this[`activity_${q}_list`] = res.data
						console.log('this.activity_window_list=', this.activity_window_list);
					}
				})
			}
		},
		toDetail(id) {
			this.is_goto('/pages/activityDetail/activityDetail', `?id=${id}`)
		},
		swiper_click(e) {
			let cur = this.activity_top_list[e]
			if (cur) this.toDetail(cur.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.relative {
	position: relative;
}
	
.heder {
	background-color: #fff;

	.swiper {
		width: 750rpx;
		height: 380rpx;
		margin-bottom: 44rpx;
	}

	&-banner {
		padding: 0 30rpx 40rpx;

		&-l {
			width: 333rpx;
			height: 378rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
		}

		&-r {
			&-t {
				width: 333rpx;
				height: 180rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}

			&-b {
				width: 333rpx;
				height: 180rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}
		}
	}
}

.activity {
	padding: 0 30rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-list {
	}
}

.heder_div {
	height: 60rpx;
	width: 100%;
	background: rgba(230, 34, 52, 0.8);
	border-radius: 0rpx 0rpx 12rpx 12rpx;
	position: absolute;
	bottom: 0;
}

.blue_bg {
	background: RGBA(35, 83, 158, 0.8);
}

.heder_lab {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	padding: 0 10rpx;
}
</style>
