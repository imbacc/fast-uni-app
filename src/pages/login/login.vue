<template>
	<view class="login_index">
		<view class="is_lab" @click="loginSubmit">我是登陆界面 登陆吧</view>

		<view class="is_lab" @tap="goBack">back</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useRouter } from 'imba-uni-router'
	import { useUserStore } from '@/store/user'

	const router = useRouter()
	const userStore = useUserStore()

	const username = ref('admin')
	const password = ref('admin')

	onLoad(() => {
		// isInit()
	})

	const isInit = () => {
		uni.showModal({
			title: '系统提示',
			content: 'back?',
			success: () => {
				router
					.hooks(() => console.log('test hook1'))
					.push('index', { test: 'test index' })
					.hooks(() => console.log('test hook2'))
			}
		})
	}

	const loginSubmit = () => {
		userStore.userRole = ['user']
		uni.showModal({
			title: '系统提示',
			content: '登录成功!',
			showCancel: false,
			success: () => isInit()
		})
	}

	const goBack = () => {
		uni.reLaunch({ url: '/pages/index/index' })
	}
</script>

<style scoped>
	.is_lab {
		margin-bottom: 50upx;
		color: red;
	}
</style>
