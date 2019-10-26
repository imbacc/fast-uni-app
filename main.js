import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'	//导入vuex全局管理

//导入组件 全局化
import lazyImage from './components/lazy-image/lazy-image.vue'	//导入懒加载组件

//导入Minix 全局化
import goto_page from './common/minix/module/goto_page';		//跳转

Vue.config.productionTip = false

App.mpType = 'app'

//载入组件全局
Vue.component('lazy-image',lazyImage)	//设置全局可用

//载入Minix全局
Vue.mixin(goto_page)

const app = new Vue({
	vuex,
    ...App
})

app.$mount()
