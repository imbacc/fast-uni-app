//配置

// 请求体方式
const METHOD = {
	POST: 'POST',
	GET: 'GET',
	DELETE: 'DELETE'
}
const timeout = 9000
const env = import.meta.env
const mode = env.MODE // development or production
const is_dev = Boolean(env === 'development') // 是否是开发环境
// const is_cdn = 'https://www.baidu.com/static/img/'
// const socket_url = 'ws://rarem.yueyiweb.com:17521'
// window.socket_url = socket_url

export { METHOD, env, mode, is_dev, timeout }
