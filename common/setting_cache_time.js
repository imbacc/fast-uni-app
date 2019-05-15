/**
 * @param {Object} key	存放名称
 * @param {Object} data 存放数据
 * @param {Object} time 分钟计算
 */
const set_cache = function (key,data,time) {
	
	console.log("set_cache key="+key)
	console.log("set_cache data="+JSON.stringify(data))
	
	if(data == {}) return false

	try{
		if(time == null || time == "") time = 5 //默认5分钟
		let now = new Date().getTime()
		now += time * 60 * 1000
		
		uni.setStorageSync(key,JSON.stringify(data))
		uni.setStorageSync(key+'_time',now)
	}catch(e){
		return false
	}
	
	return true
}

/**
 * @param {Object} key 获取缓存名称
 */
const get_cache = function (key) {

	let data = uni.getStorageSync(key)
	let time = uni.getStorageSync(key+'_time')
	
	if(time != "" && time != null){
		let now = new Date().getTime()
		time = parseInt(time)
		
		if((time - now) > 1){
			
			if(data == "{}") return false
			
			try{
				data = JSON.parse(data);
			}catch(e){
				console.log("缓存 不需要JSON转换...")
			}
			
			return data
		}else{
			return false
		}
	}
	
	return false
}


module.exports= {
	set_cache,
	get_cache
}