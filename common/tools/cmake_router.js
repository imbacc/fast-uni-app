import is_router from '@/common/router/index.js'
import is_vuex from '@/common/store/index.js'
import { checkLogin } from '@/common/config/cfg.js';

// 解构出来提升js执行速度
const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

//检查权限
const check_list = [
	'user', 
	...is_vuex.state.user_vuex.user_role
]
const checkToken = () => Boolean(is_vuex.state.user_vuex.token)

const checkToken = () => is_vuex.getters['user_vuex/hasLogin']
const getUserRole = () => is_vuex.getters['user_vuex/getRole']

const toast = (title = '跳转页面不存在') => uni.showToast({ title, icon: 'none' })
const modal = (content = '跳转页面不存在') => uni.showModal({ content, showCancel: false })

/**
 * 跳转封装 - 默认根据页面路径跳转
 * @param {Object} url 路由地址
 * @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
 * @param {Object} acg 跳转动画
 * @param {Object} fun 跳转后执行方法
 */
const goto_fun = (url, type = 1, animationType = 'pop-in', auth = [], fun) => {
	let token = checkToken()
	
	// 检查token
	if (!token) {
		// 请求后跳
		// is_vuex.dispatch('xxx/xxxx').then(() => {
		// 	goto_router(name, query, type, acg, fun)
		// })
	
		reLaunch({ url: is_router.login, animationType: 'slide-in-bottom' })
		return
	}
	
	// 检查权限
	if (auth.length > 0) {
		let check = false
		for (let i = 0, j = auth.length; i < j; i++) {
			let cur = auth[i]
			if (getUserRole().includes(cur)) {
				check = true
				break
			}
		}
	
		if (!check) {
			toast('请先登录')
			const cur = getCurrentPages()
			const page = is_router.login
			if (cur && cur[0].$page.fullPath !== page) goto_fun(page, 3)
			return
		}
	}
	
	const obj = { url, animationType }
	if (type === 1) navigateTo(obj)
	if (type === 2) redirectTo(obj)
	if (type === 3) reLaunch(obj)
	if (type === 4) switchTab(obj)
	if (type === 5) navigateBack({ delta: 1 })
	fun && fun()
}

//根据配置的路由名字跳转
const goto_router = (name, query = '', type = 1, acg = 'pop-in', fun, last = true) => {
	let router = is_router[name], auth = []
	if (router.constructor === Array && router.length > 0) {
		const [routerUrl, authCheck] = router
		if (routerUrl) router = routerUrl
		if (authCheck) auth = authCheck
	}
	
	let url = router + (query || '')
	router ? goto_fun(url, type, acg, auth, fun) : toast()
}

export {
	goto_router,
	goto_fun
}
