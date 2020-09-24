import append_data_class from '../../class/append_data_class.js';

// 初始化数据和上拉,下拉加载
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