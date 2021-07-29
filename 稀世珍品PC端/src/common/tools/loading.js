import { ref, render, h } from 'vue'
import loadingComp from '@/components/loading/loading.vue'

let instance
const loadingRender = () => {
	if (instance) return instance

	// 组件接收的 props
	let _opt = {}
	instance = h(loadingComp, _opt) // 组件

	const container = document.createElement('div')

	// 组件销毁时
	instance.props.onDestroy = () => {
		render(null, container)
	}

	// 渲染组件
	render(instance, container)

	// 将模态框添加至 body
	document.body.appendChild(container.firstElementChild)

	return instance
}

loadingRender.open = () => loadingRender().component.proxy.open()
loadingRender.close = () => loadingRender().component.proxy.close()

export default {
	install(app) {
		app.config.globalProperties.loading = loadingRender
	}
}
