import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'

import api_request from './common/api_request.js'				//导入api方法

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	vuex,
    ...App
})

Vue.prototype.api_request = api_request

app.$mount()
