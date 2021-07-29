export default [
	{
		path: '/action',
		name: 'action',
		component: () => import('@views/test/action.vue'),
		meta: {
			auth: ['user']
		}
	}
]
