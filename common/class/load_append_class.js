class load_append_class {
	constructor() {
	    this.api_action = ''
	    this.api_param = {}
	    this.api_body = {}
	    this.api_fun =  null
	    this.page_list = []
	    this.total_page = 0
	    this.next_page = 0
	    this.page_size = 10
	    this.next_cache = 0
	    this.load_text =  '加载中...'
	    this.me_type = 'post'
	}
	
	set(args){
		if(args instanceof Object) Object.keys(args).forEach((key)=> this[key] = args[key])
	}
}

export default load_append_class