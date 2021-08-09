<template>
	<div class="index_pack">
		<div class="head_pack flex_center_align">
			<div class="head_left_lab flex_align" @click="goto_return">
				<img class="head_left_ico" src="/src/assets/images/index/left_ico.png" />
				返回至收银页面
			</div>
			<img class="head_logo" src="/src/assets/images/index/logo.png" @click="print" />
		</div>

		<div class="body_pack flex_column flex_align">
			<div class="body_div">
				<div class="table_pack">
					<tableComp :type="3" ref="tableRef" @button="table_button" />
				</div>
			</div>

			<div class="foot_div flex_align flex_between">
				<div class="big_button flex_center_align" @click="up_page">上一页</div>
				<div class="big_button green flex_center_align" @click="next_page">下一页</div>
			</div>
		</div>

		<orderInfo ref="orderInfoRef" />
		<alert v-if="show_alert" :type="alert_type" :msg="alert_msg" @cancel="show_alert = false" @confirm="confirm" @sel_pay="sel_pay" />
		<loadingComp ref="loadingRef" />
	</div>
</template>

<script>
import { reactive, ref, toRefs, defineAsyncComponent, onMounted } from 'vue'
import { initPrint, outPrint, timeHide } from '@/common/tools/cmake_tools.js'
import { state } from '@common/compose/user_store.js'
import api from '@/common/config/api.js'

import tableComp from '@/components/table/table.vue'
import loadingComp from '@/components/loading/loading.vue'
import orderInfo from '@/components/order-info/order-info.vue'

const scale = document.documentElement.clientWidth / 480 / 2
document.documentElement.style.fontSize = 16 * Math.min(scale, 2) + 'px'

export default {
	components: {
		alert: defineAsyncComponent(() => import('@/components/alert/alert.vue')),
		tableComp,
		loadingComp,
		orderInfo
	},
	setup() {
		// init
		onMounted(() => {
			// 初始化订单列表
			init()
			// 初始化打印插件
			initPrint()
		})

		// reactive
		const data = reactive({
			order_list: [],
			alert_type: 1,
			alert_msg: '',
			show_alert: false,
			pay_str: ['', '视商收款', '微信', '支付宝'],
			order_page: 0,
			cur_order: {}
		})

		// ref
		const tableRef = ref(null)
		const loadingRef = ref(null)
		const orderInfoRef = ref(null)

		// function
		const init = (page = 1) => {
			loadingRef.value.open()
			data.order_page = page
			api('order_list', { _page: [page, 8] }).then((res) => {
				loadingRef.value.close()
				if (res) {
					data.order_list = res
					tableRef.value.set_shop(res)
				}
			})
		}

		const confirm = (e) => {
			// 确认订单退货
			if (e === 6) {
				const { order_sn } = data.cur_order
				loadingRef.value.open()
				api('order_cancel', {}, { order_sn }).then((res) => {
					loadingRef.value.close()
					if (res) {
						data.alert_type = 3
						data.alert_msg = '退货成功'
					} else {
						data.alert_type = 5
						data.alert_msg = '退货失败'
					}
					data.show_alert = true
					timeHide(1000).then(() => {
						data.show_alert = false
						init(data.order_page)
					})
				})
			}
			data.show_alert = false
		}

		// 打印小票
		const print = () => {
			loadingRef.value.open()
			const { goods, order_sn, createtime, pay_type, pay_money } = data.cur_order
			let list = goods
			for (const info of list) {
				info.sum = parseFloat(info.money) * parseInt(info.num)
			}
			const sum_price = Array.from(list, ({ sum }) => parseFloat(sum)).reduce((t, v) => t + v)
			const sum_count = [...new Set(Array.from(goods, ({ id }) => id))]
			outPrint({
				list,
				shop_name: state.user_info?.shop_name || state.user_info.data.shop_name,
				order_no: order_sn,
				order_time: new Date(parseInt(`${createtime}000`)).toLocaleString('zh'),
				keys: ['num', 'goods_name', 'sum'],
				sum_count,
				sum_price,
				pay_type: pay_type === 1 ? `视商${data.sspay_type === 1 ? '微信' : '支付宝'}` : data.pay_str[pay_type],
				pay_price: data.pay_type === 1 ? pay_money : sum_price
			})
			loadingRef.value.close()
		}

		const table_button = ({ shop, type }) => {
			data.cur_order = shop
			if (type !== 3 && shop.ispay === 0) {
				data.alert_type = 5
				data.alert_msg = '订单未支付状态!'
				data.show_alert = true
				timeHide(1000).then(() => (data.show_alert = false))
				return
			}

			// 退货
			if (type === 1) {
				if (shop.ispay === 2) {
					data.alert_type = 5
					data.alert_msg = '订单已是退货状态!'
					data.show_alert = true
					timeHide(1000).then(() => (data.show_alert = false))
					return
				}
				data.alert_type = 6
				data.alert_msg = '确定订单退货吗?'
				data.show_alert = true
			}

			// 打印小票
			if (type === 2) {
				print()
			}

			// 订单详情
			if (type === 3) {
				orderInfoRef.value.change()
				orderInfoRef.value.set_table(shop.goods)
			}
		}

		const up_page = () => {
			if (data.order_page - 1 <= 0) return
			init(data.order_page - 1)
		}

		const next_page = () => {
			init(data.order_page + 1)
		}

		const goto_return = () => {
			window.location.href = '/#/'
		}

		return {
			// reactive
			...toRefs(data),
			// ref
			tableRef,
			loadingRef,
			orderInfoRef,
			// function
			confirm,
			print,
			table_button,
			up_page,
			next_page,
			goto_return
		}
	}
}
</script>

<style lang="scss" scoped>
.index_pack {
	overflow: hidden;
}

.head_pack {
	height: 121px;
	width: 100%;
	background: url('/src/assets/images/index/head.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	position: relative;
}

.head_left_lab {
	font-size: 22px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	position: absolute;
	left: 280px;
	user-select: none;
	cursor: pointer;
}

.head_left_ico {
	height: 20px;
	width: 11px;
	margin-right: 7px;
}
.head_div {
	width: 75%;
	height: 100%;
	position: relative;
}

.head_logo {
	height: 59px;
	width: 199px;
}

.body_pack {
	height: 100%;
	width: 100%;
	background: url('/src/assets/images/index/bg.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.body_div {
	@extend .head_div;
}

.foot_div {
	width: 75%;
	margin-bottom: 58px;
	margin-top: 84px;
}

.big_button {
	width: 665px;
	height: 81px;
	background: #ffffff;
	border: 1px solid #c1c0c0;
	cursor: pointer;
	user-select: none;
}

.green {
	background: #128550;
	color: #ffffff;
}

.table_pack {
	margin-top: 39px;
}
</style>
