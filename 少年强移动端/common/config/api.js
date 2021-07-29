import action from '@/common/tools/cmake_action.js'
import { METHOD } from './cfg.js'

// 获取module文件下子模块内容
const Files = require.context('./module', true, /\.js$/)
const moduleFiles = {}

// 公共API
const api = {
	// 普通API 默认请求类型按http_action.js设定来 当前默认POST
	send_sms: ['/util/sms', METHOD.POST],		//  验证码
	upload_file: ['/util/upload', METHOD.POST],	//	上传
	auth_login: ['/oauth/authorized', METHOD.GET],	// 授权

	// 定义API [地址,请求类型,缓存时间] 缓存时间默认0
	// app_333: ['api/ddd/:id', 'GET'],
	// app_444: ['api/www', 'GET', 10],
	// app_555: ['api/eee', 'POST', 20],
	// app_666: ['api/qqq/:id/update', 'POST'], // 修改或删除 不要定义缓存时间
}

export default (name, ...args) => {
	// 外链请求 不要可以去除
	if (args && args[0] && args[0]._onec) return name && Promise.resolve(action(name, ...args))

	return new Promise((resolve) => {
		// 懒加载其他API module
		if (name && name.indexOf('/') !== -1) {
			let [fileName, apiName] = name.split('/')
			let modulePath = `./${fileName}.js`
			let module = moduleFiles[modulePath]
			
			if (module) {
				return resolve(action(module[apiName], ...args))
			} else {
				let moduleApi = Files(modulePath).default
				let actionApi = moduleApi[apiName]
				moduleFiles[modulePath] = moduleApi
				return actionApi && resolve(action(actionApi, ...args))
			}
		}

		// 返回公共API
		return name && api[name] ? resolve(action(api[name], ...args)) : resolve(false)
	})
}
