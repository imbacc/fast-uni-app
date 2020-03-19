import load_info_class from '../../class/load_info_class.js';

export default{
	data() {
		return {
			load_info_obj: this.get_load_info_class(),
		}
	},
	methods: {
		get_load_info_class(){
			return new load_info_class(this)
		},
		
	},
}