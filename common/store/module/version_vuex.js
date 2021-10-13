import api from '@/common/config/api.js'
import { set_cache } from '@/common/tools/cache_time.js' //导入缓存时间控制
import { is_dev } from '@/common/config/cfg.js'

const SYSTEM_INFO = uni.getSystemInfoSync() //获取system信息

//全局状态
const state = {
	system_info: SYSTEM_INFO, //system信息
	app_version: '', //app verison
	app_sysinfo: '', //app 系统信息
	app_sysversion: '', //系统 version
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	},
}

//get方法
const getters = {

}

//异步方法
const actions = {
	//app更新
	app_version({ commit }, id) {
		console.log('检测Version版本...')
		const sysinfo = state.system_info

		id = sysinfo.platform === 'android' ? 1 : 2
		if (parseFloat(sysinfo.system) < 4.4) id = 3

		api('verison_api/app_version', { id }).then((res) => {
			if (res) {
				if (is_dev) {
					console.log('开发环境')
				} else {
					// xxx
				}
			}
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
