//api接口地址
var api = 'https://www.easy-mock.com/mock/5d317415c1c54515fd62020f/',api_coco = 'https://xxx.com/api/coco/'

export default {
	api_http:'https://xxx.com/',
	
	//用户模块api
	app_login: api + 'app_login/login', 					//用户登陆
	app_index: api + 'fast/index', 					//主页信息
	
	
	
	get_args_page: (re_json,cur) => get_args({},re_json,true,cur),
}
	
const get_args = (json = {},re_json = false,is_page = false,cur = [1,10]) => {
	if(is_page){
		cur[0] == 0 ? cur[0] = 1 : false
		cur[1] == 0 ? cur[1] = 1 : false
		json.pageNum = cur[0]
		json.pageSize = cur[1]
	}
	
	return re_json instanceof Object ? Object.assign(json,re_json) : json
}