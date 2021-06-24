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

<style lang="scss">
	/*每个页面公共css */
	.flex {
		display: flex;
	}
	
	.flex_center {
		@extend .flex;
		justify-content: center;
	}
	
	.flex_align {
		@extend .flex;
		align-items: center;
	}
	
	.flex_center_align {
		@extend .flex_center;
		@extend .flex_align;
	}
	
	.flex_nowarp {
		@extend .flex;
		flex-wrap: nowrap;
	}
	
	.flex_warp {
		@extend .flex;
		flex-wrap: wrap;
	}
	
	.flex_between {
		@extend .flex;
		justify-content: space-between;
	}
	
	.flex_around {
		@extend .flex;
		justify-content: space-around;
	}
	
	.flex_evenly {
		@extend .flex;
		justify-content: space-evenly;
	}
	
	.flex_row {
		@extend .flex;
		flex-direction: row;
	}
	
	.flex_column {
		@extend .flex;
		flex-direction: column;
	}
</style>
