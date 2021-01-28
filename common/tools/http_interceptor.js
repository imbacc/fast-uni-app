/**
 * 拦截请求
 */
import http from './http_request.js'
import store from '../store/index.js'

const error_msg = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		mask: false,
		duration:1500
	})
}

//设置请求拦截
http.interceptor.request = (config) => {
	// console.log(config)
	let token = store.state.user_vuex.token || ''
	
	//添加通用参数
	config.header = {
		'authorization':`Bearer ${token}`,
	}
	
	// console.log('【config】 '+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {
	
	// console.log('【response】 ', res)
	
	const { statusCode, errMsg } = res
	
	if(statusCode === 401){
		console.log('401错误',errMsg)
		error_msg('登录信息已失效')
		uni.clearStorage()
		uni.reLaunch({url:'/pages/login/login',animationType:'slide-in-bottom'})
		return Boolean(false)
	}
	
	if(statusCode === 503){
		console.log('503错误',errMsg)
		error_msg('503错误')
		return Boolean(false)
	}
	
	if(errMsg.toString().indexOf('fail') !== -1 || statusCode === 0){
		console.log('网络异常:',errMsg)
		error_msg('网络异常')
		return Boolean(false)
	}
	
	const { data } = res
	
	if(data.code === -403 || data.code === -404 || data.code === -444 || data.code === -500) return false
	
	if(data.code === 1 || data.code === 2){
		if(data.hasOwnProperty('token')){
			uni.setStorageSync('token',data.token)
			console.log('token success')
		}
		console.log('拦截通知:',data.msg)
		return data.data
	}else{
		error_msg(data.msg ? data.msg : 'loading...')
		console.error('服务报错:',data.msg)
		return Boolean(false)
	}
	
    return res
}

export default http
