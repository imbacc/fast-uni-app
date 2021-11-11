import { is_dev } from '@/common/config/cfg.js'

// const SYSTEM_INFO = uni.getSystemInfoSync() //获取system信息

//全局状态
const state = {
	// system_info: SYSTEM_INFO, //system信息
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	}
}

//get方法
const getters = {

}

//异步方法
const actions = {
	async update_version() {
		if (is_dev) {
			console.log('开发环境 不检测更新!')
			return
		}
		
		let t = setTimeout(() => {
			clearTimeout(t)
			const updateManager = uni.getUpdateManager()
				
			updateManager.onCheckForUpdate((res) => {
				// 请求完新版本信息的回调
				// console.log(res.hasUpdate)
			})
				
			updateManager.onUpdateReady((res) => {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
				})
			})
				
			updateManager.onUpdateFailed((res) => {
				// 新的版本下载失败
				uni.showModal({
					title: '提示',
					content: '当前版本过低，无法使用此功能，请升级最新版本',
					showCancel: false
				})
			})
		}, 100)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
