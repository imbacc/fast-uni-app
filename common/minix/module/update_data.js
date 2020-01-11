export default{
	methods: {
		update_info(api,param,body,fun){
			this.is_action.http_request(api,param,body).then((res)=>{
				typeof fun === 'function' ? fun(res) : console.log('update_info method...')
			})
		},
	},
}