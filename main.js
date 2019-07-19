import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'	//导入vuex全局管理

import lazyImage from './components/lazy-image/lazy-image.vue'	//导入懒加载组件

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('lazy-image',lazyImage)	//设置全局可用

const app = new Vue({
	vuex,
    ...App
})

app.$mount()
