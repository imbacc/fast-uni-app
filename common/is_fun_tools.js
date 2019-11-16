import Vue from 'vue'
import vuex from './vuex'
import is_router from './router'

import moment from 'moment'

var startTime = 0,timer = null,_this = this

const goto_fun = (url,type,acg,fun) => {
	const obj = {url: url,animationType: acg}
	if (type === 1) uni.navigateTo(obj)
	if (type === 2) uni.redirectTo(obj)
	if (type === 3) uni.reLaunch(obj)
	if (type === 4) uni.switchTab(obj)
	if (type === 5) uni.navigateBack(url)
	typeof fun === "function" ? fun() : false
}

//检查用户登录状态
const check_login = async () => {
	let is_login = uni.getStorageSync('token') || false
	if(is_login) return true
	return await vuex.dispatch('check_login')
}

const fun = {
	//跳转封装函数 可根据路径直接跳转 /pages/index/index
	goto_page:(url,type = 1,acg = 'pop-in',fun) => {
		goto_fun(url,type,acg,fun)
	},
	
	//路由名字跳转
	goto_router:(name,query = '',type = 1,acg = 'pop-in',fun) => {
		let router = is_router[name],url = query != '' ? router + query : router
		check_login().then((res)=>{
			res ? goto_fun(url,type,acg,fun) : uni.reLaunch({url:is_router.login,animationType:'slide-in-bottom'})
		})
	},
	
	//跳转到登录页面
	gologin:()=> login_page(),
	
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
	
	//分组 集合 对比对象名字字段
	group_bylist:(list,name) => {
		const groupBy = (array, f) => {
			const groups = {}
			array.forEach((o) => {
				const group = JSON.stringify(f(o))
				groups[group] = groups[group] || []
				groups[group].push(o)
			})
			return Object.keys(groups).map((group) => groups[group])
		}
		
		return groupBy(list, (item) => [item[name]])
	},
	
	//深度拷贝对象
	deep_clone:(data) => {
		  const type = judgeType(data)
		  let obj
		  if (type === 'array') {
			obj = []
		  } else if (type === 'object') {
			obj = {}
		  } else {
			// 不再具有下一层次
			return data
		  }
		  if (type === 'array') {
			// eslint-disable-next-line
			for (let i = 0, len = data.length; i < len; i++) {
				obj.push(fun.deepClone(data[i]))
			}
		  } else if (type === 'object') {
			// 对原型上的方法也拷贝了....
			// eslint-disable-next-line
			for (const key in data) {
			  obj[key] = fun.deepClone(data[key])
			}
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
	
	//上传文件
	is_upload_file:(file,fun1,fun2) => {
			fun.to_showload()
			let token = uni.getStorageSync("token")
			if(token instanceof String) token = JSON.parse(token)
		
			let task = plus.uploader.createUpload('http://39.100.85.163:9791/uoload_api/f/upload', {method:"POST"}, ( t, status ) => {
					// 上传完成
					status == 200 ? fun1(t,status) : fun2(t,status)
					fun.to_hideload()
				}
			)
			task.addFile(file, {key:"file"})
			task.setRequestHeader('Authorization','Bearer '+token)
			task.start()
	},
	
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
	
	//格式化 - 日期格式化
	time_format:(datetime,fmt_datetime = 'YYYY-MM-DD HH:mm:ss') => {
		return moment(datetime,fmt_datetime).fromNow()
	},
	
	//格式化 - 相对时间
	get_date_time:(fmt_datetime = 'YYYY-MM-DD HH:mm:ss')=> {
		return moment().format(fmt_datetime)
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
			startTime = startTime === 0 ? curTime : startTime
			
			// console.log('curTime='+curTime)
			// console.log('startTime='+startTime)
			
			const run = () => {
				startTime = curTime
				console.log('节流处理...')
				fun(_this,args)
			}
			
			(curTime - startTime) > wait ? run() : ((curTime - startTime) === 0 ? run() : false)
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
	
	
	//分享
	share:(title = 'xx的分享',id) => {
		// #ifdef MP-WEIXIN
			fun.to_msg('请点击右上方的分享按钮邀请好友')
			return false
		// #endif
		let provider = 'weixin', scene = 'WXSenceTimeline',list = ['WXSenceTimeline','WXSceneSession','WXSceneFavorite'];
		let itemList = ['微信朋友圈', '微信聊天', '微信收藏'];
		uni.showActionSheet({
			itemList,
			success: (res) => {
				scene = list[res.tapIndex]
				uni.share({
					provider,
					scene,
					type: 0,
					href: 'http://xxxxxxxxxxx/?id=' + id,
					title: title,
					summary: '加入我xxxxxxxxxx！',
					imageUrl: '',
					success: (res) => {
						console.log('success:' + JSON.stringify(res))
					},
					fail: (err) => {
						console.log('fail:' + JSON.stringify(err))
					}
				})
			}
		})
	},
	
}

export default fun

Vue.prototype.is_fun_tools = fun