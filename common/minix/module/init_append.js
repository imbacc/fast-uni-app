export default{
	data() {
		return {
			api_action:'',
			api_param:{},
			api_body:{},
			api_fun: null,
			page_list:[],
			total_page:0,
			next_page:0,
			page_size:10,
			loadMoreText: '加载中...',
			me_type:'post',
		}
	},
	methods: {
		//初始化加载
		is_init(page = 1,cache = 0,is_append = false){
			let page_list = this.page_list,
			size = this.page_size,
			api = this.api_action,
			param = this.api_param,
			body = this.api_body,
			fun = this.api_fun,
			type = this.me_type,
			pginfo = type === 'post' ? [page,size] : false
			
			this.is_vuex.dispatch('api_action',[api,param,body,pginfo,cache,type]).then((res)=>{
				this.total_page = res.total
				this.next_page = res.nextPage
				this.loadMoreText = '已加载完毕'
				this.page_list = type === 'post' ? this.is_fun_tools.page_append(page_list,res,is_append) : res
				typeof fun === "function" ? fun(res) : console.log('init_append method...')
			})
		},
	},
}