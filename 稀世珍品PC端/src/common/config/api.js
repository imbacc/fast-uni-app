import action from '@/common/tools/cmake_zrequest.js'
import { METHOD } from '@/common/config/cfg.js'
// import { lazyModule } from '@/common/tools/cmake_lazy.js'

// 公共api
const api = {
	// 普通API 默认请求类型按http_action.js设定 当前默认POST
	// app_111: 'index/ddd',
	// app_222: 'index/:id/fff' // 在param传入 _id 即可

	// 定义API [地址,请求类型,缓存时间] 缓存时间默认0
	// app_333: ['index/ddd/:id', 'GET'],
	// app_444: ['index/www', 'GET', 10],
	// app_555: ['index/eee', 'POST', 20],
	// app_666: ['index/qqq/:id/update', 'POST'] // 修改或删除 不要定义缓存时间

	user_login: ['/v1/user/pclogin', METHOD.POST],
	goods_search: ['/v1/goods/search', METHOD.GET],
	goods_order: ['/v1/goods/order', METHOD.POST],
	check_pay: ['/v1/goods/checkorder', METHOD.GET],
	order_list: ['/v1/order/lists', METHOD.GET],
	order_cancel: ['/v1/order/cancel', METHOD.POST]
}

// vite 自动化导入模块
const moduleFiles = import.meta.glob('./module/*.js')
// console.log('api moduleFiles', moduleFiles)

export default (name, ...args) => {
	// 外链请求 不要可以去除
	if (args && args[0] && args[0]._onec) return name && action(name, ...args)

	// 懒加载其他API module js
	// if (name && name.indexOf('/') !== -1) {
	// 	let [fileName, apiName] = name.split('/')
	// 	return new Promise((resolve) => {
	// 		lazyModule(fileName, moduleFiles).then((moduleApi) => {
	// 			let actionApi = moduleApi[apiName]
	// 			resolve(actionApi && action(actionApi, ...args))
	// 		})
	// 	})
	// }

	// 返回公共API
	return name && api[name] && action(api[name], ...args)
}
