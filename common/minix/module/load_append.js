import load_append_class from '../../class/load_append_class.js';

const page_append = (list,res,append) => {
	if(append){
		list = list.concat(res.list)
	}else{
		list = []
		if(res.hasOwnProperty('list')) list = res.list
	}
	return list
}

export default{
	data() {
		return {
			load_append_obj: new load_append_class(),
		}
	},
	methods: {
		get_load_append_class(){
			return new load_append_class()
		},
		//初始化加载
		load_append_fun(page = 1,is_cache = 0,is_append = false,is_class){
			let this_class = is_class || this.load_append_obj
			let page_list = this_class.page_list,
			size = this_class.page_size,
			api = this_class.api_action,
			param = this_class.api_param,
			body = this_class.api_body,
			fun = this_class.api_fun,
			type = this_class.me_type,
			cache = is_cache || 0
			pginfo = [page,size]
			this.is_action(api,param,body,pginfo,cache,type).then((res)=>{
				this.total_page = res.total
				this.next_page = res.nextPage
				this.load_text = '已加载完毕'
				this.page_list = page_append(page_list,res,is_append)
				typeof fun === "function" ? fun(res) : console.log('init_append default method...')
			})
		},
	},
}