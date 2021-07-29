import { METHOD } from '../cfg.js'

// 请假
export default {
	leave_list: ['/student/leavelist', METHOD.GET],	// 我的请假列表
	leave_info: ['/student/details', METHOD.GET], // 请假详情
	student_leave: ['/student/leave', METHOD.POST], // 学员请假
	student_leave_data: ['/student/leave-allowed', METHOD.GET], // 学员请假数据
	student_appointment: ['/student/appointment', METHOD.POST], // 预约上课
}
