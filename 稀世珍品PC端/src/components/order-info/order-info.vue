<template>
	<div class="search_pack flex_center_align" :class="show ? '' : 'hide'">
		<div class="search_div">
			<div class="search_head flex_align flex_between">
				<text class="search_head_lab">订单详情</text>
				<img class="search_head_ico" src="/src/assets/images/index/x_ico.png" @click="close" />
			</div>

			<div class="search_body flex_center">
				<tableComp :type="1" :showAdd="false" ref="tableRef" />
			</div>
		</div>

		<loadingComp ref="loadingRef" />
	</div>
</template>

<script>
import { ref, reactive, toRefs, defineComponent } from 'vue'

import tableComp from '@/components/table/table.vue'
import loadingComp from '@/components/loading/loading.vue'

export default defineComponent({
	components: {
		tableComp,
		loadingComp
	},
	setup(props, { emit }) {
		const data = reactive({
			show: false
		})

		// ref
		const tableRef = ref(null)
		const loadingRef = ref(null)

		// function
		const set_table = (list) => {
			let table_list = []
			list.forEach((info) => {
				table_list.push({
					bar_code: info.bar_code,
					name: info.goods_name,
					num: info.num,
					price: info.money,
					sum: parseFloat(info.money) * parseInt(info.num)
				})
			})
			tableRef.value.set_shop(table_list)
		}

		const change = () => (data.show = !data.show)

		const close = () => (data.show = false)

		return {
			// reactive
			...toRefs(data),
			// ref
			tableRef,
			loadingRef,
			// function
			set_table,
			close,
			change
		}
	}
})
</script>

<style lang="scss" scoped>
.search_pack {
	min-height: 100vh;
	width: 100%;
	background: RGBA(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	overflow: hidden;
	user-select: none;
}

.search_div {
	width: 900px;
	height: 465px;
	background: #ffffff;
}

.search_head {
	width: 100%;
	height: 56px;
	background: #0b7142;
}

.search_head_lab {
	font-size: 20px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	margin-left: 32px;
}

.search_head_ico {
	height: 17px;
	width: 17px;
	margin-right: 23px;
	cursor: pointer;
}

.search_body {
	width: 100%;
}

.hide {
	display: none;
}
</style>
