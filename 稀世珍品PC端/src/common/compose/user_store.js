import { reactive } from 'vue'
import { set_cache_loca, get_cache_loca } from '@/common/tools/cmake_cache.js'

const TOKEN = localStorage.getItem('token') || false
const USER_INFO = get_cache_loca('user_info') || false

//全局状态
const state = reactive({
	token: TOKEN, // 用户token
	user_info: USER_INFO // 用户信息
})

//同步方法
const mutations = {
	set_state(key, val) {
		state[key] = val
	},
	set_cache(key, val) {
		state[key] = val
		set_cache_loca(key, val)
	},
	set_logout() {
		state.token = ''
		state.user_info = false
		localStorage.removeItem('token')
		localStorage.removeItem('user_info')
	}
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: () => state.token || state.user_info || false
}

export { state, mutations, getters }
