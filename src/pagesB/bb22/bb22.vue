<template>
	<view class="">
		bb22子页面
		<view class="">option: {{ option }}</view>

		<button @click="test_redirectTo">测试redirectTo</button>
		<button @click="test_reLaunch">测试reLaunch</button>
		<button @click="test_switchTab">测试switchTab</button>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { useRouter } from 'imba-uni-router'
	const router = useRouter()

	const option = ref({})

	onLoad((option) => {
		console.log('%c [ option ]-19', 'font-size:14px; background:#41b883; color:#ffffff;', option)
	})

	onShow(() => {
		console.log('%c [ onShow ]-21', 'font-size:14px; background:#41b883; color:#ffffff;')
	})

	const test_redirectTo = () => {
		router.replace('pagesA/aa22', { test: 'test_redirectTo' })
	}
	const test_reLaunch = () => {
		router.replaceAll('pagesA/aa22', { test: 'test_reLaunch' })
	}

	const test_switchTab = () => {
		router.swicthTab('user', { test: 'test_switchTab' })
	}
</script>

<style></style>
