<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else ref="view">
			<view class="swiper">
				<image :src="match_info.cover_image" mode="aspectFill" />
				<!-- <u-swiper :list="list" height="380"></u-swiper> -->
			</view>
			<!-- 赛事规则 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						赛事内容规则
					</view>
				</view>
				<view class="box-Detail">
					<u-parse :html="match_info.rules_content" lazy-load />
				</view>
			</view>
			<!-- 赛事奖励 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						赛事奖励
					</view>
				</view>
				<view class="box-award flex flex-wrap justify-between">
					<view
						class="box-award-li"
						v-for="(info, index) in match_info.award_json"
						:key="index"
						@click="look_img(index)"
					>
						<image :src="info.img" mode="aspectFill" />
						<view class="box-award-li-title title_text">{{ info.intro }}</view>
					</view>
				</view>
			</view>
			<!-- 赛事报名参加方式 -->
			<view v-if="lazy_load" class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						赛事报名参加方式
					</view>
				</view>
				<view class="box-apply">
					<u-parse :html="match_info.enroll_content" lazy-load />
				</view>
				<view class="box-contact"></view>
				<view v-if="end_com" class="detailBut" @click="call_tel">马上报名/咨询</view>
			</view>
		</view>
	</view>
</template>

<script>
import ready_lazy from '@/common/minix/ready_lazy.js'

export default {
	mixins: [ready_lazy],
	data() {
		return {
			match_info: {},
			lazy_load: true,
			loading: true
		}
	},
	computed: {
		end_com() {
			return this.match_info && this.match_info.end_date && this.is_tools.date_match(this.match_info.end_date)
		}
	},
	onPageScroll({ scrollTop }) {
		if (!this.lazy_load && scrollTop >= 180) {
			this.lazy_load = true
		}
	},
	onLoad(option) {
		if (option.id) this.init(option.id)
	},
	methods: {
		init(id) {
			this.is_api('match_api/match_info', { id }).then((res) => {
				if (res) {
					this.match_info = res
					uni.setNavigationBarTitle({ title: `${res.title}(${this.end_com ? '预赛' : '回顾'})` })
				}
				this.loading = false
				this.ready_lazy()
			})
		},
		look_img(index) {
			let list = Array.from(this.match_info.award_json, ({ img }) => img)
			this.is_tools.look_img(index, list)
		},
		call_tel() {
			uni.makePhoneCall({
				phoneNumber: this.match_info.phone
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.swiper {
	position: relative;
	width: 750rpx;
	height: 380rpx;

	image {
		height: 100%;
		width: 100%;
	}
}

.box {
	padding: 0 32rpx 20rpx;
	background-color: #fff;
	margin-bottom: 6rpx;

	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-award {
		&-li {
			width: 334rpx;
			margin-bottom: 20rpx;
			text-align: center;
			font-size: 26rpx;
			color: #333;
			line-height: 50rpx;
			
			image {
				border: 1px solid #e2e2e2;
				height: 236rpx;
				border-radius: 8px;
			}
		}
	}

	&-apply {
		font-size: 26rpx;
		color: #999;
		line-height: 1.5;
	}

	&-contact {
		margin-top: 16rpx;
		line-height: 1.5;
		font-size: 26rpx;
		color: #999;
	}
}

.detailBut {
	height: 90rpx;
	line-height: 90rpx;
	width: 690rpx;
	background-color: #e62234;
	border-radius: 42rpx;
	text-align: center;
	font-size: 36rpx;
	color: #fff;
	margin-bottom: 30rpx;
}

.title_text {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 600;
	color: #333333;
}
</style>
