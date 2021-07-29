/**
 * @param {Object} key	存放名称
 * @param {Object} data 存放数据
 * @param {Object} time 分钟计算
 */
const set_cache = (key, data, time = 5) => {
	if (data === '{}') return false
	if (data instanceof Object) data = JSON.stringify(data)

	// console.log("set_cache key="+key)
	// console.log("set_cache data="+JSON.stringify(data))

	try {
		let now = new Date().getTime() + time * 60 * 1000

		localStorage.setItem(key, data)
		if (time > 0) localStorage.setItem(key + '_time', now)
	} catch (e) {
		return false
	}

	return true
}

/**
 * @param {Object} key 获取缓存名称
 */
const get_cache = (key) => {
	let data = localStorage.getItem(key)
	let time = localStorage.getItem(key + '_time')

	if (time) {
		let now = new Date().getTime()
		time = parseInt(time)

		if (time - now > 1) {
			if (data === '{}') return false

			try {
				data = JSON.parse(data)
			} catch (e) {
				console.log('缓存 不需要JSON转换...')
			}

			return data
		} else {
			return false
		}
	}

	return false
}

// 删除缓存和记录缓存时间
const del_cache = (key) => {
	localStorage.removeItem(key)
	localStorage.removeItem(key + '_time')
}

const set_cache_loca = (key, val) => {
	if (val instanceof Object) val = JSON.stringify(val)
	localStorage.setItem(key, val)
}

const get_cache_loca = (key) => {
	let loca = localStorage.getItem(key)
	try {
		return JSON.parse(loca)
	} catch (err) {
		return loca
	}
}

export { set_cache, get_cache, del_cache, set_cache_loca, get_cache_loca }
