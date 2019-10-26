export default {
	data() {
		return {
			is_back:true,
		}
	},
	onBackPress() {
		this.is_vuex.commit('set_teacher_vuex',['refresh_page',true])
	},
	methods: {
		back_refresh(t = 0,fun){
			let time = setTimeout(()=>{
				typeof fun === 'function' ? fun(res) : console.log('back_refresh method...')
				clearTimeout(time)
				if(this.is_back) uni.navigateBack()
			},t)
		},
	},
}