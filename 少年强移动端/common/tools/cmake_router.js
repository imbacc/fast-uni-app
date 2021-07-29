import store from '@/common/store/index.js'
import { checkLogin } from '@/common/config/cfg.js';

// 解构出来提升js执行速度
const { navigateTo, redirectTo, reLaunch, switchTab, navigateBack } = uni

//检查用户登录状态
const checkLoginStore = () => store.getters.user_vuex.hasLogin

/**
 * 跳转封装 - 默认根据页面路径跳转
* @param {Object} url 路由地址
* @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
* @param {Object} acg 跳转动画
* @param {Object} fun 跳转后执行方法
* @param {Object} last 跳转后 默认跳转后执行 改为false 执行完方法在执行跳转
*/
const goto_fun = (url, type, animationType, fun) => {
	const obj = { url, animationType}
	if (type === 1) navigateTo(obj)
	if (type === 2) redirectTo(obj)
	if (type === 3) reLaunch(obj)
	if (type === 4) switchTab(obj)
	if (type === 5) navigateBack({ delta: 1 })
	fun && fun()
}

//根据配置的路由名字跳转
const goto_router = async (router, query = '', type = 1, acg = 'pop-in', fun) => {
	let url = query != '' ? router + query : router;
	console.log('router=', url);
	if(!checkLogin){
		goto_fun(url, type, acg, fun)
		return
	} else if (checkLoginStore()) {
		goto_fun(url, type, acg, fun)
		return
	} else {
		reLaunch({url:'/pages/my/my', animationType:'slide-in-bottom'})
		return
	}
}

export {
	goto_router,
	goto_fun
}