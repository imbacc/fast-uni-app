import gotoRouter from '../../bean/goto_router.js';
const router = new gotoRouter()

export default{
	methods: {
		goto_page(name,query,type,acg,fun){
			router.goto_router(name,query,type,acg,fun)
		},
	},
}