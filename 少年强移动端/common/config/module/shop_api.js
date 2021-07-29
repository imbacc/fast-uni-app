import { METHOD } from '../cfg.js'

// 门店
export default {
	shop_info: ['/store/complete', METHOD.GET], //  完整门店信息
	shop_list: ['/store/list', METHOD.GET], //  门店列表
	bind_store: ['/store/bind', METHOD.PUT], //  绑定门店
	search_store: ['/store/search', METHOD.GET], //  搜索门店
}
