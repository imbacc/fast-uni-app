<template>
	<view class="flex_column flex_center_align">
		<view v-for="(item, index) in schedule_list" :key="index" class="list_div" @click="goto_info(item.id, item.adjustment)">
			<view class="flex_align flex_between">
				<view class="list_lab gray">{{ item.time }}</view>
				<view class="list_lab f30" :class="status_class[item.status]">{{ item.status_txt }}</view>
			</view>
			<view class="flex_align flex_between mt20">
				<view class="list_lab f30 maxw540">{{ item.student_name }}学员，你好，请查看你的上课计划</view>
				<image class="right_ico" src="/static/images/my/right_ico.png" mode="aspectFill" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            schedule_list: [],
				status_class: {
					approval: 'gray',
					pending: 'blue',
					refuse: 'red',
				}
	        };
	    },
		onShow() {
			this.init()
		},
		onPullDownRefresh() {
			this.init()
		},
	    methods: {
	        init() {
	            this.is_api('user_api/schedule_list').then((res) => {
					uni.stopPullDownRefresh()
					if (res) {
						this.schedule_list = res
					}
				})
	        },
			goto_info(rid, adjustment) {
				this.is_goto('/pages/scheduling/schedulingInfo', `?rid=${rid}&adjustment=${Number(adjustment)}`)
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.list_div {
		width: 690rpx;
		height: 159rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 28rpx 32rpx 38rpx 29rpx;
		margin-bottom: 20rpx;
	}
	
	.list_div:first-child {
		margin-top: 20rpx;
	}
	
	.list_lab {
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	
	.f30 {
		font-size: 30rpx;
	}
	
	.mt20 {
		margin-top: 20rpx;
	}
	
	.red {
		color: #FF2020;
	}
	
	.gray {
		color: #999999;
	}
	
	.blue {
		color: #003893;
	}
	
	.right_ico {
		height: 28rpx;
		width: 18rpx;
	}
</style>
