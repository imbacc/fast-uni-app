<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else class="main">
			<view class="main-box">
				<integralOrderCard :order="order_info" />
			</view>
			<view v-if="order_info.remark !== ''" class="main-text">
				<view class="main-text-title">
					备注
				</view>
				<view class="main-text-box">
					{{ order_info.remark }}
				</view>
			</view>
			<view class="main-erweima">
				<view class="main-erweima-title">
					核销码
				</view>
				<view class="main-erweima-box">
					<image :src="order_info.wiped_image" mode="aspectFill" />
					<view>
						{{ order_info.out_trade_no }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import integralOrderCard from '@/components/integralOrder-card.vue'
	
	export default {
		components: {
			integralOrderCard
		},
		data() {
			return {
				loading: true,
				order_info: {}
			};
		},
		onLoad({ id }) {
			if (id) this.init(id)
		},
		methods: {
			init(out_trade_no) {
				this.loading = true
				this.is_api('score_api/score_order_info', { out_trade_no }).then((res) => {
					if (res) this.order_info = res
					this.loading = false
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		&-box {
			background-color: #fff;
			border-radius: 12rpx;
		}

		&-text {
			&-title {
				font-size: 30rpx;
				color: #333;
				padding: 10rpx 0;
			}

			&-box {
				height: 200rpx;
				background-color: #fff;
				padding: 15rpx 20rpx;
				font-size: 26rpx;
				color: #999;
				border-radius: 12rpx;
			}
		}

		&-erweima {
			margin-top: 10rpx;

			&-title {
				font-size: 30rpx;
				color: #333;
				padding: 10rpx 0;
			}

			&-box {
				text-align: center;
				height: 365rpx;
				background-color: #fff;
				border-radius: 12rpx;
				padding-top: 30rpx;

				image {
					width: 260rpx;
					height: 260rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
