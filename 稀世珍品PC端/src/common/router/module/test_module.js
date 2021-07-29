export default [
	{
		path: '/reactive',
		name: 'reactive',
		component: () => import('@views/test/reactive.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@views/test/about.vue'),
		meta: {
			store: ['test_vuex', 'copy_vuex']
		}
	}
]
