import { METHOD } from '../cfg.js'

// 积分
export default {
	my_score: ['/score/personal', METHOD.GET], // 我的积分
	score_shop: ['/score/goods-list', METHOD.GET, 1], // 积分商城
	score_info: ['/score/goods-detail', METHOD.GET, 1], // 积分详情
	score_exchange: ['/score/goods-exchange', METHOD.POST], // 兑换商品
	score_detailed: ['/score/history', METHOD.GET], // 积分明细
	score_order_list: ['/score/cart-list', METHOD.GET], // 积分订单列表
	score_order_confirm: ['/score/set-order-status', METHOD.PUT], // 积分订单确认收货
	score_order_info: ['/score/order-detail', METHOD.GET], // 积分订单详情
	score_course_exchange: ['/score/course-goods-exchange', METHOD.POST], // 积分兑换课时
}
