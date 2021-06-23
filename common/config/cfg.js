// 请求体方式
const METHOD = {
	POST: 'POST',
	GET: 'GET',
	DELETE: 'DELETE'
}

// 检测
const checkLogin = true

// 线上环境配置 和 开发环境配置
var host, version, baseUrl = ''
const env = process.env.NODE_ENV // env
const is_dev = Boolean(env === 'development')	// 是否是开发环境

if(is_dev){
    console.log('开发环境')
	host = 'http://192.168.0.195:81'
	version = '/v1'
	baseUrl = `${host}${version}`
}else{
    console.log('生产环境')
	host = 'http://192.168.0.195:81/'
	version = '/v1'
	baseUrl = `${host}${version}`
	// 去除console
	console.log = async () => {}
}

// oss, cdn
const oss = 'http://oss.xxx.com/'
const is_cdn = `${oss}/image/`

// 分页对象名称
const page_key = 'pageNum'
const size_key = 'pageSize'

export {
	host,
	version,
	baseUrl,
	env,
	is_dev,
	METHOD,
	is_cdn,
	page_key,
	size_key,
	checkLogin
}