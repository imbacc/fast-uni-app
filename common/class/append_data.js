import api from '@/common/config/api.js'

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
	}

	_append(list, res, append) {
		if (append) {
			list = list.concat(res.list)
		} else {
			list = []
			if (res[`${this.key}`]) list = res[`${this.key}`]
		}
		return list
	}

	fun(page = 1, is_append = false) {
		const { name, param, body, list, total, next, size, method, key, _append } = this
		return new Promise((resolve) => {
			param['_page'] = [page, size]
			api(name, param, body, method).then((res) => {
				if (res) {
					this.page = page
					this.total = res.total
					this.next = res.last_page !== page ? page+1 : res.last_page
					this.list = this._append(list, res, is_append)
				}
				resolve(res)
			})
		})
	}
}

export default appendData
