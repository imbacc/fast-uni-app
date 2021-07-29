<template>
	<view class="info_pack">
		<shopList ref="shoplist" />
	</view>
</template>

<script>
	import shopList from '@/components/shop-list/shop-list.vue'
	
	export default {
		components: {
			shopList
		},
	    data() {
	        return {
	            stock_page: null
	        };
	    },
		onReady() {
			this.$nextTick(() => {
				const ref = this.$refs.shoplist
				ref.set_val('api_name', 'stock_list')
				ref.set_val('confirm_type', 3)
				ref.set_val('now_search', () => {
					const shop_list = ref.get_val('shop_page').list
					const input_text = ref.get_val('input_text')
					console.log('shop_list=', shop_list)
					console.log('input_text=', input_text)
					ref.set_val('search_list', shop_list.filter((f) => f.name.indexOf(input_text) !== -1))
				})
				ref.search_shop()
			})
		},
		onReachBottom() {
			this.$nextTick(() => this.$refs.shoplist.reach_shop())
		},
	    methods: {
			
	    },
	}
</script>

<style lang="scss" scoped>
	page {
		overflow: hidden;
	}
</style>
