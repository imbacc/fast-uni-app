import http_intercept from './cmake_zinterceptor.js' //拦截请求
import { set_cache, get_cache, del_cache } from './cache_time.js' //缓存
import { page_key, size_key } from '@/common/config/cfg.js'
import stringify from 'qs-stringify'
import md5 from '@/common/lib/js_md5.js'

const get_args = (json = {}, cur = [1, 10]) => {
	let [page, size] = cur
	if(page <= 0) cur[0] = 1
	if(size <= 0) cur[1] = 1
	json[page_key] = cur[0]
	json[size_key] = cur[1]
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
	
	if (!api) {
		console.error(`找不到API`)
		return false
	}

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

	if (param['_cache'] !== undefined && param['_cache'] >= 0) {
		cache_time = param['_cache']
		delete param['_cache']
	}

	if (api.indexOf(':id') !== -1) {
		if (!param['_id']) {
			console.error(`${api} 没有传参数ID 格式 param -> { _id: 10086 }`)
			return false
		}
		api = api.replace(':id', param['_id'])
		delete param['_id']
	}

	let key_api = `${api}?${stringify(param)}`, key_api_len = key_api.length
	let cache_name = `cache_${key_api}md5=${md5(stringify(body))}`

	if (key_api_len === key_api.lastIndexOf('?') + 1) key_api = key_api.substring(0, key_api_len - 1)

	if (cache_time > 0) {
		const cache = get_cache(cache_name)
		cache && console.log('cache service:' + api, cache)
		if (cache && cache !== false) return await cache
	}

	const is_http = http_intercept[req_type.toLocaleLowerCase()](key_api, body)

	return await is_http.then((res) => {
			if (res == 'false' || res === 'false' || res === false) return false
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
