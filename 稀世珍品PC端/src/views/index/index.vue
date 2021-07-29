<template>
	<div class="index_pack">
		<div class="head_pack flex_center">
			<div class="head_div flex_align flex_between">
				<div class="flex_align">
					<img class="head_logo" src="/src/assets/images/index/logo.png" @click="print" />
					<div class="head_order flex_column">
						<text v-if="order_no" class="head_lab">订单编号：{{ order_no }}</text>
						<text v-if="order_no" class="head_lab mt10">流水号：{{ order_no }}</text>
					</div>
					<div class="head_time flex_column">
						<text v-if="order_time" class="head_lab">创建时间</text>
						<text v-if="order_time" class="head_lab mt10">{{ order_time }}</text>
					</div>
				</div>
				<div class="head_print flex_column flex_align" @click="print">
					<img class="print_ico" src="/src/assets/images/index/print_ico.png" />
					<text class="head_lab mt10">打印结账小票</text>
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
					<tableComp :list="index_list" ref="tableRef" @delRow="delRow" />
				</div>

				<div class="count_div flex_align flex_between">
					<div class="clear_button flex_center_align" @click="clear">
						<img class="clear_ico" src="/src/assets/images/index/clear_ico.png" />
						清空产品
					</div>
					<div class="compute_div">
						<text class="compute_lab">数量 : {{ num_com }}件</text>
						<text class="compute_lab flex_align">
							合计 :
							<text class="compute_sum">￥{{ price_com.toFixed(2) }}</text>
						</text>
					</div>
				</div>
			</div>

			<div class="foot_div flex_center_align">
				<div class="button_div flex_center_align green mr66" @click="other_pay()">
					<div class="flex_align">
						<img class="other_ico" src="/src/assets/images/index/other_ico.png" />
						<div class="flex_column">
							<text class="button_lab">其他收款</text>
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

		<alert v-if="show_alert" :type="alert_type" :msg="alert_msg" @cancel="show_alert = false" @confirm="confirm" @sel_pay="sel_pay" />
		<search v-if="show_search" @close="show_search = false" @selRow="add_shop" />
	</div>
</template>

<script>
import { index_data } from '@/common/compose/index_data.js'
import { reactive, ref, toRefs, defineAsyncComponent, computed, onMounted, getCurrentInstance } from 'vue'
import { clone, timeHide, initPrint, outPrint, keyScan } from '@/common/tools/cmake_tools.js'
import { state } from '@common/compose/user_store.js'
import api from '@/common/config/api.js'
import panel from '@/common/tools/panel.js'
import tableComp from '@/components/table/table.vue'

