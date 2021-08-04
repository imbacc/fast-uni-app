import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('@/views/index/index.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@views/index/login.vue')
	},
	{
		path: '/order-list',
		name: 'order-list',
		component: () => import('@/views/index/order-list.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// vite自动导入
// const moduleArray = import.meta.glob('./module/*.js')

export default router
