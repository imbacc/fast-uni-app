class sendCode {
	constructor(vm) {
	    this.refush_time = 0
	    this.is_refushing = false
	    this.but_lab = '获取验证码'
		this._is_tools = vm.is_tools
		this._is_action = vm.is_action
	}
	
	refush_code(){
		let time = setInterval(()=>{
			let code_time = this.refush_time
			if(code_time <= 0){
				clearInterval(time)
				this.is_refushing = false
				this.but_lab = '重新获取'
			}else{
				this.refush_time = code_time -= 1
				this.but_lab = `已发送(${code_time}s)`
			}
		},1000)
	}
	
	get_code(tel){
		const { refush_code, _is_tools, _is_action } = this
		if(this.is_refushing) return
		if(!_is_tools.test_tel(tel)){
			_is_tools.to_msg('不是有效的手机号码!','warning')
			return
		}
		let _this = this
		this.but_lab = '正在发送...',
		this.is_refushing = true
	    _is_action('send_sms',{phone:tel},{},false,0,'get').then((res)=>{
			_is_tools.to_msg(res ? '发送成功!' : '发送失败!')
			if(res){
				_this.refush_time = 120
				_this.is_refushing = true
				refush_code()
			}else{
				_this.is_refushing = false
				_this.but_lab = '重新发送'
			}
		})
	}
}

export default sendCode