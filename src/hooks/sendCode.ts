import api from '@/common/config/api.js'
import fun from '@/common/tools/cmake_tools.js'

class sendCode {
	constructor() {
		this.refush_time = 0
		this.is_refushing = false
		this.but_lab = '获取验证码'
		this.name = ''
	}

	refush_code() {
		let time = setInterval(() => {
			let code_time = this.refush_time
			if (code_time <= 0) {
				clearInterval(time)
				this.is_refushing = false
				this.but_lab = '重新获取'
			} else {
				this.refush_time = code_time -= 1
				this.but_lab = `已发送(${code_time}s)`
			}
		}, 1000)
	}

	test_tel(phone) {
		// 正则
		return phone
	}

	get_code(phone) {
		if (this.is_refushing) return
		if (!this.test_tel(phone)) {
			fun.to_msg('不是有效的手机号码!', 'warning')
			return
		}
		const _this = this
		this.but_lab = '正在发送...'
		this.is_refushing = true
		api(this.name, {}, { phone }).then((res) => {
			fun.to_msg(res ? '发送成功!' : '发送失败!')
			if (res) {
				_this.refush_time = 120
				_this.is_refushing = true
				_this.refush_code()
			} else {
				_this.is_refushing = false
				_this.but_lab = '重新发送'
			}
		})
	}
}

export default sendCode
