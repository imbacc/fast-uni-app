<template>
	<view>
		<u-parse :html="content" lazy-load />
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            content: ''
	        };
	    },
		onLoad() {
			this.init()
		},
	    methods: {
	        init() {
	            this.is_api('user_api/about').then((res) => {
					if (res) this.content = res
				})
	        }
	    },
	}
</script>

<style>
</style>
