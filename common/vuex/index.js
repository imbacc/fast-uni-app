import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api_config from '../config/api' 			//导入API
import http_request from '../api_request' 		//导入http封装拦截
import router from '../router' 					//导入路由路径
import cache from '../setting_cache_time.js' 	//导入缓存时间控制

//vuex 模块
import user_module from './module/user_vuex.js'
import push_module from './module/push_vuex.js'
import version_module from './module/version_vuex.js'

//全局状态
const state = {
	
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
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	/**
	 * 统一API info[0,1,2,3,4]
	 * 0是api名称 例 => 'app_login'
	 * 1是api param参数 => {t:1} url?t=1 携带参数 json格式
	 * 2是api body参数 => {t:1} json对象参数 json格式
	 * 3是api分页参数 格式[1,10]
	 * 4是api缓存时间 默认0
	 * 5是api请求方式 默认post 或 get
	 */
	async api_action({}, info = ['',{},{}, false, 0, 'post']) {
		const api_json = info[3] === false || info[3] === undefined ? info[1] : api_config.get_args_page(info[1], info[3])
		const load = info[0].indexOf('wait') === -1
		if(load) uni.showLoading()
		const request = await http_request(api_config[info[0]],api_json,info[2], info[5], info[4])
		if(load) uni.hideLoading()
		return Promise.resolve(request)
	},
	
}

const modules = {
	user_module,
	push_module,
	version_module,
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules
})

Vue.prototype.is_vuex = store
Vue.prototype.is_router = router
Vue.prototype.is_cache = cache

export default store
