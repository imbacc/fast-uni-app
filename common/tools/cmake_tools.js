export default {
	//显示showToast
	to_msg(msg = '服务器打瞌睡了...', mask = false) {
		uni.showToast({
			title: msg,
			icon: 'none',
			mask: mask
		})
	},

	//提示框消息
	to_showModal(msg = '确定跳过此步骤吗?', title = '系统提示', fun) {
		uni.showModal({
			title: title,
			content: msg,
			success: (res) => res.confirm ? fun() : console.log('用户点击取消')
		})
	},

	//预览图片
	look_img(current = 0, urls = [], indicator = 'default', loop = true, button = false) {
		const json = {
			current,
			urls,
			indicator,
			loop
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

	loca_get(key) {
		let val = uni.getStorageSync(key)
		try {
			if (~val.toString().indexOf('{') || ~val.toString().indexOf('[')) val = JSON.parse(val)
		} catch (error) {
			console.log('error', error)
		}
		return val
	},
	
	uni_emit(key, val) {
		uni.$emit(key, val)
	},

	uni_on(key, fun) {
		uni.$off(key, fun)
		uni.$on(key, fun)
	},

	uni_off(key, fun) {
		uni.$off(key, fun)
	},

	uni_once(key, fun) {
		uni.$once('key', fun)
	}
}
