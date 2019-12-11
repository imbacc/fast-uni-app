import api_name from '../config/api' 			//导入API
import http from '../http_request.js'			//拦截请求
import is_cache from '../setting_cache_time.js'	//自己封装的 跟vue-ls差不多
import qs from 'qs'								//qs 用于转换url
import md5 from 'js-md5'						//md5加密body用于存储

//分页封装 pageNum是当前页 pageSize是总页数 pageNum,pageSize 后端数据名称对称
const get_args = (json = {},cur = [1,10]) => {
  cur[0] <= 0 ? cur[0] = 1 : false
  cur[1] <= 0 ? cur[1] = 1 : false
  json.pageNum = cur[0]
  json.pageSize = cur[1]
  return json
}

class apiAction {
  constructor(api,param,body,is_page,cache_time,req_type) {
      this.api = api_name[api]
      this.param = param || {}
      this.body = body || {}
      this.is_page = is_page ? get_args(param,is_page) : false	//不传为false 不分页
      this.cache_time = cache_time || 0	//默认不缓存请求
      this.req_type = req_type || 'POST'	//默认是POST	请求
  }
  
  async http_request() {
  	
  	const api = `${this.api}?${qs.stringify(this.param)}`	//转换拼接
  	let body_md5,sum_body
  	
  	body_md5 = md5(qs.stringify(this.body))	//加密body便于读取
  	sum_body = api+'bodymd5='+body_md5		//拼接bodymd5
  	
	//缓存时间大于0 获取缓存
  	if(this.cache_time > 0){
  		let cache = is_cache.get_cache('cache_'+sum_body)	//读取
  		if(cache){	//是否拥有 拥有则返回缓存	没有则往下执行请求数据
			console.log('cache service:'+this.api,cache)
			return cache
		}
  	}
	
	let is_http = this.req_type.toLocaleUpperCase() === 'POST' ? is_http = http.post(this.api,this.body) : is_http = http.get(this.api,this.body)
	
	return await is_http.then((res) => {
		if(res === 'false') return false
		if(this.cache_time > 0) is_cache.set_cache('cache_'+sum_body,res.result,this.cache_time)
		console.log('service:'+this.api,res.result)
		return res.result || false
	})
	.catch((err) => {
		console.log(err)
		return false
	})
  }
}

export default apiAction