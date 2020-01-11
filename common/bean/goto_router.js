import is_router from '../router'
import is_vuex from '../vuex'
class gotoRouter {
	/**
	 * @param {Object} url 路由地址
	 * @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
	 * @param {Object} acg 跳转动画
	 * @param {Object} fun 跳转后执行方法
	 * @param {Object} last 跳转后 默认跳转后执行 改为false 执行完方法在执行跳转
	 */
	constructor(url,type,acg,fun,last) {
	    this.url = url
	    this.type = type || 1
	    this.acg = acg || 'pop-in'
	    this.fun = fun
		this.last = last || true
	}
	
	//跳转封装 - 默认根据页面路径跳转
	goto_fun(){
		if(!this.last){
			this.last = true
			typeof this.fun === "function" ? this.fun() : false
			this.goto_fun()
			return
		}
		const obj = {url: this.url,animationType: this.acg}
		if (this.type === 1) uni.navigateTo(obj)
		if (this.type === 2) uni.redirectTo(obj)
		if (this.type === 3) uni.reLaunch(obj)
		if (this.type === 4) uni.switchTab(obj)
		if (this.type === 5) uni.navigateBack(this.url)
		if(this.last) typeof this.fun === "function" ? this.fun() : false
	}
	
	//检查用户登录状态
	async check_login(){
		let is_login = uni.getStorageSync('token') || false
		if(is_login) return true
		return await is_vuex.dispatch('check_login')
	}
	
	//根据配置的路由名字跳转
	goto_router(name,query = '',type = 1,acg = 'pop-in',fun){
		let router = is_router[name],url = query != '' ? router + query : router;
		console.log(router)
		// this.check_login().then((res)=> {
			// console.log('check_login',res)
		this.url = url
		this.type = type
		this.acg = acg
		this.fun = fun
		this.goto_fun()
			// res ? this.goto_fun() : uni.reLaunch({url:is_router.login,animationType:'slide-in-bottom'})
		// })
	}
	
	goto_back(delta = 1){
		uni.navigateBack({url: this.url,animationType: this.acg,delta: delta})
	}
}

export default gotoRouter