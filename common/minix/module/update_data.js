export default{
	methods: {
		update_info(api,param,bdoy,fun){
			this.is_vuex.dispatch('api_action',[api,param,bdoy]).then((res)=>{
				typeof fun === 'function' ? fun(res) : console.log('update_info method...')
			})
		},
	},
}