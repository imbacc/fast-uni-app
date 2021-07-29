<template>
	<view>
		<view class="time flex justify-between">
			<view class="time-l">
				<view>开始时间</view>
				<view class="time-box flex justify-between" @click="select('start')">
					<text>{{ start.replace(/\//g, '-') }}</text>
					<u-icon name="calendar" color="#E62234" />
				</view>
			</view>
			<view class="time-r">
				<view>结束时间</view>
				<view class="time-box flex justify-between" @click="select('end')">
					<text>{{ end.replace(/\//g, '-') }}</text>
					<u-icon name="calendar" color="#E62234" />
				</view>
			</view>
		</view>
		<u-picker v-model="show" :default-time="defaultTime" mode="time" @confirm="confirm" />
	</view>
</template>

<script>
export default {
	props: {
		oneMonth: {
			type: Boolean,
			default: true
		},
		initTime: Array
	},
	data() {
		return {
			show: false,
			type: '',
			start: '',
			end: '',
			defaultTime: ''
		}
	},
	created() {
		if (this.initTime && this.initTime.length > 0) {
			const [start, end] = this.initTime
			this.start = this.format(parseInt(`${start}000`))
			this.end = this.format(parseInt(`${end}000`))
			return
		}
		const timestamp = new Date().getTime().toString().substring(0, 10)
		this.type = 'start'
		this.one_month(timestamp)
		this.confirm({ timestamp })
	},
	methods: {
		select(e) {
			let time = ''
			if (this.start !== '' && e === 'start') time = this.start
			if (this.end !== '' && e === 'end') time = this.end
			if (time !== '') this.defaultTime = time
			this.type = e
			this.show = true
		},
		format(time) {
			return new Date(time).toLocaleDateString('zh-CN').replace(/\//g, '-')
		},
		confirm(e) {
			const { timestamp } = e
			if (!this.oneMonth && this.type === 'end') {
				let start_timestamp = new Date(this.start).getTime()
				let end_timestamp = parseInt(`${timestamp}000`)
				if (end_timestamp < start_timestamp) {
					this.is_tools.to_msg('结束时间不能小于开始时间!')
					return
				}
			}
			if (this.oneMonth) {
				this.one_month(timestamp)
			} else {
				this[this.type] = this.format(parseInt(`${timestamp}000`))
			}
			this.$emit('pick', [this.start, this.end])
		},
		one_month(timestamp) {
			let start, end = '', compute = 1000 * 60 * 60 * 24 * 30, time = parseInt(`${timestamp}000`)
			if (this.type === 'start') {
				start = time
				end = time + compute
			} else {
				start = time - compute
				end = time
			}
			this.start =  this.format(start)
			this.end =  this.format(end)
		}
	}
}
</script>

<style lang="scss" scoped>
.time {
	font-size: 28rpx;

	&-box {
		padding: 0 20rpx;
		width: 332rpx;
		height: 76rpx;
		background-color: #fff;
		border-radius: 12rpx;
		color: #999;
		margin-top: 10rpx;
		line-height: 76rpx;
	}
}
</style>
