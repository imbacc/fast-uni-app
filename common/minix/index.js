//minix 继承

// import append_data from './module/append_data.js';		//初始化数据和上拉,下拉加载
// import check_data from './module/check_data.js';		//check选中选项

// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  module[moduleName] = value.default
  return module
}, {})

const minix = {
	...modules
}

console.log('minix modules=', modules)

export default minix