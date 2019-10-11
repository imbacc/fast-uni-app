//导入test路由模块
import test_router from './module/test_router.js';

//路由路径封装
export default {
	...test_router,
	
	index:'/pages/index/index',
	login:'/pages/login/login',
	app_update:'/pages/index/lv_update',
}
