/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

import { baseUrl }  from '../config/cfg.js';

const re_method = (url, data, options, method) => {
	if (!options) options = {}
	options.url = url
	options.data = data
	options.method = method
	return options
}

export default {
	config: {
		baseUrl,
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			// 'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) options = {}
		
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
	   
		return new Promise((resolve, reject) => {
			let _config = null
			// let dev = process.env.NODE_ENV
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				
				statusCode === 200 ? resolve(response) : reject(response)
			}

			_config = Object.assign({}, this.config, options)

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// console.log('_config=', _config)

			const uni_request = uni.request(_config)
			
			if (_config.data._roolback) uni_request.abort()
		});
	},
	get(url, data, option) {
		const options = re_method(url,data,option,'GET')
		return this.request(options)
	},
	post(url, data, option) {
		const options = re_method(url,data,option,'POST')
		return this.request(options)
	},
	del(url, data, option) {
		const options = re_method(url, data, option, 'DELETE')
		return this.request(options)
	},
	put(url, data, option) {
		const options = re_method(url, data, option, 'PUT')
		return this.request(options)
	},
}