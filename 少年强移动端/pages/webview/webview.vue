<template>
	<view>
		<web-view :src="src" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad({ src }) {
			if (src) this.src = src
		}
	}
</script>

<style>
</style>
