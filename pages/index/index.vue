<template>
	<view class="index_content">
		<view class="head_div">
			
			<view class="top_20"></view>
			
			<view class="search_div">
				<view class="min_left_ico">
					<image></image>
				</view>
				<view class="min_search">
					<view class="min_search_ico"></view>
					<view class="min_search_lab">111111111111</view>
				</view>
				<view class="min_right_ico">
					<image></image>
				</view>
			</view>
			
			<view class="swiper_box">
				 <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000">
					<swiper-item v-for="(info,index) in adv_list" :key="index">
						<image class="adv_img" mode="scaleToFill" :src="info.img"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="index_body">
			<view class="like_shop">
				<view class='guessLike'>
					<view class='title flexAllCenter'>
						<view class='space1'></view>
						<view class='icon1'>
							<view class='spaceA spaceA20'></view>
							<view class='spaceA spaceA40'></view>
							<view class='spaceA spaceA100'></view>
						</view>
						<view class='text'>逛商场</view>
						<view class='icon1'>
							<view class='spaceB spaceA100'></view>
							<view class='spaceB spaceA40'></view>
							<view class='spaceB spaceA20'></view>
						</view>
						<view class='space1'></view>
					</view>
				</view>
				
				<view class="shop_div">
					<view class="shop_min_div" :class="index == 0 ? 'shop_hr1 shop_hr2' : (index == 1 ? 'shop_hr1' : (index == 2 ? 'shop_hr2' : ''))" v-for="(info,index) in shop_list" :key="index">
						<view class="shop_min_left">
							<view class="shop_min_left_name">{{info.name}}</view>
							<view class="shop_min_left_lab">{{info.lab}}</view>
						</view>
						<view class="shop_min_right">
							<image :src="info.img" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="like_live">
				<view class='guessLike'>
					<view class='title flexAllCenter'>
						<view class='space1'></view>
						<view class='icon1'>
							<view class='spaceA spaceA20'></view>
							<view class='spaceA spaceA40'></view>
							<view class='spaceA spaceA100'></view>
						</view>
						<view class='text'>爱生活</view>
						<view class='icon1'>
							<view class='spaceB spaceA100'></view>
							<view class='spaceB spaceA40'></view>
							<view class='spaceB spaceA20'></view>
						</view>
						<view class='space1'></view>
					</view>
				</view>
			</view>
			
			<view class="live_div">
				<view class="live_min_div" :class="index < 3 ? 'live_hr' : ''" v-for="(info,index) in live_list" :key="index">
					<view class="live_min_left">
						<view class="live_min_left_name">{{info.name}}</view>
						<view class="live_min_left_lab">{{info.lab}}</view>
					</view>
					<view class="live_min_right">
						<image :src="info.img" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				adv_list:
				[
					{
						img:'/static/img/1.jpg'
					},
					{
						img:'/static/img/2.jpg'
					},
					{
						img:'/static/img/3.jpg'
					}
				],
				shop_list:
				[
					{
						name:'钟表馆',
						lab:'百元直降',
						img:'/static/img/hua.png'
					},
					{
						name:'生鲜馆',
						lab:'减千减百',
						img:'/static/img/hua.png'
					},
					{
						name:'服装馆',
						lab:'热门爆款',
						img:'/static/img/hua.png'
					},
					{
						name:'家电馆',
						lab:'减千减百',
						img:'/static/img/hua.png'
					}
				],
				live_list:
				[
					{
						name:'白条商城',
						lab:'赠音箱',
						img:'/static/img/hua.png'
					},
					{
						name:'品牌秒杀',
						lab:'低价抢品牌',
						img:'/static/img/hua.png'
					},
					{
						name:'闪购',
						lab:'精选1元购',
						img:'/static/img/hua.png'
					},
					{
						name:'拍拍二手',
						lab:'iphone X五折起',
						img:'/static/img/hua.png'
					}
				]
			}
		},
		onLoad() {
			this.is_init()
		},
		methods: {
			is_init(){
				this.is_vuex.dispatch("check_login")
			}
		}
	}
</script>

