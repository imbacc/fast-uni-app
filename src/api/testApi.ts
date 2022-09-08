import requestAction from '@/tools/cmakeInterceptor.js'

import { METHOD } from '@/config/cfg.js'

// 模块api
const api = {
	getTest: ['api/get_test', METHOD.GET],
	getTest222: ['api/get_test/:id', METHOD.GET],
	getTest333: ['api/get_test/three', METHOD.GET]
}

export const getTest = () => requestAction(...api.getTest)
export const getTest222 = () => requestAction(...api.getTest222)
export const getTest333 = () => requestAction(...api.getTest333)
