<script>
	import pageAnimation from './components/page-animation'
	
	export default {
		mixins: [pageAnimation],
		onLaunch: function () {
			document.title = '少年强拳击'
			this.is_vuex.dispatch('user_vuex/auto_userInfo')
		},
		onShow: function () {
			document.title = '少年强拳击'
		},
		onHide: function () {
			document.title = '少年强拳击'
		},
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "components/colorui/main.css";
	@import "components/colorui/icon.css";
	
	/*每个页面公共css */
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	image,
	img {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}
	
	::v-deep .image-view-img {
		height: auto !important;
	}
	
	page {
		background-color: #F3F3F3;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.main {
		padding: 20rpx 30rpx;
	}
	
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
	
	.fade {
		animation: 0.3s fade;
		will-change: transform;
	}
	
	@keyframes fade {
		from { opacity: 0.1 }
		to { opacity: 1; }
	}
	
	.mb20 {
		margin-bottom: 20rpx;
	}
	
	.gray_filter {
		filter: grayscale(100%) !important;
		filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
		background: #e6e6e6 !important;
	}
</style>
