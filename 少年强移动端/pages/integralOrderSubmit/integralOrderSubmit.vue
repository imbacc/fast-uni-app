<template>
	<view class="main">
		<view class="venue flex justify-between align-center" @click="toSeat">
			<text>兑换场馆：{{ cur_shop_com.name || '' }}</text>
			<text>
				<u-icon name="arrow-right" color="#B6B6B6" />
			</text>
		</view>
		<view class="box flex">
			<view class="box-img">
				<image :src="score_info_com.cover_image" mode="aspectFill" />
			</view>
			<view class="box-title flex flex-direction justify-between">
				<view>{{ score_info_com.name }}</view>
				<view class="flex justify-between">
					<text style="color: #E62234;">{{ score_info_com.score }}积分</text>
					<text>
						<u-number-box v-model="count" :min="1" :max="100" />
					</text>
				</view>
			</view>
		</view>
		<view class="remark">
			<view class="remark-title">
				备注
			</view>
			<textarea v-model="remark" class="remark-box" placeholder="请输入您的备注说明" :maxlength="300" />
		</view>
		<view class="total flex justify-between align-center">
			<view>合计 : <text style="color: #E62234;">{{ score_compute_com }}积分</text></view>
			<view class="total-but" @click="submit">确认兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 1,
				remark: ''
			};
		},
		computed: {
			score_info_com() {
				return this.is_vuex.state.score_vuex.score_info
			},
			score_compute_com() {
				return this.score_info_com.score * this.count
			},
			cur_shop_com() {
				return this.is_vuex.state.user_vuex.cur_shop
			}
		},
		methods:{
			submit() {
				if (!this.score_info_com.id) return
				uni.showLoading()
				this.is_api(`score_api/${this.score_info_com.cate ? 'score_course_exchange' : 'score_exchange'}`, {}, { id: this.score_info_com.id, count: this.count, remark: this.remark }).then((res) => {
					uni.hideLoading()
					this.is_tools.to_msg(res ? '兑换成功' : '兑换失败')
					if (res) {
						let time = setTimeout(() => {
							clearTimeout(time)
							this.is_goto('/pages/integralOrder/integralOrder', '', 2)
						}, 500)
					}
				})
			},
			toSeat() {
				this.is_goto('/pages/seat/seat')
			},
		}
	}
</script>

<style lang="scss" scoped>

	.venue {
		height: 85rpx;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
	}

	.box {
		padding: 30rpx;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 12rpx;

		&-img {
			width: 154rpx;
			height: 154rpx;
			border-radius: 12rpx;
			margin-right: 20rpx;
			overflow: hidden;
		}

		&-title {
			width: 460rpx;
		}
	}

	.remark {
		margin-top: 30rpx;

		&-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 12rpx;
		}

		&-box {
			height: 200rpx;
			width: 100%;
			color: #999;
			font-size: 26rpx;
			padding: 15rpx 20rpx;
			background-color: #fff;
			border-radius: 12rpx;
		}
	}

	.total {
		position: fixed;
		bottom: 42rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 690rpx;
		height: 120rpx;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #555555;

		&-but {
			padding: 10rpx 60rpx;
			font-size: 36rpx;
			background-color: #E62234;
			color: #fff;
			text-align: center;
			border-radius: 42rpx;
		}
	}
</style>
