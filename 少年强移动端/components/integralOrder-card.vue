<template>
	<view>
		<view class="main-title flex justify-between">
			<text>订单编号 {{ order.out_trade_no }}</text>
			<text>{{ order.status_text }}</text>
		</view>
		<view class="main-li flex" @click="emit('goto')">
			<view class="main-li-img">
				<image :src="order.cover_image" mode="aspectFill" />
			</view>
			<view class="main-li-title flex flex-direction justify-between">
				<view>{{ order.name }}</view>
				<view class="flex justify-between">
					<text style="color: #E62234;">{{ order.changed_score }}积分</text>
					<text style="color: #999999;">x{{ order.count }}</text>
				</view>
			</view>
		</view>
		<view class="main-but" v-if="butShow && order.status === 'dispatched'">
			<view class="but" @click="emit('confirm')">
				确认收货
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "integralOrder-card",
		props: {
			order: Object,
			idx: Number,
			butShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			emit(name) {
				this.$emit(name, { idx: this.idx, order: this.order })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-title {
		color: #999;
		font-size: 28rpx;
		padding: 10rpx 30rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.main-li {
		padding: 28rpx 30rpx;

		&-img {
			width: 154rpx;
			height: 154rpx;
			border-radius: 12rpx;
			overflow: hidden;
		}

		&-title {
			font-size: 30rpx;
			width: 400rpx;
			margin-left: 20rpx;

			view:nth-child(1) {
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
	}

	.main-but {
		padding: 25rpx 20rpx;
		text-align: right;
		border-top: 1px solid #E6E6E6;

		.but {
			padding: 0 22rpx;
			background-color: #E62234;
			border-radius: 42rpx;
			color: #fff;
			display: inline-block;
		}
	}
</style>
