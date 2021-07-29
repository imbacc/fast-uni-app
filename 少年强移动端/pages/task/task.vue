<template>
	<view class="main">
		<student-info selShow />
		<template v-if="sel_student_com.id">
			<view class="heder flex justify-between">
				<view @click="toTaskUp(0)">
					<image src="/static/images/upload_ico.png" />已上传（{{ submit_count }}）
				</view>
				<view @click="toTaskUp(1)">
					<image src="/static/images/tak_ico.png" />已点评（{{ comment_count }}）
				</view>
			</view>
			<view class="box">
				<task-tabs v-if="show_tabs" :typeList="type_list" :workList="work_list" @to="toTaskDetail" @change="change" />
			</view>
		</template>
	</view>
</template>

<script>
	import studentInfo from '@/components/studentInfo.vue'
	import taskTabs from '@/components/taskTabs/taskTabs.vue'
	
	import reflushTabs from '@/common/minix/reflush_tabs.js'
	
	export default {
		mixins: [reflushTabs],
		components: {
			studentInfo,
			taskTabs
		},
		data() {
			return {
				type_list: [],
				work_list: [],
				submit_count: 0,
				comment_count: 0,
			};
		},
		computed: {
			sel_student_com() {
				return this.is_vuex.state.course_vuex.sel_student
			},
			user_info_com() {
				return this.is_vuex.state.user_vuex.user_info
			}
		},
		watch: {
			sel_student_com(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					this.init()
					this.init_count()
				}
			},
		},
		onPullDownRefresh() {
			this.init()
			if (this.sel_student_com.id) this.init_count()
		},
		onLoad() {
			if (!this.user_info_com) {
				this.is_tools.to_msg('请登录后操作!')
				let time = setTimeout(() => {
					clearTimeout(time)
					uni.navigateBack()
				}, 100)
				return
			}
			if (this.sel_student_com.id) {
				this.init()
				this.init_count()
			}
		},
		methods: {
			async init() {
				this.type_list = []
				this.work_list = []
				this.init_key('type_list').then((type) => {
					uni.stopPullDownRefresh()
					if (type && type.length > 0) {
						this.type_list = type
						this.is_vuex.commit('work_vuex/set_vuex', ['type_list', type])
						this.init_work(type[0].id)
					}
				})
			},
			async init_count() {
				this.submit_count = 0
				this.comment_count = 0
				this.is_api('work_api/work_count', { student_id: this.sel_student_com.id }).then((res) => {
					if (res) {
						this.submit_count = res.submit_count
						this.comment_count = res.comment_count
					}
				})
			},
			init_key(key, param = {}) {
				return new Promise((resovle) => this.is_api(`work_api/${key}`, param).then((res) => resovle(res)))
			},
			init_work(id) {
				this.init_key('work_list', { type: id }).then((work) => {
					if (work) {
						this.work_list = work.data
					}
				})
			},
			toTaskUp(status) {
				this.is_goto('/pages/taskUp/taskUp', `?status=${status}`)
			},
			toTaskDetail(id) {
				this.is_goto('/pages/taskDetail/taskDetail', `?id=${id}`)
			},
			change(e) {
				const { id } = this.type_list[e]
				this.init_work(id)
			},
		}
	}
</script>

<style lang="scss" scoped>

	.heder {
		margin-top: 20rpx;

		view {
			width: 335rpx;
			height: 108rpx;
			background-color: #fff;
			border-radius: 12rpx;
			line-height: 108rpx;
			text-align: center;
			font-size: 28rpx;
			color: #555;

			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
	}

	.box {
		margin-top: 20rpx;


	}
</style>
