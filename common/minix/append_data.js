import appendData from '@/common/class/append_data.js';

// 初始化数据和上拉,下拉加载
export default{
	data() {
		return {
			append_obj: this.get_append_class()
		}
	},
	methods: {
		get_append_class(){
			return new appendData(this)
		}
	}
}