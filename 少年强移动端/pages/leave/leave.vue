<template>
	<view>
		<one v-if="ovo" :update="update" :planType="plan_type" :type="2" @submit="submit" />
		<template v-else>
			<u-tabs-swiper ref="uTabs" bar-width="120" active-color="#E62234" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750" />
			<one :update="update" :planType="plan_type" :type="current+1" @submit="submit" />
		</template>
	</view>
</template>

<script>
import one from './one/one.vue'

import { mapState } from 'vuex'

export default {
	components: {
		one,
	},
	data() {
		return {
			list: [
				{
					name: '单节请假'
				},
				{
					name: '特殊请假'
				}
			],
			current: 0,
			ovo: false,
			update: false,
			cid: 0,
			submit_bool: false,
			plan_type: ''
		}
	},
	computed: {
		...mapState('course_vuex', {
			sel_student_com: (state) => state.sel_student,
		}),
		leave_info_com() {
			return this.is_vuex.state.leave_vuex.leave_info
		}
	},
	onLoad({ ovo, update, cid, type }) {
		if (ovo) this.ovo = ovo === 'false' ? false : true
		if (update) {
			const cur = this.leave_info_com.leave_type === 0 ? 0 : 1
			this.current = cur
			this.swiperCurrent = cur
			this.update = update === 'true' ? true : false
		}
		if (cid) this.cid = cid
		if (type) this.plan_type = type
	},
	methods: {
		tabsChange(index) {
			this.current = index
		},
		submit(body) {
			if (this.submit_bool) return
			body.leave_starttime = parseInt(`${body.leave_starttime}`.substring(0, 10))
			body.leave_endtime = parseInt(`${body.leave_endtime}`.substring(0, 10))
			body.week_day = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')
			// body.leave_type = this.current
			body.student_id = this.sel_student_com.id
			body.course_id = this.cid
			
			if (this.update) {
				const { id, leave_starttime, leave_endtime } = this.leave_info_com
				body.id = id
				if(isNaN(body.leave_starttime)) body.leave_starttime = leave_starttime
				if(isNaN(body.leave_endtime)) body.leave_endtime = leave_endtime
			}
			
			uni.showLoading()
			this.submit_bool = true
			this.is_api('leave_api/student_leave', {}, { ...body, _formData: true }).then((res) => {
				uni.hideLoading()
				this.submit_bool = false
				if (res) {
					this.is_tools.to_msg('请假成功!')
					let time = setTimeout(() => {
						clearTimeout(time)
						uni.navigateBack()
					}, 400)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
::v-deep .pages-leave-leave {
	overflow: hidden !important;
}
	
swiper {
	height: calc(100vh - 80rpx);
}
</style>
