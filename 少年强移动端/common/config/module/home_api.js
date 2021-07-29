import { METHOD } from '../cfg.js'

// 首页
export default {
	banner_list: ['/source/carousel', METHOD.GET],	// 轮播图列表 缓存5分钟
	shop_list: ['/store/simplify', METHOD.GET],			// 精简门店信息 缓存5分钟
	activity_list: ['/activity/list', METHOD.GET],	// 活动列表 缓存5分钟
	match_list: ['/matches/list', METHOD.GET, 1],	// 赛事列表 缓存5分钟
	coach_list: ['/coach/list', METHOD.GET],	// 教练师资列表 缓存5分钟
	index_bg: ['/source/index', METHOD.GET, 1],	// 首页背景图
}
