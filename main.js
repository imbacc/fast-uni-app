import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'

import lazyImage from '@/components/lazy-image/lazy-image.vue';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('lazy-image',lazyImage)

const app = new Vue({
	vuex,
    ...App
})

Vue.prototype.api_request = api_request

app.$mount()
