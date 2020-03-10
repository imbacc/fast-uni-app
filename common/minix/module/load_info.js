import load_info_class from '../../class/load_info_class.js';

export default{
	data() {
		return {
			load_info_obj: new load_info_class(),
		}
	},
	methods: {
		get_load_info_class(){
			return new load_info_class()
		},
		load_info_fun(api,param,body,cache = 0,fun,type = 'post',is_class){
			console.log('api=',api)
			let this_class = is_class || this.load_info_obj
			this.is_action(api,param,body,false,cache,type).then((res)=>{
				this_class.set({byid_obj:res})
				if(!this_class.is_update) console.log('dont update...')
				typeof fun === "function" ? fun(res) : console.log('load_by_id method...')
			})
		},
	},
}