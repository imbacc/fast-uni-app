import { createSSRApp } from 'vue'
import App from './App.vue'

import store from '@/store/index'
import { useRouter } from '@/router/index'

export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	const router = useRouter()
	console.log('%c [ router ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', router)

	// //导入组件全局
	// import skeleton from '@/components/skeleton/skeleton.vue'
	// app.component('skeleton', skeleton)

	//导入Minix全局
	// import goto_page from '@/common/minix/module/goto_page.js';		//跳转
	// app.mixin(goto_page)

	// 处理错误
	// app.config.errorHandler = (err, vm, info) => {
	//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// }

	return {
		app
	}
}
