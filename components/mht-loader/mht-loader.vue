<template>
	<view class="mht-loader">
		<view class="mht-loader-content" style="margin-top: -155px;">
			<view class="mht-loader-icon" v-show="showImage" :style="{'margin-right': iconMR}">
				<image :src="imgSrc"></image>
			</view>
			<view :class="['mht-loader-'+loadingType]"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			loadingType: {
				/* 支持类型：rectangle、satellite、jumping、arrow-circle、circle、circle-side、ball-scale、ball-circle、heart、ball-rotate、ball-pulse */
				type: String,
				default: "jumping"
			},
			imgSrc: {
				//图标地址
				type: String,
				default: ''
			},
			showImage: {
				// 是否显示图标
				type: Boolean,
				default: true
			},
			iconMarginRight: {
				// 图标距离动画的距离
				type: Number,
				default: 15
			}
		},
		data() {
			return {

			};
		},
        computed: {
            iconMR() {
				return `${this.iconMarginRight}px`;
            }
        }

	}
</script>

<style>
	.mht-loader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}
	
	.mht-loader-content{
		display: flex;
		flex-direction: row;
	}	

	.mht-loader-icon image {
		width: 100upx;
		height: 100upx;
	}

	/* rectangle */
	.mht-loader-rectangle {
		margin-top: 10px;
		position: relative;
		width: 10px;
		height: 30px;
		-webkit-animation: rectangle infinite 1s ease-in-out -.2s;
		-moz-animation: rectangle infinite 1s ease-in-out -.2s;
		-o-animation: rectangle infinite 1s ease-in-out -.2s;
		animation: rectangle infinite 1s ease-in-out -.2s;
		background-color: #007aff
	}
	
	.mht-loader-rectangle:after,
	.mht-loader-rectangle:before {
		position: absolute;
		width: 10px;
		height: 30px;
		content: '';
		background-color: #007aff
	}
	
	.mht-loader-rectangle:before {
		right: -20px;
		-webkit-animation: rectangle infinite 1s ease-in-out;
		-moz-animation: rectangle infinite 1s ease-in-out;
		-o-animation: rectangle infinite 1s ease-in-out;
		animation: rectangle infinite 1s ease-in-out
	}
	
	.mht-loader-rectangle:after {
		right: -40px;
		-webkit-animation: rectangle infinite 1s ease-in-out .2s;
		-moz-animation: rectangle infinite 1s ease-in-out .2s;
		-o-animation: rectangle infinite 1s ease-in-out .2s;
		animation: rectangle infinite 1s ease-in-out .2s
	}
	
	@-webkit-keyframes rectangle {
	
		0%,
		100%,
		80% {
			height: 35px;
			-webkit-box-shadow: 0 0 #007aff;
			box-shadow: 0 0 #007aff
		}
	
		40% {
			height: 45px;
			-webkit-box-shadow: 0 -20px #007aff;
			box-shadow: 0 -20px #007aff
		}
	}
	
	@-moz-keyframes rectangle {
	
		0%,
		100%,
		80% {
			height: 35px;
			-webkit-box-shadow: 0 0 #007aff;
			box-shadow: 0 0 #007aff
		}
	
		40% {
			height: 45px;
			-webkit-box-shadow: 0 -20px #007aff;
			box-shadow: 0 -20px #007aff
		}
	}
	
	@-o-keyframes rectangle {
	
		0%,
		100%,
		80% {
			height: 35px;
			-webkit-box-shadow: 0 0 #007aff;
			box-shadow: 0 0 #007aff
		}
	
		40% {
			height: 45px;
			-webkit-box-shadow: 0 -20px #007aff;
			box-shadow: 0 -20px #007aff
		}
	}
	
	@keyframes rectangle {
	
		0%,
		100%,
		80% {
			height: 35px;
			-webkit-box-shadow: 0 0 #007aff;
			box-shadow: 0 0 #007aff
		}
	
		40% {
			height: 45px;
			-webkit-box-shadow: 0 -20px #007aff;
			box-shadow: 0 -20px #007aff
		}
	}

	/* satellite */
	.mht-loader-satellite {
		position: relative;
		width: 48px;
		height: 48px;
		animation: satellite 3s infinite linear;
		border: 1px solid #007aff;
		border-radius: 100%
	}

	.mht-loader-satellite:after,
	.mht-loader-satellite:before {
		position: absolute;
		left: 0;
		width: 15px;
		height: 15px;
		content: '';
		border-radius: 100%;
		background-color: #007aff;
		-webkit-box-shadow: 0 0 10px #007aff;
		box-shadow: 0 0 10px #007aff
	}

	.mht-loader-satellite:after {
		right: 0;
		width: 24px;
		height: 24px;
		margin: 12px
	}

	@-webkit-keyframes satellite {
		from {
			-webkit-transform: rotate(0) translateZ(0);
			-ms-transform: rotate(0) translateZ(0);
			-o-transform: rotate(0) translateZ(0);
			transform: rotate(0) translateZ(0)
		}

		to {
			-webkit-transform: rotate(360deg) translateZ(0);
			-ms-transform: rotate(360deg) translateZ(0);
			-o-transform: rotate(360deg) translateZ(0);
			transform: rotate(360deg) translateZ(0)
		}
	}

	@-moz-keyframes satellite {
		from {
			-webkit-transform: rotate(0) translateZ(0);
			-ms-transform: rotate(0) translateZ(0);
			-o-transform: rotate(0) translateZ(0);
			transform: rotate(0) translateZ(0)
		}

		to {
			-webkit-transform: rotate(360deg) translateZ(0);
			-ms-transform: rotate(360deg) translateZ(0);
			-o-transform: rotate(360deg) translateZ(0);
			transform: rotate(360deg) translateZ(0)
		}
	}

	@-o-keyframes satellite {
		from {
			-webkit-transform: rotate(0) translateZ(0);
			-ms-transform: rotate(0) translateZ(0);
			-o-transform: rotate(0) translateZ(0);
			transform: rotate(0) translateZ(0)
		}

		to {
			-webkit-transform: rotate(360deg) translateZ(0);
			-ms-transform: rotate(360deg) translateZ(0);
			-o-transform: rotate(360deg) translateZ(0);
			transform: rotate(360deg) translateZ(0)
		}
	}

	@keyframes satellite {
		from {
			-webkit-transform: rotate(0) translateZ(0);
			-ms-transform: rotate(0) translateZ(0);
			-o-transform: rotate(0) translateZ(0);
			transform: rotate(0) translateZ(0)
		}

		to {
			-webkit-transform: rotate(360deg) translateZ(0);
			-ms-transform: rotate(360deg) translateZ(0);
			-o-transform: rotate(360deg) translateZ(0);
			transform: rotate(360deg) translateZ(0)
		}
	}
	
	/* jumping */
	.mht-loader-jumping {
		margin-top: 25px;
		position: relative;
		width: 50px;
		-webkit-perspective: 200px;
		-moz-perspective: 200px;
		-ms-perspective: 200px;
		perspective: 200px
	}
	
	.mht-loader-jumping:after,
	.mht-loader-jumping:before {
		position: absolute;
		width: 20px;
		height: 20px;
		content: '';
		animation: jumping .5s infinite alternate;
		background: transparent
	}
	
	.mht-loader-jumping:before {
		left: 0
	}
	
	.mht-loader-jumping:after {
		right: 0;
		animation-delay: .15s
	}
	
	@-webkit-keyframes jumping {
		0% {
			-webkit-transform: scale(1) translateY(0) rotateX(0);
			-ms-transform: scale(1) translateY(0) rotateX(0);
			-o-transform: scale(1) translateY(0) rotateX(0);
			transform: scale(1) translateY(0) rotateX(0);
			-webkit-box-shadow: 0 0 0 transparent;
			box-shadow: 0 0 0 transparent
		}
	
		100% {
			-webkit-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-ms-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-o-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			transform: scale(1.2) translateY(-25px) rotateX(45deg);
			background: #007aff;
			-webkit-box-shadow: 0 25px 40px #007aff;
			box-shadow: 0 25px 40px #007aff
		}
	}
	
	@-moz-keyframes jumping {
		0% {
			-webkit-transform: scale(1) translateY(0) rotateX(0);
			-ms-transform: scale(1) translateY(0) rotateX(0);
			-o-transform: scale(1) translateY(0) rotateX(0);
			transform: scale(1) translateY(0) rotateX(0);
			-webkit-box-shadow: 0 0 0 transparent;
			box-shadow: 0 0 0 transparent
		}
	
		100% {
			-webkit-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-ms-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-o-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			transform: scale(1.2) translateY(-25px) rotateX(45deg);
			background: #007aff;
			-webkit-box-shadow: 0 25px 40px #007aff;
			box-shadow: 0 25px 40px #007aff
		}
	}
	
	@-o-keyframes jumping {
		0% {
			-webkit-transform: scale(1) translateY(0) rotateX(0);
			-ms-transform: scale(1) translateY(0) rotateX(0);
			-o-transform: scale(1) translateY(0) rotateX(0);
			transform: scale(1) translateY(0) rotateX(0);
			-webkit-box-shadow: 0 0 0 transparent;
			box-shadow: 0 0 0 transparent
		}
	
		100% {
			-webkit-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-ms-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-o-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			transform: scale(1.2) translateY(-25px) rotateX(45deg);
			background: #007aff;
			-webkit-box-shadow: 0 25px 40px #007aff;
			box-shadow: 0 25px 40px #007aff
		}
	}
	
	@keyframes jumping {
		0% {
			-webkit-transform: scale(1) translateY(0) rotateX(0);
			-ms-transform: scale(1) translateY(0) rotateX(0);
			-o-transform: scale(1) translateY(0) rotateX(0);
			transform: scale(1) translateY(0) rotateX(0);
			-webkit-box-shadow: 0 0 0 transparent;
			box-shadow: 0 0 0 transparent
		}
	
		100% {
			-webkit-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-ms-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			-o-transform: scale(1.2) translateY(-25px) rotateX(45deg);
			transform: scale(1.2) translateY(-25px) rotateX(45deg);
			background: #007aff;
			-webkit-box-shadow: 0 25px 40px #007aff;
			box-shadow: 0 25px 40px #007aff
		}
	}
	
	/* arrow-circle */
	.mht-loader-arrow-circle {
		margin-top: 10px;
		position: relative;
		width: 25px;
		height: 25px;
		-webkit-animation: arrow-circle infinite .75s linear;
		-moz-animation: arrow-circle infinite .75s linear;
		-o-animation: arrow-circle infinite .75s linear;
		animation: arrow-circle infinite .75s linear;
		border: 2px solid #007aff;
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-radius: 100%
	}
	
	.mht-loader-arrow-circle:after,
	.mht-loader-arrow-circle:before {
		position: absolute;
		top: 19px;
		left: -3px;
		content: '';
		-webkit-transform: rotate(-30deg);
		-ms-transform: rotate(-30deg);
		-o-transform: rotate(-30deg);
		transform: rotate(-30deg);
		border-top: 5px solid #007aff;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent
	}
	
	.mht-loader-arrow-circle:after {
		top: 0;
		left: 17px;
		-webkit-transform: rotate(150deg);
		-ms-transform: rotate(150deg);
		-o-transform: rotate(150deg);
		transform: rotate(150deg)
	}
	
	@-webkit-keyframes arrow-circle {
		0% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	
		100% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	}
	
	@-moz-keyframes arrow-circle {
		0% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	
		100% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	}
	
	@-o-keyframes arrow-circle {
		0% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	
		100% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	}
	
	@keyframes arrow-circle {
		0% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	
		100% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	}
	
	/* circle */
	.mht-loader-circle {
		margin-top: 10px;
		width: 25px;
		height: 25px;
		-webkit-animation: circle infinite .75s linear;
		-moz-animation: circle infinite .75s linear;
		-o-animation: circle infinite .75s linear;
		animation: circle infinite .75s linear;
		border: 2px solid #007aff;
		border-top-color: transparent;
		border-radius: 100%
	}
	
	/* circle-side */
	.mht-loader-circle-side {
		margin-top: 10px;
		position: relative;
		width: 25px;
		height: 25px;
		-webkit-animation: circle infinite .75s linear;
		-moz-animation: circle infinite .75s linear;
		-o-animation: circle infinite .75s linear;
		animation: circle infinite .75s linear;
		border: 2px solid #007aff;
		border-top-color: rgba(0, 0, 0, .2);
		border-right-color: rgba(0, 0, 0, .2);
		border-bottom-color: rgba(0, 0, 0, .2);
		border-radius: 100%
	}
	
	@-webkit-keyframes circle {
		0% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	
	@-moz-keyframes circle {
		0% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	
	@-o-keyframes circle {
		0% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	
	@keyframes circle {
		0% {
			-webkit-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0)
		}
	
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	
	/* ball-scale */
	.mht-loader-ball-scale {
		width: 50px;
		height: 50px;
		-webkit-animation: ball-scale infinite linear .75s;
		-moz-animation: ball-scale infinite linear .75s;
		-o-animation: ball-scale infinite linear .75s;
		animation: ball-scale infinite linear .75s;
		border-radius: 100%;
		background-color: #007aff
	}
	
	@-webkit-keyframes ball-scale {
		0% {
			-webkit-transform: scale(.1);
			-ms-transform: scale(.1);
			-o-transform: scale(.1);
			transform: scale(.1);
			opacity: 1
		}
	
		100% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
			opacity: 0
		}
	}
	
	@-moz-keyframes ball-scale {
		0% {
			-webkit-transform: scale(.1);
			-ms-transform: scale(.1);
			-o-transform: scale(.1);
			transform: scale(.1);
			opacity: 1
		}
	
		100% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
			opacity: 0
		}
	}
	
	@-o-keyframes ball-scale {
		0% {
			-webkit-transform: scale(.1);
			-ms-transform: scale(.1);
			-o-transform: scale(.1);
			transform: scale(.1);
			opacity: 1
		}
	
		100% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
			opacity: 0
		}
	}
	
	@keyframes ball-scale {
		0% {
			-webkit-transform: scale(.1);
			-ms-transform: scale(.1);
			-o-transform: scale(.1);
			transform: scale(.1);
			opacity: 1
		}
	
		100% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
			opacity: 0
		}
	}
	
	/* ball-circle */
	.mht-loader-ball-circle {
		margin-top: 5px;
		position: relative;
		width: 40px;
		height: 40px
	}
	
	.mht-loader-ball-circle:after,
	.mht-loader-ball-circle:before {
		position: absolute;
		width: 10px;
		height: 10px;
		content: '';
		border-radius: 100%;
		background-color: #007aff
	}
	
	.mht-loader-ball-circle:before {
		transform: translate(0, 0);
		-webkit-animation: ball-circle-before infinite 1.5s linear;
		-moz-animation: ball-circle-before infinite 1.5s linear;
		-o-animation: ball-circle-before infinite 1.5s linear;
		animation: ball-circle-before infinite 1.5s linear
	}
	
	.mht-loader-ball-circle:after {
		transform: translate(30px, 30px);
		-webkit-animation: ball-circle-after infinite 1.5s linear;
		-moz-animation: ball-circle-after infinite 1.5s linear;
		-o-animation: ball-circle-after infinite 1.5s linear;
		animation: ball-circle-after infinite 1.5s linear
	}
	
	@-webkit-keyframes ball-circle-after {
		0% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		25% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		50% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		75% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		100% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	}
	
	@-moz-keyframes ball-circle-after {
		0% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		25% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		50% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		75% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		100% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	}
	
	@-o-keyframes ball-circle-after {
		0% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		25% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		50% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		75% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		100% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	}
	
	@keyframes ball-circle-after {
		0% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		25% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		50% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		75% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		100% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	}
	
	@-webkit-keyframes ball-circle-before {
		0% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		25% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		50% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		75% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		100% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	}
	
	@-moz-keyframes ball-circle-before {
		0% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		25% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		50% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		75% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		100% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	}
	
	@-o-keyframes ball-circle-before {
		0% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		25% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		50% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		75% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		100% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	}
	
	@keyframes ball-circle-before {
		0% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	
		25% {
			-webkit-transform: translate(30px, 0);
			-ms-transform: translate(30px, 0);
			-o-transform: translate(30px, 0);
			transform: translate(30px, 0)
		}
	
		50% {
			-webkit-transform: translate(30px, 30px);
			-ms-transform: translate(30px, 30px);
			-o-transform: translate(30px, 30px);
			transform: translate(30px, 30px)
		}
	
		75% {
			-webkit-transform: translate(0, 30px);
			-ms-transform: translate(0, 30px);
			-o-transform: translate(0, 30px);
			transform: translate(0, 30px)
		}
	
		100% {
			-webkit-transform: translate(0, 0);
			-ms-transform: translate(0, 0);
			-o-transform: translate(0, 0);
			transform: translate(0, 0)
		}
	}
	
	/* heart */
	.mht-loader-heart {
		position: relative;
		width: 100px;
		height: 90px;
		-webkit-animation: heart infinite .85s linear;
		-moz-animation: heart infinite .85s linear;
		-o-animation: heart infinite .85s linear;
		animation: heart infinite .85s linear
	}
	
	.mht-loader-heart:after,
	.mht-loader-heart:before {
		position: absolute;
		top: 0;
		left: 30px;
		width: 30px;
		height: 50px;
		content: '';
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		transform: rotate(-45deg);
		-webkit-transform-origin: 0 100%;
		-moz-transform-origin: 0 100%;
		-ms-transform-origin: 0 100%;
		-o-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-moz-border-radius: 30px 30px 0 0;
		border-radius: 30px 30px 0 0;
		background: #007aff
	}
	
	.mht-loader-heart:after {
		left: 0;
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-transform-origin: 100% 100%;
		-moz-transform-origin: 100% 100%;
		-ms-transform-origin: 100% 100%;
		-o-transform-origin: 100% 100%;
		transform-origin: 100% 100%
	}
	
	@-webkit-keyframes heart {
		0% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	
		50% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1)
		}
	
		100% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	}
	
	@-moz-keyframes heart {
		0% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	
		50% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1)
		}
	
		100% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	}
	
	@-o-keyframes heart {
		0% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	
		50% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1)
		}
	
		100% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	}
	
	@keyframes heart {
		0% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	
		50% {
			-webkit-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1)
		}
	
		100% {
			-webkit-transform: scale(.8);
			-ms-transform: scale(.8);
			-o-transform: scale(.8);
			transform: scale(.8)
		}
	}
	
	/* ball-rotate */
	.mht-loader-ball-rotate {
		margin-top: 15px;
		margin-left: 15px;
		position: relative;
		width: 15px;
		height: 15px;
		-webkit-animation: ball-rotate 1s 0s cubic-bezier(.7, -.13, .22, .86) infinite;
		-moz-animation: ball-rotate 1s 0s cubic-bezier(.7, -.13, .22, .86) infinite;
		-o-animation: ball-rotate 1s 0s cubic-bezier(.7, -.13, .22, .86) infinite;
		animation: ball-rotate 1s 0s cubic-bezier(.7, -.13, .22, .86) infinite;
		border-radius: 100%;
		background-color: #007aff;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both
	}
	
	.mht-loader-ball-rotate:after,
	.mht-loader-ball-rotate:before {
		position: absolute;
		width: 15px;
		height: 15px;
		margin: 2px;
		content: '';
		opacity: .8;
		border-radius: 100%;
		background-color: #007aff
	}
	
	.mht-loader-ball-rotate:before {
		top: 0;
		left: -28px
	}
	
	.mht-loader-ball-rotate:after {
		top: 0;
		left: 25px
	}
	
	@-webkit-keyframes ball-rotate {
		0% {
			-webkit-transform: rotate(0) scale(1);
			-ms-transform: rotate(0) scale(1);
			-o-transform: rotate(0) scale(1);
			transform: rotate(0) scale(1)
		}
	
		50% {
			-webkit-transform: rotate(180deg) scale(.6);
			-ms-transform: rotate(180deg) scale(.6);
			-o-transform: rotate(180deg) scale(.6);
			transform: rotate(180deg) scale(.6)
		}
	
		100% {
			-webkit-transform: rotate(360deg) scale(1);
			-ms-transform: rotate(360deg) scale(1);
			-o-transform: rotate(360deg) scale(1);
			transform: rotate(360deg) scale(1)
		}
	}
	
	@-moz-keyframes ball-rotate {
		0% {
			-webkit-transform: rotate(0) scale(1);
			-ms-transform: rotate(0) scale(1);
			-o-transform: rotate(0) scale(1);
			transform: rotate(0) scale(1)
		}
	
		50% {
			-webkit-transform: rotate(180deg) scale(.6);
			-ms-transform: rotate(180deg) scale(.6);
			-o-transform: rotate(180deg) scale(.6);
			transform: rotate(180deg) scale(.6)
		}
	
		100% {
			-webkit-transform: rotate(360deg) scale(1);
			-ms-transform: rotate(360deg) scale(1);
			-o-transform: rotate(360deg) scale(1);
			transform: rotate(360deg) scale(1)
		}
	}
	
	@-o-keyframes ball-rotate {
		0% {
			-webkit-transform: rotate(0) scale(1);
			-ms-transform: rotate(0) scale(1);
			-o-transform: rotate(0) scale(1);
			transform: rotate(0) scale(1)
		}
	
		50% {
			-webkit-transform: rotate(180deg) scale(.6);
			-ms-transform: rotate(180deg) scale(.6);
			-o-transform: rotate(180deg) scale(.6);
			transform: rotate(180deg) scale(.6)
		}
	
		100% {
			-webkit-transform: rotate(360deg) scale(1);
			-ms-transform: rotate(360deg) scale(1);
			-o-transform: rotate(360deg) scale(1);
			transform: rotate(360deg) scale(1)
		}
	}
	
	@keyframes ball-rotate {
		0% {
			-webkit-transform: rotate(0) scale(1);
			-ms-transform: rotate(0) scale(1);
			-o-transform: rotate(0) scale(1);
			transform: rotate(0) scale(1)
		}
	
		50% {
			-webkit-transform: rotate(180deg) scale(.6);
			-ms-transform: rotate(180deg) scale(.6);
			-o-transform: rotate(180deg) scale(.6);
			transform: rotate(180deg) scale(.6)
		}
	
		100% {
			-webkit-transform: rotate(360deg) scale(1);
			-ms-transform: rotate(360deg) scale(1);
			-o-transform: rotate(360deg) scale(1);
			transform: rotate(360deg) scale(1)
		}
	}
	
	/* ball-pulse */
	.mht-loader-ball-pulse {
		margin-top: 15px;
		margin-left: 15px;
		position: relative;
		width: 1px;
		height: 1px
	}
	
	.mht-loader-ball-pulse:after,
	.mht-loader-ball-pulse:before {
		position: absolute;
		display: inline-block;
		width: 15px;
		height: 15px;
		content: '';
		border-radius: 100%;
		background-color: #007aff
	}
	
	.mht-loader-ball-pulse:before {
		left: -15px;
		-webkit-animation: ball-pulse infinite .75s -.4s cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation: ball-pulse infinite .75s -.4s cubic-bezier(.2, .68, .18, 1.08);
		-o-animation: ball-pulse infinite .75s -.4s cubic-bezier(.2, .68, .18, 1.08);
		animation: ball-pulse infinite .75s -.4s cubic-bezier(.2, .68, .18, 1.08)
	}
	
	.mht-loader-ball-pulse:after {
		right: -15px;
		-webkit-animation: ball-pulse infinite .75s cubic-bezier(.2, .68, .18, 1.08);
		-moz-animation: ball-pulse infinite .75s cubic-bezier(.2, .68, .18, 1.08);
		-o-animation: ball-pulse infinite .75s cubic-bezier(.2, .68, .18, 1.08);
		animation: ball-pulse infinite .75s cubic-bezier(.2, .68, .18, 1.08)
	}
	
	@-webkit-keyframes ball-pulse {
		0% {
			transform: scale(1);
			opacity: 1
		}
	
		50% {
			transform: scale(.1);
			opacity: .6
		}
	
		100% {
			transform: scale(1);
			opacity: 1
		}
	}
	
	@-moz-keyframes ball-pulse {
		0% {
			transform: scale(1);
			opacity: 1
		}
	
		50% {
			transform: scale(.1);
			opacity: .6
		}
	
		100% {
			transform: scale(1);
			opacity: 1
		}
	}
	
	@-o-keyframes ball-pulse {
		0% {
			transform: scale(1);
			opacity: 1
		}
	
		50% {
			transform: scale(.1);
			opacity: .6
		}
	
		100% {
			transform: scale(1);
			opacity: 1
		}
	}
	
	@keyframes ball-pulse {
		0% {
			transform: scale(1);
			opacity: 1
		}
	
		50% {
			transform: scale(.1);
			opacity: .6
		}
	
		100% {
			transform: scale(1);
			opacity: 1
		}
	}
</style>
