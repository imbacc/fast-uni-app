import routerChunks from '@/common/router/index.js'
import is_vuex from '@/common/store/index.js'
import stringify from 'qs-stringify'
import { checkLogin } from '@/common/config/cfg.js'

const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

// login
const LOGIN = routerChunks.pages.login.path
const GOTO_LOGIN = () => reLaunch({ url: LOGIN, animationType: 'slide-in-bottom' })
// check
const checkToken = () => is_vuex.getters['user_vuex/hasLogin']
const getUserRole = () => is_vuex.getters['user_vuex/getRole']
// toast
const toast = async (title = '跳转页面不存在') => uni.showToast({ title, icon: 'none' })
const modal = (content = '跳转页面不存在', success) => uni.showModal({ content, showCancel: false, success })

class routerPages {
	constructor() {
		this.uniRouterTo = [
			// 返回
			() => navigateBack({ delta: 1 }),
			// 保留当前页面。
			(obj) => navigateTo(obj),
			// 关闭当前页面。
			(obj) => redirectTo(obj),
			// 关闭所有页面，打开到应用内的某个页面。
			(obj) => reLaunch(obj),
			// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			(obj) => switchTab(obj),
		]
		// cache
		this.shallow_cache = {}
		// router info
		this.shallow = routerChunks.shallow
		this.tabbar = routerChunks.tablist
		// attr
		this.name = null
		this.space = null
		this.type = 1
		this.acg = 'pop-in'
		this.query = {}
		this.param = {}
		this.auth = []
		this.curRouter = {}
		this.lastRouter = {}
		this.reRouter = null
		this.result = true
		// each
		this.before = null
		this.after = null
		// err
		this._err = {
			tips: '',
			key: '',
			result: false,
			hook:() => {
				const { tips, key } = this._err
				console.error(`${tips} hook()`, this)
				return this[key]
			},
			beforeEach:() => {
				const { tips, key } = this._err
				console.error(`${tips} beforeEach()`, this)
				return this[key]
			},
			afterEach:() => {
				const { tips, key } = this._err
				console.error(`${tips} afterEach()`, this)
				return this[key]
			},
			gotoPage:() => {
				const { tips, key } = this._err
				console.error(`${tips} gotoPage()`, this)
				return this[key]
			},
			gotoRouter:() => {
				const { tips, key } = this._err
				console.error(`${tips} gotoRouter()`, this)
				return this[key]
			}
		}
		this.error = Object.assign(this._err, { tips: 'error', key: 'error' })
		this.hookError = Object.assign(this._err, { tips: 'hook error', key: 'hookError' })
		this.init()
		this.invoke()
	}
	
	init() {
		// 为了刷新有指向 重新找空间信息
		const cur = getCurrentPages()
		const bool = cur.length === 0
		const url = bool ? '/' : cur[0].$page.path
		if (bool || url === '/') {
			this.name = '/'
			this.name = 'pages'
			this.curRouter = routerChunks.pages.index
			return
		}
		const find = this.shallowFind(url)
		this.setCureRouter(find)
	}
	
	invoke() {
		uni.removeInterceptor('navigateBack')
		uni.addInterceptor('navigateBack', {
			invoke: (args) => {
				this.curRouter = Object.assign({}, this.reRouter || this.lastRouter)
				this.lastRouter = Object.assign({}, this.curRouter)
				this.reRouter = null
			}
		})
		
		this.invokeRePage('redirectTo')
		this.invokeRePage('reLaunch')
		this.invokeRePage('switchTab')
	}
	
	// 关闭当前页面，关闭所有页面，swicthTab页面公用invoke
	invokeRePage(apiName) {
		uni.removeInterceptor(apiName)
		uni.addInterceptor(apiName, {
			invoke: (args) => {
				const cur = getCurrentPages()
				const url = `/${cur[0].route}`
				this.reRouter = this.shallowFind(url)
				// 关闭页面后 矫正 lastRouter 最后的路由
			}
		})
	}

	// 链式使用
	hook(fun) {
		const result = fun.call(this, arguments)
		return result === undefined || result === true ? this : this.hookError
	}
	
	beforeEach(fun) {
		// to, from, next
		if(fun && typeof fun === 'function') {
			this.before = (to, from, next) => {
				if (!next || typeof next !== 'function') {
					console.error('beforeEach next funcion error...')
					return this.error
				}
				fun && fun(to, from, next)
				return this
			} 
		} else {
			console.error('beforeEach function error...')
			return this.error
		}
		return this
	}
	
	afterEach(fun) {
		// to, from
		if(fun && typeof fun === 'function') {
			this.after = (to) => {
				fun && fun(to, this.curRouter)
				return this
			} 
		} else {
			console.error('afterEach function error...')
			return this.error
		}
		return this
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
	
	shallowFind(url) {
		const cache = this.shallow_cache[url]
		if (cache) return cache
		const find = this.shallow.find((f) => f.path === url)
		if (find) this.shallow_cache[url] = find
		return find
	}
	
	setCureRouter(find) {
		if (!find) return
		this.auth = find.auth || []
		this.param = find.param || {}
		this.name = find.name
		this.space = find.space
		this.curRouter = find || null
	}
	
	/**
	 * 按路径跳路由 命名用不惯自行修改 -> push(arg) -> router.push(url, param ....)
	 */
	gotoPage(url = '', param = {}, type = 1, make = false) {
		const find = this.shallowFind(url)
		const _to = Object.assign({}, this.curRouter)
		const _from = Object.assign({}, find)
		if(this.before && !make) return this.before(_to, _from, () => this.gotoPage(url, param, type, true))
		const token = checkToken()

		if (!find) {
			toast()
			console.error('无效的跳转', url)
			return this.error
		}
		
		// 记录当前路由
		this.setCureRouter(find)
		
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
			const userRole = getUserRole()
			const check = this.auth.some((s) => userRole.includes(s))
			if (!check) {
				const cur = getCurrentPages()
				const FULLPATH = `/${cur[0].$page.path}`
				if (cur && FULLPATH !== LOGIN) modal('请先登录', () => GOTO_LOGIN())
				return this.error
			}
		}
		
		this.type = type
		param = { ...param, ...this.param, ...this.query }
		const obj = { url: `${url}?${stringify(param)}`, animationType: this.acg }
		this.uniRouterTo[type](obj)
		if (this.after && !make) this.after(_to)
		this.lastRouter = _to
		return this
	}

	/**
	 * 按后缀名跳路由 例: login, pagesA/aa, pagesB/bb
	 */
	gotoRouter(name = '', query = {}, type = 1) {
		let space = 'pages', sub = name.split('/')
		if (sub.length > 1) {
			const [sub_space, sub_name] = sub
			space = sub_space
			name = sub_name
		}
		const router = routerChunks[space][name]
		if (!router) {
			toast()
			console.error('无效的跳转', name, query)
			return this.error
		}
		const { path, auth, param } = router
		this.name = name
		this.space = space
		this.auth = auth || []
		return this.gotoPage(path, { ...query, ...param }, type)
	}

}

export default routerPages
