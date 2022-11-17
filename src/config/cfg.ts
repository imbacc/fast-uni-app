// mock
let VITE_USE_MOCK = false
let VITE_BUILD_GZIP = false

// 线上环境配置 和 开发环境配置
let host,
	version,
	baseUrl = ''
const env = process.env.NODE_ENV // env
const isDev = Boolean(env === 'development') // 是否是开发环境

if (isDev) {
	VITE_USE_MOCK = false
	VITE_BUILD_GZIP = false
	console.log('开发环境')
	host = 'http://192.168.0.195:81'
	version = '/v1/'
	baseUrl = `${host}${version}`
} else {
	VITE_USE_MOCK = false
	VITE_BUILD_GZIP = true
	console.log('生产环境')
	host = 'http://192.168.0.195:81/'
	version = '/v1/'
	baseUrl = `${host}${version}`
}

// oss, cdn
const oss = 'http://oss.xxx.com/'
const isCdn = `${oss}/image/`

// 分页对象名称
const pageKey = 'pageNum'
const sizeKey = 'pageSize'

export { host, version, baseUrl, env, isDev, isCdn, pageKey, sizeKey, VITE_USE_MOCK, VITE_BUILD_GZIP }
