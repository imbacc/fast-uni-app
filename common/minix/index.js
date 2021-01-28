//minix 继承

// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  module[moduleName] = modulesFiles(modulePath).default
  return module
}, {})

console.log('minix modules=', modules)

export default {
	...modules
}