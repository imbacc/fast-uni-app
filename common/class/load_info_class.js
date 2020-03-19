class load_info_class{
	constructor(vm) {
	    this.is_obj = {}
	    this.is_update = true
		this.is_action = vm.is_action
	}
	
	fun(api,param,body,cache = 0,fun,type = 'post'){
		this.is_action(api,param,body,false,cache,type).then((res)=>{
			this.is_obj = res
			if(!this.is_update) console.log('dont update...')
			typeof fun === "function" ? fun(res) : console.log('load_by_id method...')
		})
	}
}

export default load_info_class