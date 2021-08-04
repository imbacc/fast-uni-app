import is_router from '@/common/router/index.js'
import store from '@/common/store/index.js'
import { checkLogin } from '@/common/config/cfg.js'

// 解构出来提升js执行速度
const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

//检查用户登录状态
const checkLoginStore = () => store.getters['user_vuex/hasLogin']

// 检查token
const checkToken = () => store.getters['user_vuex/hasToken']

//检查权限
const check_list = () => store.state.user_vuex.user_role

const fail = (title = '跳转页面不存在') => uni.showToast({ title })
const modal = (content = '跳转页面不存在') => uni.showModal({ content, showCancel: false })

/**
 * 跳转封装 - 默认根据页面路径跳转
* @param {Object} url 路由地址
* @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
* @param {Object} acg 跳转动画
*/
const goto_pages = (url, type = 1, animationType = 'pop-in', auth = []) => {
	return new Promise((resolve) => {
		if (auth.length > 0) {
			// 检查权限
			let check = false
			for (let i = 0, j = auth.length; i < j; i++) {
				let cur = auth[i]
				if (check_list.includes(cur)) {
					check = true
					break
				}
			}
			if (!check) {
				modal('请先登录')
				const cur = getCurrentPages()
				const page = is_router.login
				if (cur && cur[0].$page.fullPath !== page) goto_pages(page, 4)
				return
			}
		}
		
		const obj = { url, animationType}
		if (type === 1) navigateTo(obj)
		if (type === 2) redirectTo(obj)
		if (type === 3) reLaunch(obj)
		if (type === 4) switchTab(obj)
		// if (type === 5) navigateBack({ delta: 1 })
		resolve()
	})
}

//根据配置的路由名字跳转
const goto_router = (name, query = '', type = 1, acg = 'pop-in') => {
	let router = is_router[name], auth = [];
	if (Array.isArray(router) && router.length > 0) {
			const [routerUrl, authCheck] = router
			if (routerUrl) router = routerUrl
			if (authCheck) auth = authCheck
	}
	
	let url = `${router}${query || ''}`, token = checkToken()
	
	// 检查是否有效路由
	if (!router) {
		fail()
		return
	}
	
	console.log('router=', url)
	if (!checkLogin || checkLoginStore()) {
		goto_pages(url, type, acg, auth)
		return
	} else {
		reLaunch({ url: is_router.login, animationType: 'slide-in-bottom' })
		return
	}
}

export {
	goto_router,
	goto_pages
}