<template>
	<a href="javascript:history.back(-1)">返回上一页</a>
	<p></p>
	<div>
		<button @click="update_test">点我修改test_vuex copy_vuex模块 模块内容(需要先加载 test_vuex copy_vuex模块模块)</button>
		<h1>我是test_vuex的state内容 {{ test }}</h1>
		<h1>我是copy_vuex的state内容 {{ name }}</h1>
		<hr />
		<h1>{{ title }}</h1>
		<button @click="update">更新标题</button>
	</div>
	<p><button @click="register">这个按钮是懒加载test_vuex copy_vuex模块 js代码</button></p>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
// import { useStore } from 'vuex'

export default {
	setup() {
		const { ctx } = getCurrentInstance() // ctx => vue2 vm
		const { commit, state } = useStore()

		console.log('初始化 state', state)
		console.log('ctx.is_cdn', ctx.is_cdn)
		console.log(ctx.is_cdn) // 全局 property main.js -> app.config.globalProperties.is_cdn

		// ---computed---
		const title = computed(() => state.title)
		const test = computed(() => state.test_vuex.test)
		const name = computed(() => state.copy_vuex.name)

		// ---function---
		const update = () => commit('set_vuex', ['title', 'vue3 composition...'])
		const register = () => {
			alert('点我没用看代码!')
			// 注册test_vuex copy_vuex模块
			// registerStore(['test_vuex', 'copy_vuex'])
		}
		const update_test = () => {
			commit('test_vuex/set_vuex', ['test', '我修改了test_vuex的state内容!'])
			commit('copy_vuex/set_vuex', ['name', '我修改了copy_vuex的state内容!'])
			console.log('修改后 state', state)
		}

		return {
			// ---computed---
			title,
			test,
			name,
			// ---function---
			update,
			register,
			update_test
		}
	}
}
</script>
