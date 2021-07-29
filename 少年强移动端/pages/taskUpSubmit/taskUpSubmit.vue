<template>
	<view class="main">
		<view class="form">
			<view class="form-name flex align-center">
				<text>作业名称</text>
				<text class="form_lab">{{ work_name }}</text>
			</view>
			<view class="form-theHeir flex align-center">
				<text>上传人</text>
				<text class="form_lab">{{ sel_student_com.name }}</text>
			</view>
			<view class="form-remark">
				<view>备注</view>
				<u-input
					style="margin-top: 20rpx;"
					v-model="remark"
					type="textarea"
					:clearable="false"
					height="200"
					:maxlength="100"
					placeholder="请输入100字以内备注说明"
					:custom-style="customStyle"
				/>
			</view>
			<view class="form-upVideo">
				<view class="view">
					上传图片
					<text class="text">（图片建议大小为200kb以下/视频为30M以内)</text>
				</view>
				<view class="flex_row flex_warp">
					<view class="image_up_but flex_column flex_align" @click="upload">
						<image class="but_img" src="/static/images/img_ico.png" mode="aspectFill" />
						<view class="but_lab">上传照片</view>
					</view>
					<view v-for="(info, index) of list_com" :key="index" class="up_div">
						<image v-if="info.type === 'image'" class="up_img" :src="info.url" mode="aspectFill" @click="look_img(info)" />
						<video
							ref="video"
							class="up_img"
							v-else
							:src="info.url"
							:controls="false"
							@play="play"
							@click="play"
						/>
						<image class="close_img" src="/static/images/close_ico.png" mode="aspectFill" @click="del_list(info)" />
					</view>
				</view>
			</view>
			<view class="but" @click="submit">确认上传</view>
		</view>
	</view>
</template>

<script>
import { baseUrl } from '@/common/config/cfg.js'

export default {
	data() {
		return {
			customStyle: {
				backgroundColor: '#fff',
				padding: '15rpx 20rpx',
				color: '#555',
				fontSize: '26rpx',
				borderRadius: '12rpx'
			},
			remark: '',
			work_id: 0,
			work_name: '',
			list: [],
			homework_images: [],
			vods_file: []
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		},
		list_com() {
			let list = []
			this.homework_images.forEach((url) => list.push({ type: 'image', url }))
			this.vods_file.forEach((url) => list.push({ type: 'video', url }))
			return list
		},
		if_img_com() {
			return (url) => (url && ~url.indexOf('.jpg')) || ~url.indexOf('.png') || ~url.indexOf('.jpeg') || ~url.indexOf('.gif')
		}
	},
	onLoad({ id, name }) {
		this.work_id = id
		this.work_name = name
	},
	methods: {
		submit() {
			const { remark, work_id, vods_file, homework_images } = this
			if (vods_file.length === 0 && homework_images.length === 0) {
				this.is_tools.to_msg('请上传图片或视频!')
				return
			}
			let body = { student_id: this.sel_student_com.id, remark, homework_id: work_id, vods_file, homework_images }
			uni.showLoading()
			this.is_api('work_api/submit_work', {}, { _formData: true, ...body }).then((res) => {
				uni.hideLoading()
				if (res) {
					let time = setTimeout(() => {
						clearTimeout(time)
						uni.navigateBack()
					}, 400)
				}
			})
		},
		upload_file(filePath) {
			let _this = this
			uni.showLoading({ title: '上传中...' })
			return new Promise((resovle) => {
				uni.uploadFile({
					url: `${baseUrl}/util/upload`, //仅为示例，非真实的接口地址
					filePath,
					name: 'file',
					success: (res) => {
						uni.hideLoading()
						resovle(res)
					},
					fail: (err) => {
						uni.hideLoading()
						_this.is_tools.to_msg('上传失败!')
						resovle(false)
					}
				})
			})
		},
		upload() {
			let _this = this
			uni.showActionSheet({
				itemList: ['上传图片', '上传视频'],
				success: (e) => {
					if (e.tapIndex === 0) {
						uni.chooseImage({
							sizeType: ['compressed'],
							success: (res) => {
								console.log('chooseImage res', res)
								_this.upload_file(res.tempFilePaths[0]).then((result) => {
									console.log('result=', result)
									if (result) {
										result = JSON.parse(result.data)
										_this.homework_images.push(result.data)
										console.log('_this.homework_images=', _this.homework_images)
									} else {
										_this.is_tools.to_msg('上传图片失败!')
									}
								})
							},
							fail: (err) => {
								_this.is_tools.to_msg('上传图片异常!')
							}
						})
						return
					}

					if (e.tapIndex === 1) {
						uni.chooseVideo({
							success: (res) => {
								console.log('chooseVideo res', res)
								_this.upload_file(res.tempFilePath).then((result) => {
									if (result) {
										result = JSON.parse(result.data)
										_this.vods_file.push(result.data)
										console.log('_this.vods_file=', _this.vods_file)
									} else {
										_this.is_tools.to_msg('上传视频失败!')
									}
								})
							},
							fail: (err) => {
								_this.is_tools.to_msg('上传视频异常!')
							}
						})
						return
					}
				}
			})
		},
		look_img(info) {
			let idx = this.homework_images.indexOf(info.url)
			if (idx === -1) return
			this.is_tools.look_img(idx, this.homework_images)
		},
		del_list(info) {
			let list = info.type === 'image' ? this.homework_images : this.vods_file
			let idx = list.indexOf(info.url)
			if (idx === -1) {
				this.is_tools.to_msg('删除失败!')
				return
			}
			list.splice(idx, 1)
		},
		play() {
			let ref = this.$refs.video[0]
			ref.pause()
			console.log(ref)
			this.is_goto('/pages/taskUpSubmit/video', `?url=${ref.src}`)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../components/upload-img/upload-img.scss';

.form {
	&-name,
	&-theHeir {
		height: 100rpx;
		background-color: #fff;
		color: #333;
		font-size: 30rpx;
		border-radius: 12rpx;
		margin-bottom: 10px;
		padding: 0 40rpx;

		text {
			width: 4em;
			margin-right: 30rpx;
		}
	}

	&-remark,
	&-upVideo {
		height: 320rpx;
		.view {
			font-size: 30rpx;
			color: #333;
			margin-bottom: 20rpx;

			text {
				font-size: 26rpx;
				color: #999;
			}
		}
		video {
			width: 100%;
			height: 300rpx;
		}
		> .text {
			border: 1px solid #ccc;
			padding: 0 20rpx;
			border-radius: 12rpx;
		}
	}

	.slot-btn {
		width: 200rpx;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
		background-color: #fff;
		margin-bottom: 0;
		border-radius: 10rpx;
	}
}
.but {
	height: 90rpx;
	border-radius: 45rpx;
	background-color: #e62234;
	line-height: 90rpx;
	text-align: center;
	color: #fff;
	margin-top: 40rpx;
	font-size: 36rpx;
}

.form_lab {
	font-size: 26rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #999999;
}
</style>
