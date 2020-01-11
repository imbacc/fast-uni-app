import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'		//导入vuex管理
import router from './common/router'	//导入路由存储
import is_tools from './common/is_fun_tools.js';	//工具方法
import apiAction from './common/bean/api_action.js';	//请求class

Vue.prototype.is_vuex = vuex
Vue.prototype.is_router = router
Vue.prototype.is_tools = is_tools
Vue.prototype.cdn = 'http://xxxx/static/img/'
Vue.prototype.is_action = new apiAction()

//导入组件 全局化
import lazyImage from './components/lazy-image/lazy-image.vue'	//导入懒加载组件
Vue.component('lazy-image',lazyImage)	//设置全局可用

//导入Minix 全局化
import goto_page from './common/minix/module/goto_page';		//跳转
Vue.mixin(goto_page) //载入Minix全局



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	vuex,
    ...App
})

app.$mount()
