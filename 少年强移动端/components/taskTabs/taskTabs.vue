<template>
	<view>
		<view class="box-tabs">
			<u-tabs :list="typeList" name="type_name" :duration="0" :current="current" bg-color="#F3F3F3" active-color="#E62234" @change="change" />
		</view>
		<view class="box-list flex justify-between flex-wrap">
			<view class="box-list-li" v-for="(info, idx) in workList" :key="idx" @click="to(info.id)">
				<view class="box-list-li-img">
					<video v-if="info.vod_file && info.vod_file.length > 0 && !toType" class="box_video" :show-play-btn="false" :show-fullscreen-btn="false" :controls="false" :src="info.vod_file[0]" />
					<image v-else class="box_video" :src="info.homework_images && info.homework_images[0]" mode="aspectFill" />
				</view>
				<view class="box-list-li-title">
					{{ info.name }}
				</view>
				<view class="box-list-li-tiem">
					练习时长：{{ info.practice_duration }}分钟
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			typeList: Array,
			workList: Array,
			toType: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				current: 0,
			};
		},
		created() {
			this.current = 0
		},
		methods: {
			to(id) {
				this.$emit('to', id)
			},
			change(e) {
				this.current = e
				this.$emit('change', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-tabs {
		margin-bottom: 20rpx;
	}
	
	.box_video {
		width: 334rpx;
		height: 237rpx;
	}

	.box-list {
		&-li {
			width: 334rpx;
			height: 370rpx;
			border-radius: 8rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			overflow: hidden;

			&-img {
				width: 100%;
				height: 237rpx;
			}

			&-title {
				padding: 0 14rpx;
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #000;
			}

			&-tiem {
				padding: 0 14rpx;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
</style>
