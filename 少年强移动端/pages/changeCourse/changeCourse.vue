<template>
	<view class="form">
		<view class="form_title">选择调课后您想上课的时间</view>
			<scroll-view style="height: 440rpx;width: 100%;" scroll-x>
				<view class="form-leaveTime">
					<view class="form_view flex_column flex_warp">
						<view
							class="form-leaveTime-box mt20"
							v-for="(info, idx) in week_list"
							:key="idx"
							:class="cur_time_com(idx)"
							@click="push_time(idx, info)"
						>
							<view style="font-size: 30rpx;">{{ info.week }}</view>
							<view style="font-size: 18rpx;">（{{ info.time }}）</view>
							<view class="u-line-2" style="font-size: 28rpx;">{{ info.name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		<view class="flex_column flex_center">
			<view class="mb20">当前选择</view>
			<view v-for="(item, index) in cur_info" :key="index" class="course_div flex_align">
				<view class="course_lab" style="margin: 0 150rpx 0 31rpx;">{{ item.week }}</view>
				<view class="course_lab" style="font-size: 26rpx;">{{ item.name }}</view>
			</view>
		</view>
		<view class="form-cause">
			<view class="form-cause-title">调课事由（必填）</view>
			<view class="form-cause-inpt">
				<u-input
					ref="input"
					style="height: 100%;width: 100%;"
					v-model="explain"
					:maxlength="60"
					type="textarea"
					height="256"
					:clearable="false"
					placeholder="请输入您的调课事由"
					placeholder-style="color:#999999;"
				/>
				<view class="form-cause-inpt-textCount">{{ explain.length }}/60</view>
			</view>
		</view>
		<view class="form-image">
			<view class="form-image-title">相关证明</view>
			<view class="form-image-up flex_row flex_warp">
				<uploadImg ref="upload" />
			</view>
		</view>
		<view class="form-but" @click="submit">确认申请</view>
	</view>
</template>

<script>
import uploadImg from '@/components/upload-img/upload-img.vue'

export default {
	components: {
		uploadImg,
	},
	props: {
		planType: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			cur_time: [],
			cur_info: [],
			explain: '',
			week_list: [],
			rid: 0
		}
	},
	computed: {
		cur_time_com() {
			return (idx) => this.cur_time.some((s) => s === idx) ? 'active' : ''
		}
	},
	onLoad({ rid }) {
		this.init(rid)
	},
	methods: {
		init(rid) {
			this.rid = rid
			this.is_api('user_api/schedule_options', { rid }).then((res) => {
				if (res) {
					this.week_list = res
				}
			})
		},
		submit() {
			const { rid, explain, cur_info, cur_time } = this
			if (cur_time.length === 0) {
				this.is_tools.to_msg('没有选择课程!')
				return
			}
			
			if (explain === '') {
				this.is_tools.to_msg('没有填写事由内容!')
				return
			}
			
			let file_list = this.$refs.upload.get_list()
			
			let body = {
				rid,
				schedule: JSON.stringify(cur_info),
				reason: explain,
				proves: file_list.length > 0 ? file_list.join(',') : ''
			}
			
			this.is_api('user_api/schedule_submit', {}, body).then((res) => {
				this.is_tools.to_msg(res ? '提交成功!' : '提交失败!')
				if (res) {
					this.is_tools.time_call(400).then(() => uni.navigateBack())
				}
			})
		},
		push_time(idx, info) {
			let f_idx = this.cur_time.findIndex((f) => f === idx)
			if (f_idx !== -1) {
				this.cur_time.splice(f_idx, 1)
				this.cur_info.splice(f_idx, 1)
			} else {
				this.cur_time.push(idx)
				this.cur_info.push(info)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.form_title {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #555555;
		margin-left: 20rpx;
	}
	
.form {
	padding: 30rpx;

	&-leaveTime {
		height: 100%;
		// height: 382rpx;
		// background-color: #fff;
		padding: 15rpx;

		&-box {
			width: 240rpx;
			// height: 181rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			text-align: center;
			line-height: 1.5;
			color: #000;
			padding: 15rpx 15rpx;
			transition: 0.3s;
			margin-right: 20rpx;
		}
	}
	
	&-repairTime {
		font-size: 28rpx;
		padding: 20rpx 25rpx;
		color: 28rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-top: 20rpx;

		&-select {
			border-radius: 50%;
			border: 1px solid #d2d2d2;
			margin-right: 12rpx;
		}
	}

	&-repairTimeBox {
		margin-top: 20rpx;

		&-box {
			width: 213rpx;
			// height: 201rpx;
			margin-right: 15rpx;
			background-color: #fff;
			border-radius: 12rpx;
			text-align: center;
			padding: 20rpx 20rpx 20rpx;
			color: #333;
			transition: 0.3s;
			margin-bottom: 25rpx;
		}
	}

	&-cause {
		margin-top: 30rpx;

		&-title {
			font-size: 30rpx;
			color: #333;
		}

		&-inpt {
			position: relative;
			background-color: #fff;
			padding: 0rpx 20rpx;
			margin-top: 20rpx;

			&-textCount {
				font-size: 26rpx;
				color: #999;
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
	}

	&-image {
		margin-top: 30rpx;

		&-title {
			font-size: 30rpx;
			color: #333;
		}

		&-up {
			margin-top: 26rpx;

			&-but {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
				background-color: #fff;
				text-align: center;
				font-size: 28rpx;
				color: #999999;
				padding-top: 30rpx;
			}
		}
	}
	&-but {
		height: 90rpx;
		background-color: #e62234;
		font-size: 36rpx;
		color: #fff;
		line-height: 90rpx;
		text-align: center;
		margin-top: 80rpx;
		border-radius: 42rpx;
	}
}

.form-text {
	margin-top: 27rpx;
	font-size: 26rpx;
	color: #999;
}

.active {
	background-color: #e62234;
	color: #fff;
}

.mt20 {
	margin-top: 20rpx;
}

.red_lab {
	color: #e62234;
	font-size: 28rpx;
	font-weight: 600;
}

.gray_lab {
	color: #CCCCCC;
}

.cur_box {
	background-color: #023A98;
	color: #fff;
	
	.gray_lab {
		color: white;
	}
}

.form_view {
	height: 100%;
}

.form_view:after{
	content: '';
	width: 200rpx;
}

.course_div {
	width: 690rpx;
	height: 111rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	margin-bottom: 20rpx;
}

.course_lab {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
}
</style>
