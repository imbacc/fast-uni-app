import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api_request'	//导入API方法
import router from '../router'	//导入路由路径
import cache from '../setting_cache_time.js'	//导入缓存时间控制

Vue.use(Vuex)

const TOKEN = cache.get_cache("token") || ""		//获取TOKEN缓存
const OPENID = cache.get_cache("openId") || ""		//获取OPENID缓存
const USER_INFO = cache.get_cache("userInfo") || {}	//获取USERINFO缓存

//全局状态
const state = {
	token: TOKEN,		// 用户token
	openId: OPENID,		// 用户openid
	userInfo: USER_INFO	,// 用户信息
	nojmp_login:true
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
   set_logout(state) {
   	state.token = ""
	cache.set_cache("token", "")
   }
}

//get方法
const getters = {
   // 用户是否登录
   hasLogin: state => {
	if(state.nojmp_login) return true
   	if (state.token) {
   		return true
   	} else {
   		return false
   	}
   }
}

//异步方法
const actions = {
	//显示相应消息
	to_hideload({commit}){
		uni.hideLoading()
	},
	//显示加载load
	to_load({commit},msg = 'loading...'){
		 uni.showLoading({
			title: msg
		})
	},
	//显示toast
	to_msg({commit},msg = '服务器打瞌睡了...'){
		uni.showToast({  
			title: msg,
			icon:'none'
		})
	},
	//路由跳转
	goto_page({commit},url,type = 1){
		console.log("goto_page type="+type)
		console.log("goto_page url="+url)
		if(type == 1) uni.navigateTo({url:url})
		if(type == 2) uni.redirectTo({url:url})
		if(type == 3) uni.reLaunch({url:url})
		if(type == 4) uni.switchTab({url:url})
		if(type == 5) uni.navigateBack()
	},
   // 登录过期 重新登录
   reLogin({commit}, info) { 
		commit("set_token","")
		uni.redirectTo({
			url: routes.index
		})
   },
   //用户登陆
   async login_in({commit},info) {
	   store.dispatch("to_load")
	   let r = await api.app_login(info)
	   if(!r){
		   console.log("r="+r)
		   console.log("info="+JSON.stringify(info))
	   }else{
		  console.log("ok------------")
		  console.log(r.access_token)
		  commit("set_token",r.access_token)
		  store.dispatch("to_hideload")
		  store.dispatch("goto_page",router.index,2)
	   }
   },
   register({commit},info){
	   let r = api.app_register(info)
   },
   check_login({commit}){
	   if(!store.getters.hasLogin){
		   store.dispatch("goto_page",router.login,1)
		   return
	   }
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