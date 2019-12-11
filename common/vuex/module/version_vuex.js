//全局状态
const state = {
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
	get_app_version({commit}) {
		uni.getSystemInfo({
			success: (res) => {
				commit('set_version_vuex', ['app_sysinfo', res])
				const sys_version = plus.runtime.version
				commit('set_app_sysversion',sys_version)
				// let code = res.platform + '_app'
				// store.dispatch('api_action',['get_sys_config_wait',{code:code}]).then((info) => {
				// 	console.log(info)
				// 	if (info) {
				// 		console.log('now version=' + sys_version)
				// 		console.log('get version=' + info.sysName)
				// 		if (info.sysName == sys_version) {
				// 			console.log('已经是最新版本!')
				// 		} else {
				// 			uni.reLaunch({url:router.app_update})
				// 		}
				// 		commit('set_version_vuex', ['app_version', info])
				// 	}
				// })
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