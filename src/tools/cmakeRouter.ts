import stringify from 'qs-stringify'
import { useUserStore } from '@/store/user'

import type { shallow_DTYPE, tablist_DTYPE, shallowInfo_DTYPE, newPagesJson_DTYPE } from '@/router/index'
type before_DTYPE = (to: {}, from: {}, next: Function) => any
type after_DTYPE = (to: {}, from?: {}) => any
type result_DTYPE = {
	tips: string
	key: string
	result: boolean
	hook: () => any
	beforeEach: () => any
	afterEach: () => any
	gotoPage: () => any
	gotoRouter: () => any
}

export default (routerChunks: newPagesJson_DTYPE) => {
	console.log('%c [ routerChunks ]-19', 'font-size:14px; background:#41b883; color:#ffffff;', routerChunks)
	type routerPagesKeys = keyof routerPages

	const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni
	const userStore = useUserStore()

	// login
	const LOGIN = routerChunks.pages?.login.path as string
	const GOTO_LOGIN = () => reLaunch({ url: LOGIN })
	// check
	const checkToken = () => userStore.hasLogin
	const getUserRole = () => userStore.getRole
	// toast
	const toast = async (title = '跳转页面不存在') => uni.showToast({ title, icon: 'none' })
	const modal = (content = '跳转页面不存在', success?: Function) => uni.showModal({ content, showCancel: false, success: success?.() })

	class routerPages {
		private uniRouterTo: Array<(...args: any) => void> = [
			// 返回
			() => navigateBack({ delta: 1 }),
			// 保留当前页面。/\[[]]
			(obj) => navigateTo(obj),
			// 关闭当前页面。
			(obj) => redirectTo(obj),
			// 关闭所有页面，打开到应用内的某个页面。
			(obj) => reLaunch(obj),
			// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			(obj) => switchTab(obj)
		]
		// cache
		private shallowCache: { [key in string]: shallowInfo_DTYPE } = {}
		// router info
		public shallow: shallow_DTYPE = routerChunks.shallow as shallow_DTYPE
		public tabbar: tablist_DTYPE = routerChunks.tablist as tablist_DTYPE
		// attr
		private name: string = ''
		private space: string = ''
		private type: number = 1
		private acg: string = 'pop-in'
		private query: Object = {}
		private param: Object = {}
		private auth: Array<string> = []
		private curRouter: Partial<shallowInfo_DTYPE> = {}
		private lastRouter: Partial<shallowInfo_DTYPE> = {}
		private reRouter: Partial<shallowInfo_DTYPE> | null = {}
		// before after
		private before: before_DTYPE | null = null
		private after: after_DTYPE | null = null
		// result
		private result: result_DTYPE = {
			tips: '',
			key: '',
			result: false,
			hook: () => {
				const { tips, key } = this.result
				console.error(`${tips} hook()`, this)
				return this[key as routerPagesKeys]
			},
			beforeEach: () => {
				const { tips, key } = this.result
				console.error(`${tips} beforeEach()`, this)
				return this[key as routerPagesKeys]
			},
			afterEach: () => {
				const { tips, key } = this.result
				console.error(`${tips} afterEach()`, this)
				return this[key as routerPagesKeys]
			},
			gotoPage: () => {
				const { tips, key } = this.result
				console.error(`${tips} gotoPage()`, this)
				return this[key as routerPagesKeys]
			},
			gotoRouter: () => {
				const { tips, key } = this.result
				console.error(`${tips} gotoRouter()`, this)
				return this[key as routerPagesKeys]
			}
		}
		private errorResult: result_DTYPE = Object.assign(this.result, { tips: 'error', key: 'error' })
		private hookErrorResult: result_DTYPE = Object.assign(this.result, { tips: 'hook error', key: 'hookErrorResult' })

		constructor() {
			this.init()
			this.invoke()
		}

		init() {
			// 为了刷新有指向 重新找空间信息
			const cur = getCurrentPages()
			const bool = cur.length === 0
			const url = bool ? '/' : (cur[0] as any)?.$page.path
			if (bool || url === '/') {
				this.name = '/pages'
				this.curRouter = routerChunks.pages?.index as shallowInfo_DTYPE
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
		invokeRePage(apiName: string) {
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
		hook(fun: Function) {
			const result = fun.call(this, arguments)
			console.log('%c [ result ]-151', 'font-size:14px; background:#41b883; color:#ffffff;', result)
			return result === undefined || result === true ? this : this.hookErrorResult
		}

		beforeEach(fun: before_DTYPE) {
			// to, from, next
			if (fun && typeof fun === 'function') {
				this.before = (to, from, next) => {
					if (!next || typeof next !== 'function') {
						console.error('beforeEach next funcion error...')
						return this.errorResult
					}
					fun && fun(to, from, next)
					return this
				}
			} else {
				console.error('beforeEach function error...')
				return this.errorResult
			}
			return this
		}

		afterEach(fun: after_DTYPE) {
			// to, from
			if (fun && typeof fun === 'function') {
				this.after = (to) => {
					fun && fun(to, this.curRouter)
					return this
				}
			} else {
				console.error('afterEach function error...')
				return this.errorResult
			}
			return this
		}

		/**
		 * set key val
		 */
		setKeyVal(key: string, val: any) {
			this[key as routerPagesKeys] = val
			return this
		}

		/**
		 * set obj -> key val
		 */
		setObjectVal(obj: Object) {
			Object.entries(obj).forEach(([key, val]) => (this[key as routerPagesKeys] = val))
			return this
		}

		shallowFind(url: string): shallowInfo_DTYPE {
			const cache = this.shallowCache[url]
			if (cache) return cache
			const find = this.shallow.find((f) => f.path === url)
			if (find) this.shallowCache[url] = find
			return find as shallowInfo_DTYPE
		}

		setCureRouter(find: shallowInfo_DTYPE) {
			if (!find) return
			this.auth = find.auth || []
			this.param = find.param || {}
			this.name = find.name as string
			this.space = find.space as string
			this.curRouter = find || null
		}

		/**
		 * 按路径跳路由 命名用不惯自行修改 -> push(arg) -> router.push(url, param ....)
		 */
		gotoPage(url = '', param = {}, type = 1, make = false) {
			const find = this.shallowFind(url)
			const _to = Object.assign({}, this.curRouter)
			const _from = Object.assign({}, find)
			if (this.before && !make) return this.before(_to, _from, () => this.gotoPage(url, param, type, true))
			const token = checkToken()

			if (!find) {
				toast()
				console.error('无效的跳转', url)
				return this.errorResult
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
				// xxxxx('xxx/xxxx').then(() => {
				// 	GOTO_LOGIN()
				// })
				modal('token失效', () => GOTO_LOGIN())
				return this.errorResult
			}

			// 检查权限
			if (this.auth.length > 0) {
				const userRole = getUserRole()
				const check = this.auth.some((s) => userRole.includes(s))
				if (!check) {
					const cur = getCurrentPages()
					const FULLPATH = `/${(cur[0] as any)?.$page.path}`
					if (cur && FULLPATH !== LOGIN) modal('请先登录', () => GOTO_LOGIN())
					return this.errorResult
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
			let space = 'pages',
				sub = name.split('/')
			if (sub.length > 1) {
				const [sub_space, sub_name] = sub
				space = sub_space
				name = sub_name
			}

			// @ts-ignore
			const router = routerChunks[space as keyof newPagesJson_DTYPE][name] as shallowInfo_DTYPE
			if (!router) {
				toast()
				console.error('无效的跳转', name, query)
				return this.errorResult
			}
			const { path, auth, param } = router
			this.name = name
			this.space = space
			this.auth = (auth as Array<string>) || []
			return this.gotoPage(path, { ...query, ...param }, type)
		}
	}

	const router = new routerPages()
	router.beforeEach((to, from, next) => {
		console.log('------------------------')
		// console.log('低配版 beforeEach curRouter=', router.curRouter)
		console.log('低配版 beforeEach to=', to)
		console.log('低配版 beforeEach from=', from)
		next()
	})

	router.afterEach((to, from) => {
		console.log('------------------------')
		// console.log('低配版 afterEach curRouter=', router.curRouter)
		console.log('低配版 afterEach to=', to)
		console.log('低配版 afterEach from=', from)
	})

	return router
}
