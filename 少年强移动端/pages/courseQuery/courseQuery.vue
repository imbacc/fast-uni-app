<template>
	<view>
		<view class="studentInfo">
			<student-info selShow />
		</view>
		<skeleton v-if="loading" />
		<view v-else>
			<view class="courseList">
				<upDownList
					v-for="(course, idx) in course_list" :key="idx"
					select
					:topTitle="{ title: course.name }"
					:topTitleStyle="{ 'padding': ' 0 18rpx', 'margin-right': '6rpx' }"
					:bottomTitle="course"
					@to="goto_course_info(course.record_id)"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import studentInfo from '@/components/studentInfo.vue'
	
	export default {
		components: {
			studentInfo,
			upDownList: () => import('@/components/courseList/upDownList.vue')
		},
		data() {
			return {
				course_list: [],
				loading: true
			};
		},
		computed: {
			sel_student_com() {
				return this.is_vuex.state.course_vuex.sel_student
			}
		},
		watch: {
			sel_student_com(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					this.init(newValue.id)
				}
			}
		},
		onLoad() {
			this.init(this.sel_student_com.id)
		},
		methods: {
			init(stu_id) {
				this.loading = true
				this.is_api('user_api/my_course_list', { stu_id }).then((res) => {
					this.course_list = res ? res.course : []
					this.is_vuex.commit('course_vuex/set_my_course', { id: stu_id, list: this.course_list })
					this.loading = false
				})
			},
			goto_course_info(rid) {
				this.is_goto('/pages/courseUpcomingDetail/courseUpcomingDetail', `?rid=${rid}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.studentInfo {
		padding: 0 30rpx;
		margin-top: 20rpx;
	}

	.courseList {
		padding: 0 30rpx;
		margin-top: 20rpx;
	}
</style>
