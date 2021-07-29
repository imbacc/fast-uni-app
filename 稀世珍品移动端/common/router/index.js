//路由路径封装

// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  module = {...module, ...modulesFiles(modulePath).default} 
  return module
}, {})

console.log('router modules=', modules)

export default {
	...modules,
	
	login:'/pages/login/login',
	index:'/pages/index/index',
	info:'/pages/index/info',
}
