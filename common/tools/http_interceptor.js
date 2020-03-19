/**
 * 拦截请求
 */
import http from './http_request.js'
import {cmake_token_fun} from './cmake_token.js'

const error_msg = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		mask: false,
		duration:1500
	})
}

// #ifdef APP-PLUS
	const uuid = plus.device.uuid
// #endif
// #ifndef APP-PLUS
	const uuid = '000000000000000'
// #endif

//设置请求拦截
http.interceptor.request = (config) => {
	
	// if(config.url.toString().indexOf('okingc') != -1){
		let token = uni.getStorageSync('token'),cmake_token = cmake_token_fun()
		
		//添加通用参数
		config.header = {
			'authorization':`Bearer ${token}`,
			'uuid': uuid,
			'cmakeToken': cmake_token,
		}
		
		if(config.url.indexOf('version') !== -1) config.header['nocheck'] = true
	// }
	
	// console.log('【config】 '+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {
	
	if(res.statusCode === 401){
		console.log('401错误',res.errMsg)
		error_msg('登录信息已失效')
		uni.clearStorage()
		uni.reLaunch({url:'/pages/login/login',animationType:'slide-in-bottom'})
		return 'false'
	}
	
	if(res.statusCode === 503){
		console.log('503错误',res.errMsg)
		error_msg('503错误')
		return 'false'
	}
	
	if(res.errMsg.toString().indexOf('fail') !== -1 || res.statusCode === 0){
		console.log('网络异常:',res.errMsg)
		error_msg('网络异常')
		return 'false'
	}
	
	// console.log('【response】 ')
	// console.log(res)
	
	if(res.data.code === -403 || res.data.code === -404 || res.data.code === -444 || res.data.code === -500) return false
	
	if(res.data.code === 1 || res.data.code === 2){
		if(res.data.hasOwnProperty('token')){
			uni.setStorageSync('token',res.data.token)
			console.log('token success')
		}
		console.log('拦截通知:',res.data.msg)
		return res.data.data
	}else{
		try{
			error_msg(res.data.msg ? res.data.msg : 'loading...')
		}catch(e){
			error_msg('网络异常')
		}
		console.error('服务报错:',res.data.msg)
		return 'false'
	}
	
    return res
}

export default http
