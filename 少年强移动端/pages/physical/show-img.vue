<template>
	<view style="height: 95vh;width: 100%;overflow: hidden;">
		<image :src="url" mode="aspectFill" />
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            url: ''
	        };
	    },
		onLoad({ url }) {
			this.url = url
		},
	}
</script>
