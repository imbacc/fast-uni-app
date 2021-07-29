<template>
	<view>
		<view><u-tabs-swiper ref="uTabs" active-color="#E62234" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750" /></view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: calc(100vh - 80rpx);">
			<swiper-item v-for="(item, index) in 2" :key="index">
				<view class="contentList">
					<events-list :list="match_list" @toDetail="toDetail" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import eventsList from '@/components/eventsList.vue'

import appendData from '@/common/class/append_data.js'

export default {
	components: {
		eventsList
	},
	data() {
		return {
			list: [
				{
					name: '赛事预告',
					q: 'cur'
				},
				{
					name: '往期回顾',
					q: 'pass'
				}
			],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			match_page_cur: null,
			match_page_pass: null,
			match_list: [],
			swiper_time: null
		}
	},
	watch: {
		swiperCurrent(newValue, oldValue) {
			this.swiper_init(newValue)
		}
	},
	onLoad() {
		this.init()
	},
	onReachBottom() {
		let { q } = this.list[this.current], cur = this[`match_page_${q}`]
		if (cur) cur.next_fun(this, '')
	},
	methods: {
		swiper_init(idx) {
			clearTimeout(this.swiper_time)
			let { q } = this.list[idx]
			this.swiper_time = null
			this.swiper_time = setTimeout(() => {
				clearTimeout(this.swiper_time)
				this.init(q)
			}, 100)
		},
		init(q = 'cur', page = 1, append = false) {
			if (!this[`match_page_${q}`]) {
				const _page = new appendData()
				_page.name = 'home_api/match_list'
				_page.method = 'GET'
				_page.key = 'data'
				_page.param = { q }
				this[`match_page_${q}`] = _page
			}
			if (!append) this.match_list = []
			this[`match_page_${q}`].fun(page, append).then((res) => {
				if (res) this.match_list = res.data
			})
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx
			this.$refs.uTabs.setDx(dx)
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current
			this.$refs.uTabs.setFinishCurrent(current)
			this.swiperCurrent = current
			this.current = current
		},
		toDetail(id) {
			this.is_goto('/pages/contestDetail/contestDetail', `?id=${id}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.contentList {
	margin-top: 20rpx;
	padding: 0 30rpx;
}
</style>
