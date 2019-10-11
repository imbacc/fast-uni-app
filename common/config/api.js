//api接口地址
var api = ''

//导入test api模块
import test_api from './module/test_api.js';

export default {
	...test_api,
	
	//用户模块api
	app_login: api + 'app_login/login', 	// api + 地址
	
	
	app_index: 'fast/index', 				//baseUrl + api ,在vmeitime-http/interface.js 里 baseUrl
	
	get_args_page: (json,cur) => get_args(json,cur), //分页封装
}
	
const get_args = (json = {},cur = [1,10]) => {
	cur[0] == 0 ? cur[0] = 1 : false
	cur[1] == 0 ? cur[1] = 1 : false
	json.pageNum = cur[0]
	json.pageSize = cur[1]
	
	return json
}