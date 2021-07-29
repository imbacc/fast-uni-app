import { createApp, ref } from 'vue'
import App from './App.vue'

import router from '@/common/tools/cmake_router.js'
import loading from '@/common/tools/loading.js'

// js
import { env, is_dev, is_cdn } from '@/common/config/cfg.js'

// 全局样式
import 'nprogress/nprogress.css'
import '@styles/global.scss'

const app = createApp(App)
app.use(router)
app.use(loading)
app.mount('#app')

console.log('import.meta.env', env)

// 全局 property
app.config.globalProperties.is_cdn = is_cdn

// dev工具
app.config.devtools = is_dev

const baseSize = 18

// 设置 rem 函数
const setRem = () => {
	// 设置页面根节点字体大小，适配vant
	const scale = document.documentElement.clientWidth / 375
	document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
	setRem()
}

// 处理错误
// app.config.errorHandler = (err, vm, info) => {
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
// }

//
// 全局注册组件
// app.component('component-a', {
// mounted() {
// 	console.log(this.foo) // 'bar'
// }
// })

// 全局注册组件指令
// app.directive('focus', {
// 	mounted() {
// 		el => el.focus()
// 	}
// })
