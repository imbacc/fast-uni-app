<template>
	<view class="main">
		<view class="info">
			<view class="info-heder flex align-center">
				<view class="info-heder-avatar">
					<u-avatar :src="member.avatar" size="128" />
				</view>
				<view class="info-heder-title">
					<view>{{ member.name }}</view>
					<view>可用积分{{ member.score }}</view>
				</view>
				<view class="info-heder-erweima" @click="toPromotionCode">
					<u-icon name="grid"></u-icon>
				</view>
			</view>
			<view class="info-statistics flex justify-around">
				<view>
					<view>{{ member.count }}人</view>
					<view>推广人数</view>
				</view>
				<view>
					<view>{{ member.total_invite_score }}</view>
					<view>累计总推广积分</view>
				</view>
			</view>
		</view>
		<view class="">
			<view v-for="(info, index) in list" :key="index" class="list flex justify-between align-center">
				<view>
					<u-avatar :src="info.avatar" size="83" />
				</view>
				<view>{{ info.name }}</view>
				<view style="color: #999;">{{ info.time }}</view>
			</view>
		</view>
		<view class="pop-up" @click="show_share">
			<image src="/static/images/my/promotion/pop-up-bg.png" mode="aspectFill" />
		</view>
		
		<u-popup v-model="popup" :duration="150" height="269" border-radius="24" mode="bottom" safe-area-inset-bottom>
			<view class="flex_align flex_around">
				<view class="share_div flex_column flex_center_align" @click="share_wechat">
					<image class="share_ico" src="/static/images/promotion/wechat_ico.png" mode="aspectFit" />
					<view class="share_lab">微信</view>
				</view>
				<view class="share_div flex_column flex_center_align" @click="share_friends">
					<image class="share_ico" src="/static/images/promotion/friend_ico.png" mode="aspectFit" />
					<view class="share_lab">朋友圈</view>
				</view>
				<view class="share_div flex_column flex_center_align" @click="share_url">
					<image class="share_ico" src="/static/images/promotion/url_ico.png" mode="aspectFit" />
					<view class="share_lab">复制链接</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import wx from '@/common/libs/wx_jssdk.js'
	
	export default {
		data() {
			return {
				popup: false,
				list: [],
				member: {},
				is_wechat: false,
				href: ''
			};
		},
		computed: {
			user_com() {
				return this.is_vuex.state.user_vuex.user_info
			},
		},
		onLoad() {
			this.is_wechat = wx.isWechat()
			this.href = `${window.location.origin}/#/pages/poster/poster?userid=${this.user_com.id}`
			// this.href = window.location.href
			this.init()
		},
		methods:{
			init() {
				this.is_api('user_api/expand').then((res) => {
					if (res) {
						this.list = res.list
						this.member = res.member
						this.is_vuex.commit('user_vuex/set_vuex', ['invite_code', res.member.qrcode])
					}
				})
			},
			toPromotionCode(){
				this.is_goto('/pages/promotionCode/promotionCode')
			},
			show_share() {
				// this.is_goto('/pages/poster/poster')
				this.popup = true
			},
			share_wechat() {
				console.log('share wechat ...');
				wx.share(`少年强火爆开课啦!`, `来自${this.member.name}的分享!`, this.member.avatar, this.href, 1, () => {
					this.is_tools.to_msg('分享内容已生成,点击右上角分享给朋友吧!')
					this.popup = false
				})
			},
			share_friends() {
				console.log('share friends ...');
				wx.share(`少年强火爆开课啦!`, `来自${this.member.name}的分享!`, this.member.avatar, this.href, 2, () => {
					this.is_tools.to_msg('分享内容已生成,点击右上角分享到朋友圈吧!')
					this.popup = false
				})
			},
			share_url() {
				// this.wechat_copy(this.href)
				console.log('share url...');
				let ele = document.createElement("input"); //创建一个input标签
				ele.setAttribute("value", this.href); // 设置改input的value值
				document.body.appendChild(ele); // 将input添加到body
				ele.select();// 获取input的文本内容
				document.execCommand("copy");// 执行copy指令
				document.body.removeChild(ele);// 删除input标签
				this.is_tools.to_msg('复制链接成功!')
				this.popup = false
			},
			wechat_copy(str) {
				const save = (e) => {
					e.clipboardData.setData('text/plain', str)
					e.preventDefault()
				}
				document.addEventListener('copy', save)
				document.execCommand('copy')
				document.removeEventListener('copy', save)
				this.is_tools.to_msg('复制链接成功!')
				this.popup = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		height: 310rpx;
		border-radius: 12rpx;
		background: url(/static/images/my/my-bg.png) no-repeat;
		background-size: cover;
		margin-bottom: 20rpx;

		&-heder {
			padding: 30rpx;
			position: relative;

			&-avatar {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
			}

			&-title {
				font-size: 32rpx;
				color: #fff;
				margin-left: 30rpx;
			}

			&-erweima {
				position: absolute;
				right: 35rpx;
				top: 60rpx;
				font-size: 50rpx;
				color: #fff;
			}
		}

		&-statistics {
			font-size: 32rpx;
			color: #fff;
			text-align: center;
			line-height: 1.5;
		}
	}

	.list {
		height: 115rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
	}
	.pop-up {
		position: fixed;
		right: 30rpx;
		bottom: 44rpx;
		width: 150rpx;
		height: 234rpx;
	}
	
	.share_div {
		height: 130rpx;
		margin-top: 40rpx
	}
	
	.share_ico {
		height: 88rpx;
		width: 88rpx;
	}
	
	.share_lab {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 10rpx;
	}
</style>
