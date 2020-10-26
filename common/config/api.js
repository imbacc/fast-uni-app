// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  module = {...module, ...value.default} 
  return module
}, {})

console.log('api modules=', modules)

export default {
	...modules,
  
	// 普通API 默认请求类型按http_action.js设定来 当前默认POST
	app_111:'api/ddd',
	app_222:'api/:id/fff',	// 在param传入 _id 即可
  
	// 定义API [地址,请求类型,缓存时间] 缓存时间默认0
	app_333:['api/ddd/:id', 'GET'],
	app_444:['api/www', 'GET', 10],
	app_555:['api/eee', 'POST', 20],
	app_666:['api/qqq/:id/update', 'POST'],	// 修改或删除 不要定义缓存时间
  }