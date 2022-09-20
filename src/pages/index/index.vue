<template>
	<view class="index_content">
		<skeleton v-if="showLoading" />
		<view v-else class="index_body">
			<!-- <u-swiper :list="list" effect3d effect3d-previous-margin="0" mode="rect" @click="swiper_click" /> -->

			<!-- 路由配置 => common/router/index -->
			修改了pages.json一定要重启!!! 修改了pages.json一定要重启!!! 修改了pages.json一定要重启!!!
			<view class="mt20">
				<button type="button" @click="goto_aa">跳转pagesA aa</button>
			</view>
			<view class="mt20">
				<button type="button" @click="goto_hook_error">试错 hook pagesA aa</button>
			</view>
			<view class="mt20">
				<button type="button" @click="goto_aa22">跳转pagesA aa22 [需要授权] before after</button>
			</view>
			<view class="mt20">
				<button type="button" @click="goto_bb">跳转pagesB bb [需要授权] before</button>
			</view>
			<view class="mt20">
				<button type="button" @click="goto_bb22">跳转pagesB bb22 [需要授权]</button>
			</view>
			<view class="mt20">
				<button type="button" @click="v2_action">我是this Action api</button>
			</view>
			<view class="mt20">
				<button type="button" @click="v3_action">我是引入调用 Action api</button>
			</view>

			<button class="mt20" @click="test_action">test api</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { getTest, getTest222, getTest333 } from '@/api/testApi'
	import { onLoad } from '@dcloudio/uni-app'
	import { useRouter } from '@/router/index'
	import { useUserStore } from '@/store/user'
	import { ref } from 'vue'

	const router = useRouter()
	const userStore = useUserStore()

	const showLoading = ref(true)
	const list = ref([
		{
			image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
			title: '昨夜星辰昨夜风，画楼西畔桂堂东'
		},
		{
			image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
			title: '身无彩凤双飞翼，心有灵犀一点通'
		},
		{
			image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
			title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
		}
	])

	onLoad(() => {
		showLoading.value = false
	})

	const v3_action = () => {
		// console.log('11111111', 11111111)
		// const test_api_get_test = () => getTest() // 请求test_api.js 里的 get_test
		// const test_api_get_test222 = () => getTest222({ _id: 222 }) // 请求test_api.js 里的 get_test222
		// const test_api_get_test333 = () => getTest333({ is: 'param' }, { body: '我是body' }, 'POST') // 请求test_api.js 里的 get_test222
		// const app_111 = () => getTest()
		// const app_222 = () => getTest({ _id: 222 })
		// const app_333 = () => getTest({ _id: 333 })
		// const app_444 = () => getTest()
		// const app_555 = () => getTest()
		// const app_666 = () => getTest({ _id: 666 }, { body: '这是POST请求,我是body' })
		// const user_get_user = () => getTest()
		// const all_request = () => {
		// 	const all = [
		// 		test_api_get_test,
		// 		test_api_get_test222,
		// 		test_api_get_test333,
		// 		app_111,
		// 		app_222,
		// 		app_333,
		// 		app_444,
		// 		app_555,
		// 		app_666,
		// 		user_get_user
		// 	]
		// 	const pro = []
		// 	all.forEach((request) => pro.push(request()))
		// 	Promise.allSettled(pro).then((res) => setTimeout(() => console.log('Promise.allSettled=', res), 10))
		// }
		// all_request()
	}

	const v2_action = () => {
		// this.is_api('app_111', {}) // 中断请求 放在body里面
		// this.is_api('app_222', { _id: 222 }) // api/:id/fff
		// this.is_api('app_333', { _id: 222 })
		// this.is_api('app_444')
		// this.is_api('app_555')
		// this.is_api('app_666', { _id: 666 })
	}

	//测试proxy
	const test = () => {
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
					// setStorageSync(key, val, -1)
					// setStorageSync(key + '_time', now, -1)
					// Reflect.apply(...arguments)
					return true
				}
				return false
			}
		})

		uni.setStorageSync = is_cache

		// let a = is_cache('aa', 'i am val', 60)
		// console.log(a)
		let b = uni.setStorageSync('key', 'val')
		console.log(b)
	}

	//store用法
	const storeFun = () => {
		userStore.token = '1111'
		userStore.setCache('aaa', 'bbb')
	}

	const goto_aa = () => {
		router
			.hook(() => console.log('我是goto_aa hook 头号选手'))
			.gotoPage('/pagesA/aa/aa', { aa: 'key', bb: 111 })
			.hook(() => console.log('我是goto_aa hook 车尾选手'))
	}

	const goto_hook_error = () => {
		const r = router
			.hook(() => false)
			.gotoPage('/pagesA/aa/aa', { aa: 'fff' })
			.hook(() => console.log('2222222222222222'))
		console.log('goto_aa router.result=', r.result)
	}

	const goto_bb = () => {
		router
			.hook(() => {
				if (userStore.userRole.length === 0) console.error('不登录点我肯定报错!')
			})
			.gotoRouter('pagesB/bb', { bb: 'www' })
			.hook(() => {
				console.log('登陆了，就执行到这里嘛!')
			})
	}

	const goto_aa22 = () => {
		const r = router.gotoRouter('pagesA/aa22', { bb: 'gggg' })
		console.log('goto_aa22 router.result=', r.result)
	}

	const goto_bb22 = () => {
		router.gotoRouter('pagesB/bb22', { bb: 'qwer' })
	}

	const swiper_click = (e: any) => {
		// this.is_tools.look_img(
		// 	e,
		// 	Array.from(this.list, ({ image }) => image)
		// )
	}

	const test_action = () => {
		// this.is_api('app_111', {}) // 中断请求 放在body里面
		// this.is_api('app_222', { _id: 222 }) // api/:id/fff
		// this.is_api('app_333', { _id: 222 })
		// this.is_api('app_444')
		// this.is_api('app_555')
		// this.is_api('app_666', { _id: 666 })
		// this.is_api('app_111', {}) // 中断请求 放在body里面
		// this.is_api('app_222', { _id: 222 }) // api/:id/fff
		// this.is_api('app_333', { _id: 222 })
		// this.is_api('app_444')
		// this.is_api('app_555')
		// this.is_api('app_666', { _id: 666 })
	}
</script>

<style scoped>
	.index_content {
		font-size: 50rpx;
	}

	.test_size {
		height: 200upx;
		width: 400upx;
		border: 1upx solid red;
	}
</style>
