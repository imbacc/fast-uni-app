class append_data_class{
	constructor(vm) {
	    this.api_action = ''
	    this.api_param = {}
	    this.api_body = {}
	    this.api_fun = null
	    this.page_list = []
	    this.total_page = 0
	    this.next_page = 0
	    this.page_size = 10
	    this.load_text =  '加载中...'
	    this.me_type = 'post'
		this.is_action = vm.is_action
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
		this.load_text =  '加载中...'
		this.is_action(this.api_action, this.api_param, this.api_body, [page,this.page_size], is_cache, this.me_type).then((res)=>{
			if(res){
				this.total_page = res.total
				this.next_page = res.nextPage
				this.load_text = '已加载完毕'
				this.page_list = this._append(this.page_list,res,is_append)
			}
			typeof this.api_fun === "function" ? this.api_fun(res) : console.log('init_append default method...')
		})
	}
}

export default append_data_class