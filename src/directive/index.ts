// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.ts$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  module[moduleName] = modulesFiles(modulePath).default
  return module
}, {})

export default {
  install: () => {
    Object.values(modules).forEach((func: any) => func?.())
  },
}
