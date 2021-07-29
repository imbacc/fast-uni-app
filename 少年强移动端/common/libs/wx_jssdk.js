import api from '@/common/config/api.js'
import wx from 'jweixin-module'

export default {
	//判断是否在微信中    
	isWechat() {
		let ua = window.navigator.userAgent.toLowerCase()
		return ua.match(/micromessenger/i) == 'micromessenger'
	},
	initJssdk() {
		return new Promise((resovle) => {
			const uri = encodeURIComponent(window.location.href) //获取当前url然后传递给后台获取授权和签名信息  
			api('user_api/wxsdk', {}, { uri }).then((res) => {
				if (res) {
					const share_url = res.url
					delete res.url
					delete res.rawString
					
					wx.config({
						...res,
						jsApiList: [ //这里是需要用到的接口名称  
							// 'checkJsApi', //判断当前客户端版本是否支持指定JS接口  
							'onMenuShareAppMessage', //分享接口  
							"onMenuShareTimeline",
							'getLocation', //获取位置  
							'openLocation', //打开位置  
							// 'onMenuShareTimeline',
							// 'menu:share:appmessage',
							// 'menu:share:timeline',
							// 'geoLocation'
							// 'scanQRCode', //扫一扫接口  
							// 'chooseWXPay', //微信支付  
							// 'chooseImage', //拍照或从手机相册中选图接口  
							// 'previewImage', //预览图片接口  
							// 'uploadImage' //上传图片  
						]
					})
					
					// wx.error(function(res){
					//     console.error('wx error=', res);
					// });
					resovle()
				} else {
					uni.showToast({ title: '微信SDK初始化失败!' })
				}
			})
		})
	},
	//在需要自定义分享的页面中调用  
	share(title, desc, imgUrl, link, type = 1, fun) {
		if (!this.isWechat()) return
		this.initJssdk().then(() => {
			wx.ready(() => {
				fun && fun()
				const shareData = {
					title,
					desc,
					link,
					imgUrl,
					success: function () {
						//用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的  
						// request.post('/api/member/share');
					},
					cancel: function () {
						console.log('取消分享')
					},
					fail: function (err) {
						console.log('分享 err=', err);
					}
				};
				console.log('shareData=', shareData);
				//分享给朋友接口  
				if (type === 1) wx.onMenuShareAppMessage(shareData)
				//分享到朋友圈接口  
				if (type === 2) wx.onMenuShareTimeline(shareData)
			})
		})
	},
	//在需要定位页面调用  
	getlocation(callback) {
		if (!this.isWechat()) {
			console.log('不是微信客户端')
			return;
		}
		wx.getLocation({
			type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
			success: function(res) {
				// console.log(res);  
				callback(res)
			},
			fail: function(res) {
				console.log(res)
			},
			// complete:function(res){  
			//     console.log(res)  
			// }  
		});
	},
	openlocation(data, callback) { //打开位置  
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		wx.openLocation({ //根据传入的坐标打开地图  
			latitude: data.latitude,
			longitude: data.longitude
		});
	},
	chooseImage(callback) { //选择图片  
		if (!this.isWechat()) {
			console.log('不是微信客户端')
			return;
		}
		//console.log(data);  
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album'],
			success: function(rs) {
				callback(rs)
			}
		})
	},
	//微信支付  
	wxpay(data, callback) {
		if (!this.isWechat()) {
			console.log('不是微信客户端')
			return;
		}
		wx.chooseWXPay({
			timestamp: data
				.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
			nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
			package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
			signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
			paySign: data.paysign, // 支付签名  
			success: function(res) {
				// console.log(res);  
				callback(res)
			},
			fail: function(res) {
				callback(res)
			},
			// complete:function(res){  
			//     console.log(res)  
			// }  
		});
	}
}
