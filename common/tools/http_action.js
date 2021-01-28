import http_intercept from './http_interceptor.js'	//拦截请求
import { set_cache, get_cache, del_cache } from './cache_time.js'				//缓存
import qs from 'qs'

const get_args = (json = {},cur = [1,10]) => {
  cur[0] <= 0 ? cur[0] = 1 : false
  cur[1] <= 0 ? cur[1] = 1 : false
  json.pageNum = cur[0]
  json.pageSize = cur[1]
  return json
}

/**
 * 封装的get post请求
 * @param {api}		请求API地址
 * @param {param}	追加参数(_cache 缓存时间 默认为0 分钟单位) (_page 是否分页) (_onec 外链请求)
 * @param {body}	表单数据
 * @param {type}	默认请求类型type为是POST请求
 */
const http_action = async (api, param = {}, body = {}, req_type = 'POST') => {
	let cache_time = 0

	if (api && !param['_onec']) {
	  if (api.constructor === Array && api.length > 0) {
		const [name, type, time] = api
		if (name) api = name
		if (type) req_type = type
		if (time) cache_time = time
	  }
	}
	
	if (param['_onec']) {
		delete param['_onec']
	}

	if (param['_page']) {
		param = get_args(param, param['_page'])
		delete param['_page']
	}

	if (param['_cache']) {
		cache_time = param['_cache']
		delete param['_cache']
	}
	
	if (api.indexOf(':id') !== -1) {
		if (param['_id'] === undefined) {
			console.error(`${api} 没有传参数ID 格式 param -> { _id: 10086 }`)
			return false
		}
		api = api.replace(':id', param['_id'])
		delete param['_id']
	}
	
	let key_api = `${api}?${qs.stringify(param)}`
	const cache_name = `cache_${key_api}?base64=${btoa(qs.stringify(body))}`
	
	if (key_api.length === key_api.lastIndexOf('?') + 1) key_api = key_api.substring(0, key_api.length - 1)
	
	if (cache_time > 0){
		const cache = get_cache(cache_name)
		console.log('cache service:' + api, cache)
		if (cache && cache !== false) return await cache
	}
	
	const is_http = http_intercept[req_type.toLocaleLowerCase()](key_api, body)
	
	return await is_http.then((res) => {
		if (res === false) return false
		if (cache_time > 0 && res) set_cache(cache_name, res, cache_time)
		if (cache_time === 0 && res) del_cache(cache_name)
		console.log('service:' + key_api, res)
		return res || false
	})
	.catch((err) => {
		console.error(err)
		return false
	})
}

export default http_action
