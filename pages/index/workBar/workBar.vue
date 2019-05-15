<template>
	<view class='container'>
		<view class='workbanner'>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color='#fff'>
				<swiper-item v-for="(item,index) in textTime" :key='index'>
					<view class="swiper-item">
						<image class='bannerStyle' :src="banner" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class='centerBtn flexFixCenter'>
			<view>
				<image :src="btnImg" mode=""></image>
				<view>审核</view>
			</view>
			<view>
				<image :src="btnImg" mode=""></image>
				<view>授权</view>
			</view>
			<view>
				<image :src="btnImg" mode=""></image>
				<view>合约</view>
			</view>
			<view>
				<image :src="btnImg" mode=""></image>
				<view>产品</view>
			</view>
			<view>
				<image :src="btnImg" mode=""></image>
				<view>更多</view>
			</view>
		</view>
		<view class='space20upx'></view>
		<view class='brandTrip'>
			<view class='btTop'>
				<view class='text1'>正品之旅</view>
				<view class='text2'>200+品牌官方合作></view>
			</view>
			<view class='wrap'>
				<view class='btDown'>
					<view v-for="(item,index) in textTime1" :key='index'>
						<image :src="brandImg[index]"></image>
					</view>
				</view>
			</view>
			<view class='guessLike'>
				<view class='title flexAllCenter'>
					<view class='space1'></view>
					<view class='icon1'>
						<view class='spaceA spaceA20'></view>
						<view class='spaceA spaceA40'></view>
						<view class='spaceA spaceA100'></view>
					</view>
					<view class='text'>猜你喜欢</view>
					<view class='icon1'>
						<view class='spaceB spaceA100'></view>
						<view class='spaceB spaceA40'></view>
						<view class='spaceB spaceA20'></view>
					</view>
					<view class='space1'></view>
				</view>
				<view class='goods'>
					<view class='goodsWrap' v-for='(item,index) in textTime1' :key="index">
						<image :src="goodsImg[index]" mode=""></image>
						<view class='goodsDetail'>
							<view class='goodsName'>{{goodsName[index]}}</view>
							<text v-for='(item,index) in goodsType' class="goodsType" :key='index'>
								{{goodsType[index]}}
							</text>
							<view class='goodsDown'>
								<view class='goodsPrice'>
									<text class='goodsPrice1'>￥{{goodsPrice[index]}}</text>
									<text class='goodsPrice2'>￥{{goodsYPrice[index]}}</text>
								</view>
								<view class='more'>
									<view class='dot'></view>
									<view class='dot'></view>
									<view class='dot'></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				banner:'../../../static/img/workBar/banner.png',
				btnImg:'../../../static/img/workBar/workBarBtn.png',
				brandImg:['../../../static/img/workBar/brandImg0.png','../../../static/img/workBar/brandImg1.png'],
				goodsImg:['../../../static/img/workBar/goodsImg1.png','../../../static/img/workBar/goodsImg2.png'],
				goodsName:['短裤男夏天五分裤薄款休','短裤男夏天五分裤薄款休'],
				goodsPrice:[98,98],
				goodsYPrice:[98,98],
				goodsType:['退货包运费','极速退款'],
				textTime:[1,2,3,4,5],
				textTime1:[1,2],
			}
		}
	}
</script>

<style lang="scss">
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
		background-color: #f8f8f8;
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
