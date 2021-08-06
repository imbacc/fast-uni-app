import { METHOD } from '../cfg.js'

// 用户
export default {
	get_userinfo: ['/member/user-info', METHOD.GET],	// 获取用户信息
	edit_avatar: ['/member/edit-avatar', METHOD.POST],	// 修改头像
	edit_phone: ['/member/edit-phone', METHOD.PUT],		// 修改手机号
	edit_nickname: ['/member/edit-nickname', METHOD.PUT],// 修改昵称
	sales: ['/member/sales', METHOD.GET],			
	child_list: ['/member/child', METHOD.GET],
	cur_student: ['/member/set-current-stu', METHOD.PUT],
	
	sales_info: ['/member/sales', METHOD.GET], // 课程顾问
	
	my_student_list: ['/member/my-stu-list', METHOD.GET],	// 我的课程-查看学员
	my_course_list: ['/member/my-course-list', METHOD.GET],	// 我的课程-查看课程
	my_course_detail: ['/member/my-course-detail', METHOD.GET],	// 我的课程-查看课程
	
	up_course_list: ['/member/upcoming', METHOD.GET],	// 查询即将上课
	user_check_signup: ['/member/signup-check', METHOD.GET],	// 用户是否报名
	
	feedback_submit: ['/member/feedback-submit', METHOD.POST], // 提交反馈
	schedule_options: ['/member/schedule-options', METHOD.GET], // 调课选项
	schedule_submit: ['/member/schedule-edit', METHOD.POST], // 调课提交
	schedule_list: ['/member/schedule-notice-list', METHOD.GET], // 排课通知列表
	schedule_info: ['/member/schedule-detail', METHOD.GET], // 调课详情
	schedule_confirm: ['/member/schedule-confirm', METHOD.PUT], // 调课排课确认
	schedule_point: ['/member/red-point-switch', METHOD.GET], // 红点提醒开关
	
	about: ['/member/about-us', METHOD.GET, 1],	// 关于我们
	expand: ['/member/invite-list', METHOD.GET],	// 推广
	wxsdk: ['/member/js-sdk-conf', METHOD.POST],	// wx jssdk
}
