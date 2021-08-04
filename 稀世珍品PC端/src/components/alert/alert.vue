<template>
	<div class="alert_pack flex_center_align fade">
		<div class="alert_box" :class="type === 2 ? 'flex_center_align' : ''" :style="slot ? `height:auto;` : ''">
			<div v-if="type !== 2" class="close_div" @click="cancel">X</div>
			<div class="flex_column flex_center_align">
				<img v-if="type === 1 || type === 7" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="big_del_ico" />
				<img v-if="type === 2" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="wait_ico" />
				<img v-if="type === 3" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="ok_ico" />
				<img v-if="type === 4" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="overtime_ico" />
				<img v-if="type === 5" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="error_ico" />
				<img v-if="type === 6" class="alert_ico" :class="type === 2 ? 'no_top' : ''" :src="confirm_ico" />
				<text v-if="showMsg" class="alert_text" :class="type === 2 ? 'text_anm' : ''">{{ msg }}</text>
				<div v-if="slot" style="width: 100%">
					<slot></slot>
				</div>
			</div>
			<div v-if="type === 1 || type === 3 || type === 6 || type == 7" class="alert_foot flex_align">
				<div v-if="type === 1 || type === 6 || type == 7" class="alert_cancel flex_center_align" @click="cancel">取消</div>
				<div v-if="type === 1 || type === 3 || type === 6 || type == 7" class="alert_confirm flex_center_align" @click="confirm">确定</div>
			</div>
			<div v-if="type === 4" class="flex_center_align" @click="sel_pay">
				<div class="reload flex_center_align">查询支付结果</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import big_del_ico from '../../assets/images/index/big_del_ico.png'
import wait_ico from '../../assets/images/index/wait_ico.png'
import ok_ico from '../../assets/images/index/ok_ico.png'
import overtime_ico from '../../assets/images/index/overtime_ico.png'
import error_ico from '../../assets/images/index/error_ico.png'
import confirm_ico from '../../assets/images/index/confirm_ico.png'

export default defineComponent({
	props: {
		type: {
			type: Number,
			default: 3
		},
		msg: {
			type: String,
			default: ''
		},
		showMsg: {
			type: Boolean,
			default: true
		},
		slot: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		console.log('props', props)
		// function
		const cancel = () => emit('cancel', props.type)
		const confirm = () => emit('confirm', props.type)
		const set_val = (key, val) => (data[key] = val)
		const sel_pay = () => emit('sel_pay')

		return {
			// function
			cancel,
			confirm,
			set_val,
			sel_pay,
			// images
			big_del_ico,
			wait_ico,
			ok_ico,
			overtime_ico,
			error_ico,
			confirm_ico
		}
	}
})
</script>

<style lang="scss" scoped>
.alert_pack {
	height: 100%;
	width: 100%;
	background: RGBA(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	overflow: hidden;
	user-select: none;
}

.alert_box {
	width: 511px;
	height: 264px;
	background: #ffffff;
	position: relative;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 2px;
	overflow: hidden;
}

.close_div {
	position: absolute;
	right: 20px;
	top: 20px;
	width: 14px;
	height: 16px;
	font-size: 22px;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	user-select: none;
	cursor: pointer;
}

.alert_ico {
	height: 81px;
	width: 81px;
	margin-top: 31px;
	margin-bottom: 10px;
}

.no_top {
	margin-top: 0;
}

.text_anm {
	animation: leftRight 1s forwards;
	animation-iteration-count: infinite;
}

@keyframes leftRight {
	40% {
		color: #000;
	}
	60% {
		color: #fff;
	}
	80% {
		transform: translate(0) scale(1.2);
	}
	100% {
		transform: translate(0) scale(1);
	}
}

.alert_text {
	font-size: 28px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #000000;
}

.alert_foot {
	height: 56px;
	width: 100%;
	position: absolute;
	bottom: 0;
	border-top: 1px solid #d7d7d7;
}

.reload {
	width: 202px;
	height: 47px;
	background: #ff0000;
	border-radius: 16px;
	font-size: 24px;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	margin-top: 20px;
	user-select: none;
	cursor: pointer;
}

.alert_cancel {
	height: 100%;
	flex: 1;
	background: #ffffff;
	@extend .alert_text;
	color: #555555;
	cursor: pointer;
}

.alert_confirm {
	@extend .alert_cancel;
	background: #e77200;
	color: #ffffff;
}

.fade {
	animation: 0.3s fade;
}

@keyframes fade {
	from {
		opacity: 0.1;
		will-change: transform;
	}
	to {
		opacity: 1;
	}
}
</style>
