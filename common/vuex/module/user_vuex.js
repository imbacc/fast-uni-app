import is_cache from '../../tools/cache_time.js' 	//导入缓存时间控制

const UUID = uni.getStorageSync('uuid') || false					//获取UUID缓存
const OPENID = uni.getStorageSync('openid') || false 				//获取OPENID缓存
const TOKEN = uni.getStorageSync('token') || false 					//获取TOKEN缓存
const USER_INFO = uni.getStorageSync('user_info') || false 			//获取用户信息缓存
const USER_ROLE = uni.getStorageSync('user_role') || false 			//获取用户权限缓存

//全局状态
const state = {
	uuid: UUID, 			// 用户uuid
	openid: OPENID, 		// 用户openid
	token: TOKEN, 			// 用户token
	user_info: USER_INFO, 	// 用户信息
	user_role: USER_ROLE, 	// 用户角色权限
	nojmp_login: false, 	// true为不验证用户TOKEN 不跳转登陆,false为正常判断用户TOKEN
	is_login_page: false, 	// 当前是否是登陆页面
	
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex_user(state, info) {
		console.log(state)
		state[info[0]] = info[1]
	},
	set_token(state, info) {
		state.token = info
		is_cache.set_cache("token", info, (60 * 24 * 7))
	},
	set_openid(state, info) {
		state.openid = openid
		is_cache.set_cache("openid", info, (60 * 24 * 7))
	},
	set_user_info(state, info) {
		state.user_info = info
		is_cache.set_cache("user_info", info, (60 * 24 * 7))
	},
	set_user_role(state, info) {
		state.user_role = info
		is_cache.set_cache("user_role", info, (60 * 24 * 7))
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
		let stor_token = state.token || uni.getStorageSync("token")
		if (state.nojmp_login) return true
		if (stor_token === '' || stor_token === null || stor_token === false || stor_token === undefined) return false
		return state.token ? true : false
	}
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