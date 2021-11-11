import api from '@/common/config/api.js'
import fun from '@/common/tools/cmake_tools.js'

class appendData {
	constructor() {
		this.name = ''
		this.param = {}
		this.body = {}
		this.list = []
		this.page = 0
		this.total = 0
		this.next = 0
		this.size = 10
		this.method = 'post'
		this.key = 'data'
		this.last_key = 'last_page'
	}

	_append(list, res, append) {
		const more = res[`${this.key}`]
		if (append) return list.concat(more)
		return more
	}
	
	next_fun(msg = '没有更多内容了...') {
		return new Promise((resovle) => {
			const { page, next, total } = this
			if(page !== next && next <= total){
				this.fun(next, true).then((res) => resovle(res))
			} else {
				if (msg && msg !== '') fun.to_msg(msg)
				resovle()
			}
		})
	}

	fun(page = 1, is_append = false) {
		const { name, param, body, list, total, next, size, method, key, last_key, _append } = this
		return new Promise((resolve) => {
			param['_page'] = [page, size]
			api(name, param, body, method).then((res) => {
				if (res) {
					this.page = page
					this.total = res[last_key]
					this.next = this.total > page ? page + 1 : this.total
					this.list = this._append(list, res, is_append)
				}
				resolve(res)
			})
		})
	}
}

export default appendData
