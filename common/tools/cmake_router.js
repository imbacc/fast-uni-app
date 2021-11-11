import is_router from '@/common/router/index.js'
import is_vuex from '@/common/store/index.js'
import stringify from 'qs-stringify'
import { checkLogin } from '@/common/config/cfg.js'

const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

// 当前router
var cur_router = null

// 登录页
const LOGIN = is_router.pages.login.path
const GOTO_LOGIN = () => reLaunch({ url: LOGIN, animationType: 'slide-in-bottom' })

//检查权限
const check_list = [...is_vuex.state.user_vuex.user_role]

const checkToken = () => is_vuex.getters['user_vuex/hasLogin']
const getUserRole = () => is_vuex.getters['user_vuex/getRole']

const toast = async (title = '跳转页面不存在') => uni.showToast({ title, icon: 'none' })
const modal = (content = '跳转页面不存在', success) => uni.showModal({ content, showCancel: false, success })

class routerPages {
	constructor() {
		this.name = null
		this.space = null
		this.type = 1
		this.acg = 'pop-in'
		this.router = null
		this.query = {}
		this.param = {}
		this.auth = []
		this.curRouter = null
		this.shallow = is_router._shallow
		this.tabbar = is_router._tablist
		this.result = true
		this.error = {
			result: false,
			hook: () => {
				console.error('hook失败', this)
				return this.error
			},
			gotoPage: () => {
				console.error('hook拦截gotoPage()', this)
				return this.error
			},
			gotoRouter: () => {
				console.error('hook拦截gotoRouter()', this)
				return this.error
			},
		}
	}

	// 链式使用
	hook(fun) {
		const result = fun.apply(this, arguments)
		return result === undefined || result === true ? this : this.error
	}
	
	/**
	 * set key val
	 */
	setKeyVal(key, val) {
		this[key] = val
		return this
	}
	
	/**
	 * set obj -> key val
	 */
	setObjectVal(obj) {
		Object.entries(obj).forEach(([key, val]) => this[key] = val)
		return this
	}

	/**
	 * 按路径跳路由
	 */
	gotoPage(url, param = {}, type = 1, shallow = true) {
		const token = checkToken()

		if (shallow) {
			const find = this.shallow.find((f) => f.path === url)
			this.auth = find.auth || []
			this.param = find.param
			this.name = find.name
			this.space = find.space
			this.curRouter = find || null

			if (!find) {
				toast()
				console.error('无效的跳转', url)
				return this.error
			}
		}

		// 如果是tabbar类型跳转不对 矫正跳转类型 switchTab
		const isSwicthTab = this.tabbar.some((s) => s.pagePath === url)
		if (isSwicthTab) type = 4

		// 检查token
		if (!token) {
			console.error('token失效')
			// 请求后跳
			// is_vuex.dispatch('xxx/xxxx').then(() => {
			// 	GOTO_LOGIN()
			// })
			modal('token失效', () => GOTO_LOGIN())
			return this.error
		}

		// 检查权限
		if (this.auth.length > 0) {
			console.log('this.auth=', this.auth)
			const userRole = getUserRole()
			const check = this.auth.some((s) => userRole.includes(s))
			console.log('check=', check);
			if (!check) {
				const cur = getCurrentPages()
				const FULLPATH = `/${cur[0].$page.fullPath}`
				if (cur && FULLPATH !== LOGIN) modal('请先登录', () => GOTO_LOGIN())
				return this.error
			}
		}
		
		this.type = type
		param = { ...param, ...this.param, ...this.query }
		const obj = { url: `${url}?${stringify(param)}`, animationType: this.acg }
		if (type === 1) navigateTo(obj) // 保留当前页面，跳转到应用内的某个页面。
		if (type === 2) redirectTo(obj) // 关闭当前页面，跳转到应用内的某个页面。
		if (type === 3) reLaunch(obj) // 关闭所有页面，打开到应用内的某个页面。
		if (type === 4) switchTab(obj) // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
		if (type === 5) navigateBack({ delta: 1 })
		return this
	}

	/**
	 * 按后缀名跳路由 例: login, pagesA/aa, pagesB/bb
	 */
	gotoRouter(name, query = {}, type = 1) {
		let space = 'pages', sub = name.split('/')
		if (sub.length > 1) {
			const [sub_space, sub_name] = sub
			space = sub_space
			name = sub_name
		}
		const router = is_router[space][name]
		if (!router) {
			toast()
			console.error('无效的跳转', name, query)
			return this.error
		}
		const { path, auth, param } = router
		this.name = name
		this.space = space
		this.auth = auth || []
		this.curRouter = router || null
		return this.gotoPage(path, { ...query, ...param }, type, false)
	}

}

export default routerPages
