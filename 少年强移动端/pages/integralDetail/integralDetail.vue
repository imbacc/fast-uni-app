<template>
	<view class="main">
		<view class="time-screen">
			<time-begin-end :oneMonth="false" @pick="pick" />
		</view>
		<view>
			<view class="box flex justify-between align-center" v-for="(info, idx) in score_list" :key="idx" @click="goto_info(info.out_trade_no)">
				<view style="color: #999990; font-size: 24rpx;">
					<view>{{ info.createtime.split(' ')[0].replace(/-/g, '/') }}</view>
					<view>{{ info.createtime.split(' ')[1] }}</view>
				</view>
				<view class="score_name">{{ info.used_by }}</view>
				<view :class="info.changed_score.indexOf('+') !== -1 ? 'add_score' : 'dec_score'">{{ info.changed_score }}</view>
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
				score_list: []
			}
		},
		methods: {
			pick(e) {
				this.init_score(1, e)
			},
			async init_score(page = 1, e) {
				let q = e.filter((f) => f)
				if (q.length !== 2) return
				console.log(q);
				q[0] = new Date(q[0]).toLocaleDateString('zh-CN').replace(/\//g, '-')
				q[1] = new Date(q[1]).toLocaleDateString('zh-CN').replace(/\//g, '-')
				q = q.join(',')
				this.is_api('score_api/score_detailed', { _page: [page, 10], q }).then((res) => {
					if (res) this.score_list = res.data
				})
			},
			goto_info(out_trade_no) {
				this.is_goto('/pages/integralOrderDetail/integralOrderDetail', `?id=${out_trade_no}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.time-screen {
		margin-bottom: 20rpx;
	}
	.box {
		background-color: #fff;
		height: 116rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
	}
	
	.score_name {
		color: #000000;
		font-size: 30rpx;
		font-weight: 600;
	}
	
	.add_score {
		color: #023A98;
		font-size: 32rpx;
		font-weight: 600;
	}
	
	.dec_score {
		@extend .add_score;
		color: #E62234;
		
	}
</style>
