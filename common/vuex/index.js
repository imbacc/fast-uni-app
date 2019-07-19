import Vue from 'vue'
import Vuex from 'vuex'

import api_config from '../config/api' 			//导入API
import http_request from '../api_request' 		//导入http封装拦截
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
	app_version: '',		//app verison
	app_sysinfo: '', 		//app 系统信息
	sys_push_info: '', 		//app 用于推送
	is_login_page: false, 	//当前是否是登陆页面
	is_check_login:true,  	//是否检测登陆
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
	set_logout(state) {
		state.token = ""
		state.userInfo = {}
		uni.clearStorage()
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
		console.log("goto_page type="+info.type)
		console.log("goto_page url="+info.url)
		if (info.type === 1) uni.navigateTo({url: info.url,animationType: info.acg})
		if (info.type === 2) uni.redirectTo({url: info.url,animationType: info.acg})
		if (info.type === 3) uni.reLaunch({url: info.url,animationType: info.acg})
		if (info.type === 4) uni.switchTab({url: info.url,animationType: info.acg})
		if (info.type === 5) uni.navigateBack(info)
	},
	/**
	 * 统一API info[0,1,2,3,4]
	 * 0是api名称 例 => 'app_login'
	 * 1是api参数 => {username:1}
	 * 2是api分页参数 格式[1,10]
	 * 3是api缓存时间 默认0
	 * 4是api请求方式 默认post 或 get
	 */
	api_action({commit}, info = ['', {}, false, 0, 'post']) {
		const api_json = info[2] === false || info[2] === undefined ? info[1] : api_config.get_args_page(info[1], info[2])
		return Promise.resolve(http_request(api_config[info[0]], api_json, info[4], info[3]))
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
	},
	//app版本更新 在App.vue onLaunch 调用 | 需要在lv_update里checkLatest函数修改字段内容
	get_app_version({commit}) {
		uni.getSystemInfo({
			success: (res) => {
				let code = res.platform + '_app'
				store.dispatch('api_action',['get_sys_config',{code:code}]).then((info) => {
					console.log(info)
					if (info) {
						console.log('now version=' + res.version)
						console.log('get version=' + info.sysName)
						if (info.sysName == res.version) {
							console.log('已经是最新版本!')
						} else {
							store.dispatch("goto_page", router.app_update, 3)
						}
						store.commit('set_vuex', ['app_sysinfo', res])
						store.commit('set_vuex', ['app_version', info])
					}
				})
			}
		})
	},
	//需要真机运行 或 自定义基座
	open_push({commit}) {
		let _this = this
	
		uni.getProvider({
			service: 'push',
			success: (res) => {
				// uni.showModal({
				// 	title: 'one - push',
				// 	content: JSON.stringify(res)
				// })
			}
		})
	
		uni.subscribePush({
			provider: 'igexin',
			success: (res) => {
				// uni.showModal({
				// 	title: 'two - push',
				// 	content: JSON.stringify(res)
				// })
				store.commit('set_vuex', ['sys_push_info', res])
			}
		})
	
		uni.onPush({
			provider: 'igexin',
			success: () => {
				uni.showModal({
					title: 'igexin',
					content: '监听透传成功!'
				})
			},
			callback: (data) => {
				let json = data.data
				json = JSON.parse(json)
				
				console.log('-----------------------callback-------------------')
				console.log(data)
	
				// uni.showModal({
				// 	title: '用户推送过来的消息',
				// 	content: json.sendUserId + ':' + json.content
				// })
				
				if(json.type == 2 || json.type == "2"){
					store.commit('set_vuex',['get_msg_id',json.sendUserId])	//push过来的id
					store.commit('set_vuex',['get_msg_text',json.content])	//push过来的内容
					if(store.state.is_msg_page === false) store.dispatch("goto_page", router.chat)
				}else{
					uni.navigateTo({url:json.appUrl})
				}
				
				return Promise.resolve(json)
			}
		})
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

export default store
