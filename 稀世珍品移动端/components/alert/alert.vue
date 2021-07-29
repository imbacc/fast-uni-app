<template>
	<view class="bg_pack flex_center_align" :class="!zoomOut ? 'fade' : 'fade_out'" @touchmove.stop="touch_stop">
		<view class="alert_div" :class="[{ 'type_class': type === 2 }, !zoomOut ? 'zoom_in' : 'zoom_out']">
			<image @click="cancel" class="close_ico" src="/static/img/index/close_ico.png" mode="aspectFill" />
			<view class="flex_column flex_center_align">
				<image v-if="type === 1" class="switch_ico" src="/static/img/index/switch_user_ico.png" mode="aspectFill" />
				<image v-else class="switch_ico" :src="bool ? '/static/img/index/success_ico.png' : '/static/img/index/fail_ico.png'" mode="aspectFill" />
				<view class="alert_lab">{{ title }}</view>
			</view>
			<view v-if="type === 1" class="alert_foot flex_align">
				<view class="alert_button flex_center_align" @click="cancel">取消</view>
				<view class="alert_button alert_confirm flex_center_align" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"alert",
		props: {
			title: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 1
			},
			bool: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				zoomOut: false
			};
		},
		methods: {
			touch_stop() {
				return false
			},
			animation() {
				return new Promise((resovle) => {
					this.zoomOut = true
					let time = setTimeout(() => {
						clearTimeout(time)
						resovle()
					}, 90)
				})
			},
			confirm() {
				this.animation().then(() => this.$emit('confirm'))
			},
			cancel() {
				this.animation().then(() => this.$emit('cancel'))
			}
		},
	}
</script>

<style lang="scss" scoped>
.bg_pack {
	overflow: hidden;  
	@extend .hw100b;
	background: rgba(0, 0, 0, 0.54);
	position: fixed;
	top: 0;
	left: 0;
}

.alert_div {
	width: 540rpx;
	height: 363rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	position: relative;
}

.close_div {
	display: flex;
	justify-content: flex-end;
}

.close_ico {
	height: 27rpx;
	width: 27rpx;
	position: absolute;
	right: 32rpx;
	top: 42rpx;
}

.switch_ico {
	height: 81rpx;
	width: 81rpx;
	margin-top: 70rpx;
}

.alert_lab {
	font-size: 30rpx;
	@extend .font;
	@extend .f500;
	color: #333330;
	margin-top: 13rpx;
}

.alert_foot {
	height: 92rpx;
	@extend .w100b;
	position: absolute;
	bottom: 0;
	border-top: 2rpx solid #EAEAEA;
}

.alert_button {
	@extend .h100b;
	width: 269rpx;
	@extend .alert_lab;
	margin-top: 0;
}

.alert_confirm {
	color: rgba(231, 114, 0, 1);
}

.alert_button:first-child {
	border-right: 2rpx solid #EAEAEA;
}

.type_class {
	height: 281rpx;
}
</style>
