<template>
	<div v-show="isPopup" class="loading-popup">
		<div v-show="shadeShow" class="shade-popup" :class="[ani]" @click="close(shadeClick)"></div>
		<div class="loading-content" :class="[ani]" :style="{ height, width, backgroundColor }">
			<slot></slot>
			<div class="circle-loading" v-show="!custom && type == 1">
				<div class="dot">
					<div class="first-dot"></div>
				</div>
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
			</div>
			<div class="rectangle-loading" v-show="!custom && type == 2">
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, nextTick, defineComponent } from 'vue'

export default defineComponent({
	props: {
		shadeShow: {
			value: Boolean,
			default: true
		},
		shadeClick: {
			value: Boolean,
			default: false
		},
		custom: {
			value: Boolean,
			default: false
		},
		type: {
			value: Number,
			default: 1
		},
		width: {
			value: String,
			default: '250px'
		},
		height: {
			value: String,
			default: '150px'
		},
		backgroundColor: {
			value: String,
			default: '#fff'
		},
		callback: {
			type: Function,
			default: function () {}
		}
	},
	setup(props, { emit }) {
		// reactive
		const data = reactive({
			isPopup: false,
			ani: ''
		})

		// function
		const open = () => {
			data.isPopup = true
			nextTick(() => {
				let time = setTimeout(() => {
					clearTimeout(time)
					data.ani = 'open-animation'
				}, 30)
			})
		}

		const close = (v) => {
			let isClose = v == false ? false : true
			if (isClose) {
				data.ani = ''
				let time = setTimeout(() => {
					clearTimeout(time)
					data.isPopup = false
					emit('callback')
				}, 200)
			}
		}

		return {
			// reactive
			...toRefs(data),
			// function
			open,
			close
		}
	}
})
</script>

<style lang="scss" scoped>
/*弹窗*/
.loading-popup {
	.shade-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0;
		transition: all 0.6s;
		z-index: 998;
	}
	.shade-popup.open-animation {
		opacity: 0.5;
	}
	.loading-content {
		z-index: 999;
		position: fixed;
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		border-radius: 20px;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transform: scale(1.2);
		transition: all 0.6s;
		opacity: 0;
	}
	.loading-content.open-animation {
		transform: scale(1);
		opacity: 1;
	}
}

/*圆形加载*/
.circle-loading {
	width: 70px;
	height: 70px;
	position: relative;
	margin: auto;
	.dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 70px;
		height: 70px;
		animation: 1.5s loadrotate cubic-bezier(0.8, 0.005, 0.5, 1) infinite;
		&:after,
		.first-dot {
			content: '';
			position: absolute;
			width: 18px;
			height: 18px;
			background: #3aa4f0;
			border-radius: 50%;
			left: 50%;
		}
		.first-dot {
			background: #3aa4f0;
			animation: 1.5s dotscale cubic-bezier(0.8, 0.005, 0.5, 1) infinite;
		}
	}
}
@for $i from 1 through 4 {
	.circle-loading {
		& > .dot:nth-child(#{$i}) {
			animation-delay: 0.15s * $i;
		}
	}
}

@keyframes loadrotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
@keyframes dotscale {
	0%,
	10% {
		width: 28px;
		height: 28px;
		margin-left: -2px;
		margin-top: -5px;
	}
	50% {
		width: 16px;
		height: 16px;
		margin-left: 0px;
		margin-top: 0px;
	}
	90%,
	100% {
		width: 28px;
		height: 28px;
		margin-left: -2px;
		margin-top: -5px;
	}
}

/*矩形加载*/
.rectangle-loading {
	height: 30px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	.dot {
		height: 30px;
		width: 10px;
		margin-right: 20px;
	}
}

$color: #ff3404, skyblue, #f48f00, #39d754;

@for $i from 1 through 4 {
	.rectangle-loading {
		& > .dot:nth-child(#{$i}) {
			animation: load-frame 1s infinite linear 0s + $i * 0.12;
			background: #{nth($color, $i)};
		}
		@if $i==4 {
			& > .dot:nth-child(#{$i}) {
				margin-right: 0;
			}
		}
	}
}

@keyframes load-frame {
	0% {
		height: 35px;
		background: palegoldenrod;
	}
	50% {
		height: 12px;
	}
	100% {
		height: 35px;
	}
}
</style>
