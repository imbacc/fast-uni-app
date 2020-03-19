import api_name from '../config/api.js' 			//导入API
import http_intercept from './http_interceptor.js'	//拦截请求
import is_cache from './cache_time.js'				//缓存
import qs from 'qs'
import md5 from '../lib/md5.min.js';

const get_args = (json = {},cur = [1,10]) => {
  cur[0] <= 0 ? cur[0] = 1 : false
  cur[1] <= 0 ? cur[1] = 1 : false
  json.pageNum = cur[0]
  json.pageSize = cur[1]
  return json
}

//封装的get post请求
/**
 * @param {api}		请求API地址
 * @param {param}	追加参数
 * @param {body}	表单数据
 * @param {page}	是否分页
 * @param {cache}   缓存时间 默认为0 不缓存 分钟单位
 * @param {type}	默认请求类型type为是post请求
 */
const http_action = async (api, param = {}, body = {}, is_page = false, cache_time = 0, req_type = 'POST') => {
	
	if(api) api = api_name[api]
	if(is_page) param = get_args(param,is_page)
	
	let key_api = `${api}?${qs.stringify(param)}`
	let body_md5 = md5(qs.stringify(body))
	let sum_body = key_api + 'bodymd5=' + body_md5
	
	if(cache_time > 0){
		let cache = is_cache.get_cache('cache_'+sum_body)
		console.log('cache service:'+api, cache)
		if(cache) return cache
	}
	
	let is_http = http_intercept[req_type.toLocaleLowerCase()](key_api, body)
	
	return await is_http.then((res) => {
		if(res === 'false') return false
		if(cache_time > 0 && res) is_cache.set_cache('cache_'+sum_body,res,cache_time)
		console.log('service:'+key_api, res)
		return res || false
	})
	.catch((err) => {
		console.error(err)
		return false
	})
}

export default http_action
