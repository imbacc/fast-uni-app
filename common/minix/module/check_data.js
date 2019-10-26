export default {
	methods: {
		check_child(index,name,obj = false,ck = 'none') {
			let list = obj === false ? this.page_list[index] : obj
			let bool = ck === 'none' ? (list[name] === undefined ? true : (list[name] = list[name] ? false : true)) : ck
			this.$set(list,name,bool)
			return bool
		},
	}
}