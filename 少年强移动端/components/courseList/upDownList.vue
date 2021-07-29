<template>
	<view class="main-box flex align-center" :style="border?'border: 1px solid #DCDCDC;':''" @click="to(bottomTitle.id)" >
		<view class="main-box-img">
			<u-image height="100%" :src="image_com(bottomTitle.extra_image || bottomTitle.cover_image)" mode="scaleToFill" />
		</view>
		<view class="main-box-title flex flex-direction justify-around">
			<view class="text-cut" style=" width: 400rpx;">
				<text class="main-box-title-type" :style="topTitleStyle">{{bottomTitle.type_name || bottomTitle.type && bottomTitle.type.name}}</text>
				<text class="main-box-title-h1" :style="topTextStyle">{{bottomTitle.name}}</text>
			</view>
			<view v-if="centreTitle" style=" width: 400rpx;">
				<text style="color: #999999; font-size: 28rpx;" :style="centreTitleStyle">{{centreTitle.title}}</text>
				<text style="color: #999999; font-size: 28rpx;" :style="centreTextStyle">{{bottomTitle.name}}</text>
			</view>
			<view v-else-if="select" style=" width: 400rpx;" class="flex_column">
				<text class="main-box-title-time" :style="bottomTitleStyle">{{bottomTitle.period_explain}}</text>
				<text class="main-box-title-time" style="margin-top: 10rpx;" :style="bottomTitleStyle">{{bottomTitle.begin_time.substring(5, 11)}} 开始</text>
			</view>
			<view v-else style=" width: 400rpx;">
				<text class="main-box-title-time" :style="bottomTitleStyle">{{bottomTitle.period_explain}}</text>
				<text class="main-box-title-price" :style="bottomTextStyle">￥{{ price_com(bottomTitle.price) }} 起</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			border: {
				type: Boolean,
				default: false
			},
			topTitle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			centreTitle: {
				type: [Object, Boolean],
				default: () => {
					return false
				}
			},
			bottomTitle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			topTitleStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			centreTitleStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			bottomTitleStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			topTextStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			centreTextStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			bottomTextStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			select: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			image_com() {
				return (img) => {
					if (img && Array.isArray(img) && img.length > 0) return img[0]
					return img || ''
				}
			},
			price_com() {
				return (price) => price ? parseFloat(price) : 0
			}
		},
		methods: {
			to(id) {
				this.$emit('to', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-box {
		padding-right: 20rpx;
		height: 170rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		overflow: hidden;
		border-radius: 17rpx;

		&-img {
			border-radius: 17rpx;
			overflow: hidden;
			width: 234rpx;
			height: 100%;
		}

		&-title {
			margin-left: 20rpx;
			height: 100%;

			&-type {
				display: inline-block;
				font-size: 30rpx;
				background-color: #E62234;
				color: #fff;
				border-radius: 23rpx;
				padding: 1rpx 10rpx;
				margin-right: 10rpx;
			}

			&-h1 {
				color: #555;
				font-size: 30rpx;
				font-weight: bold;
				// margin-left: 6rpx;
			}

			&-time {
				font-size: 28rpx;
				color: #999;
			}

			&-price {
				float: right;
				font-size: 32rpx;
				font-weight: bold;
				color: #E62234;
			}
		}
	}
</style>
