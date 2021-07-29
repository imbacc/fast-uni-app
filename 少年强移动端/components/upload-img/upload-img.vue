<template>
	<view class="img_upload flex_row flex_warp">
		<u-upload
			style="height: 50rpx;"
			ref="uUpload"
			:action="action"
			:file-list="fileList"
			:auto-upload="true"
			:size-type="['compressed']"
			:custom-btn="true"
			:show-progress="false"
			:width="160"
			:height="160"
			:max-size="5 * 1024 * 1024"
			:show-upload-list="false"
			@on-success="up_success"
		>
			<view slot="addBtn" class="image_up_but flex_column flex_align">
				<image class="but_img" src="/static/images/img_ico.png" mode="aspectFill" />
				<view class="but_lab">上传照片</view>
			</view>
		</u-upload>
		
		<view v-for="(img, index) of list" :key="index" class="up_div">
			<image class="up_img" :src="img" mode="aspectFill" @click="look_img(index)" />
			<image class="close_img" src="/static/images/close_ico.png" mode="aspectFill" @click="del_list(index)" />
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '@/common/config/cfg.js'
	
	export default {
		name:"upload-img",
		props: {
			limit: {
				type: Array,
				default: () => ['png', 'jpg', 'jpeg', 'webp', 'gif']
			},
		},
		data() {
			return {
				action: `${baseUrl}/util/upload`,
				list: [],
				fileList: []
			};
		},
		methods: {
			get_list() {
				return this.list
			},
			set_list(list) {
				let file = []
				list.forEach((url) => file.push({ response: { code: 1, data: url }, url, progress: 100 }))
				this.fileList = file
				this.$refs.uUpload.lists = [...this.$refs.uUpload.lists, ...file]
				this.list = list
			},
			get_files() {
				let file_list = this.$refs.uUpload.lists.filter((val) => val.progress == 100)
				return file_list
			},
			up_success(data, index, list, name) {
				if (data && data.code === 1) this.update_list()
			},
			update_list() {
				this.$nextTick(() => {
					let list = this.get_files()
					this.list = Array.from(list, ({ response }) => response && response.code === 1 ? response.data : '')
				})
			},
			del_list(idx) {
				this.$refs.uUpload.remove(idx)
				this.update_list()
			},
			look_img(idx) {
				this.is_tools.look_img(idx, this.list)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './upload-img.scss';
	
	.img_upload {
		min-height: 100rpx;
	}
</style>
