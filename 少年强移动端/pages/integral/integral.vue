<template>
	<view class="main">
		<view class="main-hader flex justify-between align-center">
			<view class="main-hader-may">
				<view>
					可用积分
					<u-icon style="margin-left: 10rpx;" name="question-circle" @click="show = true" />
				</view>
				<view>{{ score }}</view>
			</view>
			<view class="main-hader-but" @click="toIntegralDetail">查看明细</view>
		</view>
		<view class="main-adm flex justify-between align-center" @click="toIntegralOrder">
			<view>
				<image src="/static/images/my/integral/ico.png" />
				积分订单管理
			</view>
			<view><u-icon name="arrow-right" color="#B6B6B6" /></view>
		</view>
		<view class="main-store">
			<view class="main-store-nav flex justify-around ">
				<!-- <view :class="activeShow===1?'main-store-nav-active':''" @click="activeShow = 1">
					商品兑换
				</view>
				<view :class="activeShow===2?'main-store-nav-active':''" @click="activeShow = 2">
					课时兑换
				</view> -->
				<u-tabs
					style="width: 100%;"
					bg-color="transparent"
					active-color="#E62234"
					:list="list"
					:is-scroll="false"
					:current="activeShow"
					@change="tab_change"
				></u-tabs>
			</view>
			<view class="main-store-box ">
				<scroll-view scroll-y style="height: 750rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view class="flex justify-between flex-wrap ">
						<view
							class="main-store-box-li"
							v-for="(info, idx) in score_list"
							:key="idx"
							@click="toIntegralStoreDetail(info.id)"
						>
							<view class="main-store-box-li-img"><u-image height="237" :src="info.cover_image" /></view>
							<view class="main-store-box-li-name u-line-1">{{ info.name }}</view>
							<view class="main-store-box-li-price">{{ info.score }}积分</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<u-modal
			v-model="show"
			:show-confirm-button="false"
			width="530"
			title="积分使用规则"
			:title-style="{ 'font-size': '32rpx', 'font-weight': 'bold', color: '#333333' }"
		>
			<view style="font-size: 28rpx; color: #555; padding: 20rpx 36rpx 30rpx 32rpx;"><rich-text :nodes="content"></rich-text></view>
			<view class="close_ico" @click="show = false">x</view>
		</u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '商品兑换'
				},
				{
					name: '课时兑换'
				}
			],
			activeShow: 0,
			show: false,
			content: `1.积分获取 a) 积分专属邮乐,仅限邮乐网内使用; b) 积分可以累积,2年内有效; c) ...<br>
				2.积分有效期 积分自发放日起2年内有效,逾期自动失效。<br>
				3.积分查询 您可在我的邮乐-我的邮乐积分板块查询积分获取及使用明细<br>
				4.积分使用 a) 首先每个店铺的商品有最多可使用的积分数,您可以在确认订单页查看b) ...<br>
				5.积分退还 商品发生退货时,商品抵扣积分根据商品数量分摊后退回用户帐户...`,
			score: 0,
			score_list: []
		}
	},
	onLoad() {
		this.init()
		this.init_shop()
	},
	methods: {
		async init() {
			this.is_api('score_api/my_score').then((res) => {
				if (res) this.score = res
			})
		},
		async init_shop(param = {}) {
			this.is_api('score_api/score_shop', param).then((res) => {
				if (res) this.score_list = res.data
			})
		},
		toIntegralDetail() {
			this.is_goto('/pages/integralDetail/integralDetail')
		},
		toIntegralOrder() {
			this.is_goto('/pages/integralOrder/integralOrder')
		},
		toIntegralStoreDetail(id) {
			let param = `?id=${id}`
			if (this.activeShow === 1) param += '&cate=true'
			this.is_goto('/pages/integralStoreDetail/integralStoreDetail', param)
		},
		tab_change(e) {
			this.activeShow = e
			this.init_shop(e === 1 ? { q: 'course' } : {})
		}
	}
}
</script>

<style lang="scss" scoped>
.main {
	&-hader {
		height: 200rpx;
		background: url(/static/images/my/integral/bg.png) no-repeat;
		background-size: cover;
		padding: 0 40rpx;

		&-may {
			font-size: 34rpx;
			color: #fff;
		}

		&-but {
			padding: 0 20rpx;
			border-radius: 24rpx;
			border: 1px solid #fff;
			color: #fff;
			font-size: 28rpx;
		}
	}

	&-adm {
		height: 90rpx;
		background-color: #fff;
		padding: 0 25rpx;
		border-radius: 12rpx;
		margin-top: 20rpx;

		image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 10rpx;
		}
	}

	&-store {
		margin-top: 30rpx;

		&-nav {
			font-size: 32rpx;
			color: #333;
			font-weight: 700;

			&-active {
				color: #e62234;
				border-bottom: 2px solid #e62234;
			}
		}

		&-box {
			margin-top: 30rpx;

			&-li {
				width: 334rpx;
				height: 357rpx;
				background-color: #fff;
				border-radius: 8rpx;
				margin-bottom: 20rpx;
				overflow: hidden;

				&-img {
					width: 100%;
					height: 237rpx;
				}

				&-name {
					padding: 20rpx 10rpx 0;
					font-size: 30rpx;
					color: #000000;
				}

				&-price {
					padding: 0 10rpx;
					font-size: 32rpx;
					color: #e62234;
				}
			}
		}
	}
}

.close_ico {
	width: 29rpx;
	height: 29rpx;
	color: #b7b7b7;
	font-size: 36rpx;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
}
</style>
