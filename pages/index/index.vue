<template>
	<view class="index_content">
		<skeleton v-if="show_loading" />
		<view v-else class="index_body">
			加载完毕

			<!-- 路由配置 => common/router/index -->
			<view @tap="is_goto('login')">点我登录</view>

			<view @tap="test">测试方法</view>

			<button @tap="api3_action">我是vue2 Action api</button>
			<button @tap="api3_action">我是模仿vue3 Action api</button>
		</view>
	</view>
</template>

<script>
import api from '@/common/config/api.js'
import appendData from '@/common/class/append_data.js'

export default {
	data() {
		return {
			show_loading: true,
			order_page: null
		}
	},
	onLoad() {
		let time = setTimeout(() => {
			clearTimeout(time)
			this.show_loading = false
		}, 800)
		// this.init()
	},
	onReachBottom() {
		if (this.order_page) {
			this.order_page.next_fun(this, '没有更多了...')
		}
	},
	methods: {
		// 分页请求
		init(page = 1, append = false) {
			if (!this.order_page) {
				const _page = new appendData()
				_page.name = 'test_api/get_test'
				_page.method = 'GET'
				this.order_page = _page
			}
			this.order_page.fun(page, append)
		},
		// 各类请求
		api3_action() {
			// console.log('11111111', 11111111)
			const test_api_get_test = () => api('test_api/get_test') // 请求test_api.js 里的 get_test
			const test_api_get_test222 = () => api('test_api/get_test222', { _id: 222 }) // 请求test_api.js 里的 get_test222
			const test_api_get_test333 = () => api('test_api/get_test333', { is: 'param' }, { body: '我是body' }, 'POST') // 请求test_api.js 里的 get_test222
			const app_111 = () => api('app_111')
			const app_222 = () => api('app_222', { _id: 222 })
			const app_333 = () => api('app_333', { _id: 333 })
			const app_444 = () => api('app_444')
			const app_555 = () => api('app_555')
			const app_666 = () => api('app_666', { _id: 666 }, { body: '这是POST请求,我是body' })
			const user_get_user = () => api('user/get_user')

			const all_request = () => {
				const all = [
					test_api_get_test,
					test_api_get_test222,
					test_api_get_test333,
					app_111,
					app_222,
					app_333,
					app_444,
					app_555,
					app_666,
					user_get_user
				]
				const pro = []
				all.forEach((request) => pro.push(request()))
				Promise.allSettled(pro).then((res) => setTimeout(() => console.log('Promise.allSettled=', res), 10))
			}

			all_request()
		},
		// this.is_api => api() 一致
		action() {
			const { is_api } = this
			is_api('app_111', {}, { _roolback: true }) // 中断请求 放在body里面
			is_api('app_222', { _id: 222 }) // api/:id/fff
			is_api('app_333')
			is_api('app_444')
			is_api('app_555')
			is_api('app_666', { _id: 666 })
		},
		//测试proxy
		test() {
			let setStorageSync = uni.setStorageSync
			let is_cache = new Proxy(uni.setStorageSync, {
				apply(target, _this, args) {
					console.log('apply---------------')
					console.log('target=', target)
					console.log('_this=', _this)
					console.log('args=', args)
					let key = args[0],
						val = args[1],
						time = args[2] || 5
					console.log(time)
					if (!key || !val) throw '必须填写键和值!'
					if (key && val && time > 0) {
						if (val === '{}') return false
						if (val instanceof Object) val = JSON.stringify(val)
						let now = new Date().getTime() + time * 60 * 1000
						setStorageSync(key, val, -1)
						setStorageSync(key + '_time', now, -1)
						Reflect.apply(...arguments)
						return true
					}
					return false
				}
			})

			uni.setStorageSync = is_cache

			let a = is_cache('aa', 'i am val', 60)
			console.log(a)
			let b = uni.setStorageSync('key', 'val')
			console.log(b)
		},
		//跳转路由
		goto_router() {
			// common/router/index.js 配置路由
			//1 uni.navigateTo	保留当前页面，跳转到应用内的某个页面
			//2 uni.redirectTo	关闭当前页面，跳转到应用内的某个页面。
			//3 uni.reLaunch		关闭所有页面，打开到应用内的某个页面。
			//4 uni.switchTab		跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			//5 uni.navigateBack	关闭当前页面，返回上一页面或多级页面。
			//pop-in 为动画效果 具体参考uni文档
			// (name,query = '',type = 1,acg = 'pop-in',fun)
			this.is_goto('名字', '?id=参数', 1, 'pop-in', () => {
				//跳转后执行方法,可以在 goto_router 设置全局拦截 设置跳转前 或自定设置 跳转后
			})
			//参数同上
			this.is_gopage('路径跳转')
		},
		//工具集合
		tools_fun() {
			this.is_tools.to_msg('dddd')
			this.is_cdn
			//... 同上
		},
		//vuex用法
		vuex_fun() {
			this.is_vuex.commit('user_vuex/set_vuex', ['键', '值']) //set_vuex 是主模块 mutations
			this.is_vuex.dispatch('user_vuex/action名称')

			this.is_vuex.state //主模块state
			this.is_vuex.state.user_vuex //user_vuex模块
		}
	}
}
</script>
