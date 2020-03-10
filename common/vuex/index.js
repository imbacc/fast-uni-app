import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//vuex 模块
import version_module from './module/version_vuex.js'
import user_module from './module/user_vuex.js'
import push_module from './module/push_vuex.js'

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

//模块
const modules = {
	version_module,
	user_module,
	push_module,
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules
})

export default store
