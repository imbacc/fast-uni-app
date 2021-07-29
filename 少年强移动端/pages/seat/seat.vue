<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<u-search v-model="key" placeholder="请输入门店名称/地址" @search="search_store" @custom="search_store" @change="bak_change" />
		</view>
		<view class="map" :style="mapHeight ? 'height:380rpx' : 'height:0;'">
			<map style="width: 100%; height: 100%;" :latitude="location_com.latitude" :longitude="location_com.longitude" :markers="markers" :scale="13" />
		</view>
		<view class="map-hidden" @click="mapHeight = !mapHeight">
			{{ mapHeight ? '收起地图' : '展开地图' }}
			<u-icon :name="mapHeight ? 'arrow-up' : 'arrow-down'"></u-icon>
		</view>
		<view class="box">
			<view class="box-title">
				<image src="@/static/images/course-ico.png" />
				<text>场馆地址</text>
			</view>
			<view v-if="shop_page.list.length > 0" class="main">
				<seat-card v-for="(shop, idx) in shop_page.list" :key="idx" :shop="shop" @curCard="curCard" />
			</view>
			<view v-else class="main">
				
			</view>
		</view>
	</view>
</template>

<script>
import seatCard from '@/components/seat/seatCard.vue'

import appendData from '@/common/class/append_data.js'
import { mapState } from 'vuex'

export default {
	components: {
		seatCard
	},
	computed: {
		...mapState('user_vuex', {
			location_com: (state) => state.location,
			cur_shop_com: (state) => state.cur_shop
		})
	},
	data() {
		return {
			key: '',
			mapHeight: true,
			shop_page: null,
			search_bool: false,
			markers: [],
			bak_list: []
		}
	},
	onLoad() {
		this.init()
		const { latitude, longitude } = this.location_com
		this.init_mark(latitude, longitude, '当前位置')
	},
	methods: {
		async init_mark(latitude, longitude, content) {
			this.markers.push({
				latitude,
				longitude,
				callout: {
					content,
					color: '#333',
					fontSize: 12,
					padding: 5,
					display: 'ALWAYS'
				},
				// iconPath: '/static/images/phone.png'
			})
		},
		init(page = 1, append = false) {
			if (!this.shop_page) {
				const _page = new appendData()
				_page.name = 'shop_api/shop_list'
				_page.method = 'GET'
				this.shop_page = _page
			}
			this.shop_page.fun(page, append).then((res) => {
				if (res) {
					this.bak_list = this.shop_page.list
					this.shop_page.list.forEach((info) => {
						let { lat, lng, name } = info
						this.init_mark(lat, lng, name)
					})
				}
			})
		},
		curCard(e) {
			if (this.cur_shop_com && this.cur_shop_com.id === e.id) return
			uni.showLoading({ title: '切换门店中...' })
			this.is_api('shop_api/bind_store', {}, { store_id: e.id }).then((res) => {
				uni.hideLoading()
				if (res) {
					this.is_tools.to_msg('切换成功!')
					this.is_vuex.dispatch('user_vuex/clear_api_cache').then(() => {
						this.is_vuex.commit('user_vuex/set_refresh')
						let bool = e.distance < 1000
						e.km = bool ? e.distance : (e.distance / 1000).toFixed(1)
						e.unit = bool ? 'm' : 'km'
						this.is_vuex.commit('user_vuex/set_vuex', ['cur_shop', e])
						uni.switchTab({ url: '/pages/home/home' })
					})
				}
			})
		},
		search_store(keywords) {
			if (keywords === '') {
				this.shop_page.list = this.bak_list
				return
			}
			if (this.search_bool) return
			this.search_bool = true
			this.is_api('shop_api/search_store', { keywords }).then((res) => {
				this.search_bool = false
				if (res) {
					this.shop_page.list = res.list
				} else {
					this.shop_page.list = []
				}
			})
		},
		bak_change(e) {
			if (e === '') {
				this.shop_page.list = this.bak_list
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.search {
	background-color: #fff;
	padding: 20rpx;
}

.map {
	width: 750rpx;
	height: 380rpx;
	transition: height 0.5s;
}

.map-hidden {
	margin-top: 10rpx;
	font-size: 26rpx;
	color: #999;
	text-align: center;
	margin-bottom: 20rpx;
}

.box {
	margin-top: 10rpx;
	padding: 20rpx 30rpx;

	&-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 700;
		margin-bottom: 20rpx;

		image {
			width: 30rpx;
			height: 50rpx;
		}
	}
}
</style>
