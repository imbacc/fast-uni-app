<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else>
			<view class="swiper">
				<u-swiper :list="activity_info.imgs" name="img" height="380" />
				<view v-if="activity_info.enroll_list" class="swiper-inform">
					<wyb-noticeBar
						color="#FFF"
						bgColor="#E62234"
						type="vert"
						font-size="24"
						:show-more="false"
						height="48"
						:text="activity_info.enroll_list"
					/>
				</view>
			</view>
			<view class="detailHder">
				<view class="detailHder-title">{{ activity_info.title }}</view>
				<view class="detailHder-time">{{ date_format_com }}</view>
				<view class="detailHder-time">{{ activity_info.desc }}</view>
			</view>
			<!-- 活动详情 -->
			<view class="box">
				<!-- 标题 -->
				<view class="flex justify-between align-center" style="padding: 22rpx 0;">
					<view class="box-title">
						<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;" src="@/static/images/course-ico.png" />
						活动详情
					</view>
				</view>
				<view class="box-Detail">
					<u-parse :html="activity_info.content" lazy-load />
				</view>
				<view class="button_pack flex_center">
					<view class="detailBut" @click="call_tel">马上报名</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
		wybNoticeBar: () => import('@/components/wyb-noticeBar/wyb-noticeBar.vue')
	},
	data() {
		return {
			activity_info: {},
			loading: true
		}
	},
	computed: {
		date_format_com() {
			return this.activity_info.createtime && this.is_tools.format_date(this.activity_info.createtime)
		}
	},
	onLoad(option) {
		if (option.id) this.init(option.id)
	},
	methods: {
		init(id) {
			this.is_api('activity_api/activity_info', { id }).then((res) => {
				if (res) {
					let list = []
					res.images.forEach((img) => list.push({ img }))
					res.imgs = list
					res.enroll_list = Array.from(res.enroll, ({ name }) => `${name} 已报名`)
					this.activity_info = res
				}
				this.loading = false
			})
		},
		call_tel() {
			uni.makePhoneCall({
				phoneNumber: '0731-8888888'
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

	&-inform {
		position: absolute;
		width: 187rpx;
		border-radius: 0 16rpx 16rpx 0;
		overflow: hidden;
		left: 0;
		top: 30rpx;
	}
}

.detailHder {
	background-color: #fff;
	padding: 20rpx 32rpx;
	margin-bottom: 6rpx;
	font-size: 26rpx;
	color: #999;

	&-title {
		font-size: 36rpx;
		font-weight: 700;
		color: #000;
	}

	&-time {
		margin: 10rpx 0 20rpx;
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
	&-Detail {
		font-size: 26rpx;
		color: #999;
		margin-bottom: 150rpx;
	}
	&-contact {
		margin-top: 16rpx;
		line-height: 1.5;
		font-size: 26rpx;
		color: #999;
		margin-bottom: 120rpx;
	}
}
.button_pack {
	margin-bottom: 30rpx;
}

.detailBut {
	// position: fixed;
	// left: 50%;
	// transform: translateX(-50%);
	// bottom: 40rpx;
	height: 90rpx;
	line-height: 90rpx;
	width: 690rpx;
	background-color: #e62234;
	border-radius: 42rpx;
	text-align: center;
	font-size: 36rpx;
	color: #fff;
}
</style>
