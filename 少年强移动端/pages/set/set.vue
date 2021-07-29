<template>
	<view>
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item arrow" @click="update_avatar">
				<view class="content">
					<text class="text-black text-sm">修改头像</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<view class="cu-avatar round"
							:style="`background-image: url('${user_com.avatar_image}');`">
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @click="alterName">
				<view class="content">
					<text class="text-black text-sm">修改昵称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ user_com.name }}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="alterPhone">
				<view class="content">
					<text class="text-black text-sm">手机号码</text>
					<text class="text-grey text-sm">{{ user_com.phone }}（{{ user_com.is_reg === 1 ? '已绑定' : '未绑定' }}）</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">更换</text>
				</view>
			</view>
		</view>
		<view class="exit" @click="exit">
			退出登录
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '@/common/config/cfg.js'
	
	export default {
		data() {
			return {
				phoneModal: false
			};
		},
		computed: {
			token_com() {
				return this.is_vuex.state.user_vuex.token
			},
			user_com() {
				return this.is_vuex.state.user_vuex.user_info
			}
		},
		methods: {
			// 修改昵称
			alterName() {
				this.is_goto('/pages/set/update_nick')
			},
			// 修改手机
			alterPhone() {
				this.is_goto('/pages/set/update_phone')
			},
			update_avatar() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (choose) => {
						uni.showLoading({ title: '上传中...' })
						const path = choose.tempFilePaths[0]
						uni.uploadFile({
						    url: `${baseUrl}/member/edit-avatar`, //仅为示例，非真实的接口地址
						    filePath: path,
						    name: 'file',
							timeout: 30000,
							header: {
								'x-access-token': this.token_com
							},
						    success: (res) => {
								uni.hideLoading()
						        console.log(res);
								if (res.statusCode === 200) {
									let data = JSON.parse(res.data)
									if (data.code === 1) {
										const user = this.user_com
										user.avatar_image = data.data
										this.is_vuex.commit('user_vuex/set_user_info', user)
										_this.is_tools.to_msg('修改成功!')
									} else if (data.code === 0 && data.msg === 'Token已过期') {
										_this.is_tools.to_msg('Token已过期 请重新登录!')
										_this.is_vuex.commit('user_vuex/set_logout')
										uni.clearStorage()
										uni.switchTab({ url: '/pages/my/my' })
									}
								}
						    },
							fail: () => {
								uni.hideLoading()
								_this.is_tools.to_msg('修改失败!')
							}
						})
					}
				})
			},
			async clear_loading(msg) {
				let time = setTimeout(() => {
					clearTimeout(time)
					this.$refs.model.clearLoading()
					this.is_tools.to_msg(msg)
				}, 100)
			},
			exit() {
				this.is_tools.to_showModal('确认退出登录?', '系统提示', () => {
					uni.clearStorage()
					this.is_vuex.commit('user_vuex/set_vuex', ['exit_state', true])
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.exit {
		width: 690rpx;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 42rpx;
		text-align: center;
		line-height: 90rpx;
		color: #555;
		border-radius: 42rpx;
		font-size: 32rpx;
	}
</style>
