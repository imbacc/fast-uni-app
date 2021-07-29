<template>
	<view class="form">
		<view class="form-tiem">
			<time-begin-end :beginTime="beginTime" :endTime="endTime" @confirm="confirm" />
		</view>
		<view class="form-cause">
			<view class="form-cause-title">
				请假事由（必填）
			</view>
			<view class="form-cause-inpt">
				<u-input style="height: 100%;width: 100%;" v-model="explain" :maxlength="60" type="textarea" :clearable="false"
					placeholder="请输入您的请假事由" placeholder-style="color:#999999;" />
				<view class="form-cause-inpt-textCount">
					{{explain.length}}/60
				</view>
			</view>
		</view>
		<view class="form-image">
			<view class="form-image-title">
				相关证明
			</view>
			<view class="form-image-up">
				<u-upload ref="uUpload" :action="action" :auto-upload="true" :custom-btn="true" :width="160"
					:height="160">
					<view slot="addBtn" class="form-image-up-but">
						<u-icon name="photo" size="50"></u-icon>
						<view>上传照片</view>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="form-but">
			确认申请
		</view>
	</view>
</template>

<script>
	import timeBeginEnd from '@/components/time-beginEnd.vue'
	
	export default {
		components: {
			timeBeginEnd
		},
		data() {
			return {
				explain: '',
				action: 'http://www.example.com/upload',
				filesArr: [],
				beginTime: '', //开始时间
				endTime: '', // 结束时间
			};
		},
		mounted() {
			let time = Date.parse(new Date())
			this.endTime = this.$u.timeFormat(time, 'yyyy/mm/dd')
		},
		methods: {
			// 时间
			confirm(e, type) {
				if (type === 'begin') this.beginTime = e.year + '/' + e.month + '/' + e.day
				if (type === 'end') this.endTime = e.year + '/' + e.month + '/' + e.day
			},
			submit() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				console.log(files)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 30rpx;

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
			background-color: #E62234;
			font-size: 36rpx;
			color: #fff;
			line-height: 90rpx;
			text-align: center;
			margin-top: 80rpx;
			border-radius: 42rpx;
		}
	}
</style>
