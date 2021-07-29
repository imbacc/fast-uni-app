<template>
	<view style="padding: 30rpx">
		<view class="time-screen">
			<time-begin-end :oneMonth="false" @pick="pick" />
		</view>
		<view class="record">
			<view class="record-box flex justify-between align-center" v-for="(info, idx) in course_list" :key="idx">
				<view style="color: #999990; font-size: 24rpx;">
					<view>{{ info.time.split(' ')[0] }}</view>
					<view>{{ info.time.split(' ')[1] }}</view>
				</view>
				<view style="color: #000000; font-size: 30rpx;width: 300rpx;">{{ info.name }}</view>
				<view style="font-size: 32rpx;" :class="state_com(info.intro)">{{ info.intro }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import timeBeginEnd from '@/components/time-beginEnd.vue'
	
	export default {
		components: {
			timeBeginEnd
		},
		data() {
			return {
				pick_time: ['', ''],
				rid: 0,
				course_list: [],
				init_bool: false,
				state: ['gray', 'blue', 'red']
			};
		},
		computed: {
			state_com() {
				return (intro) => {
					if (intro.indexOf('已上课') !== -1) return 'gray'
					if (intro.indexOf('已请假') !== -1) return 'bule'
					if (intro.indexOf('缺席上课') !== -1) return 'red'
					return 'gray'
				}
			}
		},
		onLoad({ rid }) {
			if (rid) {
				this.rid = rid
				this.init()
			}
		},
		methods: {
			init() {
				if (this.init_bool) return
				this.init_bool = true
				this.is_api('course_api/course_record', { rid: this.rid, time: this.pick_time.join(',') }).then((res) => {
					this.init_bool = false
					if (res) {
						this.course_list = res
					}
				})
			},
			pick(e) {
				this.pick_time = e
				if (this.rid) this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record {
		margin-top: 20rpx;

		&-box {
			background-color: #fff;
			height: 116rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
		}
	}
	
	.red {
		color: #E62234;
	}
	
	.blue {
		color: #023A98;
	}
	
	.gray {
		color: #999999;
	}
</style>
