import api from '@/common/config/api.js'
import { del_cache } from '@/common/tools/cache_time.js'

const TOKEN = uni.getStorageSync('token') || false 					//获取TOKEN缓存
const USER_INFO = uni.getStorageSync('user_info') || false 			//获取用户信息缓存

//全局状态
const state = {
	token: TOKEN, 			// 用户token
	user_info: USER_INFO, 	// 用户信息
	location: { latitude: 0, longitude: 0 },	// 用户位置
	cur_shop: {},	// 用户选择的门店
	refresh_home: false,	// 切换门店后刷新缓存
	refresh_course: false,	// 切换门店后刷新缓存
	invite_code: '',	// 推广二维码
	exit_state: false,	// 退出状态
	signup: true	// 检测课程
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	},
	set_token(state, info) {
		state.token = info
		uni.setStorageSync('token', info)
	},
	set_user_info(state, info) {
		state.user_info = info
		uni.setStorageSync('user_info', info)
	},
	set_logout(state) {
		state.token = false
		state.user_info = false
		uni.removeStorageSync('token')
		uni.removeStorageSync('user_info')
	},
	set_refresh(state) {
		uni.setStorageSync('_cache_name_list', [])
		state.refresh_home = true
		state.refresh_course = true
	},
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: (state) => state.token && state.user_info || false
}

//异步方法
const actions = {
	//检查是否登陆状态
	// check_login({ commit, state, getters }) {
	// 	if (!getters.hasLogin || !state.user_info) {
	// 		commit('set_logout')
	// 		return Promise.resolve(false)
	// 	}
	// 	return Promise.resolve(true)
	// },
	auto_userInfo({ commit, dispatch }) {
		if (state.token && state.user_info) return
		if (state.token && !state.user_info) dispatch('get_userInfo')
	},
	get_userInfo({ commit }) {
		api('user_api/get_userinfo').then((res) => {
			if (res) commit('set_user_info', res)
		})
	},
	user_location({ commit }, refresh) {
		return new Promise((resovle) => {
			uni.getLocation({
				success: (location) => {
					const { longitude, latitude } = location
					const parma = refresh ? { _cache: 0 } : {};
					let body = {}
					body['_header'] = { 'x-address': `${longitude},${latitude}` }
					api('home_api/shop_list', parma, body).then((res) => {
						commit('set_vuex', ['location', { longitude, latitude }])
						if (res) {
							let bool = res.distance < 1000
							res.km = bool ? res.distance : (res.distance / 1000).toFixed(1)
							res.unit = bool ? 'm' : 'km'
							commit('set_vuex', ['cur_shop', res])
						}
						resovle(res || false)
					})
				},
				fail: (err) => {
					this.is_tools.to_msg('获取用户位置失败!')
					resovle(false)
				},
			})
		})
	},
	clear_api_cache() {
		return new Promise((resovle) => {
			const cache_name_list = uni.getStorageSync('_cache_name_list') || []
			cache_name_list.forEach((name) => del_cache(name))
			resovle()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}