// 检测登录
const checkLogin = false

// 请求体方式
const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
}

// arg key
const page_key = 'page'
const size_key = 'limit'

// wx appid
// const WX_APPID = ''

// cdn
// const is_cdn = `http://oss.xxxx.com/`

// 线上环境配置 和 开发环境配置
const env = process.env.NODE_ENV // env
const is_dev = Boolean(env === 'development') // 是否是开发环境
var host = '', version = '' , baseUrl = '' // 接口地址
if (is_dev) {
	console.log('开发环境')
	host = '/api'
	version = '/v1/'
	baseUrl = `${host}${version}`
} else {
	console.log('生产环境')
	host = 'http://rarefood.sslmen.com/api.php'
	version = '/v1/'
	baseUrl = `${host}${version}`
}

export {
	checkLogin,
	METHOD,
	// WX_APPID,
	// is_cdn,
	env,
	is_dev,
	host,
	version,
	baseUrl,
	page_key,
	size_key
}
