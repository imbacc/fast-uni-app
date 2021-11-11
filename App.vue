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
			// #ifdef MP-WEIXIN
				this.is_vuex.dispatch('version_vuex/update_version')
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

<style lang="scss">
	@import "uview-ui/index.scss";
</style>
