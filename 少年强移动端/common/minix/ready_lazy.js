export default {
	methods: {
		ready_lazy() {
			this.$nextTick(() => {
				let ref = this.$refs.view
				if (ref.$el.clientHeight < 800) this.lazy_load = true
			})
		}
	},
}
