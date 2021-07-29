<template>
	<view>
		<view class="swiper">
			<!-- <u-swiper :list="list" height="380"></u-swiper> -->
			<image :src="match_info.cover_image" mode="aspectFill" />
		</view>
		<!-- 赛事内容回顾 -->
		<view class="box">
			<!-- 标题 -->
			<view class="flex justify-between align-center" style="padding: 22rpx 0;">
				<view class="box-title">
					<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;"
						src="@/static/images/course-ico.png" />赛事内容回顾
				</view>
			</view>
			<view class="box-Detail" v-html="match_info.rules_content">
			</view>
		</view>
		<!-- 赛事内容回顾 -->
		<view class="box" style="padding-top: 20rpx;">
			<view class="box-imgList  flex flex-wrap justify-between">
				<image src="/static/images/coachDetail/heder-bg.png" v-for="item in 4" :key="item"></image>
			</view>
		</view>
		<!-- 赛事获奖名单 -->
		<view class="box">
			<!-- 标题 -->
			<view class="flex justify-between align-center" style="padding: 22rpx 0;">
				<view class="box-title">
					<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;"
						src="@/static/images/course-ico.png" />赛事获奖名单
				</view>
			</view>
			<view class="box-rank">
				<wyb-table ref="table" :headers="headers" :contents="contents" width="690rpx" header-bg-color="#D81C30"
					first-col-bg-color="#fff" border-color="none" :show-vert-border="false" header-ft-color="#fff"
					:font-size="[26]" :default-col-width="120" first-line-fixed />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				headers: [{
					label: '名次',
					key: 'name',
					width: 130,
				}, {
					label: '姓名',
					key: 'age',
					width: 138,
				}, {
					label: '性别',
					key: 'collage',
					width: 138,
				}, {
					label: '年龄',
					key: 'score',
					width: 138,
				}, {
					label: '教练姓名',
					key: 'url',
					width: 138,
				}],
				contents: [{
					name: '1'
				}, {
					name: '2'
				}, {
					name: '3'
				}, {
					name: '4'
				}, {
					name: '5'
				}],
				match_info: {}
			};
		},
		onLoad(option) {
			if (option.id) this.init(option.id)
		},
		methods: {
			init(id) {
				this.is_api('match_api/match_info', { id }).then((res) => {
					if (res) this.match_info = res
				})
			}
		},
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

		&-Detail {
			font-size: 26rpx;
			color: #999;
		}
		&-rank {
			border: 1px solid #E62234;
		}
		&-imgList {
			image {
				width: 334rpx;
				height: 236rpx;
				margin-bottom: 16rpx;
				border-radius: 12rpx;
			}
		}
	}
</style>
