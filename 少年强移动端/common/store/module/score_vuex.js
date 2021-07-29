
//全局状态
const state = {
	score_info: {}
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	},
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}