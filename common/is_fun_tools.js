import Vue from 'vue'
import vuex from './vuex'
import is_router from './router'

var startTime = 0,timer = null,_this = this

const goto_fun = (url,type,acg,fun) => {
	vuex.dispatch('goto_page',{url:url,type:type,acg:acg})
	typeof fun === "function" ? fun() : false
}

const fun = {
	//跳转封装函数
	goto_page:(url,type = 1,acg = 'pop-in',fun) => {
		goto_fun(url,type,acg,fun)
	},
	
	//路由名字跳转
	goto_router:(name,query = '',type = 1,acg = 'pop-in',fun) => {
		let router = is_router[name],url = query != '' ? router + query : router
		goto_fun(url,type,acg,fun)
	},
	
	//分页封装 - 下一页
	page_next:(list = [],obj = {},fun1,fun2) => {
		list.length < obj.total ? fun1() : (list.length === obj.total ? fun2() : console.log('last_next'))
	},
	
	//分页封装 - 加载和初始化
	page_append:(list,res,append) => {
		if(append){
			list = list.concat(res.list)
		}else{
			list = []
			if(res.hasOwnProperty('list')) list = res.list
		}
		return list
	},
	
	//切割字符串
	str_splic:(name,start,end) => {
		return name.length > end ? name.substring(start,end) + '...' : name
	},
	
	//创建一个对象
	create_obj:(map) => {
		let obj = Object.create(null)
		for (let [key, value] of map) {
			obj[key] = value
		}
		return obj
	},
	
	//H5下载APP
	goto_down_app:()=> {
		fun.to_msg('请前往下载APP')
		let url = vuex.state.app_sysinfo.platform !== 'ios' ? url = 'http://img.gongdu.info/app/gongdu_v1.0.0.apk' : url = ''
		// #ifdef H5
			window.location = url
		// #endif
	},
	
	////显示相应消息
	to_hideload:() => uni.hideLoading(),
	
	//显示加载load
	to_showload:(msg = 'loading...') => uni.showLoading({title: msg}),
	
	//显示showToast
	to_msg:(msg = '服务器打瞌睡了...',mask = false) => uni.showToast({ title: msg,icon: 'none',mask: mask}),
	
	//提示框消息
	to_showModal:(msg = '确定跳过此步骤吗?',title = '系统提示',fun) => uni.showModal({ title: title,content: msg, success: (res) => res.confirm ? fun() : console.log('用户点击取消') }),
	
	//检查用户登录状态
	check_login:(msg) => vuex.dispatch('check_login').then((res)=>{ return res }),
	
	//获取元素大小
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
	
	//格式化时间
	time_format:(dateTimeStamp) => {
			dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi,"/"))
			let minute = 1000 * 60
			let hour = minute * 60
			let day = hour * 24
			let halfamonth = day * 15
			let month = day * 30
			let now = new Date().getTime()
			let diffValue = now - dateTimeStamp
			if(diffValue < 0) return
			let monthC = diffValue/month
			let weekC = diffValue/(7*day)
			let dayC = diffValue/day
			let hourC = diffValue/hour
			let minC = diffValue/minute
			let result = ""
			if(monthC>=1){
				result = parseInt(monthC) + "月前"
			}else if(weekC>=1){
				result = parseInt(weekC) + "周前"
			}else if(dayC>=1){
				result = parseInt(dayC) + "天前"
			}else if(hourC>=1){
				result = parseInt(hourC) + "小时前"
			}else if(minC>=1){
				result = parseInt(minC) + "分钟前"
			}else{
				result = "刚刚"
			}
			return result
	},
	
	//获取元素数据
	getElment:(id) => { 
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
	look_img:(cur = 0,imgs = [],img_cur_style = 'default',loop = true,button) => {
		let json = {
			current:cur,
			urls:imgs,
			indicator:img_cur_style,
			loop:loop
		}
		
		if(button instanceof Object){
			let action = button.list ? action = button.action : action = ['发送给朋友', '保存图片', '收藏']
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
	dou_fun:(fun,type = 1,wait = 500,msg = '你操作太快了呀!') => {
		let _this = this,args = arguments
		if(type == 1){
			let curTime = (new Date()).getTime()
			startTime = startTime == 0 ? curTime : startTime
			// console.log('curTime='+curTime)
			// console.log('startTime='+startTime)
			
			if((curTime - startTime) > wait){ // 固定上一次操作离这一次操作间隔>1000ms，则发送一次。
				startTime = curTime
				console.log('节流处理...')
				fun(_this,args)
			}
		}else{
			if(timer){
				 clearTimeout(timer)
				 timer = null
				 console.log('重置防抖...')
				 if(msg) uni.showToast({ title: msg,icon: 'none',mask: true})
				 return
			}
			timer = setTimeout(() => {
				clearTimeout(timer)
				timer = null
				console.log('防抖处理...')
				fun(_this,args)
			}, wait)
		}
	},
}

export default fun

Vue.prototype.is_fun_tools = fun