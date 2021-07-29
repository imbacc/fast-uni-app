<template>
	<view>
		<search
			:searchBarShow="false"
			:showAction="showAction"
			:shopList="[]"
			@focus="focus"
			@custom="custom"
			@select="select"
			@change="change"
		/>
		<view class="courseList">
			<up-down-list
				v-for="(course, idx) in course_list"
				:key="idx"
				:topTitle="{ title: course.name }"
				:bottomTitle="course"
				@to="toDetail(course.id)"
			/>
		</view>
	</view>
</template>

<script>
import search from '@/components/search.vue'
import upDownList from '@/components/courseList/upDownList.vue'

export default {
	components: {
		search,
		upDownList
	},
	data() {
		return {
			keyword: '',
			searchBarShow: false,
			showAction: false,
			typeid: 0,
			course_list: [],
			course_list_bak: [],
			time: null,
			search_list: []
		}
	},
	onLoad({ id }) {
		if (id) {
			this.typeid = parseInt(id)
			this.init()
		}
	},
	methods: {
		init(id) {
			this.is_api('course_api/course_list', { q: this.typeid }).then(res => {
				if (res) {
					this.course_list = res.data
					this.course_list_bak = res.data
				}
			})
		},
		// 输入框获得焦点
		focus() {
			if (!this.searchBarShow) this.searchBarShow = true
			if (!this.showAction) this.showAction = true
		},
		// 右侧控件
		custom() {
			this.searchBarShow = false
			this.showAction = false
		},
		// 历史记录点击
		select(e) {
			this.keyword = e
			if (e === '') return
			this.search(e)
		},
		async change(e) {
			if (e === '') {
				// let filter = this.course_list_bak.filter((f) => ~f.name.indexOf(e))
				this.course_list = this.course_list_bak
			}
		},
		// 查看详情
		toDetail(id) {
			this.is_goto('/pages/courseDetail/courseDetail', `?id=${id}`)
		},
		search(keywords) {
			this.is_api('course_api/search_course', { keywords }).then((res) => {
				if (res) {
					this.course_list = res.list
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.courseList {
	margin-top: 20rpx;
	padding: 0 30rpx;
}
</style>
