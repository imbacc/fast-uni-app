import Vue from 'vue'
import Vuex from 'vuex'

import api_config from '../config/api'			//导入API
import api from '../api_request'				//导入API方法
import router from '../router'					//导入路由路径
import cache from '../setting_cache_time.js'	//导入缓存时间控制

Vue.use(Vuex)

const TOKEN = cache.get_cache("token") || ""			//获取TOKEN缓存
const OPENID = cache.get_cache("openId") || ""			//获取OPENID缓存
const USER_INFO = cache.get_cache("userInfo") || {}		//获取USERINFO缓存
const MARK_JUMP = cache.get_cache("mark_jump") || []	//获取USERINFO缓存

//全局状态
const state = {
	token: TOKEN,		 // 用户token
	openId: OPENID,		 // 用户openid
	userInfo: USER_INFO, // 用户信息
	nojmp_login: false,	 // true为不验证用户TOKEN 不跳转登陆,false为正常判断用户TOKEN
	mark_jump: MARK_JUMP,// 标记跳转记录
	is_login_page:false, //当前是否是登陆页面
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
   },
   set_is_login_page(state) {
   	state.is_login_page = !state.is_login_page
   }
}

//get方法
const getters = {
   // 用户是否登录
    hasLogin: state => {
   	if(state.nojmp_login) return true
   	if(state.token == 0 || state.token == '0' || state.token == undefined) return false
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
	goto_page({commit},info){
		if(!info.hasOwnProperty('type')) info = {url:info,type:1}
		if(!info.hasOwnProperty('acg')) info.acg = 'pop-in'
		console.log("goto_page type="+info.type)
		console.log("goto_page url="+info.url)
		if(info.type === 1) uni.navigateTo({url:info.url,animationType:info.acg})
		if(info.type === 2) uni.redirectTo({url:info.url,animationType:info.acg})
		if(info.type === 3) uni.reLaunch({url:info.url,animationType:info.acg})
		if(info.type === 4) uni.switchTab({url:info.url,animationType:info.acg})
		if(info.type === 5) uni.navigateBack(info)
		let mark_jump = cache.get_cache('mark_jump')
		if(!mark_jump) mark_jump = []
		mark_jump[mark_jump.length] = info.url
		if(info.type <= 4 && info.url.indexOf('login') == -1) cache.set_cache('mark_jump',mark_jump)
	},
   // 登录过期 重新登录
  reLogin({commit}, info) { 
  		commit("set_token","")
  		store.dispatch("goto_page",{url:routes.index,type:2})
  },
   //用户登陆
   login_in({commit},info) {
	   store.dispatch("to_load")
	   let r = api.app_login(info)
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
    //检查是否登陆状态
   check_login({commit}){
   	   if(!store.getters.hasLogin){
   		   if(!store.is_login_page){
   			   store.commit('set_is_login_page')
   			   store.dispatch("goto_page",router.login,2)
   		   }
   	   } 
   	   return Promise.resolve(store.getters.hasLogin)
   },
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