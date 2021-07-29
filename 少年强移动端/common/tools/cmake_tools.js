var task_loading = {}

const fun = {
	
	//显示showToast
	to_msg: async (msg = '服务器打瞌睡了...',mask = false) => uni.showToast({ title: msg,icon: 'none',mask: mask}),
	
	//提示框消息
	to_showModal:(msg = '确定跳过此步骤吗?',title = '系统提示',fun) => {
		uni.showModal({ title: title,content: msg, success: (res) => res.confirm ? fun() : console.log('用户点击取消') })
	},
	
	//预览图片
	look_img:(cur = 0,imgs = [],img_cur_style = 'default',loop = true,button = false) => {
		let json = {
			current:cur,
			urls:imgs,
			indicator:img_cur_style,
			loop:loop
		}
		
		if(button && button instanceof Object){
			let action = button.list ? button.action : ['发送给朋友', '保存图片', '收藏']
			let is_success = button.fun1
			let is_fail = button.fun2
			json.longPressActions = {
	        itemList: action,
	            success: (res) => {
					is_success && is_success()
	                console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
	            },
	            fail: (res) => {
					is_fail && is_fail()
	                console.log(res.errMsg)
	            }    
	        }
		}
		
		uni.previewImage(json)
	},
	
	format_url: (url) => {
		let format = url.indexOf('//') !== -1 ? url.replace('//', '') : url
		return Array.isArray(format) ? format[0] : format
	},
	
	format_date: (date) => {
		if (!date) return ''
		return new Date(`${date}`.length === 10 ? parseInt(`${date}000`) : date)
			.toLocaleString('zh', { hour12: false, month: '2-digit', day: '2-digit', year: 'numeric' })
			.replace(/\//g, '-')
	},
	
	date_match: (date) => {
		if (!date) return false
		return new Date(date).getTime() - new Date().getTime() > 0
	}
	
}

export default fun