<template>
	<view class="main">
		<student-info selShow />
		<!-- 公共集体课 -->
		<view class="box">
			<!-- 标题 -->
			<view class="flex justify-between align-center" style="padding: 22rpx 0;">
				<view class="box-title">
					<image style=" vertical-align:middle;height: 50rpx; width: 30rpx;"
						src="/static/images/course-ico.png" />学员历程 ({{ upclass_count_com }}/{{ upclass_list.length }})
				</view>
			</view>
			<view class="list flex justify-between flex-wrap">
				<view class="list-li " v-for="(info, idx) in upclass_list" :key="idx">
					<view class="list-li-img" :class="info.is_light === 0 ? 'list_none_img' : ''">
						<u-image height="100" :src="info.images && info.images[0]" mode="scaleToFill" />
					</view>
					<view class="list-li-title">{{ info.name }}</view>
					<view v-if="info.is_light === 1" class="list-li-tiem">2021-05-01</view>
					<view v-else class="flex_center">
						<view class="list_none flex_center_align">
							<image class="list_ico" src="/static/images/lock_ico.png" mode="aspectFil" />
							<view class="list_lab">未获得</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import studentInfo from '@/components/studentInfo.vue'
	
	export default {
		components: {
			studentInfo
		},
		data() {
			return {
				upclass_list: []
			};
		},
		computed: {
			sel_student_com() {
				return this.is_vuex.state.course_vuex.sel_student
			},
			upclass_count_com() {
				return this.upclass_list.filter((f) => f.is_light === 1).length
			}
		},
		watch: {
			sel_student_com(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					this.init(newValue.id)
				}
			}
		},
		onLoad() {
			if (this.sel_student_com.id) this.init(this.sel_student_com.id)
		},
		methods: {
			init(student_id) {
				this.is_api('upclass_api/upclass_progress', { student_id }).then((res) => {
					if (res) this.upclass_list = res
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 0 20rpx;
		border-radius: 12rpx;

		&-title {
			font-size: 36rpx;
			color: #333;
			font-weight: 700;
		}
	}

	.list {
		&-li {
			width: 50%;
			text-align: center;
			margin-bottom: 40rpx;

			&-img {
				margin: 0 auto;
				width: 100rpx;
				height: 100rpx;
			}

			&-title {
				font-size: 28rpx;
				color: #333;
				margin-top: 10rpx;
			}

			&-tiem {
				font-size: 22rpx;
				color: #999;
			}
		}
	}
	
	.list_none_img {
		filter: grayscale(100%);
		filter: gray;
		opacity:0.7;
	}
	
	.list_none {
		width: 109rpx;
		height: 34rpx;
		border-radius: 17rpx;
		border: 1rpx solid #B8B8B8;
		margin-top: 3rpx;
	}
	
	.list_ico {
		height: 19rpx;
		width: 17rpx;
		margin-right: 5rpx;
	}
	
	.list_lab {
		width: 66rpx;
		height: 30rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999990;
	}
</style>
