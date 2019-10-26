export default {
	data() {
		return {
			content:[],
			page_scroll:false,
		}
	},
	onPageScroll(e) {
		this.is_fun_tools.dou_fun(()=>{
			this.page_scroll = e.scrollTop > 300 ? true : false
		},1,100)
	},
	watch: {
		content(newValue, oldValue) {
			if(newValue) this.$refs.task.is_content(newValue)
		},
	},
	methods: {
		scroll_bottom(){
			if(this.page_scroll || this.content.length > 3){
				this.$nextTick(()=>{
					uni.pageScrollTo({duration:0,scrollTop:9999})
				})
			}
		},
	}
}