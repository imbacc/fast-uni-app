import send_code_class from '../../class/send_code_class.js';

export default{
	data(){
		return {
			send_code_obj:this.get_send_code_class()
		}
	},
	methods: {
		get_send_code_class(){
			return new send_code_class(this)
		}
	},
}
