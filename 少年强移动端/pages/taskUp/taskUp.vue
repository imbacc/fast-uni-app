<template>
	<view class="main">
		<student-info selShow />
		<view class="box">
			<task-tabs v-if="show_tabs" :typeList="type_list_com" :workList="work_page.list" @to="toTaskDetail" @change="tab_change" />
		</view>
	</view>
</template>

<script>
	import studentInfo from '@/components/studentInfo.vue'
	import taskTabs from '@/components/taskTabs/taskTabs.vue'
	
	import appendData from '@/common/class/append_data.js'
	import reflushTabs from '@/common/minix/reflush_tabs.js'
	
	export default {
		mixins: [reflushTabs],
		components: {
			studentInfo,
			taskTabs
		},
		data() {
			return {
				work_page: null,
				status: 0,
				tab_list: [],
				tab_cur: 0,
				type: 0,
				show_tabs: false
			}
		},
		computed: {
			sel_student_com() {
				return this.is_vuex.state.course_vuex.sel_student
			},
			type_list_com() {
				return this.is_vuex.state.work_vuex.type_list
			},
		},
		watch: {
			sel_student_com(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					this.tab_change(0)
				}
			}
		},
		onHide() {
			this.show_tabs = false
		},
		onLoad({ status }) {
			if (status) {
				this.status = parseInt(status)
				this.tab_change(0)
			}
		},
		onReachBottom() {
			if (this.work_page) this.work_page.next_fun(this)
		},
		methods: {
			init(page = 1, append = false) {
				if (!this.work_page) {
					const _page = new appendData()
					_page.name = 'work_api/student_work_list'
					_page.method = 'GET'
					_page.param = { student_id: this.sel_student_com.id, status: this.status, type: this.type }
					this.work_page = _page
				}
				let list = []
				this.work_page.fun(page, append).then(() => {
					this.work_page.list.forEach((info) => info.name && !list.some((s) => s.name === info.name) && list.push({ name: info.name }))
					this.tab_list = list
				})
			},
			toTaskDetail(id) {
				this.is_goto('/pages/taskDetail/taskDetail', `?id=${id}&name=student_work_info`)
			},
			tab_change(e) {
				console.log(e);
				this.tab_cur = e
				this.type = this.type_list_com[e].id
				if (this.work_page) this.work_page.param = { student_id: this.sel_student_com.id, status: this.status, type: this.type }
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>

	.box {
		margin-top: 20rpx;
	}
</style>
