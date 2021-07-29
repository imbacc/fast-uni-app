import api from '@/common/config/api.js'

class sendCode {
	constructor() {
	    this.refush_time = 120
	    this.is_refushing = false
	    this.but_lab = '获取验证码'
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
	
	get_code(phone, _this){
		const { _is_tools } = _this
		if(this.is_refushing) return
		if(!_is_tools.test_tel(phone)){
			_is_tools.to_msg('不是有效的手机号码!','warning')
			return
		}
		this.but_lab = '正在发送...'
		this.is_refushing = true
	    api('send_sms', { phone }).then((res)=>{
			_is_tools.to_msg(res ? '发送成功!' : '发送失败!')
			if(res){
				this.refush_time = 120
				this.is_refushing = true
				this.refush_code()
			}else{
				this.is_refushing = false
				this.but_lab = '重新发送'
			}
		})
	}
}

export default sendCode