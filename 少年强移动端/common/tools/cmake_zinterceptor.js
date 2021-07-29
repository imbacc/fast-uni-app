/**
 * 拦截请求
 */
import http from './cmake_zrequest.js'
import store from '../store/index.js'

var error_time = null

const error_msg = (title) => {
	clearTimeout(error_time)
	error_time = setTimeout(() => {
		clearTimeout(error_time)
		uni.showToast({
			title,
			icon: 'none',
			mask: false,
			duration: 1500
		})
	}, 1)
}

//设置请求拦截
http.interceptor.request = (config) => {
	let token = store.state.user_vuex.token || false
	if (token) config.header['x-access-token'] = token
	// if (token) config.header['x-access-token'] = '1232fef5082f5453126ec944f1131065'
	
	if (config.data._noToken) {
		delete config.data['_noToken']
		delete config.header['x-access-token']
	}
	
	if (config.data._formData) {
		config.header['content-Type'] = 'application/x-www-form-urlencoded'
		delete config.data['_formData']
	}
	
	if (config.data._header) {
		config.header = { ...config.header, ...config.data._header }
		delete config.data['_header']
	}
	
	// let token = store.state.user_vuex.token || ''

	//添加通用参数
	// config.header = {
	// 	// 'authorization':`Bearer ${token}`,
	// 	'Origin': 'http://testx.yueyiweb.com'
	// }

	// console.log('【config】 '+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {

	// console.log('【response】 ', res)

	const { statusCode, errMsg, config } = res

	if (statusCode === 401) {
		console.error('401错误', errMsg)
		error_msg('登录信息已失效')
		return 'false'
	}

	if (statusCode === 503) {
		console.error('503错误', errMsg)
		error_msg('503错误')
		return 'false'
	}

	if (errMsg.toString().indexOf('fail') !== -1 || statusCode === 0) {
		console.error('网络异常:', errMsg)
		error_msg('网络异常')
		return 'false'
	}

	const { data } = res

	// if (data.code === -403 || data.code === -404 || data.code === -444 || data.code === -500) return false

	if (data.code === 1) {
		let result = data.data
		if (result === null) return true
		if (typeof result === 'object') return result
		if (!isNaN(result)) return `${result}`
		if (typeof result === 'string') return `${result}`
		if (typeof result === 'boolean') return Boolean(result)
		console.log(`${config.url} 拦截通知:`, data.msg)
		return result
	} else {
		if (data.code === 0 && data.msg === 'Token已过期') {
			error_msg('Token已过期 请重新登录!')
			store.commit('user_vuex/set_logout')
			uni.clearStorage()
			uni.switchTab({ url: '/pages/my/my' })
			return 'false'
		}
		if (data.code === 0 && data.msg === '请登录后操作') {
			error_msg('请登录后操作!')
			uni.switchTab({ url: '/pages/my/my' })
			return 'false'
		}
		if (data.code === 0 && data.msg === '记录未找到') {
			console.log(`${config.url} 拦截通知:`, data.msg)
			return 'false'
		}
		console.error(`${config.url} 服务报错:`, data.msg)
		error_msg(data.msg ? data.msg : '服务异常')
		return 'false'
	}

	return data.data
}

export default http
