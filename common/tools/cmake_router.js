import is_router from '../router'
import is_vuex from '../vuex'
import cfg from '../config/cfg.js';

//检查用户登录状态
const check_login = async () => {
	let is_login = uni.getStorageSync('token') || false
	if(is_login) return true
	return await is_vuex.dispatch('check_login')
}

/**
 * 跳转封装 - 默认根据页面路径跳转
* @param {Object} url 路由地址
* @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
* @param {Object} acg 跳转动画
* @param {Object} fun 跳转后执行方法
* @param {Object} last 跳转后 默认跳转后执行 改为false 执行完方法在执行跳转
*/
const goto_fun = (url,type,acg,fun,last) => {
	if (!last){//先执行函数,后执行跳转
		typeof fun === "function" ? fun() : false
		goto_fun(url,type,acg,fun,true)
		return
	}
	const obj = {url: url,animationType: acg}
	if (type === 1) uni.navigateTo(obj)
	if (type === 2) uni.redirectTo(obj)
	if (type === 3) uni.reLaunch(obj)
	if (type === 4) uni.switchTab(obj)
	if (type === 5) uni.navigateBack({url: url,animationType: acg,delta: 1})
	if (last) typeof fun === "function" ? fun() : false
}

//根据配置的路由名字跳转
const goto_router = (name,query = '',type = 1,acg = 'pop-in',fun,last = true) => {
	let router = is_router[name],url = query != '' ? router + query : router;
	check_login().then((res)=> {
		console.log('check_login',res)
		if(!cfg.check_login){
			goto_fun(url,type,acg,fun,last)
			return
		}
		res ? goto_fun(url,type,acg,fun,last) : uni.reLaunch({url:is_router.login,animationType:'slide-in-bottom'})
	})
}

export {
	goto_router,
	goto_fun
}