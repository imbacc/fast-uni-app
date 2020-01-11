import api_name from '../config/api' 			//导入API
import http from '../http_request.js'
import is_cache from '../setting_cache_time.js'
import qs from 'qs'
import md5 from 'js-md5'

const get_args = (json = {},cur = [1,10]) => {
  cur[0] <= 0 ? cur[0] = 1 : false
  cur[1] <= 0 ? cur[1] = 1 : false
  json.pageNum = cur[0]
  json.pageSize = cur[1]
  return json
}

class api_action {
  // constructor(api,param,body,is_page,cache_time,req_type) {
  //     this.api = api_name[api]
	 //  console.log(api)
  //     this.param = param || {}
  //     this.body = body || {}
  //     this.is_page = is_page ? get_args(param,is_page) : false
  //     this.cache_time = cache_time || 0
  //     this.req_type = req_type || 'POST'
  // }
  async http_request(api, param, body, is_page, cache_time, req_type="POST") {
	  uni.showLoading()
  	api = api_name[api]
  	
  	const capi = `${api}?${qs.stringify(param)}`
  	let body_md5, sum_body
  	
  	body_md5 = md5(qs.stringify(body))
  	sum_body = capi + 'bodymd5=' + body_md5
  	
  	if (this.cache_time > 0) {
  	  let cache = is_cache.get_cache('cache_' + sum_body)
  	  if (cache) console.log('cache service:' + api, cache)
  	  if (cache) return cache
  	}
  	
  	let is_http = req_type.toLocaleUpperCase() === 'POST' ? is_http = http.post(capi, body) : is_http = http.get(capi,body)
  	
  	return await is_http.then((res) => {
		uni.hideLoading()
		if(res.data.hasOwnProperty('error')){
			console.log(res.data.error.code)
			if(res.data.error.code === '9999'){
				// this.is_fun_tools.to_msg('登录失败,请重新登录')
				uni.showToast({
					title:"登录失败,请重新登录",
					icon:'none',
					mask:true,
					duration:1000
				})
				uni.clearStorageSync()
				return false
			}
		}
		
  	    if (res === 'false') return false
  	    if (cache_time > 0) is_cache.set_cache('cache_' + sum_body, res.data.result, cache_time)
  	    console.log('service:' + api, res.data.result)
  	    return res.data.result || false
  	  })
  	  .catch((err) => {
  	    console.log(err)
  	    return false
  	  })
  }
}

export default api_action