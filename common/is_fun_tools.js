import Vue from 'vue'
import vuex from './vuex'

const fun = {
	//跳转封装函数
	goto_page: (url,type = 1,acg = 'pop-in',fun) => {
		vuex.dispatch('goto_page',{url:url,type:type,acg:acg})
		typeof fun === "function" ? fun() : false
	},

	////显示相应消息
	to_hideload: () =>  uni.hideLoading(),

	//显示加载load
	to_showload: (msg = 'loading...') => uni.showLoading({title: msg}),

	//显示showToast
	to_msg: (msg = '服务器打瞌睡了...') => uni.showToast({ title: msg, icon:'none'}),
	
	//提示框消息
	to_showModal: (msg = '确定跳过此步骤吗?',title = '系统提示',fun) => uni.showModal({title:title, content:msg, success:fun}),

	//检查用户登录状态
	check_login: (msg) => vuex.dispatch('check_login').then((res)=>{ return res }),
	
	//
	is_upload_file: (file) => vuex.dispatch('is_upload_file').then((res)=>{ return res }),
	
	
	getElment: (id) => { 
		return new Promise((res, rej) => {
			let el = uni.createSelectorQuery().select('#' + id);
			el.fields({
				size: true,
				scrollOffset: true,
				rect: true
			}, (data) => {
				res(data)
			}).exec()
		})
	},
	
	look_img: (cur = 0,imgs = [],img_cur_style = 'default',loop = true,button) => {
		let json = {
			current:cur,
			urls:imgs,
			indicator:img_cur_style,
			loop:loop
		}
		
		if(button instanceof Object){
			let action = button.list ? action = ['发送给朋友', '保存图片', '收藏'] : []
			let is_success = button.fun1
			let is_fail = button.fun2
			json.longPressActions = {
            itemList: action,
                success: function (res) {
					is_success()
                    console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                },
                fail: function (res) {
					is_fail()
                    console.log(res.errMsg);
                }    
            }
		}
		
		uni.previewImage(json)
	},
}

export default fun

Vue.prototype.is_fun_tools = fun