import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	module[moduleName] = modulesFiles(modulePath).default
	return module
}, {})

console.log('vuex modules=', modules)

export default new Vuex.Store({ modules })
