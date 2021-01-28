class appendData {
	constructor(vm) {
	    this.api_action = ''
	    this.api_param = {}
	    this.api_body = {}
	    this.page_list = []
	    this.total_page = 0
	    this.next_page = 0
	    this.page_size = 10
	    this.me_type = 'post'
		this._is_action = vm.is_action
	}
	
	_append(list,res,append){
		if(append){
			list = list.concat(res.list)
		}else{
			list = []
			if(res.hasOwnProperty('list')) list = res.list
		}
		return list
	}
	
	fun(page = 1,is_cache = 0,is_append = false){
		const { api_action, api_param, api_body, page_list, total_page, next_page, page_size, me_type, _is_action, _append } = this
		return new Promise((resolve) => {
			_is_action(api_action, api_param, api_body, [page, page_size], is_cache, me_type).then((res)=>{
				if(res){
					this.total_page = res.total
					this.next_page = res.nextPage
					this.page_list = _append(page_list,res,is_append)
				}
				resolve(res)
			})
		})
	}
}

export default appendData