export default {
	data() {
		return {
			num_str_list:['零','一','二','三','四','五','六','七','八','九']
		}
	},
	computed: {
		num_str_com() {
			return (week) => {
				if(week === undefined) return
				let str = ''
				for (let i = 0,j = week.length;i < j; i++) {
					str += this.num_str_list[week[i]] + ','
				}
				
				return str.substring(0,str.length-1)
			}
		}
	},
}