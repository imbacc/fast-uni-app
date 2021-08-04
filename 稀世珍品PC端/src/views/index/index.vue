<template>
	<div class="index_pack">
		<div class="head_pack flex_center">
			<div class="head_div flex_align flex_between">
				<div class="flex_align" style="width: 100%">
					<img class="head_logo" src="/src/assets/images/index/logo.png" @click="print" />
					<div v-if="user_info" class="head_order flex_column">
						<text class="head_lab">
							用户：{{ user_info.nickname }}
							<a style="color: #92a5ff" href="javascript:;" @click="exit">退出</a>
						</text>
						<text class="head_lab mt10">店铺：{{ user_info.shop_name }}</text>
					</div>
					<div class="head_order flex_column">
						<text v-if="order_no" class="head_lab">订单编号：{{ order_no }}</text>
						<text v-if="order_no" class="head_lab mt10">流水号：{{ order_no }}</text>
					</div>
					<div class="head_time flex_column">
						<text v-if="order_time" class="head_lab">创建时间</text>
						<text v-if="order_time" class="head_lab mt10">{{ order_time }}</text>
					</div>
				</div>
				<div>
					<a href="/#/order-list" target="_blank" style="border: 0; text-decoration: none">
						<div class="head_print flex_column flex_align">
							<img class="print_ico" src="/src/assets/images/index/print_ico.png" />
							<text class="head_lab mt10">查看订单列表</text>
						</div>
					</a>
				</div>
			</div>
		</div>

		<div class="body_pack flex_column flex_align">
			<div class="body_div">
				<div class="search_div flex_center_align" style="border: 1px solid #d7d7d7" @click="show_search = true">
					<img class="search_ico" src="/src/assets/images/index/search_ico.png" />
					<div class="flex_align">
						<img class="key_code_ico" src="/src/assets/images/index/key_code_ico.png" />
						<input readonly class="search_input" placeholder="条码/拼音码/品名" />
					</div>
				</div>

				<div class="table_pack">
					<tableComp ref="tableRef" @delRow="delRow" />
				</div>

				<div class="count_div flex_align flex_between">
					<div class="clear_button flex_center_align" @click="clear">
						<img class="clear_ico" src="/src/assets/images/index/clear_ico.png" />
						清空产品
					</div>
					<div class="compute_div">
						<text class="compute_lab">数量 : {{ num_com }}件</text>
						<text class="compute_lab flex_align" style="margin-top: 5px">
							合计 :
							<text class="compute_sum">￥{{ price_com.toFixed(2) }}</text>
						</text>
					</div>
				</div>
			</div>

			<div class="foot_div flex_center_align">
				<div class="button_div flex_center_align green mr66" @click="other_pay(2)">
					<div class="flex_align">
						<img class="other_ico" src="/src/assets/images/index/wx_ico.png" />
						<div class="flex_column">
							<text class="button_lab">微信收款</text>
							<text class="button_lab flex_align">
								<text class="button_lab_y">￥</text>
								{{ price_com.toFixed(2) }}
							</text>
						</div>
					</div>
				</div>
				<div class="button_div flex_center_align blue mr66" @click="other_pay(3)">
					<div class="flex_align">
						<img class="other_ico" src="/src/assets/images/index/ali_ico.png" />
						<div class="flex_column">
							<text class="button_lab">支付宝收款</text>
							<text class="button_lab flex_align">
								<text class="button_lab_y">￥</text>
								{{ price_com.toFixed(2) }}
							</text>
						</div>
					</div>
				</div>
				<div class="button_div flex_center_align orange" @click="order_pay(1)">
					<div class="flex_align">
						<img class="other_ico" src="/src/assets/images/index/store_ico.png" />
						<div class="flex_column">
							<text class="button_lab">视商收款</text>
							<text class="button_lab flex_align">
								<text class="button_lab_y">￥</text>
								{{ price_com.toFixed(2) }}
							</text>
						</div>
					</div>
				</div>
			</div>
		</div>

		<alert v-if="show_alert" :type="alert_type" :slot="alert_slot" :msg="alert_msg" @cancel="show_alert = false" @confirm="confirm" @sel_pay="sel_pay">
			<div class="flex_column" style="border-top: 1px solid #d7d7d7; margin: 10px 0; padding: 10px 30px 40px 30px">
				<div class="alert_text">订单金额: {{ order_price }}</div>
				<div class="alert_text">购物券: {{ pay_coupon }}</div>
				<div class="alert_text">视商{{ view_pay_type === 1 ? '微信' : '支付宝' }}支付: {{ pay_price }}</div>
				<div class="alert_text flex_align flex_between">
					<div class="flex_align" style="white-space: nowrap">
						合计金额:
						<span class="alert_price">¥{{ parseFloat(order_price) + parseFloat(pay_coupon) }}</span>
					</div>
					<div class="alert_text flex_align" style="white-space: nowrap">
						支付时间:
						<span style="margin-left: 5px">
							{{ new Date().toLocaleString('zh', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' }) }}
						</span>
					</div>
				</div>
			</div>
		</alert>
		<search v-if="show_search" @close="show_search = false" @selRow="add_shop" />
		<loadingComp ref="loadingRef" />
	</div>
</template>

<script>
import { index_data } from '@/common/compose/index_data.js'
import { reactive, ref, toRefs, defineAsyncComponent, computed, onMounted } from 'vue'
import { timeHide, initPrint, outPrint, keyScan } from '@/common/tools/cmake_tools.js'
import { state, mutations } from '@common/compose/user_store.js'
import api from '@/common/config/api.js'

import tableComp from '@/components/table/table.vue'
import loadingComp from '@/components/loading/loading.vue'

const scale = document.documentElement.clientWidth / 480 / 2
document.documentElement.style.fontSize = 16 * Math.min(scale, 2) + 'px'

export default {
	components: {
		alert: defineAsyncComponent(() => import('@/components/alert/alert.vue')),
		search: defineAsyncComponent(() => import('@/components/search/search.vue')),
		tableComp,
		loadingComp
	},
	setup() {
		// init
		onMounted(() => {
			// 扫描枪监听
			keyScan((code) => {
				console.log('keyScan code=', code)
				// ctx.loading.open()
				loadingRef.value.open()
				let shop_id = state.user_info?.shop_id || state.user_info.data.shop_id
				api('goods_search', { limit: 1, r: code, shop_id }).then((res) => {
					// ctx.loading.close()
					loadingRef.value.close()
					if (res && res.length > 0) {
						add_shop(res[0])
					}
				})
			})

			// 初始化打印插件
			initPrint()
		})

		// reactive
		const data = reactive({
			table_type: 1,
			alert_type: 1,
			alert_msg: '',
			alert_slot: false,
			show_alert: false,
			show_search: false,
			order_no: '',
			order_time: '',
			order_price: 0,
			pay_coupon: 0,
			pay_price: 0,
			pay_type: 1,
			pay_str: ['', '视商收款', '微信', '支付宝'],
			view_pay_type: 1
		})

		// ref
		const tableRef = ref(null)
		const loadingRef = ref(null)

		// computed
		const num_com = computed(() => index_data.index_list.reduce((t, v) => t + parseInt(v.num || 0), 0))
		const price_com = computed(() => index_data.index_list.reduce((t, v) => t + parseInt(v.num) * parseFloat(v.price), 0))

		// function
		const add_shop = (shop) => {
			console.log('shop=', shop)
			let newShop = Object.assign({}, shop)
			newShop.num = newShop.num ? parseInt(newShop.num) : 1
			newShop.price = newShop.price ? parseFloat(newShop.price) : 1
			newShop.sum = newShop.num * newShop.price

			const idx = index_data.index_list.findIndex((f) => f.id === shop.id)
			if (idx !== -1) {
				index_data.index_list[idx].num += newShop.num
				index_data.index_list[idx].sum = index_data.index_list[idx].num * index_data.index_list[idx].price
				data.show_search = false
				return
			}

			index_data.index_list.push(newShop)
			tableRef.value.add_shop(newShop)
			// data.show_search = false
			// console.log('index_data.index_list=', index_data.index_list)
		}

		const clear = () => {
			data.alert_slot = false
			data.alert_type = 1
			data.alert_msg = '是否清空产品?'
			data.show_alert = true
			// data.pay_coupon = '0.00'
			// data.order_price = '0.01'
			// data.pay_price = '0.01'
			// data.alert_slot = true
			// data.alert_type = 3
			// data.alert_msg = '已成功付款'
			// data.show_alert = true
		}

		const confirm = (e) => {
			// 确认清空商品
			if (e === 1) {
				index_data.index_list = []
				tableRef.value.clear()
			}

			// 确认结算订单
			if (e === 6) {
				order_pay(data.pay_type)
			}

			// 退出登录
			if (e === 7) {
				location = '/#/login'
			}
			data.show_alert = false
		}

		const delRow = (idx) => {
			index_data.index_list.splice(idx, 1)
		}

		const goods_id_list = () => {
			return Array.from(index_data.index_list, ({ id, num }) => {
				return { id, num }
			})
		}

		// 其他收款 2:支付宝 微信二维码
		const other_pay = (type) => {
			const id_list = goods_id_list()
			if (id_list.length === 0) return
			data.alert_slot = false
			data.pay_type = type
			data.alert_type = 6
			data.alert_msg = '是否确认结算订单?'
			data.show_alert = true
		}

		// 1:视商收款
		const order_pay = (type) => {
			const id_list = goods_id_list()
			if (id_list.length === 0) return
			data.alert_slot = false
			data.pay_type = type
			data.alert_type = 2
			data.alert_msg = '结算中...'
			data.show_alert = true
			api('goods_order', {}, { goods: id_list, pay_type: type }).then((res) => {
				if (res) {
					data.order_time = new Date(parseInt(`${res.createtime}000`)).toLocaleString('zh')
					data.order_no = res.order_sn
					if (type === 1) {
						for_check(3000, 5000, 3)
						return
					}
					if (type === 2 || type === 3) {
						data.alert_slot = false
						data.alert_type = 3
						data.alert_msg = '已成功付款'
						data.show_alert = true
						print()
						clear_data()
						timeHide(1000).then(() => (data.show_alert = false))
						return
					}
				} else {
					data.alert_slot = false
					data.alert_type = 5
					data.alert_msg = '创建订单失败!'
					data.show_alert = true
					timeHide(1500).then(() => (data.show_alert = false))
				}
			})
		}

		const for_check = (time, nextTime, num) => {
			if (num <= 0) {
				data.alert_slot = false
				data.alert_type = 4
				data.alert_msg = '支付超时'
				data.show_alert = true
				return
			}
			timeHide(time).then(() => {
				api('check_pay').then((res) => {
					console.log('res=', res)
					if (res && res.pay_status === 1) {
						data.view_pay_type = res.pay_type
						data.pay_coupon = res.coupon_money
						data.order_price = res.order_money
						data.pay_price = res.pay_money
						data.alert_slot = true
						data.alert_type = 3
						data.alert_msg = '已成功付款'
						data.show_alert = true
						print()
						clear_data()
					} else {
						for_check(nextTime || time, nextTime, num - 1)
					}
				})
			})
		}

		const sel_pay = () => {
			api('check_pay').then((res) => {
				console.log('res=', res)
				if (res && res.pay_status === 1) {
					data.view_pay_type = res.pay_type
					data.pay_coupon = res.coupon_money
					data.order_price = res.order_money
					data.pay_price = res.pay_money
					data.alert_slot = true
					data.alert_type = 3
					data.alert_msg = '已成功付款'
					data.show_alert = true
					print()
					clear_data()
				} else {
					data.alert_slot = false
					data.alert_type = 5
					data.alert_msg = '支付失败!'
					data.show_alert = true
					timeHide(1500).then(() => (data.show_alert = false))
				}
			})
		}

		const clear_data = () => {
			data.order_no = ''
			data.order_time = ''
			index_data.index_list = []
			tableRef.value.clear()
		}

		// 打印小票
		const print = () => {
			loadingRef.value.open()
			const list = index_data.index_list
			const sum_price = Array.from(list, ({ sum }) => sum).reduce((t, v) => t + v)
			const sum_count = [...new Set(Array.from(list, ({ id }) => id))]
			outPrint({
				list,
				shop_name: state.user_info?.shop_name || state.user_info.data.shop_name,
				order_no: data.order_no,
				order_time: data.order_time,
				keys: ['num', 'name', 'sum'],
				sum_count,
				sum_price,
				pay_type: data.pay_type === 1 ? `视商${data.view_pay_type === 1 ? '微信' : '支付宝'}` : data.pay_str[data.pay_type],
				pay_price: data.pay_type === 3 ? sum_price : data.pay_price,
			})
			loadingRef.value.close()
		}

		const exit = () => {
			data.alert_slot = false
			data.alert_type = 7
			data.alert_msg = '是否退出登录?'
			data.show_alert = true
			mutations.set_logout()
		}

		return {
			// reactive
			...toRefs(data),
			index_list: index_data.index_list,
			user_info: state.user_info,
			// computed
			num_com,
			price_com,
			// ref
			tableRef,
			loadingRef,
			// function
			add_shop,
			clear,
			confirm,
			delRow,
			other_pay,
			order_pay,
			sel_pay,
			print,
			exit
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
}
.head_div {
	// width: calc(100% - (262px * 2));
	width: 75%;
	height: 100%;
}

.head_logo {
	height: 59px;
	width: 199px;
}

.head_order {
	width: 251px;
	margin-left: 130px;
}

.head_lab {
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 500;
	white-space: nowrap;
	color: #ffffff;
}

.head_time {
	@extend .head_order;
	margin-left: 237px;
}

.head_print {
	user-select: none;
	cursor: pointer;
}

.print_ico {
	height: 30px;
	width: 30px;
}

.mt10 {
	margin-top: 10px;
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

.search_div {
	width: 100%;
	height: 48px;
	background: #ffffff;
	margin-top: 28px;
	position: relative;
	user-select: none;
	cursor: pointer;
}

.search_ico {
	height: 22px;
	width: 22px;
	position: absolute;
	left: 25px;
}

.search_input {
	width: 300px;
	height: 96%;
	border: 0;
	outline: none;
	background: transparent;
	cursor: pointer;
}

.key_code_ico {
	margin-right: 5px;
	height: 18px;
	width: 31px;
	margin-left: 200px;
}

.count_div {
	height: 60px;
	width: 100%;
	margin-top: 31px;
}

.clear_ico {
	height: 18px;
	width: 18px;
	margin-right: 5px;
}

.clear_button {
	width: 122px;
	height: 35px;
	background: #585858;
	border-radius: 8px;
	font-size: 16px;
	font-family: PingFang SC;
	font-weight: 600;
	color: #ffffff;
	user-select: none;
	cursor: pointer;
}

.compute_div {
	height: 100%;
	margin-right: 3px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.compute_lab {
	font-size: 16px;
	font-family: PingFang SC;
	font-weight: 600;
	color: #000000;
}

.compute_sum {
	@extend .compute_lab;
	font-size: 22px;
	color: rgba(255, 0, 0, 1);
}

.foot_div {
	// height: 106px;
	margin-bottom: 49px;
	margin-top: 68px;
}

.button_div {
	width: 418px;
	height: 112px;
	border-radius: 16px;
	user-select: none;
	cursor: pointer;
}

.green {
	background: #00a30b;
}

.blue {
	background: #3077fe;
}

.mr66 {
	margin-right: 66px;
}

.orange {
	background: #e77200;
}

.other_ico {
	height: 52px;
	width: 52px;
	margin-right: 10px;
	user-select: none;
}

.button_lab {
	font-size: 22px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
}

.button_lab_y {
	@extend .button_lab;
	margin-left: -3px;
}

.alert_text {
	font-size: 20px;
	font-family: PingFang SC;
	font-weight: 600;
	color: #555555;
	margin-bottom: 3px;
}

.alert_price {
	color: #e77200;
	font-size: 24px;
	margin-left: 5px;
}
</style>
