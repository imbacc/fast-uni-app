<template>
	<view>
		<skeleton v-if="loading" />
		<view v-else>
			<view class="video"><video :src="work_info.vod_file && work_info.vod_file[0]" /></view>
			<view class="main">
				<view class="title">{{ work_info.name }}</view>
				<view class="time">练习时长：{{ work_info.practice_duration }}分钟</view>
				<view class="text">
					<u-parse :html="work_info.detail" />
				</view>
				
				<template v-if="student_work">
					<!-- 作业提交 -->
					<view class="box">
						<!-- 标题 -->
						<view class="flex justify-between align-center" style="padding: 22rpx 0;">
							<view class="box-title">
								<image style="height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
								作业提交
							</view>
							<view class="box-ico">上传时间 : {{ format_data(student_work.createtime, 'yyyy-mm-dd日 hh:MM:ss') }}</view>
						</view>
						<!-- 内容 -->
						<view class="box-content">
							<view class="box-content-text">
								<textarea v-model="student_work.remark" style="height: 180rpx;width: 100%;" maxlength="200" placeholder="请输入内容" />
							</view>
							<view class="box-content-img flex flex-wrap">
								<!-- <uploadImg ref="upload" style="min-height: 150rpx;" /> -->
								<image class="box_image" v-for="(url, idx) in student_work.homework_images" :key="idx" :src="url" @click="look_img(idx, student_work.homework_images)" />
								<video
									class="box_image"
									ref="video"
									v-for="(url, idx) in student_work.vods_file" :key="idx"
									:src="url"
									:controls="false"
									@play="play"
									@click="play"
								/>
							</view>
						</view>
					</view>
					<!-- 教练批阅 -->
					<view v-if="student_work.status === 1" class="box" style="margin-bottom: 50rpx;">
						<!-- 标题 -->
						<view class="flex justify-between align-center" style="padding: 22rpx 0;">
							<view class="box-title">
								<image style="height: 50rpx; width: 30rpx;" src="/static/images/course-ico.png" />
								教练批阅
							</view>
							<view class="box-ico">批阅时间{{ format_data(student_work.review_time, 'yyyy-mm-dd日 hh:MM:ss') }}</view>
						</view>
						<!-- 内容 -->
						<view class="box-content">
							<view class="box-content-score">
								<u-rate :count="5" v-model="student_work.score" disabled />
							</view>
							<view class="box-content-text">{{ student_work.comment }}</view>
						</view>
					</view>
					<!-- <view class="but" @click="reload_up_task">重新上传</view> -->
				</template>
				
				<template v-if="!student_work">
					<view class="but" @click="up_task">上传作业</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
import uploadImg from '@/components/upload-img/upload-img.vue'

export default {
	components: {
		uploadImg
	},
	data() {
		return {
			count: 4,
			value: 2,
			work_info: {},
			loading: true,
			homework_id: 0,
			name: '',
			student_work: false
		}
	},
	onLoad({ id, name }) {
		if (id) {
			this.homework_id = id
			this.name = name
			this.init(id, name)
		}
	},
	computed: {
		format_data() {
			return (time, format = 'yyyy-mm-dd') => time && this.$u.timeFormat(time, format)
		},
	},
	onShow() {
		if (this.homework_id && this.name !== 'student_work_info') this.init(this.homework_id)
	},
	methods: {
		init(homework_id, name = 'work_info') {
			console.log('name=', name);
			this.loading = true
			this.is_api(`work_api/${name}`, { homework_id }).then((res) => {
				if (res) {
					if (name === 'work_info') {
						this.work_info = res
					} else {
						this.work_info = res.homework
						this.student_work = res
					}
					this.loading = false
				} else {
					let time = setTimeout(() => {
						clearTimeout(time)
						uni.navigateBack()
					}, 500)
				}
			})
		},
		up_task() {
			const { id, name } = this.work_info
			this.is_goto('/pages/taskUpSubmit/taskUpSubmit', `?id=${id}&name=${name}`)
		},
		reload_up_task() {
			
		},
		look_img(idx, list) {
			this.is_tools.look_img(idx, list)
		},
		play() {
			let ref = this.$refs.video[0]
			ref.pause()
			this.is_goto('/pages/taskUpSubmit/video', `?url=${ref.src}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.video {
	height: 360rpx;

	video {
		width: 100%;
		height: 100%;
	}
}

.title {
	font-size: 36rpx;
	color: #333;
}

.time {
	font-size: 28rpx;
	color: #999;
	margin-top: 20rpx;
	padding-bottom: 40rpx;
	border-bottom: 1px solid #e6e6e6;
}

.title-2 {
	font-size: 32rpx;
	color: #333;
}

.text {
	font-size: 28rpx;
	color: #555;
	margin-top: 10rpx;
	margin-bottom: 20rpx;
}

// 最新活动
.box {
	&-title {
		font-size: 36rpx;
		color: #333;
		font-weight: 700;
	}

	&-ico {
		color: #999999;
		font-size: 26rpx;
	}

	&-content {
		&-text {
			height: 200rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 15rpx 20rpx;
			color: #999;
			font-size: 26rpx;
		}

		&-img {
			margin-top: 40rpx;
		}

		&-score {
			margin-bottom: 20rpx;
		}
	}
}

.but {
	height: 90rpx;
	background-color: #e62234;
	border-radius: 42rpx;
	text-align: center;
	line-height: 90rpx;
	color: #fff;
	font-size: 36rpx;
	margin-top: 40rpx;
}

.box_image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	margin-right: 20rpx;
}
</style>
