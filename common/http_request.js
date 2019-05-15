/**
 * 拦截请求
 */
import http from './vmeitime-http/interface.js'

const error_msg = (err) => {
	uni.showToast({
		title: err || '服务器打瞌睡了...',
		icon: 'none'
	})
}

//设置请求拦截
http.interceptor.request = (config) => {
	
	let token = uni.getStorageSync("token") | ""
	
	console.log("token="+token)
	
	//添加通用参数 Token
	config.header = {
	    "Authorization": `Bearer ${token}`
	}
	
	// config.requestId = new Date().getTime()
	console.log("【config】 "+JSON.stringify(config))
}

//设置响应拦截
http.interceptor.response = (res) => {
	
	if(res.errMsg.toString().indexOf("fail") != -1 || res.statusCode == 0){ 
		uni.showToast({  
			title: "服务器打瞌睡了...",
			icon:'none'
		})
		return false
	}
	
	console.log("res...")
	console.log(res)
	
	if(res.data.hasOwnProperty("result")){
		 return res.data
	}else{
		console.log("res.data.error.message="+res.data.error.message)
		error_msg(res.data.error.message)
		return false
	}
	
    return res
}

export default http