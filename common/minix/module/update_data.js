import apiAction from '../../bean/api_action.js';

export default{
	methods: {
		update_info(api,param,body,fun){
			new apiAction(api,param,body).then((res)=>{
				typeof fun === 'function' ? fun(res) : console.log('update_info method...')
			})
		},
	},
}