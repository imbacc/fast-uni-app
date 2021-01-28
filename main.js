import Vue from 'vue'
import App from './App'

import store from '@/common/store/index.js'		//导入vuex
import router from '@/common/router/index.js'	//导入router
import { goto_fun, goto_router } from '@/common/tools/cmake_router.js';	//封装跳转
import http_action from '@/common/tools/http_action.js';	//封装请求
import cmake_tools from '@/common/tools/cmake_tools.js';	//自定义函数

Vue.prototype.is_vuex = store			//全局变量 事务
Vue.prototype.is_router = router		//路由配置
Vue.prototype.is_tools = cmake_tools	//工具集合
Vue.prototype.is_action = http_action 	//请求封装
Vue.prototype.is_goto = goto_router		//跳转对于配置的路由
Vue.prototype.is_gopage = goto_fun		//直接跳转页面路径
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
	store,
    ...App
}).$mount()