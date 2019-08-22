/**
 * 拦截请求
 */
import http from './vmeitime-http/interface.js'
import is_fun_tools from './is_fun_tools'

const call_fun_vuex_error_msg = (msg) => {
	is_fun_tools.dou_fun(()=>{
		is_fun_tools.check_login().then((res)=>{
			!res ? is_fun_tools.to_msg(msg ? msg : '请登录...') : (msg ? is_fun_tools.to_msg(msg) : is_fun_tools.to_msg()) 
		})
	},2,500,'')
}

const dev = process.env.NODE_ENV

//设置请求拦截
http.interceptor.request = (config) => {
	
	let token = uni.getStorageSync("token")
	token instanceof String ? token = JSON.parse(token) : console.log("token="+token)
	
	//添加通用参数 Token
	config.header = {
		Authorization: `${token}`
	}
	
	// config.requestId = new Date().getTime()
	console.log("【config】 "+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {
	
	console.log(res)
	
	if(res.statusCode === 401){
		call_fun_vuex_error_msg('已被下线')
		uni.clearStorage()
		return false
	}
	
	if(res.errMsg.toString().indexOf("fail") !== -1 || res.statusCode === 0){
		if(res.config.header.Authorization.length > 40){
			// uni.setStorageSync("token",false)
			call_fun_vuex_error_msg('登录密匙已过期,请重新登录...')
		}else{
			call_fun_vuex_error_msg()
		}
		return false
	}
	
	//响应拦截  根据后台格式设定拦截
	// if(res.data.hasOwnProperty("result")){
	// 	 return res.data
	// }else{
	// 	if(res.data.error == "invalid_token"){
	// 		call_fun_vuex_error_msg('服务器',res)
	// 	}else{
	// 		if(res.data.error.hasOwnProperty("message")){
	// 			return res
	// 		} 
	// 		if(res.statusCode != 200) call_fun_vuex_error_msg()
	// 	}
	// 	console.log("res.data.error=")
	// 	console.log(res.data.error)
	// 	return false
	// }
	
    return res
}

export default http
