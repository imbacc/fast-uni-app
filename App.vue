<script>
	// #ifdef H5
		import pageAnimation from './components/page-animation'
	// #endif
	
	export default {
		// #ifdef H5
		mixins: [pageAnimation],
		// #endif
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
				// this.is_vuex.dispatch('get_app_version') //获取更新信息
				// this.is_vuex.dispatch('open_push')		//开始推送
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
