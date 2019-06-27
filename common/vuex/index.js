import Vue from 'vue'
import Vuex from 'vuex'

import api_config from '../config/api' 			//导入API
import api from '../api_request' 				//导入http封装拦截
import router from '../router' 					//导入路由路径
import cache from '../setting_cache_time.js' 	//导入缓存时间控制

Vue.use(Vuex)

const TOKEN = cache.get_cache("token") || "" 			//获取TOKEN缓存
const OPENID = cache.get_cache("openId") || "" 			//获取OPENID缓存
const USER_INFO = cache.get_cache("userInfo") || {} 	//获取USERINFO缓存

//全局状态
const state = {
	token: TOKEN, 			// 用户token
	openId: OPENID, 		// 用户openid
	userInfo: USER_INFO, 	// 用户信息
	is_login_page: false, 	//当前是否是登陆页面
	is_check_login:true,  	//是否检测登陆
}

//同步方法
const mutations = {
	set_token(state, token) {
		state.token = token
		cache.set_cache("token", token)
	},
	set_openid(state, openId) {
		state.openId = openId
		cache.set_cache("openId", openId)
	},
	set_userinfo(state, userInfo) {
		state.userInfo = userInfo
		cache.set_cache("userInfo", userInfo)
	},
	set_is_login_page(state) {
		state.is_login_page = !state.is_login_page
	},
	is_check_login(state,bool = true) {
		state.is_check_login = bool
	},
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: state => {
		if (state.nojmp_login) return true
		if (state.token == 0 || state.token == '0' || state.token == undefined) return false
		if (state.token) {
			return true
		} else {
			return false
		}
	}
}

//异步方法
const actions = {
	//路由跳转
	goto_page({commit}, info) {
		if (!info.hasOwnProperty('type')) info = {url: info,type: 1}
		if (!info.hasOwnProperty('acg')) info.acg = 'pop-in'
		// console.log("goto_page type="+info.type)
		// console.log("goto_page url="+info.url)
		if (info.type === 1) uni.navigateTo({url: info.url,animationType: info.acg})
		if (info.type === 2) uni.redirectTo({url: info.url,animationType: info.acg})
		if (info.type === 3) uni.reLaunch({url: info.url,animationType: info.acg})
		if (info.type === 4) uni.switchTab({url: info.url,animationType: info.acg})
		if (info.type === 5) uni.navigateBack(info)
	},
	//用户登陆
	login_in({commit}, info) {
		return Promise.resolve(api.http_request(api_config.app_login, {username: info[0],password: info[1]}))
	},
	//检查是否登陆状态
	check_login({commit}) {
		if (!store.getters.hasLogin) {
			if (!store.is_login_page) {
				store.commit('set_is_login_page')
				store.dispatch("goto_page", router.login, 2)
			}
		}
		return Promise.resolve(store.getters.hasLogin)
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

Vue.prototype.is_vuex = store
Vue.prototype.is_router = router
Vue.prototype.is_cache = cache
Vue.prototype.is_api = api

export default store
