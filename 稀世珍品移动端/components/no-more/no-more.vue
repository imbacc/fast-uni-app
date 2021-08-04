<template>
	<view class="nomore_div flex_column flex_center_align">
		<image class="nomore_img" src="/static/img/index/no_more.png" mode="aspectFill" />
		<view class="nomore_lab">暂无内容</view>
	</view>
</template>

<script>
	export default {
		name:"no-more",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.nomore_div {
	// height: 493rpx;
	min-height: 100vh;
	width: 100%;
}

.nomore_img {
	height: 404rpx;
	width: 491rpx;
	margin-left: -40rpx;
}

.nomore_lab {
	font-size: 28rpx;
	@extend .font;
	@extend .f500;
	@extend .c999999;
	margin-left: -50rpx;
}
</style>
