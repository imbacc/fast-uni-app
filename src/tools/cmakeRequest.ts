import type { METHOD } from '#/global'

type header_DTYPE = { [key in string]: string }
type interceptor_DTYPE = {
	request: null | ((config: config_DTYPE) => config_DTYPE)
	response: null | ((res: res_DTYPE) => any)
}
type invokeParamFun_DTYPE = (args: any) => void
type record_DTYPE = { [key in string]: any }
export type config_DTYPE = {
	url: string
	data: any
	header: header_DTYPE
	method: METHOD
	timeout: number
	responseType: string
	complete?: Function
}

type res_DTYPE = {
	statusCode: number
	errMsg: string
	config: {}
	data: {
		code?: number
		msg?: string
		data?: any
	}
}
class makeRequest {
	private baseUrl: string = ''
	private timeOut: number = 9000
	private url: string = ''
	private method: METHOD = 'GET'
	private data: Object = {}
	private header: header_DTYPE = { 'content-type': 'application/json;charset=UTF-8' }
	public interceptor: interceptor_DTYPE = { request: null, response: null }
	private responseType: string = 'text'
	private record: record_DTYPE = {}

	constructor(baseUrl: string, timeOut: number) {
		this.baseUrl = baseUrl
		this.timeOut = timeOut
	}

	invoke(invoke?: invokeParamFun_DTYPE, success?: invokeParamFun_DTYPE, fail?: invokeParamFun_DTYPE, complete?: invokeParamFun_DTYPE) {
		uni.removeInterceptor('request')
		// 添加拦截器
		uni.addInterceptor('request', {
			invoke(args) {
				// 埋点上报
				invoke && invoke.call(this, args)
			},
			success(res) {
				// 妈的上报
				success && success.call(this, res)
			},
			fail(err) {
				fail && fail.call(this, err)
			},
			complete(res) {
				complete && complete.call(this, res)
			}
		})
		return this
	}

	request(url: string, data: any, method: METHOD) {
		this.url = url
		this.data = data
		this.method = method
		const { baseUrl, header, timeOut, responseType } = this
		let config: config_DTYPE = {
			url: baseUrl + url,
			data,
			header,
			method,
			timeout: timeOut,
			responseType
		}
		return new Promise((resolve, reject) => {
			const task = this.record[url]
			if (task) {
				reject(`${url} 还在请求莫着急!`)
				return
			}
			if (this.interceptor.request) {
				const newConfig = this.interceptor.request(config)
				if (!newConfig) return
				config = Object.assign(config, newConfig)
			}
			config.complete = (res: any) => {
				this.record[url] = null
				if (this.interceptor.response) res = this.interceptor.response(res)
				resolve(res)
			}
			const uniRequest = uni.request(config as any)
			this.record[url] = uniRequest
		})
	}

	get(url: string, data: any) {
		return this.request(url, data, 'GET')
	}

	post(url: string, data: any) {
		return this.request(url, data, 'POST')
	}

	put(url: string, data: any) {
		return this.request(url, data, 'PUT')
	}

	delete(url: string, data: any) {
		return this.request(url, data, 'DELETE')
	}

	setObjectVal(obj: Object) {
		Object.entries(obj).forEach(([key, val]) => (this[key as keyof makeRequest] = val))
		return this
	}
}

export default makeRequest
