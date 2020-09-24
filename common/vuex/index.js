import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取module文件下子模块内容
const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  module[moduleName] = value.default
  return module
}, {})

console.log('vuex modules=', modules)

//全局状态
const state = {
	
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex(state, info) {
		state[info[0]] = info[1]
	},
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules
})

export default store
