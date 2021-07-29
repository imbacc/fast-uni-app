<template>
	<view>
		<view class="list-box" v-for="(info, idx) in list" :key="idx" @click="toDetail(info.id)">
			<view class="list-box-img">
				<image :src="info.images ? info.images[0] : info.cover_image" mode="aspectFill" />
				<view v-if="if_date_com(info.end_date)" class="list-box-img-time">
					{{ info.format_date ? fromat_date_com(info, 'format_date') : fromat_date_com(info, 'begin_date') }}
				</view>
				<view v-else class="list-box-img-time disabled_bg">
					已结束
				</view>
			</view>
			<view class="list-box-title text-cut">
				{{ info.title }}
			</view>
			<view class="list-box-text">
				{{ info.desc }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
		},
		name: "eventsList",
		data() {
			return {

			};
		},
		computed: {
			fromat_date_com() {
				return (info, key) => {
					return info && info[key].substring(5, info[key].length)
				}
			},
			if_date_com() {
				return (date) => date && new Date().getTime() - new Date(date).getTime() < 0
			}
		},
		methods: {
			toDetail(id) {
				this.$emit('toDetail', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes fade {
	    from { opacity: 0.1 }
		to { opacity: 1; }
	}
	
	.list-box {
		margin: 0 0 25rpx;
		height: 400rpx;
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		animation: 0.3s fade;

		&-img {
			position: relative;
			width: 100%;
			height: 250rpx;
			margin-bottom: 15rpx;

			&-time {
				line-height: 39rpx;
				height: 39rpx;
				background: #E62234;
				border-radius: 0px 12px 12px 0px;
				position: absolute;
				padding: 2rpx 15rpx;
				left: 0;
				top: 0;
				color: #fff;
				font-size: 24rpx;
			}
		}

		&-title {
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
			padding: 0 30rpx;
			margin-bottom: 10rpx;
		}

		&-text {
			padding: 0 30rpx;
			font-size: 24rpx;
			height: 3em;
			color: #999;
			line-height: 1.5;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	
	.disabled_bg {
		background: #878787;
	}
</style>
