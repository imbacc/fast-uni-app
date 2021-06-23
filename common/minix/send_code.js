import sendCode from '@/common/class/send_code.js';

export default{
	data(){
		return {
			send_obj:this.get_send_class()
		}
	},
	methods: {
		get_send_class(){
			return new sendCode(this)
		}
	},
}