<style scoped>
	
	.head_div{
		width:100%;
		height:265upx;
		background:rgba(245,97,42,1);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.top_20{
		width: 100%;
		height: 20upx;
	}
	
	.search_div{
		height: 50upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.min_search{
		width:570upx;
		height:56upx;
		background:rgba(255,255,255,1);
		border-radius:28upx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	
	.min_search_ico{
		height: 20upx;
		width: 20upx;
		border: 1upx solid red;
		margin-left: 26upx;
	}
	
	.min_search_lab{
		height:17upx;
		font-size:12upx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:17upx;
		color:rgba(204,204,204,0.70);
		margin-left: 20upx;
	}
	
	.min_left_ico{
		height: 48upx;
		width: 48upx;
		margin-left: 10upx;
		border: 1upx solid white;
	}
	
	.min_right_ico{
		height: 48upx;
		width: 48upx;
		margin-right: 20upx;
		border: 1upx solid white;
	}
	
	.index_body{
		background-color: #f8f8f8;
		min-height: 100vh;
		padding-top: 100upx;
	}
	
	.swiper_box{
		width:93%;
		height:284upx;
		border-radius:4upx;
		margin-top: 30upx;
	}
	
	.adv_img{
		height: 100%;
		width: 100%;
		border-radius: 8upx;
	}
	
	.like_shop{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.shop_div{
		width: 95%;
		height: 320upx;
		display: flex;
		flex-wrap: wrap;
		background-color: white;
	}
	
	.shop_min_div{
		height: 50%;
		width: 49.5%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	
	.shop_min_left{
		width: 50%;
		height: 100%;
	}
	
	.shop_min_left_name{
		height:44upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:22upx;
		color:rgba(51,51,51,1);
		padding: 20upx;
		padding-top: 30upx;
		padding-bottom: 5upx;
	}
	
	.shop_min_left_lab{
		height:14upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:14upx;
		color:rgba(245,97,42,1);
		padding-left: 20upx;
	}
	
	.shop_min_right{
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.shop_min_right image{
		width: 85upx;
		height: 85upx;
	}
	
	.shop_hr1{
		border-bottom: 1upx solid rgba(229,229,229,1);
	}
	
	.shop_hr2{
		border-right: 1upx solid rgba(229,229,229,1);
	}
	

	.like_live{
		display: flex;
		justify-content: center;
	}
	
	.live_div{
		width: 100%;
		height: 280upx;
		display: flex;
		justify-content: center;
		background-color: white;
	}
	
	.live_min_div{
		height: 100%;
		width: 49.8%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.live_min_left{
		width: 100%;
		height: 50%;
	}
	
	.live_min_left_name{
		display: flex;
		height:44upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:22upx;
		color:rgba(51,51,51,1);
		margin: 10upx;
		margin-top: 20upx;
		margin-left: 25upx;
	}
	
	.live_min_left_lab{
		height:14upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:14upx;
		color:#999999;
		margin-left: 25upx;
	}
	
	.live_min_right{
		width: 88upx;
		height: 88upx;
	}
	
	.live_min_right image{
		height: 100%;
		width: 100%;
	}
	
	.live_hr{
		border-right: 1upx solid rgba(229,229,229,1);
	}
</style>

<style lang="scss" scoped>
	$defultColor:#f5612a;
	.space20upx{height: 20upx;background: #f8f8f8;}
	swiper{height: 284upx;}
	.spaceA{
		width: 4upx;height: 30upx;background-color: $defultColor;border-radius: 4upx;transform: rotate(45deg);margin-right: 8upx;
	}
	.spaceB{
		width: 4upx;height: 30upx;background-color: $defultColor;border-radius: 4upx;transform: rotate(-45deg);margin-right: 8upx;
	}
	.flexFixCenter{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.flexAllCenter{
		display: flex;align-items: center;justify-content: center;
	}
	.bannerStyle{
		width: 750upx;
		height: 284upx;
	}
	.centerBtn{height: 198upx;font-size: 24upx;text-align: center;color: #333}
	.centerBtn view image{width: 76upx;height: 76upx;}
	.brandTrip{
		height: 300upx;
		.btTop{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10upx 20upx 10upx 30upx;
			.text1{font-size: 32upx;color: #333}
			.text2{font-size: 24upx;color: #999}
		}
		.wrap{overflow-x: scroll}
		.btDown{
			min-width: 200%;
			display: flex;
			flex-direction: row;
			padding-left: 20upx;
			view{
				padding: 10upx 14upx 28upx 0upx;
				image{
					height: 218upx;
					width: 512upx;
				}
			}
		}
	}
	.guessLike{
		.icon1{
			display: flex;
			align-items: center;
			.spaceA20{opacity: 0.2;}
			.spaceA40{opacity: 0.4;}
			.spaceA100{opacity: 01;}
		}
	
		.title{
			color: $defultColor;
			font-size: 32upx;
			text-align: center;
			.space1{width: 68upx;height: 2upx;background-color: $defultColor;margin: 20upx}
			.text{margin: 20upx}
		}
		.goods{
			
		}
		
	}
	.goods{
		background-color: #f8f8f8;
		padding: 20upx;
		padding-top: 0;
		display: flex;
		flex-direction: row;
		/* #ifdef H5 */
		padding-bottom: 120upx;
		/* #endif */
		/* #ifndef H5 */
		padding-bottom: 20upx;
		/* #endif */
		.goodsWrap{
			width: 350upx;height: 428upx;background-color: #fff;
			image{
				width: 350upx;height: 280upx;
			}
			.goodsDetail{
				padding: 10upx 20upx 6upx;
				.goodsName{
					font-size: 24upx;color: #333;text-align: left;text-overflow: ellipsis;overflow: hidden;
				}
				.goodsType{border: 1px solid $defultColor;border-radius: 4upx;height: 32upx;font-size: 20upx;color: $defultColor;margin-right: 10upx;}
				.goodsDown{
					height: 40upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.goodsPrice1{font-size: 28upx;color: #f30f0f}
					.goodsPrice2{font-size: 20upx;color: #999}
					.more{
						display: flex;align-items: center;
						.dot{
							width: 6upx;height: 6upx;border-radius: 50%;background-color: #999;margin-right: 4upx;
						}
					}
				}
			}
		}
		.goodsWrap:nth-child(odd){
			margin-right: 10upx;
		}
	}
</style>
