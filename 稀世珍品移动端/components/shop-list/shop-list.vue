<template>
	<view class="body_div">
		<view class="flex_align">
			<view class="search_div flex_align" :class="input_css_com ? 'change_input' : ''">
				<image class="search_ico" src="/static/img/index/search_ico.png" mode="aspectFill" />
				<input
					class="input_text"
					maxlength="32"
					type="text"
					v-model="input_text"
					placeholder="请输入产品名称"
					placeholder-class="input_plc"
					@focus="input_focus = true"
					@blur="input_focus = false"
					@confirm="search_shop(1, false, 'search')"
				/>
				<view v-if="input_text.length > 0" class="close_div flex_center_align" @click="clear">
					<image class="close_ico" src="/static/img/index/close_ico.png" mode="aspectFill" />
				</view>
			</view>
			<view v-if="input_css_com" class="input_button flex_center_align" @click="search_shop(1, false, 'search')">搜索</view>
		</view>
		
		<template v-if="confirm_type === 1">
			<template v-if="shop_page && shop_page.list.length > 0">
				<scroll-view
					style="height: 80vh;margin-top: 20rpx;"
					:scroll-top="scroll_top"
					scroll-y
					scroll-with-animation
					scroll-anchoring
					:scroll-into-view="scroll_id"
					@scrolltolower="reach_shop"
				>
					<shopInfo :list="shop_page.list" :type="1" @confirm="confirm" />
				</scroll-view>
			</template>
			<noMore v-else />
		</template>
		
		<template v-if="confirm_type === 2">
			<shopInfo :list="confirm_list" :type="2" @confirm="confirm" />
		</template>
		
		<template v-if="confirm_type === 3 && search_list.length === 0">
			<shopInfo :list="shop_page.list" :type="3" @confirm="confirm" />
		</template>
		
		<template v-if="confirm_type === 3 && search_list.length > 0">
			<shopInfo :list="search_list" :type="3" @confirm="confirm" />
		</template>
		
	</view>
</template>

<script>
	import shopInfo from '@/components/shop-info/shop-info.vue'
	import noMore from '@/components/no-more/no-more.vue'
	
	import appendData from '@/common/class/append_data.js'
	
	export default {
		components: {
			shopInfo,
			noMore
		},
	    data() {
	        return {
				add_time: null,
				scroll_id: '',
				scroll_top: 0,
				shop_page: null,
	            input_text: '',
	            input_focus: false,
				confirm_type: 1,
				confirm_list: [],
				search_list: [],
				api_name: 'page_goods',
				now_search: false
	        };
	    },
		computed: {
			input_css_com() {
				return this.input_focus || this.input_text.length > 0
			}
		},
	    methods: {
			get_val(key) {
				return this[key]
			},
			set_val(key, val) {
				this[key] = val
			},
	        // 分页请求
	        search_shop(page = 1, append = false, type = 'remote', fun) {
				if (type !== 'remote' && this.now_search) {
					this.now_search()
					return
				} 
	        	if (!this.shop_page) {
	        		const _page = new appendData()
	        		_page.name = this.api_name
	        		_page.method = 'GET'
	        		_page.key = 'rows'
	        		this.shop_page = _page
	        	}
				if (!isNaN(parseInt(this.input_text.slice(0, 3))) ) {
					this.shop_page.param = { bar_code: this.input_text }
				} else {
					this.shop_page.param = { name: this.input_text }
				}
	        	this.shop_page.fun(page, append).then(() => fun && fun())
	        },
			reach_shop() {
				if (this.shop_page) this.shop_page.next_fun(this, '没有更多商品了...')
			},
			// async mock_add() {
			// 	this.is_tools.to_msg('模拟添加商品!')
			// 	let shop = {
			// 		id: this.shop_page.list.length,
			// 		name: '和成天下槟榔100元装',
			// 		spec: '1',
			// 		code: 'JKK00125314',
			// 		num: 0,
			// 		price: 111,
			// 		createTime: '2020-06-01 18:00:00'
			// 	}
			// 	this.shop_page.list.push(shop)
			// 	this.next_add(shop)
			// 	let time = setTimeout(() => {
			// 		clearTimeout(time)
			// 		this.mock_add()
			// 	}, 500)
			// },
			async next_add(shop) {
				clearTimeout(this.add_time)
				this.add_time = setTimeout(() => {
					clearTimeout(this.add_time)
					this.$nextTick(() => {
						this.scroll_id = `shop_${this.shop_page.list[this.shop_page.list.length - 1].id}`
						console.log(this.scroll_id)
						console.log(this.shop_page.list)
					})
				}, 60)
			},
			confirm({ type, info }) {
				this.confirm_type = type
				if (info) this.confirm_list = [info]
			},
			clear() {
				console.log('this.confirm_type=', this.confirm_type)
				if (this.confirm_type === 1) {
					this.input_text = ''
					this.confirm_type = 1
					this.search_shop()
				}
				
				if (this.confirm_type === 3) {
					this.input_text = ''
					this.confirm_type = 3
				}
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.body_div {
		@extend .hw100b;
		height: calc(100% - 232rpx);
		// height: 90vh;
		overflow: hidden;
		background: #ebebeb;
		padding: 30rpx 30rpx 0 30rpx;
	}
	
	.search_div {
		width: 690rpx;
		height: 60rpx;
		@extend .bg_white;
		border-radius: 37rpx;
		transition: 0.1s;
		position: relative;
	}
	
	.search_ico {
		height: 22rpx;
		width: 26rpx;
		margin-left: 21rpx;
	}
	
	.input_text {
		margin-left: 13rpx;
		margin-top: -5rpx;
		width: 100%;
		padding: 0 30rpx 0 5rpx;
	}
	
	.input_button {
		height: 45rpx;
		width: 100rpx;
		background: rgba(70, 193, 27, 1);
		border-radius: 6rpx;
		@extend .font;
		@extend .f500;
		color: #ffffff;
		font-size: 18rpx;
		margin-left: 15rpx;
	}
	
	.change_input {
		width: 590rpx;
	}
	
	.input_plc {
		font-size: 26rpx;
		font-weight: 400;
		@extend .font;
		@extend .c999999;
	}
	
	.close_div {
		height: 30rpx;
		width: 30rpx;
		background: white;
		border-radius: 50%;
		position: absolute;
		right: 20rpx;
	}
	
	.close_ico {
		height: 20rpx;
		width: 20rpx;
	}
</style>