export default {
	components: {
		tableComp,
		alert: defineAsyncComponent(() => import('@/components/alert/alert.vue')),
		search: defineAsyncComponent(() => import('@/components/search/search.vue'))
	},
	setup() {
		const { ctx } = getCurrentInstance()

		// init
		onMounted(() => {
			// 扫描枪监听
			keyScan((code) => {
				console.log('keyScan code=', code)
				ctx.loading.open()
				api('goods_search', { limit: 1, r: code, shop_id: state.user_info.data.shop_id }).then((res) => {
					ctx.loading.close()
					if (res && res.length > 0) {
						add_shop(res[0])
					}
				})
			})

			// 初始化打印插件
			const hiprintTemplate = initPrint()

			hiprintTemplate.on('printSuccess', function (data) {
				console.log('printSuccess data=', data)
			})

			hiprintTemplate.on('printError', function (data) {
				console.log('printSuccess data=', data)
			})
		})

		// reactive
		const data = reactive({
			table_type: 1,
			alert_type: 1,
			alert_msg: '',
			show_alert: false,
			show_search: false,
			order_no: '',
			order_time: ''
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
				data.show_search = false
				return
			}

			index_data.index_list.push(newShop)
			tableRef.value.add_shop(newShop)
			data.show_search = false
			console.log('index_data.index_list=', index_data.index_list)
		}

		const clear = () => {
			data.alert_type = 1
			data.show_alert = true
		}

		const confirm = (e) => {
			// 确认清空商品
			if (e === 1) {
				index_data.index_list = []
				tableRef.value.clear()
			}

			// 确认结算订单
			if (e === 6) {
				order_pay(2)
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
		const other_pay = () => {
			data.alert_type = 6
			data.alert_msg = '是否确认结算订单?'
			data.show_alert = true
		}

		// 1:视商收款
		const order_pay = (type) => {
			const id_list = goods_id_list()
			if (id_list.length === 0) return
			data.alert_type = 2
			data.alert_msg = ''
			data.show_alert = true
			api('goods_order', {}, { goods: id_list, pay_type: type }).then((res) => {
				if (res) {
					data.order_time = new Date(parseInt(`${res.createtime}000`)).toLocaleString('zh')
					data.order_no = res.order_sn
					if (type === 1) {
						for_check(3000, 5000, 3)
						return
					}
					if (type === 2) {
						data.alert_type = 3
						data.show_alert = true
						timeHide(1000).then(() => (data.show_alert = false))
						return
					}
				} else {
					data.alert_type = 5
					data.alert_msg = '创建订单失败!'
					data.show_alert = true
					timeHide(1500).then(() => (data.show_alert = false))
				}
			})
		}

		const for_check = (time, nextTime, num) => {
			if (num <= 0) {
				data.alert_type = 4
				data.show_alert = true
				return
			}
			timeHide(time).then(() => {
				api('check_pay').then((res) => {
					console.log('res=', res)
					if (res) {
						data.alert_type = 3
						data.show_alert = true
					} else {
						for_check(nextTime || time, nextTime, num - 1)
					}
				})
			})
		}

		const sel_pay = () => {
			api('check_pay').then((res) => {
				console.log('res=', res)
				if (res) {
					data.alert_type = 3
					data.show_alert = true
				} else {
					data.alert_type = 5
					data.alert_msg = '支付失败!'
					data.show_alert = true
				}
			})
		}

		// 打印小票
		const print = () => {
			if (index_data.index_list.length === 0 || data.order_no === '' || data.order_time === '') {
				data.alert_type = 5
				data.alert_msg = '请先创建订单后打印!'
				data.show_alert = true
				timeHide(1000).then(() => (data.show_alert = false))
				return
			}
			const template = create_temp()
			outPrint(template)
		}

		// 创建打印模板
		const create_temp = () => {
			let temp = clone(panel)
			let ele = temp.panels[0].printElements
			let shop_name = state.user_info?.shop_name || state.user_info.data.shop_name
			ele[1].options.title = shop_name
			ele[2].options.title = `单号：${data.order_no}`
			ele[3].options.title = `时间：${data.order_time}`
			const shop_list_top = (idx) => idx * 20
			const other_top = index_data.index_list.length * 20
			// 添加商品列表
			index_data.index_list.forEach((info, idx) => {
				let list_top = 171 + shop_list_top(idx)
				ele.push({
					options: { left: 120, top: list_top, height: 9.75, width: 82.5, title: `${info.num}`, fontSize: 10.5, fontWeight: 'bold', textAlign: 'center' },
					printElementType: { type: 'text' }
				})
				ele.push({
					options: { left: 13.5, top: list_top, height: 9.75, width: 105, title: `${info.name}`, fontSize: 10.5, fontWeight: 'bold' },
					printElementType: { type: 'text' }
				})
				ele.push({
					options: { left: 202.5, top: list_top, height: 9.75, width: 103.5, title: `${info.sum}`, textAlign: 'center', fontSize: 10.5, fontWeight: 'bold' },
					printElementType: { type: 'text' }
				})
			})
			// 添加虚线
			ele.push({
				options: { left: 12, top: 201 + other_top, height: 9, width: 280.5, borderStyle: 'dotted' },
				printElementType: { type: 'hline' }
			})
			// 添加总数统计
			const sum_count = [...new Set(Array.from(index_data.index_list, ({ id }) => id))]
			ele.push({
				options: { left: 171, top: 334.5 + other_top, height: 15, width: 135, title: `总数：${sum_count.length}`, fontWeight: 'bold', fontSize: 13.5 },
				printElementType: { type: 'text' }
			})
			const sum_price = Array.from(index_data.index_list, ({ sum }) => sum).reduce((t, v) => t + v)
			ele.push({
				options: {
					left: 171,
					top: 357 + other_top,
					height: 19.5,
					width: 135,
					title: `总计：${new Number(sum_price).toFixed(2)}`,
					fontWeight: 'bold',
					fontSize: 13.5
				},
				printElementType: { type: 'text' }
			})
			ele.push({
				options: {
					left: 171,
					top: 381 + other_top,
					height: 18,
					width: 133.5,
					title: `实付：${new Number(sum_price).toFixed(2)}`,
					fontWeight: 'bold',
					fontSize: 13.5
				},
				printElementType: { type: 'text' }
			})
			// 添加底部文字
			ele.push({
				options: {
					left: 24,
					top: 463.5 + (index_data.index_list.length > 1 ? other_top : 0),
					height: 16.5,
					width: 250.5,
					title: '谢谢惠顾，欢迎下次光临',
					textAlign: 'center',
					fontSize: 13.5,
					fontWeight: 'bold'
				},
				printElementType: { type: 'text' }
			})
			temp.panels[0].printElements = ele
			return temp
		}

		return {
			// reactive
			...toRefs(data),
			index_list: index_data.index_list,
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
			print
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
	width: calc(100% - (262px * 2));
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
	height: 106px;
	margin-bottom: 49px;
}

.button_div {
	width: 418px;
	height: 106px;
	border-radius: 16px;
	user-select: none;
	cursor: pointer;
}

.green {
	background: #0d7142;
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
</style>
