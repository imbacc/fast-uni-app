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
	
	my_student_list: ['/member/my-stu-list', METHOD.GET],	// 我的课程-查看学员
	my_course_list: ['/member/my-course-list', METHOD.GET],	// 我的课程-查看课程
	my_course_detail: ['/member/my-course-detail', METHOD.GET],	// 我的课程-查看课程
	
	up_course_list: ['/member/upcoming', METHOD.GET],	// 查询即将上课
	
	about: ['/member/about-us', METHOD.GET, 1],	// 关于我们
	expand: ['/member/invite-list', METHOD.GET],	// 推广
	wxsdk: ['/member/js-sdk-conf', METHOD.POST],	// wx jssdk
}
