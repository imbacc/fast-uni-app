//路由路径封装

import user_router from './module/user_router.js';

export default {
	...user_router,
	
	index:'/pages/index/index',
	login:'/pages/login/login',
}
