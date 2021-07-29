<template>
	<view style="height: 95vh;width: 100%;background: #000000;overflow: hidden;">
		<video style="height: 92vh;width: 100%;" autoplay loop :src="url" controls />
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
