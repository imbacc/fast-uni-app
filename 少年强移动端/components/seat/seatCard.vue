<template>
	<view class="main-box flex align-center" :class="isSel && cur_com.id === shop.id ? 'gray_filter' : ''" :style="height?'height:'+height+';':''">
		<view class="main-box-img" v-if="imgShow">
			<u-image height="180" :src="cover_img_com" mode="aspectFill" />
		</view>
		<view class="main-box-brief" @click="cur_card">
			<view class="main-box-brief-title">{{ cur_shop_com.name }}</view>
			<view style="margin-bottom: 10rpx;">{{ cur_shop_com.address }} </view>
			<view>电话：{{ cur_shop_com.telphone }}</view>
		</view>
		<view class="main-box-but">
			<image src="/static/images/seat/daohang.png" @click="navigation"></image>
			<image src="/static/images/seat/dianhua.png" @click="call_tel"></image>
		</view>
	</view>
</template>

<script>
	import wx from '@/common/libs/wx_jssdk.js'
	
	export default {
		props: {
			height: {
				type: String,
				default:''
			},
			imgShow: {
				type: Boolean,
				default: true
			},
			shop: {
				type: Object,
				default: () => {}
			},
			isSel: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			cur_shop_com() {
				return this.shop && this.shop.id ? this.shop : this.cur_com
			},
			cover_img_com() {
				let img = this.cur_shop_com.cover_images || this.cur_shop_com.cover_image
				if (img && Array.isArray(img)) return img.length > 0 ? img[0] : ''
				return img
			},
			cur_com() {
				return this.is_vuex.state.user_vuex.cur_shop
			}
		},
		methods: {
			navigation() {
				const { lat, lng, name, address } = this.cur_shop_com
				uni.openLocation({
					name,
					address,
				    latitude: parseFloat(lat),
				    longitude: parseFloat(lng),
				    success: function () {
				        console.log('success');
				    },
					fail(e) {
						console.log('e=', e);
						this.is_tools.to_msg('定位失败,请打开定位权限!')
					}
				});
			},
			call_tel() {
				uni.makePhoneCall({
					phoneNumber: this.cur_shop_com.telphone
				})
			},
			cur_card() {
				this.$emit('curCard', this.cur_shop_com)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main-box {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
		&-img {
			width: 180rpx;
			height: 180rpx;
		}

		&-brief {
			margin-left: 20rpx;
			font-size: 24rpx;
			color: #999;

			&-title {
				font-size: 28rpx;
				color: #333;
				margin-top: 10rpx;
				margin-bottom: 16rpx;
			}
		}

		&-but {
			position: absolute;
			right: 26rpx;
			top: 20rpx;

			image {
				margin: 0 10rpx;
				width: 33rpx;
				height: 33rpx;
				border-radius: 50%;
			}
		}
	}
</style>
