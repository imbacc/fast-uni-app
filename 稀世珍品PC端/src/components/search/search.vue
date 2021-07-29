<template>
	<div class="search_pack flex_center_align">
		<div class="search_div">
			<div class="search_head flex_align flex_between">
				<text class="search_head_lab">选择商品</text>
				<img class="search_head_ico" src="/src/assets/images/index/x_ico.png" @click="close" />
			</div>

			<div class="search_body flex_column flex_center_align">
				<div class="search_input_pack flex_align flex_between">
					<div class="flex_align">
						<img class="search_input_ico" src="/src/assets/images/index/search_ico.png" />
						<input ref="inputRef" v-model="text" @keydown.enter="search" class="search_input" type="text" />
					</div>
					<div class="search_button flex_center_align" @click="search">搜索</div>
				</div>

				<div class="search_table_pack">
					<tableComp :list="search_list" :type="2" ref="tableRef" @selRow="selRow" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent, getCurrentInstance, onMounted } from 'vue'
import { index_data } from '@/common/compose/index_data.js'
import { state } from '@common/compose/user_store.js'
import api from '@/common/config/api.js'

import tableComp from '@/components/table/table.vue'

export default defineComponent({
	components: {
		tableComp
	},
	setup(props, { emit }) {
		// init
		const { ctx } = getCurrentInstance()

		onMounted(() => {
			inputRef.value.focus()
		})

		// reactive
		const data = reactive({
			text: ''
		})

		// ref
		const tableRef = ref(null)
		const inputRef = ref(null)

		// function
		const close = () => emit('close')

		const selRow = (shop) => emit('selRow', shop)

		const clear = () => {
			data.alert_type = 1
			data.show_alert = true
		}

		const search = () => {
			if (!data.text || data.text === '') return
			ctx.loading.open()
			api('goods_search', { limit: 10, r: data.text, shop_id: state.user_info.data.shop_id }).then((res) => {
				ctx.loading.close()
				if (res) {
					tableRef.value.set_shop(res)
				}
			})
		}

		return {
			// reactive
			...toRefs(data),
			search_list: index_data.search_list,
			// ref
			tableRef,
			inputRef,
			// function
			close,
			search,
			selRow
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

.search_input_pack {
	width: 847px;
	height: 43px;
	background: #eaeaea;
	border-radius: 8px;
	margin: 20px 0;
}

.search_input_ico {
	height: 22px;
	width: 22px;
	margin: 0 15px;
}

.search_input {
	height: 43px;
	width: 600px;
	outline: none;
	border: 0;
	background: transparent;
	font-size: 22px;
}

.search_button {
	height: 43px;
	width: 110px;
	background: url('/src/assets/images/index/right_button.png');
	background-size: 100%;
	background-repeat: no-repeat;
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	cursor: pointer;
}

.search_table_pack {
	width: 847px;
	height: 294px;
	border: 1px solid #dedede;
}
</style>
