//api接口 额外地址
var api = ''

//导入test api模块
import test_api from './module/test_api.js';

export default {
	...test_api,
	
	//api
	dddd: 'dddd/ffff',
	
	
	app_index: 'fast/index', 				//baseUrl + api ,在vmeitime-http/interface.js 里 baseUrl
}