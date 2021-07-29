<template>
	<view class="main">
		<student-info selShow />
		<template v-if="sel_student_com.id">
			<view class="banner" @click="toPhysical"></view>
			<view class="tabs">
				<u-tabs v-if="show_tabs" :list="type_list" active-color="#E62234" inactive-color="#333" :current="current" @change="change" bg-color="#f1f1f1" />
				<view class="tabs-box">
					<scroll-view scroll-x>
						<view class="flex" :style="'width:' + honor_list.length * 354 + 'rpx;'">
							<view class="tabs-box-li" v-for="(info, idx) in honor_list" :key="idx">
								<u-image
									height="190"
									border-radius="10"
									style="width: 334rpx"
									:src="info.certificate_images && info.certificate_images[0]"
									@click="look_img(idx)"
								/>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						我的荣誉勋章
					</view>
				</view>
				<view class="box-list">
					<scroll-view scroll-x>
						<view class="flex" :style="'width:' + medal_list.length * 238 + 'rpx;'">
							<view class="box-list-li" v-for="(info, idx) in medal_list" :key="idx">
								<u-image
									height="190"
									mode="scaleToFill"
									border-radius="10"
									:src="info.medal_images"
									@click="look_box_img(idx)"
								/>
								<view class="li_name flex_center_align">{{ info.title }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- 最新赛事 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style="height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
						最新赛事
					</view>
				</view>
				<!-- 内容 -->
				<view class="box-content">
					<scroll-view scroll-x style="height: 185rpx; border-radius: 11rpx; overflow: hidden;">
						<view style="height: 100%;" :style="'width:' + match_list.length * 646 + 'rpx;'">
							<view class="box-content-box" v-for="(info, idx) in match_list" :key="idx" @click="toContestDetail(info.id)">
								<view class="box-content-box-img">
									<u-image height="185" :src="info.cover_image" mode="aspectFill" />
									<view class="box-content-box-img-time text-center">
										{{ info.begin_date && info.begin_date.substring(5, 10) }}
									</view>
								</view>
								<view class="box-content-box-text">
									<view class="box-content-box-text-title1 text-cut-2">{{ info.title }}</view>
									<view class="box-content-box-text-title2 text-cut-2">{{ info.desc }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import studentInfo from '@/components/studentInfo.vue'

import reflushTabs from '@/common/minix/reflush_tabs.js'

export default {
	mixins: [reflushTabs],
	components: {
		studentInfo
	},
	data() {
		return {
			list: [],
			type_list: [],
			honor_list: [],
			medal_list: [],
			match_list: [],
			current: 0,
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		},
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
	},
	watch: {
		sel_student_com(newValue, oldValue) {
			if (newValue && newValue !== oldValue) {
				this.init_type().then((res) => this.init_honor(res[0].id))
				this.init_medal()
				this.init_match()
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
		if (this.sel_student_com.id) {
			this.init_type().then((res) => this.init_honor(res[0].id))
			this.init_medal()
			this.init_match()
		}
	},
	methods: {
		async init_type() {
			this.type_list = []
			return new Promise((resovle) => {
				this.is_api('growup_api/up_honor_type').then((res) => {
					if (res) {
						this.type_list = res
						resovle(res)
					}
				})
			})
		},
		async init_honor(type_id) {
			this.honor_list = []
			this.is_api('growup_api/up_honor', { student_id: this.sel_student_com.id, type_id }).then((res) => {
				if (res) this.honor_list = res
			})
		},
		async init_medal() {
			this.medal_list = []
			this.is_api('growup_api/up_medals', { student_id: this.sel_student_com.id }).then((res) => {
				if (res) this.medal_list = res
			})
		},
		async init_match(key) {
			this.match_list = []
			this.is_api('home_api/match_list', { _page: [1, 3], student_id: this.sel_student_com.id }).then((res) => {
				if (res) this.match_list = res.data
			})
		},
		change(index) {
			this.current = index
			const { id } = this.type_list[index]
			this.init_honor(id)
		},
		// 赛事详情
		toContestDetail(id) {
			this.is_goto('/pages/contestDetail/contestDetail', `?id=${id}`)
			// this.is_goto('/pages/contestReviewDetail/contestReviewDetail')
		},
		toPhysical() {
			this.is_goto('/pages/physical/physical')
		},
		look_img(idx) {
			let list = Array.from(this.honor_list, ({ certificate_images }) => certificate_images && certificate_images[0])
			this.is_tools.look_img(idx, list)
		},
		look_box_img(idx) {
			let list = Array.from(this.medal_list, ({ medal_images }) => medal_images)
			this.is_tools.look_img(idx, list)
		}
	}
}
</script>

<style lang="scss" scoped>
.banner {
	height: 200rpx;
	margin-top: 20rpx;
	background: url(@/static/images/my/growth/banner-bg.png) no-repeat;
	background-size: cover;
}

.tabs {
	&-box {
		margin-top: 20rpx;

		&-li {
			width: 334rpx;
			height: 216rpx;
			// background-color: #fff;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
	}
}

.box {
	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-ico {
		color: #999999;
		font-size: 26rpx;
	}

	&-list {
		&-li {
			width: 218rpx;
			// height: 190rpx;
			border-radius: 12rpx;
			background-color: #fff;
			margin-right: 20rpx;
		}
	}
	
	&-content {
		width: 100%;
		margin-bottom: 40rpx;
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
				width: 310rpx;
				margin-left: 20rpx;
				display: inline-block;
				vertical-align: top;

				&-title1 {
					font-size: 30rpx;
					color: #333;
				}

				&-title2 {
					margin-top: 5rpx;
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
}

.li_name {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
}
</style>
