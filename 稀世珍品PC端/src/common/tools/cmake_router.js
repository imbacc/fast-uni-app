import router from '../router/index.js'
import { getters } from '../compose/user_store.js'
import { configure, start, done } from 'nprogress'

configure({ showSpinner: false })

// 跳过
const jump_list = ['/ddd']
// 检查登录
const check_login = () => getters.hasLogin()

// ...前置守卫
router.beforeEach(({ path, matched, fullPath }, from, next) => {
	start()
	if (path === '/login' || jump_list.includes(path)) {
		next()
		done()
		return
	}

	if (!check_login()) {
		next('/login')
		done()
		return
	} else {
		next()
		done()
	}
})

// ...后置钩子
router.afterEach((to, from) => {
	done()
})

export default router
