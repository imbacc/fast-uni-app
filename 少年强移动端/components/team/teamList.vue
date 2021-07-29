 <template>
	<view class="flex_align">
		<view
			class="main-box"
			v-for="(item, idx) in list"
			:key="idx"
			:style="cardStyle"
			:id="`coach_${idx}`"
			@click="toCoachDetail(item.id)"
		>
			<view class="main-box-avatar">
				<u-image height="130rpx" border-radius="50%" :src="avatar_com(item)" />
				<!-- <u-avatar :src="avatar_com(item)" size="130" /> -->
			</view>
			<view class="main-box-title">
				{{ item.name }}
			</view>
			<view class="main-box-prompt u-line-2">
				{{ item.desc }}
			</view>
			<view class="main-box-phone" v-if="phone">
				<image src="/static/images/phone.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'teamList',
		props: {
			list: {
				type: Array,
				default: () => []
			},
			cardStyle: {
				type: Object,
				default: () => {}
			},
			to: {
				type: Boolean,
				default: true
			},
			phone:{
				type: Boolean,
				default:false
			}
		},
		computed: {
			avatar_com() {
				return (info) => {
					if (info.images && Array.isArray(info.images) && info.images.length > 0) return info.images[0]
					if (info.avatar_image && Array.isArray(info.avatar_image) && info.avatar_image.length > 0) return info.avatar_image[0]
					return info.avatar_image || info.avatar || ''
				}
			}
		},
		methods: {
			toCoachDetail(id) {
				if (this.to) this.is_goto('/pages/coachDetail/coachDetail', `?id=${id}`)
				this.$emit('toClick', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-box {
		height: 292rpx;
		width: 217rpx;
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx 10rpx 30rpx;
		display: inline-block;
		margin-right: 20rpx;

		&-avatar {
			width: 130rpx;
			height: 130rpx;
			margin: 0 auto;
		}

		&-title {
			font-size: 30rpx;
			font-weight: 700;
			text-align: center;
			margin-top: 10rpx;
			color: #333;
		}

		&-prompt {
			font-size: 22rpx;
			color: #999;
			text-align: center;
			margin-top: 3rpx;
		}
		&-phone {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 20rpx auto 0;
		}
	}
	
	.main-box:last-child {
		margin-right: 0;
	}
</style>
