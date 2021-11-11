class zRequest {
	constructor(baseUrl, timeOut) {
		this.baseUrl = baseUrl
		this.timeOut = timeOut
		this.url = ''
		this.method = 'GET'
		this.data = {}
		this.header = { 'content-type': 'application/json;charset=UTF-8' }
		this.interceptor = { request: null, response: null }
		this.responseType = 'text'
		this.record = {}
	}
	
	invoke(invoke, success, fail, complete) {
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
	
	async request(url, data, method) {
		this.url = url
		this.data = data
		this.method = method
		const { baseUrl, header, timeOut, dataType, responseType } = this
		let config = {
			url: baseUrl + url,
			data,
			header,
			method,
			timeout: timeOut,
			dataType,
			responseType,
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
			config.complete = (res) => {
				this.record[url] = null
				if (this.interceptor.response) res = this.interceptor.response(res)
				resolve(res)
			}
			const uniRequest = uni.request(config)
			this.record[url] = uniRequest
		})
	}
	
	setObjectVal(obj) {
		Object.entries(obj).forEach(([key, val]) => this[key] = val)
		return this
	}
}

export default zRequest