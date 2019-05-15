import api from './config/api.js'
import http from './http_request.js'
import is_cache from './setting_cache_time.js'
import qs from 'qs'

//封装的get请求
const http_get = async (api,json) => {
	if(json == null || json == "" || json == undefined) json = {}
	
	return await http.get(api,json)
	.then(function (res) {
		if(res){
			if(res.hasOwnProperty("data")){
				if(res.data.hasOwnProperty("error")) return false
			}
			return res.result
		}else{
			return false
		}
	})
	.catch(function (err) {
		console.log(err)
		return false
	})
}

//封装的post请求
const http_post = async (api,json) => {
	if(json == null || json == "" || json == undefined) json = {}
	
	return await http.post(api,json)
	.then(function (res) {
		console.log("http_post")
		console.log(res)
		if(res){
			if(res.hasOwnProperty("data")){
				if(res.data.hasOwnProperty("error")) return false
			}
			console.log("res.result...")
			return res.result
		}else{
			return false
		}
	})
	.catch(function (err) {
		console.log(err)
		return false
	})
}

//获取版本信息
const app_version = async () =>{
	
}

//登陆
const app_login = async (info) => {
	
	return await http_post(`${api.app_login}?${qs.stringify(info)}`)
}


// api服务程序
module.exports= {
	app_version,
	app_login,
}