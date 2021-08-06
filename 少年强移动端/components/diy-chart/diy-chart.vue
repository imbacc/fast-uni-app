<template>
	<view class="chart_pack">
		<view class="chart_top flex_column">
			<view class="top_data flex_align" @click="hide(0)">
				<view class="min_block" :style="`background: ${show[0] ? themeColor[0] : '#ccc'};`"></view>
				<view class="min_lab" :style="!show[0] ? `color: #ccc` : ''">{{ lineValue.series[0].name }}</view>
			</view>
			<view class="top_data flex_align" @click="hide(1)">
				<view class="min_block" :style="`background: ${show[1] ? themeColor[1] : '#ccc'};`"></view>
				<view class="min_lab" :style="!show[1] ? `color: #ccc` : ''">{{ lineValue.series[1].name }}</view>
			</view>
		</view>
		<view v-if="lineValue && lineValue.categories && Array.isArray(lineValue.categories)" class="chart_body flex_column">
			<view v-for="(item, index) in lineValue.categories" :key="index" class="chart_list flex_align">
				<view class="chart_title flex_center_align">{{ item }}</view>
				<view class="chart_line">
					<view v-if="show[0]" class="line_div flex_align">
						<view class="min_line" :style="`background: ${themeColor[0]};width:${width_com(lineValue.series[0].data[index])}%;`"></view>
						<view class="min_value">{{ lineValue.series[0].data[index] || 0 }}</view>
					</view>
					<view v-if="show[1]" class="line_div flex_align">
						<view class="min_line" :style="`background: ${themeColor[1]};width:${width_com(lineValue.series[1].data[index])}%;`"></view>
						<view class="min_value">{{ lineValue.series[1].data[index] || 0 }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			themeColor: {
				type: Array,
				default: () => ['#000', '#CCC']
			},
			lineValue: {
				type: Object,
			},
			maxValue: {
				type: Number,
				default: 100
			}
		},
	    data() {
	        return {
	            show: [true, true]
	        };
	    },
		computed: {
			width_com() {
				return (val) => {
					return val ? (parseFloat(val) / this.maxValue) * 90 : 0
				}
			},
		},
	    methods: {
	        hide(idx) {
	            this.$set(this.show, idx, !this.show[idx])
	        }
	    },
	}
</script>

<style lang="scss" scoped>
	.chart_pack {
		position: relative;
		margin-top: 40rpx;
	}
	
	.chart_top {
		display: flex;
		align-items: flex-end;
		height: 70rpx;
		margin-right: 31rpx;
		margin-bottom: 21rpx;
		position: absolute;
		top: -100rpx;
		right: 0;
	}
	
	.chart_body {
		margin-top: 20rpx;
	}
	
	.min_block {
		display: inline-block;
		height: 23rpx;
		width: 23rpx;
		margin-right: 10rpx;
		transition: 0.3s;
	}
	
	.min_lab {
		min-width: 100rpx;
		text-align-last: justify;
		transition: 0.3s;
	}
	
	.chart_list {
		height: 89rpx;
		width: 100%;
		border-top: 1rpx solid rgba(230, 230, 230, 0.6);
	}
	
	.chart_list:last-child {
		border-bottom: 1rpx solid rgba(230, 230, 230, 0.6);
	}
	
	.chart_title {
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #555555;
		height: 100%;
		width: 208rpx;
		border-right: 1rpx solid rgba(230, 230, 230, 0.6);
	}
	
	.chart_line {
		flex: 1;
		padding: 24rpx 10rpx 17rpx 10rpx;
	}
	
	.line_div {
		flex: 1;
	}
	
	.min_line {
		height: 20rpx;
		margin-bottom: 8rpx;
		animation: 0.3s fade;
	}
	
	.min_value {
		height: 20rpx;
		line-height: 12rpx;
		margin-left: 10rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		transition: 0.3s;
	}
</style>
