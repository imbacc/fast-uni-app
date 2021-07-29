<template>
	<view>
		<u-tabs gutter="80" ref="tabs" active-color="#E62234" :list="list" :current="cur_tab" @change="tab_change" />
		<view class="center">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="on_bottom">
				<view class="center-box" v-for="(order, idx) in order_page.list" :key="idx">
					<integral-order-card :order="order" :idx="idx" :butShow="true" @goto="goto_detail" @confirm="confirm" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import integralOrderCard from '@/components/integralOrder-card.vue'
	
	import appendData from '@/common/class/append_data.js'
	
	export default {
		components: {
			integralOrderCard
		},
		data() {
			return {
				list: [{
					name: '全部',
					key: ''
				}, {
					name: '待收货',
					key: 'dispatched'
				}, {
					name: '待核销',
					key: 'wiped'
				}],
				cur_tab: 0,
				order_page: null
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(page = 1, append = false) {
				if (!this.order_page) {
					const _page = new appendData()
					_page.name = 'score_api/score_order_list'
					_page.method = 'GET'
					this.order_page = _page
				}
				this.order_page.fun(page, append)
			},
			on_bottom() {
				console.log(this.order_page);
				if (this.order_page) this.order_page.next_fun(this)
			},
			goto_detail({ order }) {
				this.is_goto('/pages/integralOrderDetail/integralOrderDetail', `?id=${order.out_trade_no}`)
			},
			confirm({ idx, order }) {
				const { name, out_trade_no } = order
				this.is_tools.to_showModal(`【${name}】确认收货?`, '订单确认', () => {
					this.is_api('score_api/score_order_confirm', {}, { out_trade_no, status: 'confirmed' }).then((res) => {
						this.is_tools.to_msg(res ? '确认收货成功!' : '确认收货失败!')
						if (res) {
							this.order_page.list[idx].status_text = '已完成'
							this.order_page.list[idx].status = 'confirmed'
						}
					})
				})
			},
			tab_change(e) {
				let status = this.list[e].key
				this.cur_tab = e
				if (status === '') {
					delete this.order_page.param.status
				} else {
					this.order_page.param = { status }
				}
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		padding: 20rpx 30rpx 0;
		height: calc(90vh - var(--window-top));

		&-box {
			background-color: #fff;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
