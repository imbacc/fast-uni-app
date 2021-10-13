/**
 * 拦截请求
 */
import http from './cmake_zrequest.js'
import store from '../store/index.js'

var loading_time = null
var error_time = null

const error_msg = (title) => {
	clearTimeout(error_time)
	error_time = setTimeout(() => {
		clearTimeout(error_time)
		uni.showToast({ title, icon: 'none', mask: false, duration: 2000 })
	}, 100)
}

//设置请求拦截
http.interceptor.request = (config) => {
	let token = store.state.user_vuex.token || false
	if (token) config.header['x-access-token'] = token
	
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
	
	//添加通用参数
	// config.header = {
	// 	'authorization':`Bearer ${token}`,
	// }
	
	// console.log('【config】 '+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {
	
	// console.log('【response】 ', res)
	
	const { statusCode, errMsg } = res
	
	if(statusCode === 401){
		console.log('401错误', errMsg)
		error_msg('登录信息已失效')
		uni.clearStorage()
		uni.reLaunch({ url: '/pages/login/login', animationType: 'slide-in-bottom' })
		return 'false'
	}
	
	if(statusCode === 503){
		console.log('503错误', errMsg)
		error_msg('503错误')
		return 'false'
	}
	
	if(errMsg.toString().indexOf('fail') !== -1 || statusCode === 0){
		console.log('网络异常:', errMsg)
		error_msg('网络异常')
		return 'false'
	}
	
	const { data } = res
	
	// if(data.code === -403 || data.code === -404 || data.code === -444 || data.code === -500) return false
	
	if(data.code === 0){
		console.log('拦截通知:', data.msg)
		return data.data
	}else{
		if (data.msg) error_msg(data.msg ? data.msg : '服务器打瞌睡了')
		console.error('服务报错:', data.msg)
		return 'false'
	}
	
    return data.data
}

export default http
