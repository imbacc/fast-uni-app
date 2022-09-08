<template>
	<view class="">
		bb子页面
		<view class="">option: {{ option }}</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'

	const option = ref({})

	onLoad((option) => {
		console.log('%c [ option ]-15', 'font-size:14px; background:#41b883; color:#ffffff;', option)
		option.value = option
	})

	onShow(() => {
		console.log('%c [ onShow ]-21', 'font-size:14px; background:#41b883; color:#ffffff;')
	})
</script>

<style></style>
