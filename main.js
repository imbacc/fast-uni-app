import Vue from 'vue'
import App from './App'

import store from '@/common/store/index.js'		//导入vuex
import router from '@/common/tools/cmake_router.js'	//封装跳转
import api from '@/common/config/api.js'	//封装请求
import tools from '@/common/tools/cmake_tools.js'	//自定义函数
import routerChunks from '@/common/router/index.js'	//导入router
import { is_cdn } from '@/common/config/cfg.js'

Vue.prototype.is_vuex = store					// store
Vue.prototype.is_router = router				// router
Vue.prototype.is_api = api 						// 请求封装
Vue.prototype.is_tools = tools					// 工具集合
Vue.prototype.is_cdn = is_cdn					// cdn
Vue.prototype.is_routerChunks = routerChunks	// 路由配置

import uView from 'uview-ui'
Vue.use(uView)

//导入组件全局
import skeleton from '@/components/skeleton/skeleton.vue'
Vue.component('skeleton', skeleton)

//导入Minix全局
// import goto_page from '@/common/minix/module/goto_page.js';		//跳转
// Vue.mixin(goto_page)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
}).$mount()