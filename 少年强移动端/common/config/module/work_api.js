import { METHOD } from '../cfg.js'

// 首页
export default {
	work_list: ['/homework/worklist', METHOD.GET], // 作业列表
	type_list: ['/homework/typelist', METHOD.GET], // 作业类型列表
	work_info: ['/homework/details', METHOD.GET], // 作业详情
	submit_work: ['/student/subhomework', METHOD.POST], // 提交作业 
	work_count: ['/homework/index', METHOD.POST], // 学员已提交的作业列表
	student_work_list: ['/homework/stuhomeworks', METHOD.GET], // 学员已提交的作业列表
	student_work_info: ['/homework/studetails', METHOD.GET], // 学员已提交的作业列表
}
