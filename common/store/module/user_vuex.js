import api from '@/common/config/api.js'
import { del_cache } from '@/common/tools/cache_time.js'

const { getStorageSync, removeStorageSync } = uni

const UUID = getStorageSync('uuid') || false					//获取UUID缓存
const OPENID = getStorageSync('openid') || false 				//获取OPENID缓存
const TOKEN = getStorageSync('token') || false 					//获取TOKEN缓存
const USER_INFO = getStorageSync('user_info') || false 			//获取用户信息缓存
const USER_ROLE = getStorageSync('user_role') || false 			//获取用户权限缓存

//全局状态
const state = {
	uuid: UUID, 			// 用户uuid
	openid: OPENID, 		// 用户openid
	token: TOKEN, 			// 用户token
	user_info: USER_INFO, 	// 用户信息
	user_role: USER_ROLE, 	// 用户角色权限
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex_user(state, info) {
		state[info[0]] = info[1]
	},
	set_token(state, info) {
		state.token = info
		uni.setStorageSync('token', info)
	},
	set_openid(state, info) {
		state.openid = openid
		uni.setStorageSync('openid', info)
	},
	set_user_info(state, info) {
		state.user_info = info
		uni.setStorageSync('user_info', info)
	},
	set_user_role(state, info) {
		state.user_role = info
		uni.setStorageSync('user_role', info)
	},
	set_logout(state) {
		state.uuid = false
		state.openid = false
		state.token = false
		state.user_info = false
		state.user_role = false
		removeStorageSync('uuid')
		removeStorageSync('openid')
		removeStorageSync('token')
		removeStorageSync('user_info')
		removeStorageSync('user_role')
	},
	// 删除缓存接口
	set_refresh(state) {
		uni.setStorageSync('_cache_name_list', [])
	},
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: (state) => state.token && state.user_info || false
}

//异步方法
const actions = {
	clear_api_cache() {
		return new Promise((resovle) => {
			const cache_name_list = uni.getStorageSync('_cache_name_list') || []
			cache_name_list.forEach((name) => del_cache(name))
			resovle()
		})
	}
	// get_userInfo({ commit }) {
	// 	api('user_api/get_userinfo').then((res) => {
	// 		if (res) commit('set_user_info', res)
	// 	})
	// },
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}