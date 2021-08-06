import { METHOD } from '../cfg.js'

// 课程
export default {
	course_list: ['/course/course-list', METHOD.GET, 1], // 课程列表 缓存
	course_type_list: ['/course/type-list', METHOD.GET, 1], // 课程类别列表 缓存
	course_type_info: ['/course/type-detail', METHOD.GET, 1], // 课程类别详情 缓存
	course_info: ['/course/course-detail', METHOD.GET, 1], // 课程详情 缓存
	search_course: ['/course/search', METHOD.GET, 1], //  搜索课程 缓存
	course_record: ['/course/record', METHOD.GET, 1], //  课程明细 缓存
	course_reserve: ['/student/reserve', METHOD.GET], // 私教预约
	submit_reserve: ['/student/reserve-submit', METHOD.POST], // 私教预约提交
}
