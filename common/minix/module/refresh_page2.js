export default {
	computed: {
		refresh_page_com() {
			return this.is_vuex.state.teacher_module.refresh_page
		}
	},
	watch: {
		refresh_page_com(newValue, oldValue){
			console.log(newValue)
			if(newValue) this.is_vuex.commit('set_teacher_vuex',['refresh_page',false])
		}
	},
}