// 拦截请求
import store from '../store/index.js'
import zRequest from './cmake_zrequest.js'

import { baseUrl, page_key, size_key, is_dev } from '../config/cfg.js'
import { setRequestInit, requestAction } from 'imba-request' // 请求封装

const invoke = (args) => {
	// args.url = 'https://www.baidu.com/'
	console.log('invoke args=', args)
}
const success = (args) => {
	// args.data.code = 1
	console.log('success args=', args)
}
const fail = (args) => console.log('fail args=', args)
const complete = (args) => console.log('complete args=', args)

// const http = new zRequest(baseUrl, 5678)
// or
// invoke 里的拦截优先于 http.interceptor.request / http.interceptor.response
const http = new zRequest(baseUrl, 5678).invoke(invoke, success, fail, complete)

// 初始化封装请求包
setRequestInit({
	page: page_key,
	size: size_key,
	dev: is_dev,
	http: http
})

var error_time = null
const error_msg = (title) => {
	clearTimeout(error_time)
	error_time = setTimeout(() => {
		clearTimeout(error_time)
		uni.showToast({ title, icon: 'none', mask: false, duration: 2000 })
	}, 100)
}

const go_logion = () => {
	uni.removeStorage({ key: 'token' })
	uni.reLaunch({ url: '/pages/login/login', animationType: 'slide-in-bottom' })
}

//设置请求拦截
http.interceptor.request = (config) => {
	const { _noToken, _formData, _header } = config.data
	
	let token = store.state.user_vuex.token || false
	if (token) config.header['x-access-token'] = token
	
	if (_noToken) {
		delete config.data['_noToken']
		delete config.header['x-access-token']
		delete config.header['Authorization']
	}
	
	if (_formData) {
		config.header['content-Type'] = 'application/x-www-form-urlencoded'
		delete config.data['_formData']
	}
	
	if (_header) {
		config.header = { ...config.header, ..._header }
		delete config.data['_header']
	}
	
	// console.log('【config】 '+JSON.stringify(config))
	return config
}

//设置响应拦截
http.interceptor.response = (res) => {
	// console.log('【response】 ', res)
	const { statusCode, errMsg, config } = res
	
	// // 重复请求
	if (errMsg === 'repeat request url!') return 'false'
	
	if(statusCode === 401){
		console.error('401错误', errMsg)
		error_msg('登录信息已失效')
		go_logion()
		return 'false'
	}
	
	if(statusCode === 503){
		console.error('503错误', errMsg)
		error_msg('503错误')
		return 'false'
	}
	
	if(errMsg.toString().indexOf('fail') !== -1 || statusCode === 0){
		console.error('网络异常:', errMsg)
		error_msg('网络异常')
		return 'false'
	}
	
	const { code, msg, data } = res?.data
	
	if(code === 0){
		console.log('拦截通知:', msg)
		return data
	}else{
		if (msg) error_msg(msg || '服务器打瞌睡了')
		console.error('服务报错:', msg)
		return 'false'
	}
	
    return data
}

export default requestAction
