/**
 * 拦截请求
 */
import http from './vmeitime-http/interface.js'
import is_fun_tools from './is_fun_tools'

const error_msg = (msg) => {
	is_tools.to_msg(msg)
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
		error_msg("登录信息已失效")
		uni.clearStorage()
		uni.reLaunch({url:'/pages/login/login',animationType:'slide-in-bottom'})
		return 'false'
	}
	
	if(res.errMsg.toString().indexOf("fail") !== -1 || res.statusCode === 0){
		error_msg()
		return 'false'
	}
	
	//响应拦截  根据后台格式设定拦截
	// if(res.data.hasOwnProperty("error")){
	// 	const error = res.data.error
	// 	if(error.code === "sys_error"){
	// 		error_msg('请求失败')
	// 		console.error('服务报错:',error.message)
	// 		return 'false'
	// 	}
	// 	if(error.hasOwnProperty('message')){
	// 		error_msg(error.message)
	// 		console.error('拦截通知:',error.message)
	// 		return 'false'
	// 	}
	// }
	
	// if(res.data.hasOwnProperty('result')) return res.data
	
    return res
}

export default http
