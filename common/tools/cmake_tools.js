const fun = {

	//显示showToast
	to_msg: (msg = '服务器打瞌睡了...', mask = false) => uni.showToast({
		title: msg,
		icon: 'none',
		mask: mask
	}),

	//提示框消息
	to_showModal: (msg = '确定跳过此步骤吗?', title = '系统提示', fun) => uni.showModal({
		title: title,
		content: msg,
		success: (res) => res.confirm ? fun() : console.log('用户点击取消')
	}),

	//获取元素数据
	getElment: (id) => {
		return new Promise((res, rej) => {
			let el = uni.createSelectorQuery().select(id);
			el.fields({
				size: true,
				scrollOffset: true,
				rect: true
			}, (data) => {
				res(data)
			}).exec()
		})
	},

	//预览图片
	look_img: (cur = 0, imgs = [], img_cur_style = 'default', loop = true, button = false) => {
		let json = {
			current: cur,
			urls: imgs,
			indicator: img_cur_style,
			loop: loop
		}

		if (button && button instanceof Object) {
			let action = button.list ? button.action : ['发送给朋友', '保存图片', '收藏']
			let is_success = button.fun1
			let is_fail = button.fun2
			json.longPressActions = {
				itemList: action,
				success: (res) => {
					is_success()
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				},
				fail: (res) => {
					is_fail()
					console.log(res.errMsg)
				}
			}
		}

		uni.previewImage(json)
	},

	/**
	 * 1为节流处理,2为防抖处理<br/>
	 * @fun 第一个字段传方法
	 * @type 传类型
	 * @wait 传时间 毫秒为单位 1000ms = 1s
	 * @msg 友情提示
	 */
	dou_fun: (fun, type = 1, wait = 500, msg = '你操作太快了呀!') => {
		let startTime = 0, timer = null
		
		return () => {
			let _this = this, args = arguments
			if (type == 1) {
				let curTime = (new Date()).getTime()
				startTime = startTime == 0 ? curTime : startTime
				// console.log('curTime='+curTime)
				// console.log('startTime='+startTime)
			
				if ((curTime - startTime) > wait) { // 固定上一次操作离这一次操作间隔>1000ms，则发送一次。
					startTime = curTime
					console.log('节流处理...')
					fun(_this, args)
				}
			} else {
				if (timer) {
					clearTimeout(timer)
					timer = null
					console.log('重置防抖...')
					if (msg) uni.showToast({
						title: msg,
						icon: 'none'
					})
					return
				}
				timer = setTimeout(() => {
					clearTimeout(timer)
					timer = null
					console.log('防抖处理...')
					fun(_this, args)
				}, wait)
			}
		}
	},
}

export default fun
