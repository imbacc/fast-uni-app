import http from './http_request.js'
import is_cache from './setting_cache_time.js'
import qs from 'qs'

//封装的get post请求
/**
 * @param {api}		请求API地址
 * @param {json}	传出json数据参数 自动填充 地址追加参数 和 body表单数据
 * @param {type}	请求类型type为2是post请求，也可传输字符串post or POST
 * @param {cache_time}  缓存时间 默认为0 不缓存 分钟单位
 */
const http_request = async (api,json = {},type = 2,cache_time = 0) => {
	
	api = `${api}?${qs.stringify(json)}`
	
	if(cache_time > 0){
		let cache = is_cache.get_cache('cache_'+api)
		if(cache) return cache
	}
	
	let is_http = null
	
	type == 2 || type == 'post' || type == 'POST' ? is_http = http.post(api,json) : is_http = http.get(api,json)
	
	return await is_http.then((res) => {
		if(res){
			if(res.hasOwnProperty("data")){
				if(res.data.hasOwnProperty("error")){
					if(res.data.error.hasOwnProperty("message")) return res
					return false
				}
			}
			if(cache_time > 0) is_cache.set_cache('cache_'+api,res.result,cache_time)
			return res.result
		}else{
			return false
		}
	})
	.catch((err) => {
		console.log(err)
		return false
	})
}

export default http_request
