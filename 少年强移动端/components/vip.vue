<template>
	<view>
		<view class="vip flex">
			<view class="vip-ico">
				<image src="/static/images/vip_ico.png"></image>
			</view>
			<view class="vip-info">
				<view style="color: #333; font-size: 28rpx;">{{ card.name }}</view>
				<view style="color: #999999; font-size: 24rpx;">({{ card.expire }}到期)</view>
				<template v-if="scheduling">
					<view style="color: #555555; font-size: 26rpx; margin-top: 20rpx;">已上课时：{{ card.used }}节</view>
					<view class="last_div">
						<view style="color: #555555; font-size: 26rpx;margin-left: 10rpx;" class="flex_align u-line-1">
							剩余课时：{{ card.surplus }}节
						</view>
						<view class="flex_align flex_around" style="margin-top: 10rpx;">
							<view class="last_lab">购买课时{{ card.buy_hours }}节</view>
							<view class="last_hr"></view>
							<view class="last_lab">赠送课时{{ card.exchange_hours }}节</view>
							<view class="last_hr"></view>
							<view class="last_lab">兑换课时{{ card.exchange_hours }}节</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view style="color: #555555; font-size: 26rpx; margin-top: 20rpx;">已上课时：{{ card.used }}</view>
					<view style="color: #999999; font-size: 26rpx; margin-top: 10rpx;width: 500rpx;" class="flex_align u-line-1">
						剩余课时：{{ card.surplus }}
					</view>
				</template>
			</view>
			<view v-if="showDetail" class="vip-detail" @click="to">
				明细
				<u-icon name="arrow-right" />
			</view>
		</view>
		<view class="vip_head flex_align flex_around">
			<view class="vip_head_lab">课时（节数）</view>
			<view class="vip_head_lab">费用（元）</view>
			<view class="vip_head_lab">有效期</view>
			<view class="vip_head_lab">请假权益</view>
		</view>
		<view class="vip_foot flex_align flex_around">
			<view class="vip_head_lab">{{ card.hours || card.buy_hours }}</view>
			<view class="vip_head_lab">{{ card.price }}元</view>
			<view class="vip_head_lab">{{ card.period }}个月</view>
			<view class="vip_head_lab">{{ card.leave_level > 0 ? `${card.leave_level}个月` : '/' }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			card: {
				type: Object
			},
			showDetail: {
				type: Boolean,
				default: true
			},
			scheduling: {
				type: Boolean,
				default: false
			}
		},
		name:"vip",
		computed: {
			num_com() {
				return (used, surplus) => {
					let u_bool = isNaN(used), s_bool = isNaN(surplus)
					if (u_bool && s_bool) return used
					if (u_bool) used = 0
					if (s_bool) surplus = 0
					return used + surplus
				}
			}
		},
		methods:{
			to(){
				this.$emit('to')
			}
		}
	}
</script>

<style lang="scss" scoped>
.vip {
		position: relative;
		border-top: 1px solid #e6e6e6;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		margin-left: 20rpx;

		&-ico {
			width: 44rpx;
			height: 34rpx;
		}

		&-info {
			margin-left: 26rpx;
		}

		&-detail {
			position: absolute;
			right: 20rpx;
			top: 30rpx;
			color: #999;
		}
	}
	
	.vip_head {
		width: 690rpx;
		height: 62rpx;
		background: #F3F3F3;
	}
	
	.vip_head_lab {
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	
	.vip_foot {
		height: 89rpx;
		width: 100%;
	}
	
	.last_div {
		width: 567rpx;
		height: 99rpx;
		border: 1rpx solid #E6E6E6;
		margin-top: 20rpx;
		padding: 10rpx 13rpx 0 13rpx;
	}
	
	.last_lab {
		@extend .vip_head_lab;
		font-weight: 400;
		color: #999999;
	}
	
	.last_hr {
		width: 1rpx;
		height: 22rpx;
		background: #D8D8D8;
	}
</style>
