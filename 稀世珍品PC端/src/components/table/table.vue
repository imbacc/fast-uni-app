<template>
	<div class="table_pack" :class="type === 2 ? 'pack_min' : ''" :style="!showAdd ? 'margin-top: 0' : ''">
		<div v-if="type !== 3" class="table_head flex_align" :class="type === 2 ? 'head_min' : ''">
			<div class="table_code">商品条码</div>
			<div class="table_name">商品名</div>
			<div v-if="type === 2" class="table_price">规格</div>
			<div class="table_price">单价（元）</div>
			<div v-if="type === 1" class="table_num">数量</div>
			<div v-if="type === 1" class="table_compute">小计</div>
		</div>
		<div v-else class="table_head flex_align">
			<div class="table_code">订单编号</div>
			<div class="table_date">创建时间</div>
			<div class="table_num">订单数量</div>
			<div class="table_num">支付方式</div>
			<div class="table_num">订单金额</div>
			<div class="table_num">实付金额</div>
			<div class="table_price">订单状态</div>
			<div class="table_name">操作</div>
		</div>
		<div class="table_div" :class="type === 2 ? 'table_min' : type === 3 ? 'table3' : ''" :style="!showAdd ? 'max-height:213px;width:auto' : ''">
			<div class="table_body">
				<div
					class="table_row flex_align"
					:class="type === 2 ? 'row_min' : ''"
					v-for="(shop, idx) of table_list"
					:key="idx"
					:id="`table_${shop.id}`"
					:ref="(e) => (ref_list[idx] = e)"
					:style="row_style"
					@click="sel_row(shop)"
				>
					<template v-if="type !== 3">
						<div class="table_code" :style="style">{{ shop.bar_code }}</div>
						<div class="table_name" :style="style">{{ shop.name }}</div>
						<div v-if="type === 2" class="table_price" :style="style">{{ shop.price }}</div>
						<div class="table_price" :style="style">{{ shop.price }}</div>
						<div v-if="showAdd && type === 1" class="table_num" :style="style">
							<img class="dec_ico" src="/src/assets/images/index/dec_ico.png" @click="dec(idx)" />
							<input class="center_input" :style="`width:${`${shop.num}`.length * 10}px;`" :maxlength="6" v-model="shop.num" type="text" />
							<img class="add_ico" src="/src/assets/images/index/add_ico.png" @click="add(idx)" />
						</div>
						<div v-if="!showAdd && type === 1" class="table_price" style="border-right: 1px solid rgba(215, 215, 215, 0.8)">{{ shop.num }}</div>
						<div v-if="type === 1" class="table_compute">
							￥{{ shop.sum }}
							<img v-if="showAdd" class="del_ico" src="/src/assets/images/index/del_ico.png" @click="del_row(idx)" />
						</div>
					</template>
					<template v-else>
						<div class="table_code h69" :style="style">{{ shop.order_sn }}</div>
						<div class="table_date h69" :style="style">{{ format_date(shop.createtime) }}</div>
						<div class="table_num h69" :style="style">{{ shop.num }}</div>
						<div class="table_num h69" :style="style" :class="pay_str_class[shop.pay_type]">{{ pay_str[shop.pay_type] }}</div>
						<div class="table_num h69" :style="style">{{ shop.money }}</div>
						<div class="table_num h69" :style="style">{{ shop.pay_money }}</div>
						<div class="table_price h69" :style="style" :class="pay_state_class[shop.ispay]">{{ pay_state[shop.ispay] }}</div>
						<div class="table_name h69 table_button" :style="style">
							<div class="min_button flex_center_align" @click="emit_button(shop, 1)">退货</div>
							<div class="min_button flex_center_align" @click="emit_button(shop, 2)">补打小票</div>
							<div class="min_button flex_center_align" @click="emit_button(shop, 3)">查看详情</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, nextTick, defineComponent } from 'vue'
import { clone } from '@/common/tools/cmake_tools.js'

