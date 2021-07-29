import { METHOD } from '../cfg.js'

// 升班
export default {
	upclass_progress: ['/courseclass/progress', METHOD.GET], // 升班历程 缓存5分钟
	select_applylist: ['/courseclass/applylist', METHOD.GET], // 申请列表 缓存5分钟
	apply_ready: ['/courseclass/preapply', METHOD.GET], // 准备发起升班申请
	apply_upclass: ['/courseclass/apply', METHOD.POST], // 升班申请
	upclass_info: ['/courseclass/details', METHOD.GET], // 申请详情
	in_class: ['/courseclass/current-class', METHOD.GET, 1], // 所在班级
}
