import requestAction from '@/tools/cmakeInterceptor.js'

import { METHOD } from '@/config/cfg.js'

// 模块api
const api = {
	getUser: ['api/user', METHOD.GET]
}

export const getUser = () => requestAction(...api.getUser)
