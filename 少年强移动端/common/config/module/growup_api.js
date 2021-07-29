import { METHOD } from '../cfg.js'

// 成长
export default {
	up_honor_type: ['/student/certificatetype', METHOD.GET, 1], // 证书类型 缓存5分钟
	up_honor: ['/student/certificates', METHOD.GET, 1], // 学员证书 缓存5分钟
	up_medals: ['/student/medals', METHOD.GET], // 勋章列表 缓存5分钟
	radar_map: ['/chart/radar-map', METHOD.GET], // 体能测试雷达图
	vs_up_history: ['/chart/histogram-last', METHOD.GET], // 对比上一次
	vs_yester_year: ['/chart/histogram-year', METHOD.GET], // 对比去年
	vs_class_avg: ['/chart/histogram-class', METHOD.GET], // 对比班级平均
}
