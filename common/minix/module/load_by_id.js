import apiAction from '../../bean/api_action.js';

export default{
	data() {
		return {
			byid_obj:{},
			is_update:true
		}
	},
	methods: {
		load_byid(api,param,body,cache = 0,fun,type = 'post'){
			new apiAction(api,param,body,false,cache,type).then((res)=>{
				this.is_update ? this.byid_obj = res : console.log('dont update...')
				typeof fun === "function" ? fun(res) : console.log('load_by_id method...')
			})
		},
	},
}