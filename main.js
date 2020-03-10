import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'		//导入vuex
import router from './common/router'	//导入router
import http_action from './common/tools/http_action.js';	//封装请求
import cmake_tools from './common/tools/cmake_tools.js';	//自定义函数
import cmake_router from './common/tools/cmake_router.js';	//封装路由

Vue.prototype.is_vuex = vuex
Vue.prototype.is_router = router
Vue.prototype.is_tools = cmake_tools
Vue.prototype.is_action = http_action
Vue.prototype.is_goto = cmake_router
Vue.prototype.is_cdn = 'https://www.baidu.com/static/img/'

//导入组件 全局化
import lazyImage from '@/components/lazy-image/lazy-image.vue'
Vue.component('lazy-image',lazyImage)

//导入Minix 全局化
// import goto_page from '@/common/minix/module/goto_page.js';		//跳转
// Vue.mixin(goto_page)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	vuex,
    ...App
}).$mount()