//路由路径封装

import movies_router from './module/movies_router.js';

export default {
	...movies_router,
	
	version:'/pages/version/version',
	index1:'/pages/index/home1/index',
	index2:'/pages/index/home2/index2',
	index3:'/pages/index/home3/index3',
	index4:'/pages/index/home4/index4',
	index5:'/pages/index/home5/index5',
}
