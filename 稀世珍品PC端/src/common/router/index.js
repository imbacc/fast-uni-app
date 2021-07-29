import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('@/views/index/index.vue'),
		meta: {
			// auth: ['user']
			// router: ['init_module', 'action_module', 'test_module']
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@views/index/login.vue')
	},
	{
		path: '/401',
		name: '401',
		component: () => import('@views/error-page/401.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@views/error-page/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// vite自动导入
// const moduleArray = import.meta.glob('./module/*.js')

export default router
