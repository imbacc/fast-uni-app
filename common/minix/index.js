//minix 继承

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