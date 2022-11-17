<template>
	<view class="index_content">
		<skeleton v-if="showLoading" />
		<view v-else class="index_body">
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
				<button type="button" @click="action">我是引入调用 Action api</button>
			</view>

			<button class="mt20" @click="test_action">test api</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { getTest, getTest222, getTest333 } from '@/api/testApi'
	import { onLoad } from '@dcloudio/uni-app'
	import { useRouter, useRoute } from 'imba-uni-router'
	import { useUserStore } from '@/store/user'
	import { ref } from 'vue'

	const router = useRouter()
	const route = useRoute()
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

	//store用法
	const storeFun = () => {
		userStore.token = '1111'
		userStore.setCache('aaa', 'bbb')
	}

	const goto_aa = () => {
		router
			.hooks((next) => {
				console.log('我是goto_aa hook 头号选手')
				next()
			})
			.push('/pagesA/aa/aa', { aa: 'key', bb: 111 })
			.hooks((next) => {
				console.log('我是goto_aa hook 车尾选手')
				next()
			})
	}

	const goto_hook_error = () => {
		router
			.hooks((next) => {
				next(false)
			})
			.push('/pagesA/aa/aa', { aa: 'fff' })
			.hooks((next) => {
				console.log('2222222222222222')
				next()
			})
	}

	const goto_bb = () => {
		router
			.hooks((next) => {
				if (userStore.userRole.length === 0) console.error('不登录点我肯定报错!')
				next()
			})
			.push('pagesB/bb', { bb: 'www' })
			.hooks((next) => {
				console.log('登陆了，就执行到这里嘛!')
				next()
			})
	}

	const goto_aa22 = () => {
		router.push('pagesA/aa22', { bb: 'gggg' })
	}

	const goto_bb22 = () => {
		router.push('pagesB/bb22', { bb: 'qwer' })
	}

	const action = () => {
		console.log('11111111', 11111111)
		const test_api_get_test = () => getTest() // 请求test_api.js 里的 get_test
		const test_api_get_test222 = () => getTest222({ _id: 222 }) // 请求test_api.js 里的 get_test222
		const test_api_get_test333 = () => getTest333({ is: 'param', xx: 'xx' }) // 请求test_api.js 里的 get_test222
		const app_111 = () => getTest({ test: '111' })
		const app_222 = () => getTest({ _id: 222 })
		const app_333 = () => getTest({ _id: 333 })
		const app_444 = () => getTest({ test: '444' })
		const app_555 = () => getTest({ test: '555' })
		const app_666 = () => getTest({ _id: 666, body: '这是POST请求,我是body' })
		const user_get_user = () => getTest()
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
			const pro: Array<Promise<any>> = []
			all.forEach((request) => pro.push(request()))
			Promise.allSettled(pro).then((res) => setTimeout(() => console.log('Promise.allSettled=', res), 10))
		}
		all_request()
	}

	const test_action = () => {
		// getTest('app_111', {}) // 中断请求 放在body里面
		// getTest('app_222', { _id: 222 }) // api/:id/fff
		// getTest('app_333', { _id: 222 })
		// getTest('app_444')
		// getTest('app_555')
		// getTest('app_666', { _id: 666 })
		// getTest('app_111', {}) // 中断请求 放在body里面
		// getTest('app_222', { _id: 222 }) // api/:id/fff
		// getTest('app_333', { _id: 222 })
		// getTest('app_444')
		// getTest('app_555')
		// getTest('app_666', { _id: 666 })
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
