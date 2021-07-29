// test_api module 里的测试接口 mock
export default [
	{
		url: '/api/index/ddd',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'ok',
				data: '我是/api/index/ddd 测试数据'
			}
		}
	},
	{
		url: '/api/index/222/fff',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'ok',
				data: '我是/api/index/:id/fff 测试数据'
			}
		}
	},
	{
		url: '/api/index/ddd/333',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'ok',
				data: '我是/api/index/ddd/:id 测试数据'
			}
		}
	},
	{
		url: '/api/index/www',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'ok',
				data: '我是/api/index/www GET 我会缓存10分钟 测试数据 缓存在localStorage里查看'
			}
		}
	},
	{
		url: '/api/index/eee',
		method: 'post',
		response: () => {
			return {
				code: 0,
				message: 'ok',
				data: '我是/api/index/eee POST 我会缓存20分钟 测试数据 缓存在localStorage里查看'
			}
		}
	},
	{
		url: '/api/index/qqq/666/update',
		method: 'post',
		response: () => {
			return {
				code: 0,
				message: '更新成功',
				data: '我是更新接口 /api/index/qqq/666/update 不要缓存老子'
			}
		}
	}
]
