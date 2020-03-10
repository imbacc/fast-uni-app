//api接口地址
// var api = 'http://www.okingc.com/'

import movies_api from './module/movies_api.js';	//影视API

export default {
	...movies_api,
	
	app_version:'ddd'
}