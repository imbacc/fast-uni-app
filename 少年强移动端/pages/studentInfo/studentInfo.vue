<template>
	<view>
		<!-- <image src="/static/images/coachDetail/heder-bg.png" mode="aspectFill" /> -->
		<view class="body_div">
			<!-- <view class="body_title"></view> -->
			<view class="body_content">
				<u-parse :html="student_info_com.excellent_stu_content" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	        };
	    },
		computed: {
			student_info_com() {
				return this.is_vuex.state.student_vuex.student_info
			}
		},
	    methods: {
	        name() {
	            
	        }
	    },
	}
</script>

<style lang="scss" scoped>
	.body_div {
		padding: 38rpx 34rpx 0 34rpx;
	}
	
	.body_title {
		font-size: 32rpx;
		font-family: PingFangSC-Bold, PingFang SC;
		font-weight: bold;
		color: #333333;
	}
</style>
