<template>
	<view class="h100b">
		<view class="head_div">
			<view class="head_title_div flex_align flex_between">
				<view class="flex_align">
					<image class="head_ico" src="/static/img/index/shop_ico.png" mode="aspectFill" />
					<view class="head_name">{{ user_info_com.shop_name || '' }}</view>
				</view>
				<image @click="switch_user" class="switch_ico" src="/static/img/index/switch_ico.png" mode="aspectFill" />
			</view>
			<view class="head_user_div flex_align flex_between">
				<view class="head_lab">收银员 : {{ user_info_com.nickname || '' }}</view>
				<view class="flex_align" @click="goto_info">
					<view class="head_lab">入库记录</view>
					<image class="right_ico" src="/static/img/index/right_ico.png" mode="aspectFill" />
				</view>
			</view>
		</view>

		<shopList ref="shoplist" />
		<alert v-if="alert_show" :type="alert_type" :title="alert_title" @cancel="alert_cancel" @confirm="alert_confirm" />
	</view>
</template>

<script>
import alert from '@/components/alert/alert.vue'
import shopList from '@/components/shop-list/shop-list.vue'

export default {
	components: {
		alert,
		shopList
	},
	data() {
		return {
			alert_show: false,
			alert_type: 1,
			alert_title: '',
		}
	},
	computed: {
		user_info_com() {
			return this.is_vuex.state.user_vuex.user_info
		},
	},
	onReady() {
		this.$nextTick(() => this.$refs.shoplist.search_shop())
	},
	methods: {
		goto_info() {
			this.is_goto('info')
		},
		switch_user() {
			this.alert_show = true
			this.alert_type = 1
			this.alert_title = '是否退出当前账号'
		},
		alert_cancel() {
			this.alert_show = false
		},
		alert_confirm() {
			this.is_vuex.commit('user_vuex/set_logout')
			this.is_goto('login', '', 3)
		},
	}
}
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	overflow: hidden;
}
	
.head_div {
	@extend .w100b;
	height: 230rpx;
	background: url('/static/img/index/head_bg.png');
	background-size: 100%;
	background-repeat: no-repeat;
}

.head_title_div {
	padding: 37rpx 70rpx 0 53rpx;
}

.head_ico {
	height: 26rpx;
	width: 29rpx;
}

.color_white {
	color: #ffffff;
}

.head_name {
	@extend .font;
	@extend .color_white;
	font-size: 32rpx;
	font-weight: 600;
	margin-left: 10rpx;
}

.switch_ico {
	height: 70rpx;
	width: 70rpx;
}

.head_user_div {
	padding: 0 53rpx 0 89rpx;
	margin-top: 35rpx;
}

.head_lab {
	@extend .font;
	@extend .f500;
	@extend .color_white;
	font-size: 28rpx;
}

.right_ico {
	height: 25rpx;
	width: 14rpx;
	margin-left: 17rpx;
}
</style>
