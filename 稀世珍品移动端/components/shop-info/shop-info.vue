<template>
	<view class="shop_list_div">
		<view v-for="(info, idx) of list" :key="info.id" :id="'shop_' + info.id">
			<view class="shop_div flex_align flex_between">
				<view class="shop_info">
					<view class="shop_lab">{{ info.name }}</view>
					<view class="shop_lab shop_gray f26 mt10">规格 {{ info.specs }}</view>
					<view class="shop_lab shop_gray f26 mt10">条形码 : {{ info.bar_code }}</view>
				</view>
				<view v-if="type === 1" class="button_div flex_center_align" @click="confirm(2, info)">确定</view>
			</view>

			<view v-if="type === 2" class="shop_foot">
				<view class="foot_row foot_num_pack flex_align flex_between">
					<view class="shop_lab ml44">入库数量</view>
					<view class="flex_align mr38">
						<image
							class="dec_ico"
							src="/static/img/index/dec_ico.png"
							mode="aspectFill"
							@click="dec_num"
							@touchstart="num_start('dec_num', 350)"
							@touchend="num_end"
							@touchcancel="num_end"
						/>
						<view class="comput_lab shop_lab">
							<input :style="`width: ${`${put_num}`.length * 20}rpx;`" :maxlength="6" type="number" v-model="put_num" />
						</view>
						<image
							class="add_ico"
							src="/static/img/index/add_ico.png"
							mode="aspectFill"
							@click="add_num"
							@touchstart="num_start('add_num', 350)"
							@touchend="num_end"
							@touchcancel="num_end"
						/>
					</view>
				</view>
				<view class="foot_row foot_price_pack flex_align flex_between">
					<view class="shop_lab ml44">零售单价(元)</view>
					<view class="flex_align foot_price flex_end mr38">
						<view class="comput_lab shop_lab flex_align">
							￥
							<input
								:style="`width: ${`${put_price}`.length * 20}rpx;`"
								:maxlength="6"
								type="number"
								v-model="put_price"
								:value="info.cost"
							/>
						</view>
					</view>
				</view>
			</view>

			<view v-if="type === 3" class="shop_foot2">
				<view class="shop_lab ml44 mt18">入库时间 : {{ date_com(info.createtime) }}</view>
				<view class="foot_row mt18 flex_align flex_between">
					<view class="shop_lab ml44">入库数量 : {{ info.stock }}</view>
					<view class="shop_lab mr66">零售单价(元) {{ info.price }}</view>
				</view>
			</view>
		</view>

		<view v-if="type === 2" class="put_button flex_center_align" @click="put_shop">确认录入</view>

		<alert v-if="alert_show" :type="2" :title="alert_title" :bool="alert_bool" @cancel="alert_show = false" />
	</view>
</template>

<script>
import alert from '@/components/alert/alert.vue'

export default {
	name: 'shop-info',
	components: {
		alert
	},
	props: {
		type: {
			type: Number,
			default: 1
		},
		list: Array
	},
	data() {
		return {
			put_num: 1,
			put_price: 1,
			alert_show: false,
			alert_title: '',
			alert_bool: false,
			num_time: null,
			num_bool: false
		}
	},
	computed: {
		date_com() {
			return (date) =>
				date &&
				new Date(parseInt(`${date}000`))
					.toLocaleString('zh', {
						hour12: false,
						month: '2-digit',
						day: '2-digit',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric'
					})
					.replace(/\\/g, '-')
		}
	},
	watch: {
		put_num(newValue, oldValue) {
			if (newValue === '') this.put_num = 1
			if (oldValue === 1 && newValue === '') this.put_num = '1'
		},
		// put_price(newValue, oldValue) {
		// 	if (newValue === '') this.put_price = 1
		// 	if (oldValue === 1 && newValue === '') this.put_price = '1'
		// }
	},
	methods: {
		confirm(type, info) {
			this.$emit('confirm', { type, info })
		},
		add_num() {
			if (this.put_num > 9999999) return
			this.put_num += 1
		},
		dec_num() {
			if (this.put_num <= 1) return
			this.put_num -= 1
		},
		num_start(fun, time = 350) {
			clearTimeout(this.num_time)
			this.num_time = setTimeout(() => {
				clearTimeout(this.num_time)
				this.$nextTick(() => {
					this[fun] && this[fun]()
					this.num_bool = true
					this.num_start(fun, 150)
				})
			}, time)
		},
		num_end() {
			this.num_bool = false
			clearTimeout(this.num_time)
		},
		put_shop() {
			if (this.list.length === 0) {
				this.is_tools.to_msg('没有可录入的信息!')
				return
			}
			const { id } = this.list[0]
			const { put_num, put_price } = this
			this.is_api('put_stock', {}, { id, row: { stock: put_num, price: put_price } }).then((res) => {
				this.alert_show = true
				this.alert_title = res ? '产品录入成功' : '产品录入失败'
				this.alert_bool = res ? true : false
				let time = setTimeout(() => {
					clearTimeout(time)
					this.alert_show = false
					this.confirm(1, null)
				}, 2000)
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.shop_list_div {
	width: 690rpx;
	padding-bottom: 24rpx;
}

.shop_list_div:last-child {
	margin-bottom: 100rpx;
}

.shop_div {
	width: 690rpx;
	@extend .bg_white;
	height: 176rpx;
	border-radius: 8rpx;
	margin-top: 24rpx;
}

.shop_info {
	height: 126rpx;
	margin-left: 38rpx;
}

.shop_lab {
	font-size: 30rpx;
	@extend .font;
	font-weight: 500;
	@extend .c333333;
}

.f26 {
	font-size: 26rpx;
}

.shop_gray {
	color: #999999;
}

.button_div {
	width: 88rpx;
	height: 48rpx;
	line-height: 48rpx;
	background: $theme-color;
	border-radius: 24rpx;
	@extend .shop_lab;
	font-weight: 400;
	color: #ffffff;
	margin-right: 26rpx;
}

.shop_foot {
	height: 224rpx;
	@extend .w100b;
	@extend .bg_white;
	border-top: 1rpx solid rgba(235, 235, 235, 0.8);
}

.foot_row {
	height: 45rpx;
	@extend .w100b;
}

.foot_num_pack {
	margin-top: 26rpx;
}

.add_ico {
	height: 43rpx;
	width: 38rpx;
}

.comput_lab {
	margin: 0 29rpx;
}

.dec_ico {
	@extend .add_ico;
}

.foot_price_pack {
	margin-top: 56rpx;
}

.ml44 {
	margin-left: 44rpx;
}

.mr38 {
	margin-right: 38rpx;
}

.foot_price {
	width: 280rpx;
	border-bottom: 1rpx solid #ebebeb;
}

.shop_foot2 {
	@extend .shop_foot;
	height: 141rpx;

	* {
		font-size: 26rpx;
	}
}

.mt18 {
	margin-top: 18rpx;
}

.mr66 {
	margin-right: 66rpx;
}

.put_button {
	width: 690rpx;
	height: 90rpx;
	background: $theme-color;
	border-radius: 42rpx;
	@extend .font;
	@extend .f500;
	font-size: 36rpx;
	color: #ffffff;
	position: absolute;
	bottom: 42rpx;
}
</style>