export default defineComponent({
	props: {
		type: {
			type: Number,
			default: 1
		},
		showAdd: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { emit }) {
		// reactive
		const data = reactive({
			table_list: [],
			ref_list: [],
			style: 'border-right: 1px solid RGBA(215, 215, 215, 0.8);',
			row_style: 'border-bottom: 1px solid RGBA(215, 215, 215, 0.8);',
			pay_str: ['', '视商收款', '微信', '支付宝'],
			pay_str_class: ['', 'view', 'wx', 'ali'],
			pay_state: ['未支付', '已支付', '已退货'],
			pay_state_class: ['gray', 'green', 'yellow']
		})

		const next = () => {
			nextTick(() => {
				let element = data.ref_list[data.ref_list.length - 1]
				element && element.scrollIntoView()
			})
		}

		// function
		const add_shop = (shop) => {
			data.table_list.push(shop)
			next()
		}

		const set_shop = (list) => {
			data.table_list = list
			next()
		}

		const add = (idx) => {
			if (data.table_list[idx].num > 99999) return
			data.table_list[idx].num = parseInt(data.table_list[idx].num) + 1
			data.table_list[idx].sum = parseInt(data.table_list[idx].num) * parseInt(data.table_list[idx].price)
		}

		const dec = (idx) => {
			if (data.table_list[idx].num <= 1) return
			data.table_list[idx].num = parseInt(data.table_list[idx].num) - 1
			data.table_list[idx].sum = parseInt(data.table_list[idx].num) * parseInt(data.table_list[idx].price)
		}

		const clear = () => {
			data.ref_list = []
			data.table_list = []
		}

		const del_row = (idx) => {
			data.table_list.splice(idx, 1)
			emit('delRow', idx)
		}

		const sel_row = (shop) => {
			const sel_shop = clone(shop)
			emit('selRow', sel_shop)
		}

		const format_date = (date) => new Date(parseInt(`${date}000`)).toLocaleString('zh')

		const emit_button = (shop, type) => emit('button', { shop, type })

		return {
			// reactive
			...toRefs(data),
			// function
			add_shop,
			set_shop,
			add,
			dec,
			clear,
			del_row,
			sel_row,
			format_date,
			emit_button
		}
	}
})
</script>

<style lang="scss" scoped>
.table_div {
	width: 100%;
	// height: 461px;
	height: 461px;
	border: 1px solid #d7d7d7;
	position: relative;
	overflow: hidden;
	overflow-y: auto;
}

.table_font {
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
}

.table_pack {
	margin-top: 29px;
	width: 100%;
}

.table_head {
	width: 100%;
	height: 56px;
	background: #585858;
	@extend .table_font;
}

.table_body {
	@extend .table_font;
	font-size: 16px;
	color: #000000;
}

.table_row {
	background: RGBA(255, 255, 255, 1);
	font-weight: 600;
	cursor: pointer;
}

.table_row:hover {
	background: #ccc;
}

.table_row:last-child {
	border-bottom: 0;
}

.table_row:nth-child(2n + 1) {
	background: RGBA(241, 241, 241, 1);
}

.table_row:nth-child(2n + 1):hover {
	background: #ccc;
}

.table_center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.head_height {
	height: 65px;
}

.table_code {
	// @extend .head_height;
	@extend .table_center;
	width: 239px;
}

.table_date {
	@extend .table_center;
	width: 299px;
	white-space: nowrap;
}

.table_name {
	// @extend .head_height;
	@extend .table_center;
	width: 502px;
}

.table_price {
	// @extend .head_height;
	@extend .table_center;
	width: 193px;
}

.table_num {
	// @extend .head_height;
	@extend .table_center;
	width: 192px;
}

.dec_ico {
	height: 17px;
	width: 17px;
}

.center_num {
	margin: 0 5px;
}

.center_input {
	outline: none;
	border: 0;
	background: transparent;
	text-align: center;
	padding: 0 8px;
	@extend .table_font;
	font-size: 16px;
	color: #000000;
	font-weight: bold;
}

.add_ico {
	@extend .dec_ico;
}

.table_compute {
	@extend .head_height;
	@extend .table_center;
	width: 255px;
}

.del_ico {
	height: 17px;
	width: 17px;
	margin-left: 18px;
}

.pack_min {
	border: 0 !important;
	margin-top: 0 !important;
	margin-bottom: 0 !important;
}

.table_min {
	height: 260px !important;
	border: 0 !important;
	margin-bottom: 0 !important;

	div {
		border: 0 !important;
	}
}

.table3 {
	height: 90% !important;
}

.row_min {
	height: 42px !important;
	margin-bottom: 0 !important;
	border: 0 !important;
}

.head_min {
	height: 34px !important;
}

::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: RGBA(88, 88, 88, 1);
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: rgba(193, 193, 193, 1);
}

.h69 {
	height: 69px;
}

.table_button {
	display: flex !important;
	justify-content: space-evenly !important;
}

.min_button {
	width: 80px;
	height: 31px;
	border: 1px solid #c1c0c0;
	border-radius: 16px;
	font-size: 16px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #555555;
	padding: 0 8px;
	white-space: nowrap;
}

.gray {
	color: #909399;
}

.green {
	color: #67c23a;
}

.yellow {
	color: #e6a23c;
}

.wx {
	color: #00a30b;
}

.ali {
	color: #3077fe;
}

.view {
	color: #e77200;
}
</style>
