import http_action from '../../tools/http_action.js';
import is_cache from '../../tools/cache_time.js' 	//导入缓存时间控制

const SYSTEM_INFO = uni.getSystemInfoSync() 		//获取system信息
const NODE_DEV = process.env.NODE_ENV


//全局状态
const state = {
	system_info:SYSTEM_INFO,	//system信息
	app_version: '', //app verison
	app_sysinfo: '', //app 系统信息
	app_sysversion:'',//系统 version
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex_version(state, info) {
		console.log(state)
		state[info[0]] = info[1]
	},
	set_app_sysversion(state, version) {
		state.app_sysversion = version
		uni.setStorageSync('sys_version', version)
	},
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	//app更新
	app_version({commit}, id) {
		let app_version_cache = is_cache.get_cache('capp_no_update')
		if(!app_version_cache){
			console.log('app_version缓存已过期')
		}else{
			console.log('读取app_version缓存')
			return Promise.resolve(app_version_cache)
		}
		
		console.log('检测Version版本...')
		
		const sysinfo = state.system_info
		
		id = sysinfo.platform === 'android' ? 1 : 2
		if(parseFloat(sysinfo.system) < 4.4) id = 3
		
		http_action('app_version',{id:id},{},false,5,'post').then((res)=>{
			if(res){
				if(NODE_DEV === 'development'){
					console.log('开发环境')
				}else{
					let sys_version = res.version.replace('.','')
					sys_version = sys_version.indexOf('.') !== -1 ? sys_version.replace('.','') : parseInt(sys_version)
					
					console.log("系统sys_version"+sys_version)
					console.log("app version"+r.version)
					console.log("手机系统版本"+res.system)
					
					if(sys_version != res.version){
						is_cache.set_cache('capp_update', res, 30)
						uni.navigateTo({url:router.version})
					}
				}
				is_cache.set_cache('capp_no_update', res, 30)
				commit('set_token',res.token)
				console.log('token success')
			}
		})
	},
}

export default {
	state,
	mutations,
	getters,
	actions
}