import send_code_class from '../../class/send_code_class.js';

export default{
	data(){
		return {
			send_obj:this.get_send_class()
		}
	},
	methods: {
		get_send_class(){
			return new send_code_class(this)
		}
	},
}
