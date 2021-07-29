<template>
	<view>
		<u-swiper :list="score_info.imgs" name="img" :height="554"></u-swiper>
		<view class="title">
			{{ score_info.name }}
		</view>
		<view class="price">
			{{ score_info.score }}积分
		</view>
		<view class="detail">
			<image src="/static/images/course-ico.png"></image>
			商品详情
		</view>
		<view style="padding: 20rpx 30rpx;">
			<u-parse :html="score_info.content" lazy-load />
		</view>
		<view class="but" @click="toIntegralOrderSubmit">
			立即兑换
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				score_info: {}
			};
		},
		onLoad({ id, cate }) {
			if (id) this.init(id, cate)
		},
		methods: {
			async init(id, cate) {
				let param = { id }
				if (cate) param.cate = 'course'
				this.is_api('score_api/score_info', param).then((res) => {
					if (res) {
						res.imgs = [{ img: res.cover_image }]
						res.cate = cate
						this.score_info = res
					}
				})
			},
			toIntegralOrderSubmit() {
				this.is_vuex.commit('score_vuex/set_vuex', ['score_info', this.score_info])
				this.is_goto('/pages/integralOrderSubmit/integralOrderSubmit')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		padding: 20rpx 30rpx 0;
		font-size: 34rpx;
		color: #333;
	}

	.price {
		padding: 0 30rpx 20rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #E6E6E6;
		color: #E62234;
	}

	.detail {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 30rpx;

		image {
			width: 30rpx;
			height: 50rpx;
		}
	}

	.but {
		width: 690rpx;
		height: 90rpx;
		background: #E62234;
		border-radius: 42rpx;
		margin: 20rpx auto;
		text-align: center;
		line-height: 90rpx;
		font-size: 36rpx;
		color: #fff;
	}
</style>
