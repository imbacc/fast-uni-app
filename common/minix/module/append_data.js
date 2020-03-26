import append_data_class from '../../class/append_data_class.js';

export default{
	data() {
		return {
			append_obj: this.get_append_class(),
		}
	},
	methods: {
		get_append_class(){
			return new append_data_class(this)
		},
	},
}