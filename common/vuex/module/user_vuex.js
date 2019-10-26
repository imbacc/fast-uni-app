import api_config from '../../config/api' //导入API
import http_request from '../../api_request' //导入API方法

const TOKEN = uni.getStorageSync('token') || false //获取TOKEN缓存
const OPENID = uni.getStorageSync('openid') || false //获取OPENID缓存
const USER_INFO = uni.getStorageSync('userinfo') || false //获取USERINFO缓存
const USER_ROLE = uni.getStorageSync('user_role') || false //获取USERINFO缓存

//全局状态
const state = {
	token: TOKEN, // 用户token
	openId: OPENID, // 用户openid
	userInfo: USER_INFO, // 用户信息
	user_role: USER_ROLE, //用户角色权限
	nojmp_login: false, // true为不验证用户TOKEN 不跳转登陆,false为正常判断用户TOKEN
	is_login_page: false, //当前是否是登陆页面
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
	set_token(state, token) {
		state.token = token
		uni.setStorageSync("token", token)
	},
	set_openid(state, openId) {
		state.openId = openId
		uni.setStorageSync("openid", openId)
	},
	set_userinfo(state, userInfo) {
		state.userInfo = userInfo
		uni.setStorageSync('userinfo', userInfo)
	},
	set_userRole(state, role) {
		state.user_role = role
		uni.setStorageSync('user_role', role)
	},
	set_logout(state) {
		state.token = ""
		state.get_msg_id = -1
		state.get_msg_num = 0
		state.get_msg_text = ''
		state.userInfo = null
		uni.removeStorageSync('userinfo')
		uni.removeStorageSync('openId')
		uni.removeStorageSync('token')
	},
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: state => {
		if (state.nojmp_login) return true
		let stor_token = uni.getStorageSync("token") || false
		if (state.token === '0' || state.token === false || state.token === undefined || stor_token === undefined || stor_token === false) return false
		return state.token ? true : false
	},
}

//异步方法
const actions = {
	//获取用户信息
	async get_userinfo({commit}) {
		let user = await http_request(api_config.get_userinfo)
		commit('set_userinfo', user)
		return Promise.resolve(user)
	},
	//检查是否登陆状态
	check_login({commit,state,getters,rootState}) {
		// console.log(rootState)
		if (!getters.hasLogin) {
			if (!state.is_login_page) {
				commit('set_logout')
				commit('set_vuex',['is_login_page',true])
				return Promise.resolve(false)
			}
		}
		return Promise.resolve(true)
	},
}

export default {
	state,
	mutations,
	getters,
	actions
}