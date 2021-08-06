<template>
	<view class="pack_div flex_column flex_align">
		<textarea v-model="content" class="textarea" maxlength="260" placeholder="请输入您的反馈意见" />
		
		<view class="body_div">
			<view class="title_div flex_align">
				请提供问题的截图和图片
				<view class="gray">（选填）</view>
			</view>
			
			<uploadImg style="height: 200rpx;" ref="upload" />
			
			<view class="bottom_lab">
				您的反馈我们会尽快解决，感谢您的意见反馈，如果紧急事情，请联系您的课程顾问或者教练人员。
			</view>
		</view>
		
		<view class="button_div flex_center_align" @click="submit">确定</view>
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
	            content: ''
	        };
	    },
	    methods: {
	        submit() {
				if (this.content === '') {
					this.is_tools.to_msg('请输入反馈内容!')
					return
				}
				let file_list = this.$refs.upload.get_list()
				let body = { content: this.content, images: file_list.length === 0 ? '' : file_list.join(',') }
	            this.is_api('user_api/feedback_submit', {}, body).then((res) => {
					this.is_tools.to_msg(res ? '提交成功!' : '提交失败!')
					if (res) {
						this.is_tools.time_call(1000).then(() => uni.navigateBack())
					}
				})
	        }
	    },
	}
</script>

<style lang="scss" scoped>
	.pack_div {
		height: 100%;
		width: 100%;
		background: #F3F3F3;
	}
	
	.body_div {
		padding: 32rpx;
		width: 100%;
	}
	
	.textarea {
		width: 690rpx;
		height: 302rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin-top: 30rpx;
		padding: 25rpx 25rpx;
	}
	
	.title_div {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-bottom: 26rpx;
	}
	
	.bottom_lab {
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	
	.button_div {
		width: 690rpx;
		height: 90rpx;
		background: #E62234;
		border-radius: 42rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		position: absolute;
		bottom: 42rpx;
	}
	
	.gray {
		color: #999999;
	}
</style>
