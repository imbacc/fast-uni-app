<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
				// this.is_vuex.dispatch('version_vuex/app_version') //获取更新信息
				// this.is_vuex.dispatch('xxxxxxx_vuex/open_push')		//开始推送
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
