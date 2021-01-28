import is_router from '@/common/router/index.js'
import { dispatch } from '@/common/store/index.js'
import cfg from '@/common/config/cfg.js';

// 解构出来提升js执行速度
const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

//检查用户登录状态
const checkLoginStore = async () => await dispatch('user_vuex/check_login')

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
	if (type === 1) navigateTo(obj)
	if (type === 2) redirectTo(obj)
	if (type === 3) reLaunch(obj)
	if (type === 4) switchTab(obj)
	if (type === 5) navigateBack({ ...obj, delta: 1 })
	if (last) typeof fun === "function" ? fun() : false
}

//根据配置的路由名字跳转
const goto_router = (name,query = '',type = 1,acg = 'pop-in',fun,last = true) => {
	let router = is_router[name], url = query != '' ? router + query : router;
	if(!cfg.checkLogin){
		goto_fun(url,type,acg,fun,last)
		return
	}
	checkLoginStore().then((res)=> {
		res ? goto_fun(url,type,acg,fun,last) : reLaunch({url:is_router.login,animationType:'slide-in-bottom'})
	})
}

export {
	goto_router,
	goto_fun
}